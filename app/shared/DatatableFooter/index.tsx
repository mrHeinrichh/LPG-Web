import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SelectField from "../SelectField";

interface IDatatableFooter {
  page: number;
  onLeft: () => void;
  onRight: () => void;
  onSetLimit: (value: number) => void;
}

function DatatableFooter({
  page,
  onLeft,
  onRight,
  onSetLimit,
}: IDatatableFooter) {
  return (
    <div className="w-full flex justify-between py-2">
      <div className="flex items-center gap-4 ">
        <SelectField
          options={[
            { title: "20", value: 20 },
            { title: "10", value: 10 },
            { title: "5", value: 5 },
            { title: "1", value: 1 },
          ]}
          name={""}
          title={""}
          onChange={onSetLimit}
        />
      </div>
      <div className="flex items-center gap-4 ">
        <FaChevronLeft onClick={onLeft} />
        {page}
        <FaChevronRight onClick={onRight} />
      </div>
    </div>
  );
}

export default DatatableFooter;
