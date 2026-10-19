import { createContext, useContext, useState } from "react";
import type { Report } from "../components/Reports.tsx";

type ReportModalContextType = {
  open: boolean;
  report: Report | null;
  openReport: (report: Report) => void;
  closeReport: () => void;
};

const ReportModalContext = createContext<ReportModalContextType | null>(null);

export const ReportModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const openReport = (r: Report) => {
    setReport(r);
    setOpen(true);
  };

  const closeReport = () => {
    setOpen(false);
    setReport(null);
  };

  return (
    <ReportModalContext.Provider
      value={{ open, report, openReport, closeReport }}
    >
      {children}
    </ReportModalContext.Provider>
  );
};

export const useReportModal = () => {
  const ctx = useContext(ReportModalContext);
  if (!ctx) throw new Error("useReportModal must be used inside provider");
  return ctx;
};
