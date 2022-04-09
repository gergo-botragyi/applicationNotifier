import Notification from "./NotificaionElement";
import Points from "./PointsElement";
export default function StudentDefineForm() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const q = event.target.adminp.value;
    const res = await fetch("/api/checkPass", {
      method: "POST",
      body: JSON.stringify({ q }),
    });
    if (res.status != 200) {
      alert("Incorrect password! Please try again!");
      return;
    }

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
      if (result.ok) {
        alert("Successfully updated student in database!");
      }
    } else {
      const res = await fetch("/api/students", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await res.json();
      if (!result.ok) {
        alert(
          "There was a problem while creating the student in the database! Please try again!"
        );
        return;
      }
      alert("Successfully created student in database!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center text-zinc-200 flex-wrap md:w-fit w-2/3"
    >
      <div className="flex flex-row mb-1 justify-center items-center flex-wrap md:flex-nowrap mx-1 md:border-2 rounded-lg">
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
        <Points Class="A" />
        <Notification Class="A" />
      </div>
      <div className="inputContainer">
        <Points Class="B" />
        <Notification Class="B" />
      </div>
      <div className="inputContainer">
        <Points Class="C" />
        <Notification Class="C" />
      </div>
      <div className="inputContainer">
        <Points Class="D" />
        <Notification Class="D" />
      </div>
      <div className="inputContainer">
        <Points Class="E" />
        <Notification Class="E" />
      </div>
      <div className="inputContainer">
        <Points Class="F" />
        <Notification Class="F" />
      </div>
      <div className="inputContainer">
        <input
          type="password"
          id="adminp"
          placeholder="Admin Password"
          className="p-1 m-1 rounded-md text-black"
        />
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
