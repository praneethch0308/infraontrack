import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import xlsx from "node-xlsx";
import { saveAs } from "file-saver"; 

const ExportToExcelButton = ({ tableId }) => {
  const exportTableToExcel = () => {
    const table = document.getElementById(tableId);
    const rows = Array.from(table.querySelectorAll("tr"));
    
   
    const data = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.map((cell) => cell.innerText);
    });
    const worksheet = [{ name: "Sheet1", data }];
    const buffer = xlsx.build(worksheet);
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${tableId}.xlsx`);
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
