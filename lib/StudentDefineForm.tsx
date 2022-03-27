export default function StudentDefineForm() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const q = event.target.id.value;
    const params = new URLSearchParams({ q });
    const search = await fetch("/api/searchStudents?" + params);
    const searchResult = await search.json();
    if (searchResult.student[0] !== undefined) {
      return;
    }

    const res = await fetch("/api/students", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" type="text" id="id" />
      <input name="name" type="text" />
      <input name="class" type="text" />
      <input name="points" type="text" />

      <button type="submit">Create Student</button>
    </form>
  );
}
