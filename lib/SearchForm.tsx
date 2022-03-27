import { useState } from "react";

export default function StudentSearchForm() {
  const [searchResult, setSearchResult] = useState({});

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
    <div>
      <form onSubmit={search}>
        <input type="text" id="input" />
        <button type="submit">Search</button>
      </form>
      <div>{JSON.stringify(searchResult)}</div>
    </div>
  );
}
