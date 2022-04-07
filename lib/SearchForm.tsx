import { useState } from "react";

export default function StudentSearchForm() {
  const [searchResult, setSearchResult] = useState();

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
      <div>{JSON.stringify(searchResult)}</div>
    </div>
  );
}
