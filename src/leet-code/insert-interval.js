"use strict";
// 57. Insert Interval
Object.defineProperty(exports, "__esModule", { value: true });
function insert(intervals, newInterval) {
  var result = [];
  for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
    var interval = intervals_1[_i];
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
