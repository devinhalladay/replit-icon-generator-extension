import { ALL_ICONS } from "@utils/icon";
import { useAtom } from "jotai";
import React, { useLayoutEffect, useState } from "react";
import { iconModulesAtom, IconSet } from "state/icon";
import { AccordionItem } from "./Accordion";
import IconGrid from "./IconGrid";

function SearchIconSet({ id, query }) {
  const [iconModules, setIconModules] = useAtom(iconModulesAtom);

  const getIconSet = async () => {
    const IconSet = await import(`react-icons/${id}/index`);

    const found = Object.keys(IconSet).filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );

    if (!found.length) {
      return null;
    }

    const mappedIcons: IconSet[] = found.map((icon) => {
      return {
        name: icon,
        icon: IconSet[icon],
      };
    });

    setIconModules(mappedIcons);
    return IconSet;
  };

  useLayoutEffect(() => {
    getIconSet();
  }, [query]);

  if (iconModules && iconModules.length === 0) {
    return null;
  }

  return (
    <IconGrid icons={iconModules} />
  );
}

export default React.memo(SearchIconSet);
