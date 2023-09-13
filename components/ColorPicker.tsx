import useClickOutside from "hooks/useClickOutside";
import { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { PRIMARY_COLORS, SECONDARY_COLORS } from "state/constants";

const inputStyles =
  "block w-full rounded-md border-0 py-1.5 px-2 bg-backgroundHigher text-white shadow-sm ring-1 ring-inset ring-outlineDimmer placeholder:text-white/60 focus:ring-1 focus:ring-inset focus:ring-blueDefault sm:text-sm sm:leading-6";

export const PopoverPicker = ({
  color,
  onChange,
  colorSet,
  label,
}: {
  color: string;
  onChange: (color: string) => void;
  colorSet: string[];
  label: string;
}) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        className={`flex flex-col gap-2 border border-outlineDimmer rounded-md p-2`}
      >
        <p className="block text-xs font-medium leading-4">{label}</p>

        <div className={`flex flex-row gap-2 items-center`}>
          <div
            className="relative swatch w-[34px] h-[34px] shrink-0 grow-0 rounded-md bg-white shadow-sm border border-outlineDefault overflow-visible cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => toggle(true)}
          >
            {isOpen && (
              <div className="popover absolute top-8 left-8" ref={popover}>
                <HexColorPicker color={color} onChange={onChange} />
              </div>
            )}
          </div>

          <HexColorInput
            prefixed={true}
            color={color}
            onChange={onChange}
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-foregroundDimmest">Presets</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {colorSet.map((color, index) => (
              <div
                key={index}
                onClick={() => onChange(color)}
                className="rounded-md w-6 h-6 border-2 border-backgroundHighest cursor-pointer hover:scale-125 transition-transform ease-in-out"
                style={{
                  backgroundColor: color,
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ColorPicker = ({ color, onChange, presetColors }) => {
  return (
    <div className="ColorPicker w-full bg-backgroundHigher rounded">
      <HexColorPicker color={color} onChange={onChange} className="!w-auto" />

      <div className="flex p-4 flex-wrap">
        {presetColors.map((presetColor) => (
          <div
            key={presetColor}
            className="w-[24px] h-[24px] m-2 p-0 border-2 border-foregroundDefault/20 rounded cursor-pointer outline-none"
            style={{ background: presetColor }}
            onClick={(e) => {
              e.preventDefault();
              onChange(presetColor);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
