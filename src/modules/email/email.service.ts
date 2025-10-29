import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TypedConfigService } from "../config/typed.config.service";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;
  private sender: Sender;

  constructor(private readonly config: TypedConfigService) {
    this.mailerSend = new MailerSend({ apiKey: this.config.get("mailersend.apiKey") });

    this.sender = new Sender(
      this.config.get("mailersend.fromEmail"),
      this.config.get("mailersend.fromName")
    );
  }

  async sendInvoice( toEmail: string, toName: string, pdfBuffer: Buffer, fileName = "invoice.pdf") {
    try {
      const recipient = [new Recipient(toEmail, toName)];

      const emailParams = new EmailParams()
        .setFrom(this.sender)
        .setTo(recipient)
        .setReplyTo(this.sender)
        .setSubject(`Invoice for ${toName}`)
        .setText(`Hi ${toName}, please find your invoice attached.`)
        .setAttachments([
          {
            content: Buffer.from(pdfBuffer).toString("base64"),
            filename: fileName,
            disposition: "attachment",
          },
        ]);

      await this.mailerSend.email.send(emailParams);
    } catch (err) {
      throw new InternalServerErrorException("Failed to send invoice email");
    }
  }
}
