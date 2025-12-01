// https://leetcode.com/problems/insert-interval/description/
// 57. Insert Interval
// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
// Return intervals after the insertion.
// Note that you don't need to modify intervals in-place. You can make a new array and return it.
function insert(intervals, newInterval) {
    var result = [];
    for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
        var interval = intervals_1[_i];
        if (interval[1] < newInterval[0]) {
            result.push(interval);
        }
        else if (interval[0] > newInterval[1]) {
            result.push(newInterval);
            newInterval = interval;
        }
        else {
            newInterval = [Math.min(interval[0], newInterval[0]), Math.max(newInterval[1], interval[1])];
        }
    }
    result.push(newInterval);
    return result;
}
console.log(insert([
    [1, 3],
    [6, 9],
], [2, 5]));
