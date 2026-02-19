import React, {useRef} from 'react';
import { SearchImg } from './icons.tsx'
import './search-form.scss'

function SearchForm({setQueryCallback}) {
  const name = "search-form";
  const placeholders = useRef({});
  placeholders.elements = "Elemental symbols, like He or Cl, separated by a space."

  function postProcessElements(value: string) : string[] {
    return value.split(/\ /);
  }
  function create_query(formData) {
    const query = {query: {}, pagination: {}};
    query["query"]["results.material.elements"] = {all: postProcessElements(formData.get("elements"))};
    query["pagination"] =  {page_size: formData.get("page_size")};
    setQueryCallback(query);
  }

  return (
    <form className={name} action={create_query}>
      <span className={name + "-key"}>Elements:</span>
      <textarea className={name + "-field"} name="elements" autoFocus={true} required={true} placeholder={placeholders.elements}/>
      <br />
      <span className={name + "-key"}>Results per page:</span>
      <input className={name + "-field"} name="page_size" required={true} defaultValue={10} type="number"/>
      <br />
      <button className={name + "-submit-button"} type="submit">
        <SearchImg />
      </button>
    </form>
  );
}

export default React.memo(SearchForm)
