import { useState, useEffect } from "react";
import { BeachItem } from "./BeachItem";
import rankingData from "../ranking.json";

export function BeachList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sorted = [...rankingData].sort((a, b) => {
      return parseFloat(b.ranking) - parseFloat(a.ranking);
    });
    const filtered = sorted.filter((item) => {
      return parseFloat(item.stars) > 3.5 && parseInt(item.reviews.replace(/,/g, "")) > 50;
    });
    setData(filtered);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <h1 className="text-center text-3xl">{data?.length} beaches in NSW ranked by Google</h1>

      {/* <article className="flex flex-col w-full items-center justify-center space-y-6 sm:max-w-md px-2 sm:px-6 "> */}
      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-2 sm:px-6">
        {data.map((item, index) => (
          <BeachItem data={item} index={index} />
        ))}
      </article>
    </div>
  );
}
