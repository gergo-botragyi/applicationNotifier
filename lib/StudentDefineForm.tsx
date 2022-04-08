import Notification from "./NotificaionElement";
import Points from "./PointsElement";
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
    <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-zinc-200 flex-wrap md:w-fit w-2/3"
      >
        <div className="flex flex-row mb-1 justify-center items-center flex-wrap md:flex-nowrap mx-1">
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
        <div className="inputContainer">
          <Points Class="A"/>
          <Notification Class="A"/>
        </div>
        <div className="inputContainer">
          <Points Class="B"/>
          <Notification Class="B"/>
        </div>
        <div className="inputContainer">
          <Points Class="C"/>
          <Notification Class="C"/>
        </div>
        <div className="inputContainer">
          <Points Class="D"/>
          <Notification Class="D"/>
        </div>
        <div className="inputContainer">
          <Points Class="E"/>
          <Notification Class="E"/>
        </div>
        <div className="inputContainer">
          <Points Class="F"/>
          <Notification Class="F"/>
        </div>
        <button
          type="submit"
          className="p-1 m-1 border-2 border-zinc-200 rounded-md"
        >
          Create Student
        </button>
      </form>
  );
}
