import { ChangeEvent, useState } from "react";

export default function FillDatabaseInput() {
  const [file, setFile] = useState(null as any);
  const [fileName, setFileName] = useState("No file selected");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
    setFileName((selectedFile) => {
      return event.target.value.length > 0
        ? event.target.value.split("\\")[2]
        : selectedFile;
    });
  };
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const q = event.target.adminp.value;
    const res = await fetch("/api/checkPass", {
      method: "POST",
      body: JSON.stringify({ q }),
    });
    if (res.status != 200) {
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);

    const send = await fetch("/api/fillDatabase", {
      body: form,
      method: "POST",
    });
    if (!send.ok) {
      alert(
        "There was an error while uploading the file to the database! Plase try again!"
      );
      return;
    }
    alert("Successfully uploaded the file to database!");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-zinc-200 md:flex-none flex justify-center items-center flex-wrap"
    >
      <label className="border-2 border-zinc-200 rounded-md p-2 m-1 flex flex-row">
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          onChange={handleChange}
          className="hidden"
          accept=".csv, .txt"
        />
        <div className="mr-1 px-1 cursor-pointer bg-zinc-700 rounded-md">
          Select File
        </div>
        {fileName}
      </label>
      <div className="inputContainer border-2">
        <input
          type="password"
          id="adminp"
          placeholder="Admin Password"
          className="m-1 p-1 rounded-md text-black"
        />
      </div>
      <button
        type="submit"
        className="border-2 border-zinc-200 p-1 m-1 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
