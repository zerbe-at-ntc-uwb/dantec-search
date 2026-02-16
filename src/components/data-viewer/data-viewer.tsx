import './data-viewer.scss';
import { DataViewerError } from './errors.ts';
import LevelObjectView from './level-object-view.tsx';
import { LeafView } from './value-view.tsx';


/*********** Component functions ******************/
export default function DataViewer({data, obj_name=""}) {
  // Styles is passed in to allow external configuration.
  const name : string = 'data-viewer';

  if (data == null || data == undefined) { return (<></>); }
  if (Array.isArray(data)) {
    data[obj_name] = data;
  }
  if (typeof data == "object") {
    return (
      <div className={name}>
        <LevelObjectView data={data} />
      </div>
    );
  } else { // Is primitive.
    return (
      <div className={name}>
        <LeafView value={data} />
      </div>
    );
  }
}
