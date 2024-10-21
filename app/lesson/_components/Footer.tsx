import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

type Props = {
  disabled?: boolean;
  status: "none" | "wrong" | "correct" | "completed";
  onCheck: () => void;
  lessonId?: boolean;
};

const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {
  const router = useRouter();

  useKey("Enter", onCheck, {}, [onCheck]);

  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            정답입니다!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            오답입니다!
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => {
              router.push("/learn");
              window.location.href = `/lesson/${lessonId}`;
            }}
          >
            다음으로
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "destructive" : "secondary"}
        >
          {status === "none" && "제출하기"}
          {status === "correct" && "다음으로"}
          {status === "wrong" && "다시 시도하기"}
          {status === "completed" && "다시 학습하기"}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
