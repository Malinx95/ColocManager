import { Coloc } from "@prisma/client";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../provider/CurrentUserContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

type DropdownProps = {
  // data: Array<any>,
  // parseData: (data: any) => string[],
  // onChange?: (data: any) => void,
  // placeholder?: string,
  // selected?: any,
  // setSelected?: (data: any) => void,
  // open?: boolean,
  // keepOpen?: boolean,
};

export function Dropdown({}: // data,
// parseData,
// onChange,
// placeholder,
// selected,
// setSelected,
// open,
// keepOpen,
DropdownProps) {
  const { selectedColoc, currentUser, setSelectedColoc } =
    useCurrentUserContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  // useEffect(() => {
  //   if(data) {
  //     setParsedData(parseData(data));
  //   }
  // }, [data, parseData]);

  // useEffect(() => {
  //   if (open) {
  //     setIsOpen(open);
  //   }
  // }, [open]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <div className="bg-[#d9d9d9] text-center text-2xl py-5 font-bold w-full break-all truncate px-3 cursor-pointer">
          {selectedColoc?.name}
        </div>
        <div className="w-6 h-6 mx-3">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>
      <div
        className="w-full flex flex-col shadow-md relative"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="flex flex-col absolute w-full bg-[#d9d9d9]">
          {currentUser?.Coloc.map((coloc, index) => (
            <div
              key={coloc.id}
              className="bg-[#d9d9d9] text-center text-xl w-full break-all truncate hover:bg-[#c4c4c4] cursor-pointer"
              onClick={() => {
                setSelectedColoc(
                  currentUser?.Coloc.find((Coloc) => Coloc.id === coloc.id)
                );
                setIsOpen(false);
              }}
            >
              {coloc.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
