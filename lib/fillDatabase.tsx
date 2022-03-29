import { useState } from "react";

export default function FillDatabaseInput() {
  const [response, setResponse] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    /*const send = await fetch("./api/fillDatabase", {
      body: JSON.stringify(event.target.fileInput.value),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const res = await send.json();
    setResponse(res);*/
    setResponse(event.target.fileInput.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" id="fileInput" />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}
