#!/usr/bin/env node

import * as mappers from "./mappers/index.mjs";
import { map } from "./utils/map.mjs";

const mapperName = process.argv[2];
if (!(mapperName in mappers)) {
    console.error("Please specify mapper name argument. Available: \n\t" + Object.keys(mappers).join("\n\t"));
    process.exit(-1);
}
if (process.isTTY) {
    console.error("Please provide stream input (JSON)");
    process.exit(-2);
}

await map(mappers[mapperName]);
