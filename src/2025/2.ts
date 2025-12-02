const TEST_INPUT = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`;

const INPUT = `
16100064-16192119,2117697596-2117933551,1-21,9999936269-10000072423,1770-2452,389429-427594,46633-66991,877764826-877930156,880869-991984,18943-26512,7216-9427,825-1162,581490-647864,2736-3909,39327886-39455605,430759-454012,1178-1741,219779-244138,77641-97923,1975994465-1976192503,3486612-3602532,277-378,418-690,74704280-74781349,3915-5717,665312-740273,69386294-69487574,2176846-2268755,26-45,372340114-372408052,7996502103-7996658803,7762107-7787125,48-64,4432420-4462711,130854-178173,87-115,244511-360206,69-86
`;

export function solve_2025_2() {
  const input = INPUT;
  const ids = input.split(',');

  const invalidIds: number[] = [];

  for (const id of ids) {
    const [startRange, endRange] = id.split('-').map(Number);
    for (let i = startRange; i <= endRange; i++) {
      if (containsRepeatedSequence(i.toString())) {
        invalidIds.push(i);
      }
    }
  }

  return invalidIds.reduce((acc, curr) => acc + curr, 0);
}

const containsRepeatedSequence = (id: string) => {
  // Check every sequence of the id until the half way
  for (let i = 1; i <= id.length / 2; i++) {
    // Check that a sequence can be repeated fully in the id 
    // ie. 123 cannot be repeated in 1231234
    if (id.length % i !== 0) continue;

    // Get the sequence
    const sequence = id.slice(0, i);

    // Repeat the sequence until the id length
    const repeatedSequence = sequence.repeat(id.length / i);

    // Check if the repeated sequence is the same as the id
    if (repeatedSequence === id) {
      return true;
    }
  }

  return false;
}