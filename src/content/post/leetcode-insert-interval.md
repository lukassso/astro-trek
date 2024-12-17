---
title: "Insert Interval: A deep dive into a Common Coding Challenge"
publishDate: "16 April 2024"
updatedDate: "16 April 2024"
description: "Let's explore the solution for the Insert Interval problem, a popular and interesting coding challenge frequently encountered during coding interviews."
heroImage: "/assets/images/post_img2.svg"
coverImage:
  src: "/assets/images/post_img2.svg"
  alt: "ddd"
tags: ["intermediate", "Array Methods"]
---

Welcome to a deep dive into solving the "Insert Interval" ([LeetCode 57](https://leetcode.com/problems/insert-interval/description/)) problem, a common and intriguing challenge often encountered on the LeetCode coding platform.

This challenge will assess both your skill in working with arrays and your ability to manage tricky situations smoothly. Let's start exploring this problem step by step to solve it thoroughly and understand it completely.

## Introduction to the problem

This problem tests your ability to insert a new interval into a list of existing, non-overlapping intervals sorted by their start times while ensuring that the resultant list remains sorted and free of overlaps. Successfully solving this problem requires careful handling of array manipulation and edge cases. Let's explore it step by step and unravel effective strategies for tackling it.

> You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.
>
> Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).
>
> Return `intervals` after the insertion.
>
> Note that you don't need to modify `intervals` in-place. You can make a new array and return it.
>
> Example 1:
>
> ```
> Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
> Output: [[1,5],[6,9]]
> ```
>
> Example 2:
>
> ```
> Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
> Output: [[1,2],[3,10],[12,16]]
> ```
>
> Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
> Constraints:
>
> ```
> 0 <= intervals.length <= 104
> intervals[i].length == 2
> 0 <= starti <= endi <= 105
> intervals is sorted by starti in ascending order.
> newInterval.length == 2
> 0 <= start <= end <= 105
> ```

## Exploring various aproaches

To solve the "Insert Intervals" problem, we can consider the following approaches:

1. Linear scan with merge:

- Traverse through each interval in the list.

2. Binary search insertion

- Use binary search to find the correct position to insert the new interval based on its start time.

## Description of the solution

Let's find out a solution based on the linear scan approach:

```ts title='insert-interval.ts'
// Define a function named `insert` that takes `intervals` (an array of number arrays representing intervals)
// and `newInterval` (a number array representing the interval to be inserted).
function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Initialize an empty array `result` to store the resulting intervals after insertion.
  let result: number[][] = [];

  // Iterate through each `interval` in the `intervals` array.
  for (let interval of intervals) {
    // Check if the end of the current `interval` is less than the start of `newInterval`.
    if (interval[1] < newInterval[0]) {
      // If there's no overlap, add the current `interval` to `result`.
      result.push(interval);
    } else if (interval[0] > newInterval[1]) {
      // If all subsequent intervals will not overlap with `newInterval`,
      // add `newInterval` first followed by the current `interval`.
      result.push(newInterval);
      newInterval = interval; // Update `newInterval` to the current `interval`.
    } else {
      // If there's an overlap between `interval` and `newInterval`,
      // merge them by updating `newInterval`.
      newInterval = [
        Math.min(interval[0], newInterval[0]), // Start of the merged interval.
        Math.max(newInterval[1], interval[1]), // End of the merged interval.
      ];
    }
  }

  // Add the final `newInterval` (merged if necessary) to `result`.
  result.push(newInterval);

  // Return the `result` array containing the intervals after insertion.
  return result;
}
```

## Conclusion: Mastering the `insert` Function

To wrap up, the insert function is a useful tool for adding a new interval into a sorted list of non-overlapping intervals. By carefully going through each `interval` and deciding whether to merge or add based on the relationship with `newInterval`, this function ensures the resulting list remains sorted and without overlaps.

This problem not only tests your array manipulation skills but also challenges your ability to handle tricky situations smoothly. Becoming proficient in this solution requires skill in managing arrays and solving complex scenarios efficiently. By understanding and practicing with the insert function, you gain valuable insights for tackling similar problems in coding interviews and competitions.
