import { ALL_ICONS } from "@utils/icon";
import { useLayoutEffect, useState } from "react";
import { AccordionItem } from "./Accordion";
import IconGrid from "./IconGrid";

export default function IconSet({ id }) {
  const [iconModules, setIconModules] = useState(null);

  const getIconSet = async () => {
    const IconSet = await import(`react-icons/${id}/index`);
    const mappedIcons = Object.keys(IconSet).map((icon) => {
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
  }, []);

  if (!iconModules) {
    return <div>Loading...</div>;
  }
  
  return (
    <IconGrid icons={iconModules} />
  );
}
