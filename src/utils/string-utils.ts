export function is_link(value: string) : boolean {
  return String(value).startsWith("http");
}
