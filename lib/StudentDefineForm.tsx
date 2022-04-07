export default function StudentDefineForm() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const update = await fetch("/api/updateStudent", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (update.ok) {
      const result = await update.json();
      console.log(`updated student: ${JSON.stringify(result)}`);
    } else {
      const res = await fetch("/api/students", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await res.json();
      console.log(`created student: ${JSON.stringify(result)}`);
    }
  };

  return (
    <div className="w-1/3 text-zinc-200 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-row">
          <input
            name="id"
            type="text"
            id="id"
            className="formElement"
            placeholder="Student ID number"
          />
          <input
            name="name"
            type="text"
            className="formElement"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsA"
            type="number"
            className="formElement"
            placeholder="Class A points"
          />
          <input
            name="notA"
            type="text"
            className="formElement"
            placeholder="Class A acceptance"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsB"
            type="number"
            className="formElement"
            placeholder="Class B points"
          />
          <input
            name="notB"
            type="text"
            className="formElement"
            placeholder="Class B acceptance"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsC"
            type="number"
            className="formElement"
            placeholder="Class C points"
          />
          <input
            name="notC"
            type="text"
            className="formElement"
            placeholder="Class C acceptance"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsD"
            type="number"
            className="formElement"
            placeholder="Class D points"
          />
          <input
            name="notD"
            type="text"
            className="formElement"
            placeholder="Class D acceptance"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsE"
            type="number"
            className="formElement"
            placeholder="Class E points"
          />
          <input
            name="notE"
            type="text"
            className="formElement"
            placeholder="Class E acceptance"
          />
        </div>
        <div className="flex flex-row">
          <input
            name="pointsF"
            type="number"
            className="formElement"
            placeholder="Class F points"
          />
          <input
            name="notF"
            type="text"
            className="formElement"
            placeholder="Class F acceptance"
          />
        </div>
        <button
          type="submit"
          className="p-1 m-1 border-2 border-zinc-200 rounded-md"
        >
          Create Student
        </button>
      </form>
    </div>
  );
}
