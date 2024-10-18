type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </main>
  );
};

export default LessonLayout;
