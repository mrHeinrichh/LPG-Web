import { Button } from "@/components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

function PriceChangesChart({ children }: any) {
  const downloadAsPDF = async () => {
    const element = document.getElementById("price-charts");

    if (element) {
      try {
        const canvas = await html2canvas(element);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15, 150, 150);

        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Element not found");
    }
  };
  return (
    <div>
      <Button onClick={downloadAsPDF}>Download as PDF</Button>
      <div id="price-charts" className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

export default PriceChangesChart;
