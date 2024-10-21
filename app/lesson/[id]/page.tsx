import { getLesson, getUserProgress } from "@/db/queries";

import { redirect } from "next/navigation";

import Quiz from "../_components/Quiz";

type Props = {
  params: {
    id: number;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const lessonApiCall = getLesson(params.id);
  const userProgressApiCall = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonApiCall,
    userProgressApiCall,
  ]);
  if (!lesson || !userProgress) redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={undefined} // TODO:
    />
  );
};

export default LessonIdPage;
