import type { ReportForm } from "../components/CreateReport.tsx";
import seed from "../../data/db.json";

/* ------------------------------------------------------------------ */
/* Local JSON "database" (data/db.json) — persisted in localStorage.  */
/* ------------------------------------------------------------------ */

type DbUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "trainer" | "user";
  stack: string;
  profilePhoto: string;
};

type DbReport = {
  _id: string;
  task: string;
  report: string;
  signIn: string;
  signOut: string;
  date: string; // YYYY-MM-DD
  creator: string; // user id
  trainer: string; // user id
  stack?: string;
  __v: number;
};

type DbShape = {
  users: DbUser[];
  reports: DbReport[];
};

type SeedReport = Omit<DbReport, "date"> & { dayOffset: number };
type SeedShape = { users: DbUser[]; reports: SeedReport[] };

const DB_KEY = "taskManager.db.v1";
const TOKEN_KEY = "token";
const USER_KEY = "user";

function toLocalDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

function buildInitialDb(): DbShape {
  const s = seed as unknown as SeedShape;
  return {
    users: s.users.map((u) => ({ ...u })),
    reports: s.reports.map(({ dayOffset, ...rest }) => ({
      ...rest,
      date: toLocalDate(dayOffset),
    })),
  };
}

function loadDb(): DbShape {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DbShape;
      if (Array.isArray(parsed.users) && Array.isArray(parsed.reports)) {
        return parsed;
      }
    }
  } catch {
    /* ignore corrupt storage and reseed */
  }
  const initial = buildInitialDb();
  saveDb(initial);
  return initial;
}

function saveDb(db: DbShape) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function resetDb() {
  localStorage.removeItem(DB_KEY);
  loadDb();
}

function uid(prefix: string) {
  return `${prefix}${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function requireAuth(): DbUser {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) throw new Error("No token found");
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) throw new Error("No user found");
  try {
    const parsed = JSON.parse(raw) as DbUser;
    if (!parsed?._id) throw new Error("Invalid user");
    return parsed;
  } catch {
    throw new Error("Invalid user");
  }
}

function publicUser(u: DbUser) {
  return {
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    stack: u.stack,
    profilePhoto: u.profilePhoto,
  };
}

function toUserRef(u: DbUser | undefined) {
  if (!u) return null;
  return {
    _id: u._id,
    name: u.name,
    stack: u.stack,
    profilePhoto: u.profilePhoto,
  };
}

function populateReport(db: DbShape, r: DbReport) {
  return {
    ...r,
    creator: toUserRef(db.users.find((u) => u._id === r.creator)) ?? {
      _id: r.creator,
      name: "Unknown",
    },
    trainer: toUserRef(db.users.find((u) => u._id === r.trainer)) ?? {
      _id: r.trainer,
      name: "no trainer",
    },
  };
}

function makeToken(user: DbUser) {
  return `local.${user._id}.${Date.now().toString(36)}`;
}

/* ------------------------------------------------------------------ */
/* Public API — same signatures the components already use.           */
/* ------------------------------------------------------------------ */

export async function getReports(date?: string) {
  try {
    requireAuth();
    const db = loadDb();
    const day = (date ?? "").trim();
    const list = day
      ? db.reports.filter((r) => r.date === day)
      : db.reports;
    const result = list.map((r) => populateReport(db, r));
    return await delay(result);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}

// my reports
export async function myReports() {
  try {
    const me = requireAuth();
    const db = loadDb();
    const mine = db.reports
      .filter((r) => r.creator === me._id)
      .map((r) => populateReport(db, r));
    return await delay(mine);
  } catch (error) {
    console.error("Error fetching my reports:", error);
    return [];
  }
}

// delete my report
export async function deleteReport(reportId: string) {
  const me = requireAuth();
  const db = loadDb();
  const target = db.reports.find((r) => r._id === reportId);
  if (!target) throw new Error("HTTP 404");
  if (target.creator !== me._id) throw new Error("HTTP 403");
  db.reports = db.reports.filter((r) => r._id !== reportId);
  saveDb(db);
  return await delay({ success: true, _id: reportId });
}

// sign up
export async function signUp(formData: FormData) {
  try {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
    const stack = String(formData.get("stack") ?? "").trim();
    const photo = formData.get("profilePhoto");

    if (!name || !email || !password || !stack) {
      throw new Error("Missing required fields");
    }
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }

    const db = loadDb();
    if (db.users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error("Email already in use");
    }

    let profilePhoto = "/images/download.png";
    if (photo instanceof File && photo.size > 0) {
      profilePhoto = await fileToDataUrl(photo).catch(
        () => profilePhoto
      );
    }

    const newUser: DbUser = {
      _id: uid("u"),
      name,
      email,
      password,
      role: "user",
      stack,
      profilePhoto,
    };
    db.users.push(newUser);
    saveDb(db);

    const token = makeToken(newUser);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(publicUser(newUser)));
    return await delay({ token, data: { user: publicUser(newUser) } });
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

// sign in
export async function signIn(data: { email: string; password: string }) {
  try {
    const email = (data.email ?? "").trim().toLowerCase();
    const db = loadDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email && u.password === data.password
    );
    if (!user) throw new Error("Invalid credentials");
    const token = makeToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(publicUser(user)));
    return await delay({ token, data: { user: publicUser(user) } });
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

// create report
export async function createReport(data: ReportForm) {
  try {
    const me = requireAuth();
    const db = loadDb();
    const newReport: DbReport = {
      _id: uid("r"),
      task: data.task ?? "",
      report: data.report ?? "",
      signIn: data.signIn ?? "",
      signOut: data.signOut ?? "",
      date: toLocalDate(0),
      creator: me._id,
      trainer: data.trainer || me._id,
      stack: data.stack || me.stack,
      __v: 0,
    };
    db.reports.unshift(newReport);
    saveDb(db);
    return await delay({
      success: true,
      data: { report: populateReport(db, newReport) },
    });
  } catch (error) {
    console.error("Error creating report:", error);
  }
}

// Trainers
export async function trainers() {
  try {
    requireAuth();
    const db = loadDb();
    const list = db.users
      .filter((u) => u.role === "trainer")
      .map((u) => ({ _id: u._id, name: u.name }));
    return await delay(list);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

// Re-export for debugging / tests: allows resetting the local DB from
// the browser console with `import('./utils/Api').then(m => m.__resetDb())`
export { resetDb as __resetDb, loadDb as __loadDb };
