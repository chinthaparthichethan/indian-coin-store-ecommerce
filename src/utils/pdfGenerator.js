import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = (orderData, customerData) => {
  try {
    // Create PDF with smaller page size and optimized settings
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      compress: true // Enable compression
    });
    
    // Set up the document with smaller fonts to reduce size
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.setTextColor(139, 69, 19);
    doc.text('INDIAN COIN STORE', 20, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('INVOICE', 20, 35);
    
    // Order details
    doc.setFontSize(10);
    doc.text(`Order Number: ${orderData.orderNumber}`, 20, 50);
    doc.text(`Date: ${new Date(orderData.date).toLocaleDateString('en-IN')}`, 20, 58);
    
    // Customer details
    doc.text('BILL TO:', 20, 75);
    doc.text(`Name: ${customerData.name}`, 20, 83);
    doc.text(`Email: ${customerData.email}`, 20, 91);
    doc.text(`Phone: ${customerData.phone}`, 20, 99);
    
    // Handle long addresses with text wrapping
    const addressLines = doc.splitTextToSize(`Address: ${customerData.address}`, 170);
    doc.text(addressLines, 20, 107);
    
    // Calculate starting position for table
    const tableStartY = 107 + (addressLines.length * 8) + 10;
    
    // Simplified items table with smaller data
    const tableData = orderData.items.map(item => [
      item.name.substring(0, 30) + (item.name.length > 30 ? '...' : ''), // Truncate long names
      item.quantity.toString(),
      `₹${item.price.toLocaleString('en-IN')}`,
      `₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    ]);
    
    // Generate compact table
    autoTable(doc, {
      startY: tableStartY,
      head: [['Item', 'Qty', 'Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [139, 69, 19],
        fontSize: 9,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 8,
        cellPadding: 2
      },
      styles: { 
        fontSize: 8,
        cellPadding: 2
      },
      margin: { left: 20, right: 20 },
      tableWidth: 'auto',
      columnStyles: {
        0: { cellWidth: 80 }, // Item name column
        1: { cellWidth: 20, halign: 'center' }, // Quantity
        2: { cellWidth: 35, halign: 'right' }, // Price
        3: { cellWidth: 35, halign: 'right' }  // Total
      }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Grand Total: ₹${orderData.totalAmount.toLocaleString('en-IN')}`, 20, finalY);
    
    // Compact footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your purchase!', 20, finalY + 15);
    doc.text('Indian Coin Store - Preserving History', 20, finalY + 23);
    
    console.log('Optimized PDF generated successfully');
    return doc;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

// New function to convert PDF to smaller base64
export const generateCompactPDFBase64 = async (orderData, customerData) => {
  try {
    const pdf = generateInvoicePDF(orderData, customerData);
    const pdfBase64 = pdf.output('datauristring');
    
    // Remove data URI prefix to get clean base64
    const base64Only = pdfBase64.split(',')[1];
    
    console.log('PDF Base64 size:', Math.round(base64Only.length / 1024), 'KB');
    
    // Check if PDF is too large (EmailJS limit is ~500KB)
    if (base64Only.length > 500000) {
      console.warn('PDF might be too large for EmailJS attachment');
    }
    
    return base64Only;
  } catch (error) {
    console.error('Error generating PDF base64:', error);
    throw error;
  }
};
