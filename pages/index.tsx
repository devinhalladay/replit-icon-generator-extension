import type { NextPage } from "next";

import Editor from "@components/Editor";
import IconPicker from "@components/IconPicker";
import SectionLabel from "@components/Number";
import Preview from "@components/Preview";
import { useReplit } from "@replit/extensions-react";
import { useAtom, useAtomValue } from "jotai";
import useThemeTokens from "../hooks/useThemeTokens";
import { selectedIconAtom } from "../state/icon";

const sectionStyles =
  "flex flex-col border-t-4 border-t-outlineDimmest pt-4 mb-4 gap-4";

const Home: NextPage = () => {
  const { status, error, replit } = useReplit();
  useThemeTokens();

  const selectedIcon = useAtomValue(selectedIconAtom);

  if (
    status === "loading"
    // || typeof IconSet === 'undefined' ||
    // IconSet == null
  ) {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div className="">An error occurred: {error?.message}</div>;
  }

  return (
    <main className="text-foregroundDefault bg-backgroundDefault w-full h-full max-w-full max-h-screen flex flex-col text-base px-2 py-2 flex max-w-full flex-col grow h-full scrollbar-thin scrollbar-track-backgroundHigher scrollbar-thumb-backgroundHighest">
      <section
        className={
          sectionStyles +
          "shrink-0 min-h-[320px] grow border-t-0 py-0 mb-0 overflow-y-hidden"
        }
      >
        <IconPicker />
      </section>
      <section className={sectionStyles}>
        <SectionLabel label="Choose your colors" number={2} />
        <Editor />
      </section>
      <section className={sectionStyles + " pb-6"}>
        <SectionLabel label="Preview & export" number={3} />
        <Preview icon={selectedIcon} />
      </section>
    </main>
  );
};

export default Home;
