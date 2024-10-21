import Image from "next/image";

import { redirect } from "next/navigation";

import { toast } from "sonner";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  if (!question) {
    toast.message("질문이 아직 준비되지 않아 학습 페이지로 넘어가요");
    redirect("/learn");
  }

  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/image/logo.png"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/image/logo.png"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
