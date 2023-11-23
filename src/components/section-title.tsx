import { cn } from "@/lib/utils";

export const SectionTitle = ({
  index,
  title,
}: {
  index: number;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-start flex-row w-full">
      <div
        className={cn(
          "flex flex-col items-center justify-center pl-4 p-3 border-2 border-white pr-4 rounded-full h-16 w-16",
          "text-3xl font-bold",
        )}
      >
        {index}
      </div>
      <div className="text-3xl font-bold pl-4">{title}</div>
    </div>
  );
};
