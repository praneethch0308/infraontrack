import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import * as XLSX from "xlsx";

const ExportToExcelButton = ({ tableId }) => {
  const exportTableToExcel = () => {
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, `${tableId}.xlsx`);
  };

  return (
    <button
      onClick={exportTableToExcel}
      className="flex items-center bg-green-600 rounded-3xl cursor-pointer border-none p-2 shadow-lg text-white font-semibold hover:bg-green-700 transition duration-300"
    >
      <MdOutlineFileDownload className="h-6 w-6 mr-2" />
      EXPORT TO EXCEL
    </button>
  );
};

export default ExportToExcelButton;
