"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Page() {
  const [rowData, setRowData] = useState(null);

  const table = [
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      address: "Malda",
      customar_Name: "Nill",
      feedback: "good",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      address: "Jalpaiguri",
      customar_Name: "Raj",
      feedback: "good",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      address: "NJP",
      customar_Name: "Rupam",
      feedback: "good",
    },
  ];

  const [colDefs] = useState([
    { field: "make", headerName: "Company" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
    { field: "address" },
    { field: "customar_Name", headerName: "Customer Name" },
    { field: "feedback" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRowData(table);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {rowData ? (
        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
          />
        </div>
      ) : (
        <SkeletonTheme baseColor="#D0D0D0" highlightColor="#E5E5E5">
          <Skeleton count={6} height={30} />
        </SkeletonTheme>
      )}
    </>
  );
}
