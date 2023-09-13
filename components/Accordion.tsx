import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const AccordionItem = ({
  title,
  initiallyOpen = false,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  className?: string;
}) => {
  const [expanded, setExpanded] = useState(initiallyOpen);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div
      className={`shadow-sm text-foregroundDefault border-b border-outlineDimmer flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-backgroundHigher scrollbar-thumb-backgroundHighest transition-all duration-200 ease-in-out min-h-0 h-fit-content max-h-fit-content ${
        expanded ? "grow h-fit-content" : "shrink h-fit-content"
      } ${className}`}
    >
      <div
        className="text-left items-center h-[40px] select-none flex gap-2 flex-row cursor-pointer"
        onClick={toggleExpanded}
      >
        {expanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
        <h4 className="flex-1 font-medium">{title}</h4>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out h-0 grow shrink overflow-y-auto scrollbar-thin scrollbar-track-backgroundHigher scrollbar-thumb-backgroundHighest ${
          expanded ? "grow shrink-0" : "shrink grow-0"
        }`}
      >
        {expanded ? children : null}
      </div>
    </div>
  );
};

const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col h-full grow">{children}</div>;
};

export { Accordion, AccordionItem };
