import { useState, useEffect } from "react";
import { BeachItem } from "./BeachItem";
import { Sort } from "./Sort";
import { Search } from "./Search";
import rankingData from "../ranking.json";

export function BeachList() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const sorted = [...rankingData].sort((a, b) => {
      if (sortOption === "stars") {
        return parseFloat(b.stars) - parseFloat(a.stars);
      } else if (sortOption === "reviews") {
        return parseInt(b.reviews.replace(/,/g, "")) - parseInt(a.reviews.replace(/,/g, ""));
      } else {
        // default
        return parseFloat(b.ranking) - parseFloat(a.ranking);
      }
    });

    const filtered = sorted.filter((item) => {
      return (
        parseFloat(item.stars) > 3.5 &&
        parseInt(item.reviews.replace(/,/g, "")) > 40 &&
        item.name.toLowerCase().includes(searchText?.toLowerCase())
      );
    });
    setData(filtered);
  }, [searchText, sortOption]);

  if (!setData || setData.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Search setSearchText={setSearchText} />
      <Sort sortOption={sortOption} setSortOption={setSortOption} />

      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-2 sm:px-6">
        {data.map((item, index) => (
          <BeachItem key={item.name} data={item} index={index} />
        ))}
      </article>
    </div>
  );
}
