const parseSymbol = (symbol) => {
  const [first, last] = symbol.split("");

  return [first, "i", last].join("").toLowerCase();
};

// parsing https://chianetspace.azurewebsites.net/data/summary
export const chianetspace = (source) => {
  const { netSpace, chiaPrice, lastUpdateDate } = source;

  return {
    lastUpdate: lastUpdateDate,
    price: chiaPrice,
    netSpace: {
      value: netSpace.largestWholeNumberDecimalValue,
      unit: parseSymbol(netSpace.largestWholeNumberDecimalSymbol),
    },
    // @link https://www.chia.net/assets/Chia-Business-Whitepaper-2021-02-09-v1.0.pdf page 9
    chances: 4608,
  };
};

export default chianetspace;
