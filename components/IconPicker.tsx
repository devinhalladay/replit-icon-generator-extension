import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Accordion } from "./Accordion";
import IconSet from "./IconSet";
import SearchIconSet from "./SearchIconSet";
import { ICON_SETS } from "state/constants";
// import { Dropdown } from "flowbite-react";
import { ALL_ICONS } from "@utils/icon";
import { useAtom } from "jotai";
import { selectedIconSetAtom } from "state/icon";
import SectionLabel from "./Number";
// import { Dropdown } from "flowbite-react";
import { Dropdown } from './Dropdown';
import { Button } from "flowbite-react";

const IconPicker = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIconSet, setSelectedIconSet] = useAtom(selectedIconSetAtom);

  const [svgDataUrl, setSvgDataUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSvgDataUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const name = ALL_ICONS.find((icon) => icon.id === selectedIconSet)?.name;

  return (
    <div className="w-full flex flex-col grow shrink relative overflow-y-hidden gap-4">
      <div className="sticky top-0 left-0 bg-backgroundDefault flex flex-col gap-3 z-20">
        <SectionLabel label="Choose an icon" number={1} />

        <div className="flex grow w-full">
          <Dropdown label={name} className="bg-backgroundHigher text-foregroundDefault border-outlineDimmer rounded-md shadow-lg grow flex-1 z-50">
            {ICON_SETS.map((iconSet) => (
              <Dropdown.Item
                key={iconSet}
                onClick={() => setSelectedIconSet(iconSet)}
                className="bg-backgroundHigher text-foregroundDefault hover:bg-backgroundHighest px-2 py-1 rounded-md transition-all duration-250 ease-in"
              >
                {ALL_ICONS.find((icon) => icon.id === iconSet)?.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <div className="relative w-full flex-1">
            <input type="text" id="search-dropdown" className="block h-[32px] p-2.5 w-full z-20 text-sm bg-backgroundHigher rounded-r-lg border border-outlineDimmer focus:ring-blue-500 focus:border-blue-500" placeholder="Search icons or concepts…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          {/* <Button>Upload SVG</Button> */}
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-thin scrollbar-track-backgroundHigher scrollbar-thumb-backgroundHighest pb-6 relative" ref={scrollContainer} onScroll={handleScroll}>
        <div className={`h-0 opacity-0 sticky top-0 left-0 right-0 ${scrollTop > 1 ? 'opacity-100' : ''} transition-all ease-in transition-duration-[25]`}><div className="w-full h-8  bg-gradient-to-b from-backgroundDefault via-backgroundDefault/60 to-backgroundDefault/0 pointer-events-none	"></div></div>
        {searchQuery.length > 2 ? (
          <div className="flex flex-col grow h-full">
            <div className="icons grow h-full">
              <SearchIconSet key={selectedIconSet} id={selectedIconSet} query={searchQuery} />
            </div>
          </div>
        ) : (
          <IconSet key={selectedIconSet} id={selectedIconSet} />
        )}
      </div>
    </div>
  );
};

export default React.memo(IconPicker);
