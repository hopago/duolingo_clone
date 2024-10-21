import { auth } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const { userId } = auth();

  return userId === process.env.ADMIN_ID;
};
