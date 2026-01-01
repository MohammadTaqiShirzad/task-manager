import type { ReportForm } from "../components/CreateReport";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

async function authFetch(endpoint: string, options: RequestInit = {}) {
  let token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  token = token.replace(/^"+|"+$/g, "");

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : true;
}


export async function getReports(date?: string) {
  try {
    const json = await authFetch(`/reports?date=${date ?? ""}&s=`);
    return json?.data?.result ?? [];
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}

// my reports
export async function myReports() {
  try {
    const json = await authFetch("/reports/myreports");
    return json?.data?.reports ?? [];
  } catch (error) {
    console.error("Error fetching my reports:", error);
    return [];
  }
}

// delete my report

export async function deleteReport(reportId: string) {
  const json = await authFetch(`/reports/${reportId}`, {
    method: "DELETE",
  });

  return json;
}

// sign up

export async function signUp(formData: FormData) {
  try {
    const response = await fetch(`${baseUrl}/users/signup`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to sign up");
    }
    const json = await response.json();
    localStorage.setItem("token", json.token);
    return json;
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

// sign in

export async function signIn(data: { email: string; password: string }) {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to sign in");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

// create report

export async function createReport(data: ReportForm) {
  try {
    return await authFetch("/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error creating report:", error);
  }
}

// Trainers

export async function trainers() {
  try {
    const json = await authFetch("/users/trainers");
    return json?.data ?? [];
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
}
