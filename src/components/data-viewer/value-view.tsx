import './value-view.scss';
import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from './chevrons.tsx';
import { arrays_are_equal } from '../../utils/array-utils.ts';
import { is_link } from '../../utils/string-utils.ts';

/************ Main Component *****************/

export default function ValueView({value, curPathArr, levelContext, altName=""}) {
  const name='value-view';
  if (value == null || value == undefined) {
    return (<></>);
  }
  if (Array.isArray(value)) {
    return ( 
      <ArrayView arr={value} curPathArr={curPathArr} levelContext={levelContext} />
    );
  } else if (typeof value == "object") {
    return (
      <ObjButton obj_name={value.name ? value.name : altName} pathArr={curPathArr} levelContext={levelContext} />
    );
  }
  // Is primitive
  return (
    <div className={name}>
      <LeafView value={value} />
    </div>
  );
}

/************** Supporting components ***************************/

function ArrayView({arr, curPathArr, levelContext}) {
  const name='arr-view';
  const pathArrStr = JSON.stringify(curPathArr);
  if (!(pathArrStr in levelContext.openArrConfig)) {
    levelContext.openArrConfig[pathArrStr] = levelContext.defaultArrOpen;
  }
  const [open, setOpen] = useState<boolean>(levelContext.openArrConfig[pathArrStr]);

  const toggle = () => {
    levelContext.openArrConfig[pathArrStr] = !levelContext.openArrConfig[pathArrStr];
    setOpen(levelContext.openArrConfig[pathArrStr]);
  }

  if (open) {
    const arrayContent = arr.map((element, index) => 
        <li className={name + '-list-item'} key={index} value={element}>
          <ValueView value={element} curPathArr={[...curPathArr, index]} levelContext={levelContext} altName={String(index)} />
        </li>
    );
    return (
      <>
        <div className={name + "-chevron"}>
          <button className={name} onClick={toggle} >
            <ChevronUp />
          </button>
        </div>
        <div className={name + "-list"} >
          <ol>{arrayContent}</ol>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={name + "-chevron"}>
          <button className={name} onClick={toggle} >
            <ChevronDown />
          </button>
        </div>
      </>
    );
  }
}

export function LeafView({value}) {
  const name="leaf-view";

  if (is_link(value)) {
    return (
      <p className={name}>
        <LinkView value={value} />
      </p>
    );
  } else {
    return (<p className={name}>{value}</p>);
  }
}

function LinkView({value}) {
  const name = 'link-view';
  return (<a className={name} href={value}>{value}</a>);
}

function ObjButton({obj_name, pathArr, levelContext}) {
  const name='object-button';

  function handle_closing_click(event) {
    levelContext.setNextLevelConfig({...levelContext.nextLevelConfig,
                                     pathArr: null,
                                     nextLevelMarginTop: levelContext.nextLevelConfig.marginTop
                                    });
  }

  function handle_opening_click(event) {
    const offset = event.target.offsetTop - levelContext.dataViewerRef.current.offsetTop;
    const nextLevelMarginTop = levelContext.nextLevelConfig.adjustedMarginTop + offset;
    levelContext.setNextLevelConfig({...levelContext.nextLevelConfig,
                                     pathArr: pathArr,
                                     nextLevelMarginTop: nextLevelMarginTop
                                    });
  }

  if (arrays_are_equal(pathArr, levelContext.nextLevelConfig.pathArr)) {
    return (
      <button className={name} onClick={handle_closing_click} >
        <span className={name + "-name"}>{obj_name}</span>
        <ChevronLeft />
      </button>
    );
  } else {
    return (
      <button className={name} onClick={handle_opening_click} >
        <span className={name + "-name"}>{obj_name}</span>
        <ChevronRight />
      </button>
    );
  }
}
