import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// CSV
export const exportCsv = (rows) => {
  const csv = Papa.unparse(rows);
  downloadFile(csv, 'data.csv', 'text/csv;charset=utf-8;');
};

// Excel
export const exportXlsx = (rows) => {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'data.xlsx');
};

// PDF
export const exportPdf = (rows, options) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [Object.keys(rows[0] || {})],
    body: rows.map((r) => Object.values(r)),
    ...options,
  });
  doc.save('data.pdf');
};

// QuickBooks JSON
export const exportQuickBooksJson = (rows) => {
  const qb = { Employees: rows };
  downloadFile(JSON.stringify(qb, null, 2), 'quickbooks.json', 'application/json');
};

// FMCSA PDF (simplified)
export const exportFmcsaPdf = (rows) => {
  const doc = new jsPDF();
  doc.text('FMCSA Report', 10, 10);
  autoTable(doc, {
    head: [Object.keys(rows[0] || {})],
    body: rows.map((r) => Object.values(r)),
  });
  doc.save('fmcsa.pdf');
};

// helper
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
