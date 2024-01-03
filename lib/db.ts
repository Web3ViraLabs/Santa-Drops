import { PrismaClient } from "@prisma/client";
import axios from "axios"; // Ensure you have axios installed or use another HTTP client

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// db.ts

// import { PrismaClient } from "@prisma/client";
// import axios from "axios";

// // Function to send logs to a specific URL based on log type
// const sendLog = async (
//   type: "query" | "info" | "warn" | "error",
//   event: any
// ) => {
//   const url = getLogUrl(type); // Determine URL based on log type
//   const content = { content: JSON.stringify(event) }; // Prepare the content

//   try {
//     await axios.post(url, content); // Send the log data
//   } catch (error) {
//     console.error(`Failed to send log for ${type}:`, error);
//   }
// };

// // Function to determine the URL for a given log type
// const getLogUrl = (type: string): string => {
//   const urls: Record<string, string> = {
//     query: "http://example.com/query-logs", // Placeholder URL for query logs
//     info: "http://example.com/info-logs", // Placeholder URL for info logs
//     warn: "http://example.com/warn-logs", // Placeholder URL for warn logs
//     error: "http://example.com/error-logs", // Placeholder URL for error logs
//   };
//   return urls[type] || "http://example.com/default-logs"; // Default log URL
// };

// // Initialize Prisma Client with custom log levels and events
// const prisma = new PrismaClient({
//   log: [
//     { emit: "event", level: "query" },
//     { emit: "event", level: "info" },
//     { emit: "event", level: "warn" },
//     { emit: "event", level: "error" },
//   ],
// });

// // Register log event handlers to send logs
// // prisma.$on("query", (e) => sendLog("query", e));
// // prisma.$on("info", (e) => sendLog("info", e));
// // prisma.$on("warn", (e) => sendLog("warn", e));
// // prisma.$on("error", (e) => sendLog("error", e));
// prisma.$on("query", (e) => console.log(e));
// prisma.$on("info", (e) => console.log(e));
// prisma.$on("warn", (e) => console.log(e));
// prisma.$on("error", (e) => console.log(e));

// // Export the configured Prisma Client
// export const db = prisma;
