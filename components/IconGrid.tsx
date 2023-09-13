import { Tooltip } from "flowbite-react";
import { useSetAtom } from "jotai";
import { selectedIconAtom } from "state/icon";
import Icon from "./Icon";

const iconButtonStyles =
  "bg-backgroundHigher border-outlineDimmer border aspect-square p-2 flex items-center justify-center rounded hover:bg-backgroundHighest shadow hover:shadow-md hover:border-outlineDefault transition-all	ease-in-out	duration-200 cursor-pointer text-2xl max-h-[48px] max-w-[48px] w-[48px] h-[48px]";

const IconGrid = ({ icons }) => {
  return (
    <div className="flex flex-wrap gap-4 text-white">
      {icons.map(({ name, icon }) => (
        <IconButton key={name} icon={icon} name={name} />
      ))}
    </div>
  );
};

export default IconGrid;

const IconButton = ({ icon, name }) => {
  const setSelectedIcon = useSetAtom(selectedIconAtom);

  
  // alert(icon)

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <Tooltip content={name} animation={false} arrow={false} placement="bottom">
    <div
      className={iconButtonStyles}
      onClick={() =>
        handleIconClick({
          icon,
          name,
        })
      }
    >
      <Icon key={name} icon={icon} />
    </div>
      </Tooltip>
  );
};
