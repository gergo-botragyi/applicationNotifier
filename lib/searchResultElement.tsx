export default function ResultElement({
  Class,
  searchResult,
}: {
  Class: string;
  searchResult: any;
}) {
  return (
    <div className="flex justify-between">
      <div>{Class}</div>
      <div>{searchResult[`points${Class}`]}</div>
      <div>{searchResult[`not${Class}`]}</div>
    </div>
  );
}
