import StudentDefineForm from "../lib/StudentDefineForm";
import StudentSearchForm from "../lib/SearchForm";
import FillDatabaseInput from "../lib/fillDatabase";

export default function Home() {
  return (
    <div>
      <StudentDefineForm />
      <StudentSearchForm />
      <FillDatabaseInput />
    </div>
  );
}
