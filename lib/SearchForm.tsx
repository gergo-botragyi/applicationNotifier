import { useState } from "react";

export default function StudentSearchForm() {
  /*const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [poinstA, setPointsA] = useState("");
  const [notA, setNotA] = useState("");
  const [poinstB, setPointsB] = useState("");
  const [notB, setNotB] = useState("");
  const [poinstC, setPointsC] = useState("");
  const [notC, setNotC] = useState("");
  const [poinstD, setPointsD] = useState("");
  const [notD, setNotD] = useState("");
  const [poinstE, setPointsE] = useState("");
  const [notE, setNotE] = useState("");
  const [poinstF, setPointsF] = useState("");
  const [notF, setNotF] = useState("");*/

  const [searchResult, setSearchResult] = useState("");

  const search = async (event: any) => {
    event.preventDefault();
    const q = event.target.input.value;

    const params = new URLSearchParams({ q });

    const res = await fetch("/api/searchStudents?" + params);

    const result = await res.json();
    console.log(result.student[0]);
    setSearchResult(JSON.stringify(result.student[0]));
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
      <div>{searchResult}</div>
    </div>
  );
}
