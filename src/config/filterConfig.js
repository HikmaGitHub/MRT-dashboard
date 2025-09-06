import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

export const filterConfig = [
  {
    key: "location",
    type: "text",
    labelKey: "filters.location",
    placeholderKey: "filters.locationPlaceholder",
    defaultValue: "",
    apply: (row, value) =>
      value ? row.location?.toLowerCase().includes(value.toLowerCase()) : true,
  },
  {
    key: "status",
    type: "select",
    labelKey: "filters.status",
    options: [
      { value: "all", labelKey: "filters.all" },
      { value: "active", labelKey: "filters.active" },
      { value: "inactive", labelKey: "filters.inactive" },
    ],
    defaultValue: "all",
    apply: (row, value) => (value === "all" ? true : row.status === value),
  },
  {
    key: "dateRange",
    type: "daterange",
    labelKey: "filters.date",
    presets: [
      {
        id: "all",
        labelKey: "filters.all",
        getRange: () => [dayjs("1900-01-01"), dayjs("2100-01-01")], // effectively all
      },
      {
        id: "last7",
        labelKey: "filters.last7",
        getRange: () => [dayjs().subtract(7, "day"), dayjs()],
      },
      {
        id: "last30",
        labelKey: "filters.last30",
        getRange: () => [dayjs().subtract(30, "day"), dayjs()],
      },
      {
        id: "currentQuarter",
        labelKey: "filters.currentQuarter",
        getRange: () => {
          const quarter = dayjs().quarter();
          const start = dayjs().quarter(quarter).startOf("quarter");
          const end = dayjs().quarter(quarter).endOf("quarter");
          return [start, end];
        },
      },
      {
        id: "last1Year",
        labelKey: "filters.last1Year",
        getRange: () => [dayjs().subtract(1, "year"), dayjs()],
      },
      {
        id: "last5Years",
        labelKey: "filters.last5Years",
        getRange: () => [dayjs().subtract(5, "year"), dayjs()],
      },
    ],
    defaultValue: { presetId: "all" }, // default to "all"
    getFromRow: (row) => dayjs(row.lastUpdated),
    apply: (row, value, helpers) => {
      const date = helpers.getFromRow(row);
      const [start, end] = helpers.resolveRange(value);
      return date.isAfter(start) && date.isBefore(end);
    },
  },
];
