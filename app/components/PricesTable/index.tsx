import { SelectField, InputField, Datatable, TableRow } from "@/components";
import React, { useEffect, useState } from "react";
import { TABLE_HEADERS } from "./data";
import { useHomeStore } from "@/states";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PricesTable() {
  const {
    getPrices,
    prices,
    priceNext,
    priceBack,
    priceLimit,
    pricePage,
    setPriceLimit,
  } = useHomeStore();
  const [search, setsearch] = useState("");

  useEffect(() => {
    // TODO: Add search
    getPrices({
      page: pricePage,
      limit: priceLimit,
      filter: `{ "$and": [{"reason": {"$ne": null}}]}`,
      populate: "item",
    });
  }, [pricePage, priceLimit, search]);

  return (
    <div>
      <p className="text-2xl font-black">Price Changes News</p>

      <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
        <div className="">
          <InputField
            name="search"
            onChange={(event: any) => {
              const { value } = event.target;
              setsearch(value);
            }}
          />
        </div>
      </div>

      <Datatable header={TABLE_HEADERS}>
        {prices.map((e: any) => (
          <TableRow key={e._id}>
            <td>{e.item.name}</td>
            <td>{e.price}</td>
            <td>{e.type}</td>
            <td>{e.reason}</td>
            <td>{e.createdAt}</td>
          </TableRow>
        ))}
      </Datatable>
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
            onChange={(e: any) => {
              setPriceLimit(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <FaChevronLeft
            onClick={() => {
              priceBack();
            }}
          />
          {pricePage}
          <FaChevronRight
            onClick={() => {
              priceNext();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PricesTable;
