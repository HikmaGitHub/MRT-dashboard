import { TextField, MenuItem, Select, FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X, Filter } from "lucide-react";
import dayjs from "dayjs";

export default function FilterPanel({ config, values, onChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, val) => {
    onChange({ ...values, [key]: val });
  };


  const textFilters = config.filter((f) => f.type === "text");
  const otherFilters = config.filter((f) => f.type !== "text");

  const renderFilter = (f) => {
    if (f.type === "select") {
      return (
       <div className="flex flex-row gap-2 items-center">
              <div>Sort by Status</div>
              <div>
                <FormControl key={f.key} className="min-w-[160px]">
                  <Select
                    value={values[f.key] ??  f.defaultValue}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="rounded-lg bg-white h-[40px]"
                  >
                    {f.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      );
    }

    if (f.type === "text") {
      return (
        <TextField
          key={f.key}
          placeholder={t(f.placeholderKey)}
          value={values[f.key] ?? f.defaultValue}
          onChange={(e) => handleChange(f.key, e.target.value)}
          className="rounded-lg bg-white min-w-[200px]"
        />
      );
    }

    if (f.type === "daterange") {
      return (
        <div className="flex flex-row gap-2  items-center">
              <div>Sort by Date</div>
              <div>
                <FormControl key={f.key} className="min-w-[160px] ">
                  <Select
                    value={values[f.key]?.presetId ??  f.defaultValue.presetId}
                    onChange={(e) =>
                      handleChange(f.key, { presetId: e.target.value })
                    }
                    className="rounded-lg bg-white h-[40px]"
                  >
                    {f.presets.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {t(p.labelKey)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
      
      {textFilters.map((f) => renderFilter(f))}
     
      <div className="hidden md:flex gap-3 flex-wrap">
        {otherFilters.map((f) => renderFilter(f))}
      </div>

     
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg  text-black"
        >
          <Filter className="w-4 h-4" />
          {t("filters.more")} 
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg p-4 mt-2 flex flex-col gap-3">
          {otherFilters.map((f) => renderFilter(f))}
        </div>
      )}
    </div>
  );
}


export const resolveRange = (preset, presets) => {
  const found = presets.find((p) => p.id === preset.presetId);
  return found?.getRange() ?? [dayjs().subtract(30, "day"), dayjs()];
};
