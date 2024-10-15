import { lessons } from "@/db/schema";

type Props = {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: (typeof lessons.$inferInsert)[];
  activeLesson: typeof lessons.$inferSelect | null;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return <div>{description}</div>;
};
