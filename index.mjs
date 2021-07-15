#!/usr/bin/env node

import fs from "fs/promises";
import https from "https";


class Endpoint {
    get endpoint() {
        throw new Error("Need to define");
    }

    request() {
        return new Promise((resolve, reject) => {
            https
                .get(this.endpoint, (res) => {
                    const chunks = [];

                    res.on("data", (data) => {
                        chunks.push(data);
                    });

                    res.on("end", () => {
                        resolve(JSON.parse(Buffer.concat(chunks).toString()));
                    });
                })
                .on("error", reject);
        });
    }
}

class ChiaNetSpaceEndpoint extends Endpoint {
    endpoint = "https://chianetspace.azurewebsites.net/data/summary";

    parseSymbol(symbol) {
        const [first, last] = symbol.split("");

        return [first, "i", last].join("").toLowerCase();
    }

    async load() {
        const response = await this.request();

        const {netSpace, chiaPrice, lastUpdateDate} = response;

        return {
            lastUpdate: lastUpdateDate,
            price: chiaPrice,
            netSpace: {
                value: netSpace.largestWholeNumberDecimalValue,
                unit: this.parseSymbol(netSpace.largestWholeNumberDecimalSymbol),
            },
            chances: 4608,
        };
    }
}

class LoadInfoService {
    endpoints = [new ChiaNetSpaceEndpoint()];

    async getDefault() {
        try {
            const file = await fs.readFile("./docs/summary.json");

            return file.toString()
        } catch (error) {
            return {
                lastUpdate: new Date(0).toISOString(),
                price: 200,
                netSpace: {
                    value: 31.9,
                    unit: "eib",
                },
                chances: 4608,
            }
        }

    };

    async load() {
        for (const endpoint of this.endpoints) {
            try {
                return await endpoint.load();
            } catch (error) {
                console.error(
                    `Net info service error [${endpoint.constructor.name}]: `,
                    error
                );
            }
        }

        return this.getDefault();
    }
}

const main = async () => {
    const service = new LoadInfoService();

    const info = await service.load();

    await fs.writeFile("./docs/summary.json", JSON.stringify(info));
};

main();
