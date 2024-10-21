"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "./SidebarItem";

import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";

import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/image/logo.png" height={40} width={40} alt="logo" />
          <h1 className="text-2xl font-semibold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="학습하기"
          href="/learn"
          iconSrc="/image/learn.png"
        />
        <SidebarItem
          label="순위보기"
          href="/leadearboard"
          iconSrc="/image/leaderboard.png"
        />
        <SidebarItem
          label="미션보기"
          href="/quests"
          iconSrc="/image/quest.png"
        />
        <SidebarItem
          label="상점이동"
          href="/shop"
          iconSrc="/image/store.svg"
        />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
