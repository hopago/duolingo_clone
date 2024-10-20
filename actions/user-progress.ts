"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challenges, challengesProgress, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINTS_TO_REFILL = 25;

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) throw new Error("Unauthorized");

  const course = await getCourseById(courseId);
  if (!course) throw new Error("Course not found");

  // TODO: Enable once units and lessons are added
  //   if (!course.units.length || !course.units[0].lessons.length)
  //     throw new Error("Course is empty");

  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      username: user.firstName || "User",
      userImageSrc: user.imageUrl || "/image/hero.png",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    username: user.firstName || "User",
    userImageSrc: user.imageUrl || "/image/hero.png",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) throw new Error("Challenge not found");

  const currentUserProgress = await getUserProgress();
  // TODO: Get user subscription

  const existingChallengeProgress = await db.query.challengesProgress.findFirst(
    {
      where: and(
        eq(challengesProgress.userId, userId),
        eq(challengesProgress.challengeId, challengeId)
      ),
    }
  );

  const isPractice = !!existingChallengeProgress;
  if (isPractice) return { error: "practice" };

  if (!currentUserProgress) throw new Error("User progress not found");

  // TODO: Handle subscription

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${challenge.lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");
  if (currentUserProgress.hearts === 5) throw new Error("Max hearts");
  if (currentUserProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points");

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
