import React, { Suspense, useState } from "react";
import Layout from "../components/Layout";
import Reports from "../components/Reports";
import Loader from "../components/Loader";

type valuePiece = Date | null;
type value = valuePiece | [valuePiece, valuePiece];

export default function Dashboards() {
  // const [value, setValue] = useState<value>(new Date());

  return (
    <>
      <Layout>
        <Reports />
      </Layout>
    </>
  );
}
