"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const POINTS_TO_REFILL = 25;

const Items = ({ hearts, points }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("무언가 잘못됐군요..."));
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/image/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 lg:text-xl font-bold">하트 구매하기</p>
        </div>
        <Button
          disabled={hearts === 5 || points < POINTS_TO_REFILL || pending}
          onClick={onRefillHearts}
        >
          {hearts === 5 ? (
            "이미 하트가 최대치에요!"
          ) : (
            <div className="flex items-center">
              <Image
                src="/image/point.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Items;
