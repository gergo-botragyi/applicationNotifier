import StudentDefineForm from "../lib/StudentDefineForm";
import StudentSearchForm from "../lib/SearchForm";

export default function Home() {
  return (
    <div>
      <StudentDefineForm />
      <StudentSearchForm />
    </div>
  );
}
