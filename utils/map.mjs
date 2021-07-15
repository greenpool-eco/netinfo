import { readFile } from "fs/promises";

export function map(mapper) {
    return readFile("/dev/stdin", "utf-8")
        .then(JSON.parse)
        .then(mapper)
        .then(JSON.stringify)
        .then(console.log);
}
