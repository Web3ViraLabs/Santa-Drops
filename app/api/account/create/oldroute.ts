// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { address, name } = await req.json();

//     if (!address || !name) {
//       return NextResponse.json("Address and name are required", {
//         status: 400,
//       });
//     }

//     const buffer = crypto.randomBytes(32);
//     const token = buffer.toString("hex");

//     const user = await db.profile.create({
//       data: {
//         name,
//         token,
//         wallets: {
//           create: {
//             address,
//           },
//         },
//       },
//     });

//     return NextResponse.json(user);
//   } catch (error) {
//     console.log("[USER_CREATE] ", error);
//   }
// }
