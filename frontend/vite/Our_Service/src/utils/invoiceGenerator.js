import jsPDF from "jspdf";

export const generateInvoice = (booking) => {
  const doc = new jsPDF();

  doc.text("Invoice", 90, 10);
  doc.text(`Booking ID: ${booking._id}`, 10, 20);
  doc.text(`Customer: ${booking.customer.name}`, 10, 30);
  doc.text(`Service: ${booking.service.name}`, 10, 40);
  doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`, 10, 50);
  doc.text(`Total: $${booking.amount}`, 10, 60);

  doc.save(`Invoice_${booking._id}.pdf`);
};
