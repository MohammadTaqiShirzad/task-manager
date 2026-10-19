import { useEffect, useState, useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { myReports, deleteReport } from "../utils/Api.ts";
import { SearchContext } from "../utils/search-context.ts";
import CreateReport from "./CreateReport.tsx";
import LoaderReport from "./LoaderReport.tsx";

export type UserRef = {
  _id: string;
  name: string;
  stack?: string;
  profilePhoto?: string;
};

export type myReport = {
  _id: string;
  task: string;
  report: string;
  creator: UserRef;
  trainer: UserRef;
  signIn: string;
  signOut: string;
  date: string; // ISO string
  __v: number;
};

const MyReports = () => {
  const [selectedReport, setSelectedReport] = useState<myReport | null>(null);
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [myReportsData, setMyReportsData] = useState<myReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchCtx = useContext(SearchContext);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await myReports();
        setMyReportsData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load my reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <LoaderReport />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const q = (searchCtx?.query || "").trim().toLowerCase();
  const filtered = q
    ? myReportsData.filter((row) => {
        const creator = row.creator?.name?.toLowerCase() || "";
        const trainer = row.trainer?.name?.toLowerCase() || "";
        const task = row.task?.toLowerCase() || "";
        const report = row.report?.toLowerCase() || "";
        const signIn = row.signIn?.toLowerCase() || "";
        const signOut = row.signOut?.toLowerCase() || "";
        return (
          creator.includes(q) ||
          trainer.includes(q) ||
          task.includes(q) ||
          report.includes(q) ||
          signIn.includes(q) ||
          signOut.includes(q)
        );
      })
    : myReportsData;

  // delete report
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      setDeletingId(id);
      const isDeleted = await deleteReport(id);
      if (isDeleted) {
        setMyReportsData((prev) => prev.filter((r) => r._id !== id));
        return alert("report deleted");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete report");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {filtered.length === 0 ? (
        <tr>
          <td colSpan={7} className="p-4 text-center text-gray-500">
            <span className="font-medium">No my reports found.</span>
            <img src="/images/no-data.svg" alt="" className="w-full h-72" />
          </td>
        </tr>
      ) : (
        filtered.map((row) => {
          const formatReport =
            row.report.length > 30
              ? row.report.slice(0, 30) + "..."
              : row.report;
          const formatTask =
            row.task.length > 20 ? row.task.slice(0, 20) + "..." : row.task;
          return (
            <tr
              key={row._id}
              onClick={() => {
                setSelectedReport(row);
                setOpen(true);
              }}
              className="border-b border-gray-300 text-sm text-gray-700 cursor-pointer"
            >
              <td className="max-sm:px-4 py-3 sm:pl-4 flex items-center gap-2 mr-4 lg:mr-0">
                <img
                  src={row.creator.profilePhoto}
                  alt=""
                  className="size-10 rounded-full"
                />{" "}
                <span>{row.creator.name}</span>
              </td>
              <td className="max-sm:px-4 mr-4 lg:mr-0">{row.signIn}</td>
              <td className="max-sm:px-4 mr-4 lg:mr-0">{row.signOut}</td>
              <td className="max-sm:px-4 mr-4 lg:mr-0">
                {row.trainer?.name ?? "no trainer"}
              </td>
              <td className="max-sm:px-4 mr-4 lg:mr-0">{formatTask}</td>
              <td className="text-center max-sm:px-4 ">{formatReport}</td>
              <td className="max-sm:px-4 flex gap-1 text-xl justify-center items-center ">
                <button
                  disabled={deletingId === row._id}
                  className={`p-2 rounded-lg ${
                    deletingId === row._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row._id);
                  }}
                >
                  <RiDeleteBinLine className="text-red-500" />
                </button>
              </td>
            </tr>
          );
        })
      )}
      :
      <CreateReport
        isOpen={open}
        report={selectedReport}
        setOpen={() => {
          setOpen(false);
          setSelectedReport(null);
        }}
      />
    </>
  );
};

export default MyReports;
