import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import FilterPanel, { resolveRange } from "../components/FilterPanel";
import DataTable from "../components/DataTable";
import ExportMenu from "../components/ExportMenu";
import { useDataSource } from "../hooks/useDataSource";
import { filterConfig } from "../config/filterConfig";
import { columns } from "../config/columns";
import { exportConfig } from "../config/exportConfig";

export default function DashBoard() {
  const { t } = useTranslation();
  const { data, loading } = useDataSource();
  const [filters, setFilters] = useState({});

 
 const filteredData = useMemo(() => {
   return (data || []).filter((row) =>
     filterConfig.every((f) => {
       const val = filters[f.key] ?? f.defaultValue;
       if (f.type === "daterange") {
         return f.apply(row, val, {
           getFromRow: f.getFromRow,
           resolveRange: (v) => resolveRange(v, f.presets),
         });
       }
       return f.apply(row, val);
     })
   );
 }, [data, filters]);

  return (
    <div
      style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <BackButton />
      <div className="block md:flex flex-row justify-between items-center">
        <div>
          <FilterPanel
            config={filterConfig}
            values={filters}
            onChange={setFilters}
          />
        </div>
        <div>
          <ExportMenu config={exportConfig} data={filteredData} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns(t)} data={filteredData} />
      )}
    
    </div>
  );
}
