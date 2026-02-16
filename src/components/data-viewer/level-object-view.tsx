import { useState, useEffect, useRef } from 'react';
import './level-object-view.scss';
import ValueView from './value-view.tsx';

/*********** Helper functions ***************/

function deref_json_obj(json_obj: Object, path_arr: (string|number)[]) {
  return path_arr.reduce((output_obj, element) => output_obj[element], json_obj);
}

/*********** Main component ******************/

export default function LevelObjectView({data, defaultArrOpen, marginTop=0}) {
  // Styles is passed in to allow external configuration.
  const name : string = 'level-object-view';
  const openObjPad = 20;
  const [nextLevelConfig, setNextLevelConfig] = useState({pathArr: null,
                                                          marginTop: marginTop,
                                                          adjustedMarginTop: marginTop - openObjPad,
                                                          nextLevelMarginTop: marginTop });
  const dataViewerRef = useRef(null);  // Allows for access top margin of the div.
  const openArrConfig = useRef(null);  // Keeps track of whether arrays are open or closed.
  const levelContext = {nextLevelConfig: nextLevelConfig,
                        setNextLevelConfig: setNextLevelConfig,
                        dataViewerRef: dataViewerRef,
                        openArrConfig: openArrConfig,
                        defaultArrOpen: defaultArrOpen};

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
  const thisLevelStyle = {marginTop: marginTop};
  if (nextLevelConfig.pathArr == null || nextLevelConfig.pathArr.length == 0) {
    return (
      <div className={name} ref={dataViewerRef} style={thisLevelStyle}>
        {objectContent}
      </div>
    );
  } else {
    const nextLevelStyle = {marginTop: nextLevelConfig.nextLevelMarginTop};
    return (
      <>
        <div className={name} ref={dataViewerRef} style={thisLevelStyle}>
          {objectContent}
        </div>
        <LevelObjectView data={deref_json_obj(data, nextLevelConfig.pathArr)} marginTop={nextLevelConfig.nextLevelMarginTop} />
      </>
    );
  }
}

/***************** Supporting components ********************/

function KeyView({value}) {
  const name='key-view';
  return (<p className={name}>{value}</p>);
}
