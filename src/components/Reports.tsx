import { useEffect, useState, useContext } from "react";
import { getReports } from "../utils/Api";
import { useDate } from "../utils/date-context";
import { SearchContext } from "../utils/search-context";

export type UserRef = {
  _id: string;
  name: string;
  stack?: string;
  profilePhoto?: string;
};

export type Report = {
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

const Reports = () => {
  const date = useDate();
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : undefined;

  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getReports(formattedDate);
        setReportsData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [formattedDate]);

  const searchCtx = useContext(SearchContext);

  if (loading) return <p className="p-4">Loading reports...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  console.log("TOKEN:", localStorage.getItem("token"));
  const q = (searchCtx?.query || "").trim().toLowerCase();
  const filtered = q
    ? reportsData.filter((row) => {
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
    : reportsData;

  return (
    <>
      {filtered.length === 0 ? (
        <tr>
          <td colSpan={7} className="p-4 text-center text-gray-500">
            No reports found.
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
              className="border-b border-gray-300 text-sm text-gray-700"
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
              <td className="max-sm:px-4 mr-4 lg:mr-0">{row.trainer?.name}</td>
              <td className="max-sm:px-4 mr-4 lg:mr-0">{formatTask}</td>
              <td className="text-center max-sm:px-4 ">{formatReport}</td>
              <td className="max-sm:px-4 flex gap-1 text-xl justify-center items-center "></td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default Reports;
