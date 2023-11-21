import mailgen from "mailgen";
import { mailConfigs } from "../configs/nodeMailer.config.js";
import "dotenv/config";

export const sendAppointmentMail = async ( cusName, cusEmail,time,date) => {

  //import mail configs
  let mailTransporter = mailConfigs();


  let MailGenerator = new mailgen({
    theme: "cerberus",
    product: {
      name: "Salon System",
      link: "http://localhost:3000/",
      logo: `https://drive.google.com/file/d/14rDrjOsL3Co8bWG2Zu6qNlubbD7OuZSW/view?usp=sharing`,
      logoHeight: '80px'
    },
  });

  var email = {
    body: {
        name: `${cusName}`,
        intro: `This is send because of You are booked an appointment, <br><h3>on</h3> <h1> ${date} </h1> <h3>at</h3> <h1> ${time} </h1>`,
        outro: 'Thank you once again for choosing Us.We look forward to serving you again in the near future. Have a wonderful day!'
    },
};

  //convert mailgen body into HTML
  let emailBody = MailGenerator.generate(email);
  let emailText = MailGenerator.generatePlaintext(email);

  //sending credentials
  let details = {
    from: process.env.CLIENT_EMAIL,
    to: `${cusEmail}`,
    subject: `Appointment Details for ${cusName}`,
    html: emailBody,
    text: emailText,
  };

  //send mail through nodemailer
  await mailTransporter
    .sendMail(details)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
