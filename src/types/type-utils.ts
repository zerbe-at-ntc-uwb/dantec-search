import PathArr from './path-array-type.ts';

/*************** Primitive type checking. ******************/

export function is_string(data: unknown) : data is string {
  /* Function to test if data is a string.
   * Source - https://stackoverflow.com/a
   * Posted by AKX, modified by community. See post 'Timeline' for change history
   * Retrieved 2025-12-18, License - CC BY-SA 4.0
  */
  return typeof data === 'string';
};


export function is_number(data: unknown) : data is number {
  /* Function to test if data is a number.*/
  return typeof data === 'number' && isFinite(data);
}


export function is_boolean(data: unknown) : data is boolean {
  /* Function to test if data is a boolean.*/
  return (data === true || data === false);
}


export function is_undefined(data: unknown) : data is undefined {
  /* Function to test if data is undefined.*/
  return data == undefined;
}

export function is_integer(data: unknown) : boolean {
  /* Function returning true if data is an integer or false otherwise. */
  return Number.isInteger(is_integer);
}

/************** Custom type checking *****************/

export function is_path_array(data: unknown) : boolean {
  /* Function to test if data is undefined.*/
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every((element) => {
    return is_string(element) || is_integer(element);
  });
}
