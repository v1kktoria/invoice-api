import { Invoice } from "../invoice/entities/invoice.entity";
import { PdfInvoiceData } from "./pdf.interface";

export function mapInvoiceToPdfData(invoice: Invoice): PdfInvoiceData {
  return {
    invoiceNumber: invoice.invoice_number,
    date: invoice.created_at.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    clientName: `${invoice.client.firstName} ${invoice.client.lastName}`,
    clientEmail: invoice.client.email,
    clientCompanyName: invoice.client.company?.name || "",
    clientCompanyAddress: invoice.client.company?.address || "",
    items: invoice.items.map(i => ({
      description: i.description,
      price: Number(i.price).toFixed(2),
    })),
    subtotal: Number(invoice.total).toFixed(2),
    tax: Number(invoice.tax).toFixed(2),
    grandTotal: (Number(invoice.total) + Number(invoice.tax)).toFixed(2),
  };
}