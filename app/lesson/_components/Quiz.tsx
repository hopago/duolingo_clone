"use client";

import { challenges, challengesOptions } from "@/db/schema";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import Challenge from "./Challenge";
import Footer from "./Footer";
import { ResultCard } from "./ResultCard";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";

import { toast } from "sonner";
import { useAudio, useMount, useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengesOptions: (typeof challengesOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: undefined;
};

const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    initialPercentage === 100 && openPracticeModal();
  });

  const router = useRouter();

  const { width, height } = useWindowSize();

  const [pending, startTransition] = useTransition();

  const [correctAudio, _c, correctControls] = useAudio({
    src: "/sound/success.mp3",
  });
  const [wrongAudio, _w, wrongControls] = useAudio({ src: "/sound/wrong.mp3" });
  const [finishAudio] = useAudio({
    src: "/sound/success_completed.mp3",
    autoPlay: true,
  });

  console.log(_c, _w);

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [selectedOption, setSelectedOption] = useState<number>();

  const challenge = challenges[activeIndex];
  if (!challenge)
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/image/success.png"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/image/success.png"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            축하드립니다! <br /> 학습을 성공적으로 마치셨네요.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );

  const options = challenge.challengesOptions ?? [];

  const title =
    challenge.type === "ASSIST" ? "알맞은 의미를 선택해라" : challenge.question;

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("무언가 잘못됐군요..."));
      });
    } else {
      if (initialPercentage === 100) return;

      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            wrongControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("무언가 잘못됐군요..."));
      });
    }
  };

  return (
    <>
      {wrongAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription} // TODO: userSubscription.isActive
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption || pending}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
