import { graphql, useLazyLoadQuery } from "react-relay";
import type {allElementsSearchQuery as AllElementsQueryType} from './__generated__/AllElementsSearchQuery.graphql';
import DataViewer from '../data-viewer/data-viewer.tsx';

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
  const data = useLazyLoadQuery<AllElementsQueryType>(
    AllElementsQuery,
    {}
  );
  return (
    <DataViewer data={data} />
  );
}
