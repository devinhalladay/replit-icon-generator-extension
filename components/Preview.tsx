import { User, data, Repl } from "@replit/extensions";
import { useReplit } from "@replit/extensions-react";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { FiDatabase, FiDownload, FiDownloadCloud, FiExternalLink, FiLock, FiSave, FiChevronDown } from "react-icons/fi";
import { primaryColorAtom, secondaryColorAtom } from "state/colors";
import { dataURLtoBlob, downloadFiles, downloadImageFile, downloadSvgFile, svgToBlob, getDataUrlFromSvg } from "../utils/export";
import Button from "./Button";
import Icon from "./Icon";
import { TbPackageImport } from "react-icons/tb";


const IconPreview = ({ icon, size = 512, storeImageRef, iconRef }) => {
  const primary = useAtomValue(primaryColorAtom);
  const secondary = useAtomValue(secondaryColorAtom);

  return (
    <svg
      ref={storeImageRef}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        width: "100%",
        height: "100%",
        borderRadius: 8
      }}
      width={size}
      height={size}
    >
      <rect width="512" height="512" x="0" y="0" fill={primary} />

      <svg
        ref={iconRef}
        x="120"
        y="120"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: secondary,
        }}
        color={secondary}
        width={512 - 120 * 2}
        height={512 - 120 * 2}
      >
        {icon ? (
          <Icon key={icon.name} icon={icon.icon} />
        ) : null}
      </svg>

      <g
        opacity="0.5"
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path d="M0 0H512V512H0V0Z" fill="url(#paint0_radial_210_174)" />
      </g>

      <defs>
        <radialGradient
          id="paint0_radial_210_174"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(68 76) rotate(44.4791) scale(622.28)"
        >
          <stop stop-color="white" stop-opacity="0.79" />
          <stop offset="1" />
        </radialGradient>
        <clipPath id="clip0_210_174">
          <rect width="512" height="512" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Preview = ({ icon }) => {
  const [user, setUser] = useState<User | null>(null);
  const [replName, setReplName] = useState<string>(null)
  const [repl, setRepl] = useState<Repl>(null);
  const { replit } = useReplit();


  const getRepl = async () => {
    const data = await replit.data.currentRepl({})
    setRepl(data.repl)
    setReplName(data.repl.title)
  }


  useEffect(() => {
    getRepl();
  }, [replit])

  const symbolIconRef = useRef(null);
  const storeImageRef = useRef(null);

  const handleExportToRepl = async () => {
    // Download SVG
    const symbolSvgElement = symbolIconRef.current.outerHTML;
    await replit.fs.writeFile('icons/icon.svg', symbolSvgElement);
    replit.messages.showConfirm('Base symbol exported as icons/icon.svg')

    // Download image
    const storeImageSvgElement = storeImageRef.current;
    const data = await getDataUrlFromSvg(storeImageSvgElement, 512, 512);
    const blob = dataURLtoBlob(data);
    await replit.fs.writeFile('icons/icon.png', blob);
    replit.messages.showConfirm('Full icon exported as icons/icon.png')


    return;
  }

  useEffect(() => {
    const getUser = async () => {
      const { user } = await data.currentUser({});
      setUser(user);
    };

    getUser();
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-wrap gap-4 items-start">
        <div className="ListingCard rounded-lg border border-backgroundHighest bg-backgroundHigher p-2 flex flex-row gap-3 w-fit shadow items-center">
          <div className="rounded-[8px] border border-outlineDimmer overflow-hidden">
            <IconPreview
              icon={icon}
              size={64}
              iconRef={symbolIconRef}
              storeImageRef={storeImageRef}
              key={1}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md font-medium">{replName || 'Example Extension'}</p>
            <div className="flex flex-row gap-4">
              {user !== null ? (
                <div className="flex items-center gap-2">
                  <div
                    className="avatar w-6 h-6 rounded-full bg-backgroundHigher border border-outlineDimmer shadow hover:shadow-md hover:border-outlineDefault transition-all ease-in-out	duration-200 cursor-pointer"
                    style={{
                      backgroundImage: `url(${user.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <p className="text-sm text-foregroundDimmer">
                    {user.username}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="DockPreview rounded-lg border border-backgroundHigher pt-2 pb-3 px-2 flex flex-col gap-2 w-fit text-foregroundDimmer">
          <div className="flex flex-row gap-2 items-center">
          <FiChevronDown size={14} />
            <p className="text-[14px] font-medium">Tools</p>
            </div>
          <div className="px-4 flex flex-row gap-6 w-fit">
            <div className="flex flex-col gap-1 items-center">
              <div className="border border-outlineDimmest rounded-[8px] h-fit w-fit overflow-hidden shadow-sm">
                <IconPreview
                  key={2}
                  icon={icon}
                  size={42}
                  iconRef={symbolIconRef}
                  storeImageRef={storeImageRef}
                />
              </div>
              <p className="text-xs text-foregroundDimmer">Preview</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="border border-outlineDimmest rounded-md h-fit w-fit overflow-hidden flex items-center justify-center w-[42px] h-[42px] bg-backgroundHigher shadow-sm">
                <FiLock />
              </div>
              <p className="text-xs text-foregroundDimmer">Secrets</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="border border-outlineDimmest rounded-md h-fit w-fit overflow-hidden flex items-center justify-center w-[42px] h-[42px] bg-backgroundHigher shadow-sm">
                <FiDatabase />
              </div>
              <p className="text-xs text-foregroundDimmer">Database</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-wrap">
        <div className="flex flex-row gap-2 flex-wrap">
          <Button text="Download files" className="bg-backgroundHigher hover:bg-backgroundHighest" iconLeft={<FiDownload />} onClick={() => {
            downloadFiles({
              iconSvgElement: storeImageRef.current,
              symbolSvgElement: symbolIconRef.current,
              baseFileName: "icon"
            });
          }} />
          <Button text="Export to this Repl" iconLeft={<TbPackageImport />} onClick={handleExportToRepl} />
        </div>
        <p className="text-sm text-foregroundDimmer font-regular">Exporting to this Repl will create an <pre className="inline text-sm text-orangeDefault"><code>icon</code>/</pre> directory. You can move or rename the files afterward.</p>
      </div>
    </div>
  );
};

export default Preview;
