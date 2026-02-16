import { useState, useEffect, useRef } from 'react';
import './level-object-view.scss';
import ValueView from './value-view.tsx';

/*********** Helper functions ***************/

function deref_json_obj(json_obj: Object, path_arr: (string|number)[]) {
  return path_arr.reduce((output_obj, element) => output_obj[element], json_obj);
}

/*********** Main component ******************/

export default function LevelObjectView({data, defaultArrOpen}) {
  // Styles is passed in to allow external configuration.
  const name : string = 'level-object-view';
  const [nextLevel, setNextLevel] = useState<(string|number)[]>(null);
  const openObjRef = useRef(null);
  const dataViewerRef = useRef(null);
  const openArrConfig = useRef({});
  const openObjPad = 20;  // Vertical spacing to pull up the div for the open object.
  const levelContext = {nextLevel: nextLevel, setNextLevel: setNextLevel, openObjRef: openObjRef,
                        openArrConfig: openArrConfig, defaultArrOpen: defaultArrOpen};


  const objectContent = Object.keys(data).map((key) => {
    if (data[key] == null || data[key] == undefined) {
      return (<div key={key}></div>);
    }
    return (
    <div className='object-pair' key={key} value={data[key]}>
      <KeyView value={key} />
      <ValueView value={data[key]} curPathArr={[key]} levelContext={levelContext} />
    </div>
    );
  });
  if (nextLevel == null || nextLevel.length == 0) {
    return (
      <div className={name}>
        {objectContent}
      </div>
    );
  } else {
    // Needs to be defered as the open element has not been rendered yet.
    const calc_top_margin = () => { return dataViewerRef.current.top - openObjRef.current.top - openObjPad; }
    return (
      <>
        <div className={name} ref={dataViewerRef}>
          {objectContent}
        </div>
        <LevelObjectView style={{marginTop: 10}} data={deref_json_obj(data, nextLevel)} />
      </>
    );
  }
}

/***************** Supporting components ********************/

function KeyView({value}) {
  const name='key-view';
  return (<p className={name}>{value}</p>);
}
