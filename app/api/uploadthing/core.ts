import { getCurrentUser } from "@/lib/get-current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handle = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return { user_id: user.id };
};

export const ourFileRouter = {
  giveawayImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handle())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
