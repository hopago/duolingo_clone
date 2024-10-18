import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";

import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { Header } from "./_components/Header";
import { UserProgress } from "@/components/UserProgress";
import { Unit } from "./_components/Unit";

const LearnPage = async () => {
  const userProgressApiCall = getUserProgress();
  const unitsApiCall = getUnits();
  const courseProgressApiCall = getCourseProgress();
  const lessonPercentageApiCall = getLessonPercentage();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressApiCall,
      unitsApiCall,
      courseProgressApiCall,
      lessonPercentageApiCall,
    ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress)
    redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((u) => (
          <div key={u.id} className="mb-10">
            <Unit
              id={u.id}
              order={u.order}
              description={u.description}
              title={u.title}
              lessons={u.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
