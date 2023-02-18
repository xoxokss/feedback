import nodemailer from "nodemailer";
import "dotenv/config";
const sendGmail = (param: nodemailer.SendMailOptions): boolean => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  // 메일 옵션
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.user, // 보내는 메일의 주소
    to: param.to, // 수신할 이메일
    subject: param.subject, // 메일 제목
    html: param.html, // 메일 내용
  };

  // 메일 발송
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Failed to send mail - [${err.name}] ${err.message}`);
      return false;
    } else
      console.info(
        `Success to send email - [${info.messageId}] ${info.response}`
      );
  });
  return true;
};

export default sendGmail;
