import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";

import { getUserProgress } from "@/db/queries";
import Image from "next/image";

import { redirect } from "next/navigation";

import Items from "./_components/Items";

const ShopPage = async () => {
  const userProgressApiCall = getUserProgress();

  const [userProgress] = await Promise.all([userProgressApiCall]);
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

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
        <div className="w-full flex flex-col items-center">
          <Image alt="Store" src="/image/store.svg" width={90} height={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            상점
          </h1>
        </div>
        <p className="text-muted-foreground text-center text-lg mb-6">
          포인트로 다양한 아이템들을 살 수 있습니다.
        </p>
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
