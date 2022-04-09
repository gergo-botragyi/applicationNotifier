import { useState } from "react";
import ResultElement from "./searchResultElement";

export default function StudentSearchForm() {
  const [searchResult, setSearchResult] = useState({} as any);

  const search = async (event: any) => {
    event.preventDefault();
    const q = event.target.input.value;
    if (!q) {
      return;
    }

    const params = new URLSearchParams({ q });

    const res = await fetch("/api/searchStudents?" + params);

    const result = await res.json();
    if (result.student[0] === undefined) {
      alert(
        "The student with this Student ID does not exist in the database! Please try again!"
      );
      return;
    }
    setSearchResult(result.student[0]);
  };

  return (
    <div className="text-zinc-200 md:w-1/3">
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
        <div className="border-[1px] border-zinc-200">
          Oktatási azonosító: {searchResult["id"]}
        </div>
        <div className="border-b-[1px] border-zinc-200 border-x-[1px]">
          Név: {searchResult["name"]}
        </div>
        <div className="flex justify-between">
          <div className="searchResultElement border-l-[1px]">Osztály</div>
          <div className="searchResultElement">Pontszám</div>
          <div className="searchResultElement">Eredmény</div>
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
