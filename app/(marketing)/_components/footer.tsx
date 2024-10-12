import { Button } from "@/components/ui/button";
import Image from "next/image";

export const MarketingFooter = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/image/flags/korea.svg"
            alt="korea"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          한국어
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/image/flags/france.svg"
            alt="france"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          프랑스어
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/image/flags/japan.svg"
            alt="japan"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          일본어
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/image/flags/germany.svg"
            alt="germany"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          독일어
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/image/flags/china.svg"
            alt="china"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          중국어
        </Button>
      </div>
    </footer>
  );
};
