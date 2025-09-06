import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        table: {
          driver: "Driver",
          vehicle: "Vehicle",
          location: "Location",
          status: "Status",
          lastUpdated: "Last Updated",
        },
        filters: {
          status: "Driver status",
          all: "All",
          active: "Active",
          inactive: "Inactive",
          location: "Driver location",
          locationPlaceholder: "Search locations...",
          date: "Date",
          last7: "Last 7 days",
          last30: "Last 30 days",
          last5Years: "Last 5 Years",
          currentQuarter: "Current Quarter",
          last1Year: "Last 1 Year",
          more: "More filters"
        },
        export: {
          csv: "CSV",
          xlsx: "Excel",
          pdf: "PDF",
          quickbooks: "QuickBooks (JSON)",
          fmcsa: "FMCSA (PDF)",
        },
        buttons: {
          back: "Back",
          export: "Export",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;