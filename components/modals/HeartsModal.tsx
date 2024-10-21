"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  const onClick = () => {
    close();

    router.push("/store");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/image/mascot_sad.png"
              alt="Mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            이런, 남은 하트가 없어요.
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            무제한 학습을 위해 Pro 플랜을 구독하세요.
          </DialogDescription>
          <DialogFooter className="mb-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Button
                variant="primaryOutline"
                className="w-full"
                size="lg"
                onClick={onClick}
              >
                구독하기
              </Button>
              <Button
                variant="destructiveOutline"
                className="w-full"
                size="lg"
                onClick={() => {
                  close();
                }}
              >
                홈으로
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
