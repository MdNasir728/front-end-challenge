import type { Product } from "@/types/product";
import { showToast } from "./toast";

/**
 * Download products as CSV file
 * @param products - Array of products to download
 * @param filename - Optional filename (default: "products.csv")
 */
export const downloadAsCSV = (products: Product[], filename = "products.csv"): void => {
  if (products.length === 0) {
    showToast.warning("No products to download");
    return;
  }

  // Create CSV headers
  const headers = ["ID", "Product Name", "Views", "Pricing", "Revenue", "Status"];
  
  // Create CSV rows
  const rows = products.map((product) => [
    product.id,
    `"${product.name.replace(/"/g, '""')}"`, // Escape quotes in product names
    product.views.toString(),
    product.pricing.toString(),
    product.revenue.toString(),
    product.status,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast.success(`CSV file downloaded successfully! (${products.length} products)`);
};

/**
 * Download products as Excel file (XLSX format)
 * @param products - Array of products to download
 * @param filename - Optional filename (default: "products.xlsx")
 */
export const downloadAsExcel = (products: Product[], filename = "products.xlsx"): void => {
  if (products.length === 0) {
    showToast.warning("No products to download");
    return;
  }

  // Create HTML table structure for Excel
  let htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Products</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Views</th>
            <th>Pricing</th>
            <th>Revenue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Add product rows
  products.forEach((product) => {
    htmlContent += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.views}</td>
        <td>${product.pricing}</td>
        <td>${product.revenue}</td>
        <td>${product.status}</td>
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Create blob and download
  const blob = new Blob([htmlContent], {
    type: "application/vnd.ms-excel",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast.success(`Excel file downloaded successfully! (${products.length} products)`);
};

/**
 * Download products as PDF file
 * @param products - Array of products to download
 * @param filename - Optional filename (default: "products.pdf")
 */
export const downloadAsPDF = (products: Product[], filename = "products.pdf"): void => {
  if (products.length === 0) {
    showToast.warning("No products to download");
    return;
  }

  // Create HTML content for PDF
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .header {
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Products Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Total Products: ${products.length}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Views</th>
            <th>Pricing</th>
            <th>Revenue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Add product rows
  products.forEach((product) => {
    htmlContent += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.views.toLocaleString()}</td>
        <td>$${product.pricing.toLocaleString()}</td>
        <td>$${product.revenue.toLocaleString()}</td>
        <td>${product.status}</td>
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
      <div class="footer">
        <p>This report was generated automatically from the Products Management System.</p>
      </div>
    </body>
    </html>
  `;

  // Open in new window and trigger print/save as PDF
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    setTimeout(() => {
      printWindow.print();
      showToast.info(`PDF download initiated! Please use the print dialog to save as PDF. (${products.length} products)`);
      // Note: User will need to save as PDF from print dialog
      // For automatic PDF download, we'd need a library like jsPDF
    }, 250);
  } else {
    // Fallback: create blob and download as HTML (can be converted to PDF)
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename.replace(".pdf", ".html"));
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast.success(`HTML file downloaded successfully! (${products.length} products)`);
  }
};

/**
 * Download products in the specified format
 * @param products - Array of products to download
 * @param format - Format type: "csv", "excel", or "pdf"
 */
export const downloadProducts = (
  products: Product[],
  format: "csv" | "excel" | "pdf"
): void => {
  switch (format) {
    case "csv":
      downloadAsCSV(products);
      break;
    case "excel":
      downloadAsExcel(products);
      break;
    case "pdf":
      downloadAsPDF(products);
      break;
    default:
      console.error(`Unsupported format: ${format}`);
  }
};

