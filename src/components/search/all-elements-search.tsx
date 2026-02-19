import { graphql, useLazyLoadQuery } from "react-relay";
import type {allElementsSearchQuery as AllElementsQueryType} from './__generated__/AllElementsSearchQuery.graphql';
import DataViewer from '../data-viewer/data-viewer.tsx';
import './all-elements-search.scss';

const AllElementsQuery = graphql`
  query allElementsSearchQuery{
    elements {
      id
      sourceRepo
      name
      appearance
      atomicMass
      boil
      category
      color
      density
      discoveredBy
      melt
      molarHeat
      namedBy
      number
      period
      phase
      source
      spectralImg
      summary
      symbol
      xpos
      ypos
      shells
    }
  }
`;

export default function AllElementsSearch() {
  const name = "all-elements-search";
  const data = useLazyLoadQuery<AllElementsQueryType>(
    AllElementsQuery,
    {}
  );
  return (
    <div className={name}>
      <DataViewer data={data} />
    </div>
  );
}
