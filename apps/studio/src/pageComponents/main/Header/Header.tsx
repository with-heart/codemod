import { CodemodButton } from "~/components/CodemodButton";
import { TopBar } from "~/pageComponents/main/Header/TopBar";
import { HeaderButtons } from "~/pageComponents/main/Header/headerButtons";
import { DownloadZip } from "../DownloadZip";

export const Header = () => {
  return (
    <>
      <TopBar />
      <div className="flex justify-between items-center h-[40px] w-full p-1 px-4">
        <div />
        <div className="flex gap-2 items-center">
          <CodemodButton />
          <HeaderButtons />
          <DownloadZip />
        </div>
      </div>
    </>
  );
};
