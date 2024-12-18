// 57. Insert Interval

function insert(intervals: number[][], newInterval: number[]): number[][] {
  let result: number[][] = [];

  for (let interval of intervals) {
    if (interval[1] < newInterval[0]) {
      result.push(interval);
    } else if (interval[0] > newInterval[1]) {
      result.push(newInterval);
      newInterval = interval;
    } else {
      newInterval = [Math.min(interval[0], newInterval[0]), Math.max(newInterval[1], interval[1])];
    }
  }
  result.push(newInterval);
  return result;
}

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5],
  ),
);
