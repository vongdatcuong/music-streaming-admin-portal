// Make "options" for the <Select /> component out of a dictionary: string -> number | string
// e.g: from: { 'A': 1, 'B': 2, 'C': 3}
// to: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }, { label: 'C', value: 3 }]
// options:
//    - enumMap?: Map to transform enum values to respective labels
//    - exceptions?: enum values that will be excluded from the result
//    - useValueAsLabel?: use enum values as labels
// TODO: Add unit tests
export const makeOptionsFromDictionary = <
  T extends Record<string, number | string>
>(
  enumeration: T,
  options?: {
    enumerationMap?: Record<number | string, string>;
    exceptions?: (number | string)[];
    useValueAsLabel?: boolean;
  }
) => {
  const { enumerationMap, exceptions, useValueAsLabel = false } = options ?? {};

  return Object.keys(enumeration)
    .filter(
      (key) => isNaN(Number(key)) && !exceptions?.includes(enumeration[key])
    )
    .map((key) => ({
      label: enumerationMap
        ? enumerationMap[enumeration[key]]
        : useValueAsLabel
        ? enumeration[key]
        : key,
      value: enumeration[key],
    }));
};
