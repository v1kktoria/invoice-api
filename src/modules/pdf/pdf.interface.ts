export interface PdfInvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientCompanyName: string;
  clientCompanyAddress: string;
  items: { description: string; price: string }[];
  subtotal: string;
  tax: string;
  grandTotal: string;
}