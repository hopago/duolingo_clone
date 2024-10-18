import { challenges, challengesOptions } from "@/db/schema";

type Props = {
  options: (typeof challengesOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  

  return (
    <div>
      
    </div>
  )
};

export default Challenge;
