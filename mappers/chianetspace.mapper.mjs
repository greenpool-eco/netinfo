const parseSymbol = (symbol) => {
  const [first, last] = symbol.split("");

  return [first, "i", last].join("").toLowerCase();
};

const chianetspaceMapper = (source) => {
  const { netSpace, chiaPrice, lastUpdateDate } = source;

  return {
    lastUpdate: lastUpdateDate,
    price: chiaPrice,
    netSpace: {
      value: netSpace.largestWholeNumberDecimalValue,
      unit: parseSymbol(netSpace.largestWholeNumberDecimalSymbol),
    },
    chances: 4608,
  };
};

export default chianetspaceMapper;
