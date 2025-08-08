---
title: "Understanding JavaScript Methods (Cheat Sheet)"
publishDate: "11 April 2024"
updatedDate: "11 April 2024"
description: "JavaScript offers versatile methods for data manipulation, object interaction, and operations. Learn how these methods streamline development."
heroImage: "/assets/images/js-methods-cheet-sheet.webp"
coverImage:
  src: "/assets/images/js-methods-cheet-sheet.webp"
  alt: "ddd"
tags: ["begginer", "Array Methods", "String Manipulation"]
---

## Your Go-To Resource for Everyday Coding

As developers immersed in the world of JavaScript, we often find ourselves navigating through an extensive toolkit of methods designed to streamline our coding tasks. From array manipulation to string operations and beyond, understanding these methods is not just a skill—it's a necessity for efficient development.

In this comprehensive guide, we'll delve into the rich assortment of JavaScript methods, categorizing them based on functionality and purpose. Whether you're a seasoned coder looking for a quick refresher or a beginner eager to explore the possibilities, consider this article your go-to resource—a cheat sheet meticulously crafted for everyday use.

## Exploring JavaScript Array and String Methods

JavaScript offers a robust set of methods that can be applied to arrays and strings, allowing developers to manipulate and transform data efficiently. Understanding these methods and how they can be categorized is essential for mastering JavaScript programming. In this article, we'll explore different groups of methods and provide insights into their usage.

### Groups of Methods

JavaScript methods can be categorized into several groups based on their functionality and purpose:

1. **Mutating Array Methods**

   These methods directly modify the existing array:

```
push()
pop()
shift()
unshift()
splice()
reverse()
sort()
fill()
forEach()
```

2. **Non-Mutating Array Methods**

   These methods create and return a new array without modifying the original array:

```
concat()
slice()
filter()
map()
reduce()
every()
some()
find()
findIndex()
join()
flat()
flatMap()
toString()
valueOf()
```

3. **Element-Oriented Array Methods**

   These methods operate on individual elements of an array or perform operations on each element:

```
indexOf()
lastIndexOf()
includes()
forEach()
reduce()
find()
findIndex()
every()
some()
```

4. **String Methods**

   These methods are specific to string manipulation:

```
charAt()
charCodeAt()
concat()
split()
substring()
slice()
trim()
toUpperCase()
toLowerCase()
```

5. **Checking Methods**

   These methods are used for value or condition checks:

```
indexOf()
lastIndexOf()
includes()
startsWith()
endsWith()
every()
some()
isNaN()
isFinite()
```

7. **Transforming Methods**

   These methods transform data or content:

```
map()
filter()
reduce()
flatMap()
toUpperCase()
toLowerCase()
```

8. **Setting Methods**

   These methods modify or set data in arrays:

```
push()
pop()
shift()
unshift()
splice()
fill()
```

### Understanding the Table

Whether you're debugging a complex algorithm or crafting elegant solutions, let this table serve as your trusted companion—a comprehensive resource tailored for everyday coding challenges.
Below is a summarizing key JavaScript methods based on their functionality:

