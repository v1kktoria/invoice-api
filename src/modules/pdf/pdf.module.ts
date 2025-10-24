import { Module } from "@nestjs/common";
import { PdfService } from "./pdf.service";

@Module({
  imports: [],
  providers: [PdfService],
  exports: [PdfModule],
})
export class PdfModule {}
