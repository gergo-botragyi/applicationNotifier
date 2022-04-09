import { useState } from "react";
import ResultElement from "./searchResultElement";

export default function StudentSearchForm() {
  const [searchResult, setSearchResult] = useState({} as any);

  const search = async (event: any) => {
    event.preventDefault();
    const q = event.target.input.value;

    const params = new URLSearchParams({ q });

    const res = await fetch("/api/searchStudents?" + params);

    const result = await res.json();
    console.log(result.student[0]);
    setSearchResult(result.student[0]);
  };

  return (
    <div className="text-zinc-200 w-1/4">
      <form onSubmit={search}>
        <div className="flex flex-row justify-center items-center">
          <input
            type="number"
            id="input"
            className="rounded m-1 p-1 text-black appearance-none"
            placeholder="Student ID number"
          />
          <button type="submit" className="p-1 m-1 border-2 rounded-md">
            Search
          </button>
        </div>
      </form>
      <div>
        <div>Oktatási azonosító: {searchResult["id"]}</div>
        <div>Név: {searchResult["name"]}</div>
        <div className="flex justify-between">
          <div>Osztály</div>
          <div>Pontszám</div>
          <div>Eredmény</div>
        </div>
        <ResultElement Class="A" searchResult={searchResult} />
        <ResultElement Class="B" searchResult={searchResult} />
        <ResultElement Class="C" searchResult={searchResult} />
        <ResultElement Class="D" searchResult={searchResult} />
        <ResultElement Class="E" searchResult={searchResult} />
        <ResultElement Class="F" searchResult={searchResult} />
      </div>
    </div>
  );
}
