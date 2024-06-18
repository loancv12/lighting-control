import * as XLSX from "xlsx";

export function exportExcel(fileName, arrayOfObj) {
  // Create a new workbook and a worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(arrayOfObj);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write the workbook to a file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
