#!/usr/bin/env node

import mapper from "./mappers/chianetspace.mapper.mjs";
import streamToString from "./utils/stream-to-string.mjs";

streamToString(process.stdin)
    .then(JSON.parse)
    .then(mapper)
    .then(JSON.stringify)
    .then(console.log)
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    })
