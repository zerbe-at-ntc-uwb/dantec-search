export function arrays_are_equal(a: any[], b: any[]) {
  if (a == null || b == null) {
    return false;
  }
  return (a.length === b.length && a.every((element, index) => element === b[index]));
}
