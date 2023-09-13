import { useAtom } from "jotai";
import { primaryColorAtom, secondaryColorAtom } from "state/colors";
import { PopoverPicker } from "./ColorPicker";
import { PRIMARY_COLORS, SECONDARY_COLORS } from "state/constants";

const Editor = () => {
  const [primary, setPrimary] = useAtom(primaryColorAtom);
  const [secondary, setSecondary] = useAtom(secondaryColorAtom);
  return (
    <div className="overflow-y-auto scrollbar-thin scrollbar-track-backgroundHigher scrollbar-thumb-backgroundHighest flex flex-col max-h-full grow h-full overflow-y-visible">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <PopoverPicker
            label="Primary Color"
            color={primary}
            onChange={setPrimary}
            colorSet={PRIMARY_COLORS}
          />
        </div>
        <div className="flex flex-col gap-2">
          <PopoverPicker
            label="Secondary Color"
            color={secondary}
            onChange={setSecondary}
            colorSet={SECONDARY_COLORS}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
