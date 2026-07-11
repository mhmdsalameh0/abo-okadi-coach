import nodemailer from "nodemailer";

type BookingEmailDetails = {
  name: string;
  place: string;
  phone: string;
  date: string;
  time: string;
  message: string;
};

type EmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
};

export type EmailEnvironmentStatus = {
  GMAIL_USER: boolean;
  GMAIL_APP_PASSWORD: boolean;
  COACH_EMAIL: boolean;
  GMAIL_SMTP_HOST: boolean;
  GMAIL_SMTP_PORT: boolean;
};

export class EmailConfigurationError extends Error {
  missingVariables: string[];

  constructor(missingVariables: string[]) {
    super(`Missing email environment variables: ${missingVariables.join(", ")}`);
    this.name = "EmailConfigurationError";
    this.missingVariables = missingVariables;
  }
}

function readRequiredEnv(name: string, options?: { stripSpaces?: boolean }) {
  const rawValue = process.env[name];
  const value = options?.stripSpaces ? rawValue?.replace(/\s/g, "") : rawValue?.trim();

  return value || null;
}

export function getEmailEnvironmentStatus(): EmailEnvironmentStatus {
  return {
    GMAIL_USER: Boolean(readRequiredEnv("GMAIL_USER")),
    GMAIL_APP_PASSWORD: Boolean(readRequiredEnv("GMAIL_APP_PASSWORD", { stripSpaces: true })),
    COACH_EMAIL: Boolean(readRequiredEnv("COACH_EMAIL")),
    GMAIL_SMTP_HOST: Boolean(process.env.GMAIL_SMTP_HOST?.trim()),
    GMAIL_SMTP_PORT: Boolean(process.env.GMAIL_SMTP_PORT?.trim()),
  };
}

function getEmailConfig(): EmailConfig {
  const missingVariables: string[] = [];
  const user = readRequiredEnv("GMAIL_USER");
  const pass = readRequiredEnv("GMAIL_APP_PASSWORD", { stripSpaces: true });
  const to = readRequiredEnv("COACH_EMAIL");

  if (!user) missingVariables.push("GMAIL_USER");
  if (!pass) missingVariables.push("GMAIL_APP_PASSWORD");
  if (!to) missingVariables.push("COACH_EMAIL");

  if (!user || !pass || !to) {
    throw new EmailConfigurationError(missingVariables);
  }

  const host = process.env.GMAIL_SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.GMAIL_SMTP_PORT || "465");

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("GMAIL_SMTP_PORT must be a positive number.");
  }

  return {
    host,
    port,
    user,
    pass,
    to,
  };
}

export async function sendBookingNotification(details: BookingEmailDetails) {
  const { host, port, user, pass, to } = getEmailConfig();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
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
