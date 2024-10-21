"use client";

import { challenges, challengesOptions } from "@/db/schema";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { redirect } from "next/navigation";

import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import Challenge from "./Challenge";
import Footer from "./Footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";

type Props = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengesOptions: (typeof challengesOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any;
};

const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [selectedOption, setSelectedOption] = useState<number>();

  const challenge = challenges[activeIndex];
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
              console.error("Missing hearts");
              return;
            }

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
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing hearts");
              return;
            }

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
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
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
