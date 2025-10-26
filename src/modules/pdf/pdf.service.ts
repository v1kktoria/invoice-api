import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Invoice } from "../invoice/entities/invoice.entity";
import { mapInvoiceToPdfData } from "./pdf-invoice.mapper";
import Handlebars from "handlebars";
import pdf from "html-pdf-node-ts";
import path from "path";
import fs from "fs";

@Injectable()
export class PdfService {
  async generateInvoice(invoice: Invoice): Promise<Buffer> {
    try {
      const templateHtml = fs.readFileSync( path.join(__dirname, "templates", "invoice.hbs"), "utf8" );
      const styles = fs.readFileSync( path.join(__dirname, "templates", "invoice.css"), "utf8" );

      const template = Handlebars.compile(templateHtml);

      const pdfData = mapInvoiceToPdfData(invoice);
      const html = template({ invoice: pdfData, styles });

      return await pdf.generatePdf(
        { content: html },
        { format: "A4", printBackground: true }
      );
    } catch (err) {
      throw new InternalServerErrorException("Failed to generate PDF");
    }
  }
}