```
| Method                | Type         | Arguments type                   | Returns      | Modifies Existing Object? | Description                                                                                            | In-Place Modification vs. Returning a New Object | Use Cases                                           | Tags                                                 |
| --------------------- | ------------ | -------------------------------- | ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | --------------------------------------------------- | ---------------------------------------------------- |
| concat                | Array        | Array                            | New Array    | No                        | Concatenates arrays or strings.                                                                        | Returns a new concatenated array/string          | Combining arrays or strings                         | Non-Mutating Array Methods                           |
| splice                | Array        | Number and Optional Elements     | Array        | Yes                       | Adds/removes (replace) elements from an array.                                                         | Returns removed elements as an array             | Modifying arrays by adding/removing elements        | Mutating Array Methods                               |
| push                  | Array        | Any                              | Number       | Yes                       | Adds new elements to the end of an array.                                                              | Returns the new length of the array              | Appending elements to arrays                        | Mutating Array Methods, Setting Methods              |
| pop                   | Array        | None                             | Any          | Yes                       | Removes the last element of an array.                                                                  | Returns the removed element                      | Removing and retrieving the last element            | Mutating Array Methods                               |
| shift                 | Array        | None                             | Any          | Yes                       | Removes the first element of an array.                                                                 | Returns the removed element                      | Removing and retrieving the first element           | Mutating Array Methods                               |
| unshift               | Array        | Any                              | Number       | Yes                       | Adds new elements to the beginning of an array                                                         | Returns the new length of the array              | Prepending elements to arrays                       | Mutating Array Methods, Setting Methods              |
| reverse               | Array        | None                             | Array        | Yes                       | Reverses the order of elements in an array.                                                            | Returns the reversed array                       | Reversing the order of array elements               | Mutating Array Methods                               |
| sort                  | Array        | Optional Compare Function        | Array        | Yes                       | Sorts the elements of an array. Default ascending.                                                     | Returns the sorted array                         | Sorting arrays based on custom criteria             | Mutating Array Methods                               |
| join                  | Array        | String                           | String       | No                        | Joins all elements of an array into a string.                                                          | Returns a new string                             | Creating CSV strings, custom output formats         | Non-Mutating Array Methods                           |
| slice                 | Array/String | Number                           | Array/String | No                        | Extracts a portion of an array or string.                                                              | Returns a new sliced array/string                | Extracting subarrays or substrings                  | Non-Mutating Array Methods                           |
| indexOf               | Array        | Any                              | Number       | No                        | Returns the first index of a specified value.                                                          | Returns the index or -1 if not found             | Searching for values in arrays or strings           | Element-Oriented Array Methods, Checking Methods     |
| lastIndexOf           | Array        | Any                              | Number       | No                        | Returns the last index of a specified value.                                                           | Returns the last index or -1 if not found        | Finding the last occurrence of a value              | Element-Oriented Array Methods                       |
| includes              | Array        | Any                              | Boolean      | No                        | Checks if an array includes a value.                                                                   | Returns true or false                            | Checking for presence of values                     | Element-Oriented Array Methods, Checking Methods     |
| filter                | Array        | Callback Function                | Array        | No                        | Filters elements based on a condition.                                                                 | Returns a new array with filtered elements       | Filtering arrays based on conditions                | Element-Oriented Array Methods, Transforming Methods |
| map                   | Array        | Callback Function                | Array        | No                        | Transforms each element of an array.                                                                   | Returns a new array with transformed elements    | Transforming arrays using mapping functions         | Element-Oriented Array Methods, Transforming Methods |
| flatMap               | Array        | Callback Function                | Array        | No                        | Maps each element of an array and flattens the result.                                                 | Returns a new array with flattened elements      | Flattening nested arrays                            | Element-Oriented Array Methods, Transforming Methods |
| forEach               | Array        | Callback Function                | Array        | Yes                       | Executes a provided function for each element.                                                         | Returnes changed array                           | Iterating over arrays without returning a new array | Element-Oriented Array Methods                       |
| toString              | Array        | None                             | String       | No                        | Returns a string representing the array elements.                                                      | -                                                | Converting array to string representation            | Array Methods                                        |
| some                  | Array        | Callback Function                | Boolean      | No                        | Checks if at least one element in the array satisfies the condition specified by the callback.        | Returns true if any element satisfies the condition | Checking if any element meets a condition            | Element-Oriented Array Methods, Checking Methods     |
| every                 | Array        | Callback Function                | Boolean      | No                        | Checks if all elements in the array satisfy the condition specified by the callback.                   | Returns true if all elements satisfy the condition | Checking if all elements meet a condition             | Element-Oriented Array Methods, Checking Methods     |
| fill                  | Array        | Any and Optional Start/End Index | Array        | Yes                       | Fills elements of an array with a static value optionally within a specified range.                    | Returns the modified array                       | Filling array elements with a static value           | Mutating Array Methods                               |
| charAt                | String       | Number                           | String       | No                        | Returns the character at a specified index.                                                            | Returns the character                            | Accessing characters in strings                     | String Methods                                       |
| toUpperCase           | String       | None                             | String       | No                        | Converts a string to uppercase.                                                                        | -                                                | Converting strings to uppercase                     | String Methods, Transforming Methods                 |
| toLowerCase           | String       | None                             | String       | No                        | Converts a string to lowercase.                                                                        | -                                                | Converting strings to lowercase                     | String Methods, Transforming Methods                 |
| trim                  | String       | None                             | String       | No                        | Removes whitespace from both ends of a string.                                                         | -                                                | Removing leading and trailing whitespace            | String Methods                                       |
| split                 | String       | Separator (String or RegExp)     | Array        | No                        | Splits a string into an array of substrings based on a specified separator.                            | Returns a new array of substrings                | Parsing string input, tokenizing text               | String Methods                                       |
| parseInt              | Number/String| String                           | Number       | No                        | Parses a string argument and returns an integer.                                                       | -                                                | Parsing strings to integers                         | Number/String Methods                                 |
| isNaN                 | Number       | Any                              | Boolean      | No                        | Determines whether a value is NaN (Not-a-Number).                                                      | Returns true or false                            | Checking if a value is NaN                          | Checking Methods                                     |
| isFinite              | Number       | Any                              | Boolean      | No                        | Checks if a value is a finite number.                                                                  | Returns true or false                            | Checking if a value is finite                       | Checking Methods                                     |


```

## Conclusion

Understanding JavaScript methods and their categorization is crucial for effectively leveraging the language's capabilities in data manipulation and transformation. Whether you're working with arrays, strings, or objects, knowing which methods to use based on specific requirements can greatly enhance your development workflow.

The provided table serves as a valuable cheat sheet for quick reference during JavaScript programming. By utilizing this table, you can streamline your coding process and enjoy the efficiency that comes with leveraging these powerful methods. Happy coding and enjoy exploring the diverse functionalities that JavaScript offers!
