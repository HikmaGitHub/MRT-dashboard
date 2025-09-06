import { exportCsv, exportXlsx, exportPdf, exportQuickBooksJson, exportFmcsaPdf } from '../utils/exports';

export const exportConfig = [
  { id: 'csv', labelKey: 'export.csv', handler: exportCsv },
  { id: 'xlsx', labelKey: 'export.xlsx', handler: exportXlsx },
  { id: 'pdf', labelKey: 'export.pdf', handler: (rows) => exportPdf(rows, { theme: 'compact' }) },
  { id: 'qb', labelKey: 'export.quickbooks', handler: exportQuickBooksJson },
  { id: 'fmcsa', labelKey: 'export.fmcsa', handler: exportFmcsaPdf },
];