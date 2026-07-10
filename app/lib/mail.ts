import nodemailer from "nodemailer";

type BookingEmailDetails = {
  name: string;
  place: string;
  phone: string;
  date: string;
  time: string;
  message: string;
};

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to send booking emails.`);
  }

  return value;
}

export async function sendBookingNotification(details: BookingEmailDetails) {
  const host = process.env.GMAIL_SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.GMAIL_SMTP_PORT || "465");
  const user = requireEnv("GMAIL_USER");
  const pass = requireEnv("GMAIL_APP_PASSWORD").replace(/\s/g, "");
  const to = requireEnv("COACH_EMAIL");

  console.log("Gmail auth debug", {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD_LENGTH: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "").length ?? 0,
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""),
    },
  });

  const lines = [
    "Hello Coach,",
    "",
    "You have a new booking request. Please check your admin dashboard.",
    "",
    "Client details:",
    `Name: ${details.name}`,
    `Location: ${details.place}`,
    `Phone: ${details.phone}`,
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    `Message / Goal: ${details.message || "-"}`,
    "",
    "Please check your admin dashboard to accept or reject this booking.",
  ];

  await transporter.sendMail({
    from: `Coach Abo Booking <${user}>`,
    to,
    subject: "New Book Session Request",
    text: lines.join("\n"),
  });
}
