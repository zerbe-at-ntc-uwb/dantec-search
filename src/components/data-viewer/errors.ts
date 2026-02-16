/* ERROR HANDLING. */

export class DataViewerError extends Error {
  /* Custom error for handling non-existing paths. */
  constructor(msg: string) {
    super(msg);
    this.name = "DataViewerError";
    Object.setPrototypeOf(this, DataViewerError.prototype);
  }
}

export class NoJSONPathError extends DataViewerError {
  /* Custom error for handling non-existing paths. */
  constructor(path: string) {
    super("JSON object does not have the path " + path);
    this.name = "NoJSONPathError";
    Object.setPrototypeOf(this, NoJSONPathError.prototype);
  }
}
