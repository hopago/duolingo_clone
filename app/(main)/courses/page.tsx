import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./_components/List";

const CoursesPage = async () => {
  const coursesApiCall = getCourses();
  const userProgressApiCall = getUserProgress();
  const [courses, userProgress] = await Promise.all([
    coursesApiCall,
    userProgressApiCall,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">언어학습 코스</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
