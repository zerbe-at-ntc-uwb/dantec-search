import { graphql, useLazyLoadQuery } from "react-relay";
import type {searchReseultsViewQuery as SearchResultsViewsQueryType} from './__generated__/SearchResultsViewQuery.graphql';
import DataViewer from '../data-viewer/data-viewer.tsx';

const SearchResultsViewQuery = graphql`
  query searchResultsViewhQuery($jsonQueryStr: String!){
    entries(jsonQueryStr: $jsonQueryStr) {
      entryId,
      results
    }
  }
`;

export default function SearchResultsView({query, setQueryCallback}) {
  const name: string = "search-results-view";
  const data = useLazyLoadQuery<SearchResultsViewQueryType>(
    SearchResultsViewQuery,
    {jsonQueryStr: JSON.stringify(query)}
  );
  console.log(data);
  const results = data["entries"].map((entry) => JSON.parse(entry.results));
  const buttonLabel = "Next " + String(query.pagination.page_size);

  function next() {
    const lastEntryId = data[data.length - 1].entryId;
    const newPagination = {...(query["pagination"]),
                           page_after_value: lastEntryId};
    setQueryCallback({...query, pagination: newPagination});
  }

  return (
    <div className={name} >
      <DataViewer data={results} />
      <button className={name + "-next-button"} onClick={next} >
        {buttonLabel}
      </button>
    </div>
  );
}
