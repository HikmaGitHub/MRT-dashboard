import { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";

export default function DataTable({ columns, data }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!isDesktop) {
 
    return <MaterialReactTable columns={columns} data={data} />;
  }
  
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableSorting
      enableColumnResizing
      enableDensityToggle
      initialState={{ density: "compact" }}
    />
  );
}
