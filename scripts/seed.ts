import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding DB");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "한국어",
        imageSrc: "/image/flags/korea.svg",
      },
      {
        id: 2,
        title: "프랑스어",
        imageSrc: "/image/flags/france.svg",
      },
      {
        id: 3,
        title: "독일어",
        imageSrc: "/image/flags/germany.svg",
      },
      {
        id: 4,
        title: "일본어",
        imageSrc: "/image/flags/japan.svg",
      },
      {
        id: 5,
        title: "중국어",
        imageSrc: "/image/flags/china.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "유닛 1",
        description: "한국어의 기초를 배워라",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "단어",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "독해",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // 단어
        type: "SELECT",
        order: 1,
        question: "다음 중 '사람'과 동의어인 것을 고르시오.",
      },
      {
        id: 2,
        lessonId: 1, // 단어
        type: "ASSIST",
        order: 2,
        question: "'인간'",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "다음 중 남성성의 특질이 아닌 것을 고르시오.",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/image/challenges_options/human.png",
        correct: true,
        text: "인간",
        audioSrc: "/sound/person.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/image/challenges_options/animal.png",
        correct: false,
        text: "동물",
        audioSrc: "/sound/animal.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/image/challenges_options/AI.jpg",
        correct: false,
        text: "A.I",
        audioSrc: "/sound/AI.mp3",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        id: 4,
        challengeId: 2,
        correct: true,
        text: "인간",
        audioSrc: "/sound/person.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        correct: false,
        text: "동물",
        audioSrc: "/sound/animal.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        correct: false,
        text: "A.I",
        audioSrc: "/sound/AI.mp3",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        id: 7,
        challengeId: 3,
        correct: true,
        text: "의존성",
        imageSrc: "/image/challenges_options/rely.png",
        audioSrc: "/sound/dependent.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        correct: false,
        text: "문제해결",
        imageSrc: "/image/challenges_options/problem_solving.png",
        audioSrc: "/sound/problem_solving.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        correct: false,
        text: "보호",
        imageSrc: "/image/challenges_options/protection.png",
        audioSrc: "/sound/protection.mp3",
      },
    ]);

    console.log("Seeding Finished");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to seed DB");
  }
};

main();
