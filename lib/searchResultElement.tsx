export default function ResultElement({
  Class,
  searchResult,
}: {
  Class: string;
  searchResult: any;
}) {
  return (
    <div className="flex justify-between">
      <div className="searchResultElement border-l-[1px]">{Class}</div>
      <div className="searchResultElement">
        {searchResult[`points${Class}`]}
      </div>
      <div className="searchResultElement justify-center items-center">
        {searchResult[`not${Class}`]}
      </div>
    </div>
  );
}
