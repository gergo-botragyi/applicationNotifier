import { ChangeEvent, useState } from "react";

export default function FillDatabaseInput() {
  const [file, setFile] = useState(null as any);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
  };
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);

    const send = await fetch("/api/fillDatabase", {
      body: form,
      method: "POST",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p></p>
    </div>
  );
}
