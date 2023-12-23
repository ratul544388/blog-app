import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        userId: clerkUser.id,
      },
    });
    
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
