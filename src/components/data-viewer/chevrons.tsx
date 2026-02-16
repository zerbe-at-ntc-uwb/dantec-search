import chevron_down from './assets/chevron-down-svgrepo-com.svg'
import chevron_left from './assets/chevron-left-svgrepo-com.svg'
import chevron_right from './assets/chevron-right-svgrepo-com.svg'
import chevron_up from './assets/chevron-up-svgrepo-com.svg'


export function ChevronDown() {
  return <img className="chevron-down" src={chevron_down} className="chevron-down" alt="Downward chevron."/>;
}

export function ChevronLeft() {
  return <img className="chevron-left" src={chevron_left} className="chevron-left" alt="Leftward chevron."/>;
}

export function ChevronRight() {
  return <img className="chevron-right" src={chevron_right} className="chevron-right" alt="Rightward chevron."/>;
}

export function ChevronUp() {
  return <img className="chevron-up" src={chevron_up} className="chevron-up" alt="Upward chevron." />;
}

