export const round1 = [
  {
    id: 1,
    question: "Write a code to reverse a string?",
    template: {
      javascript: `function reverse_string(string) {\n\n  // Write your code here\n\n    return revStr;\n}`,
      c: `#include <stdio.h>\n\nvoid reverse_string(char *str) {\n\n // write your code here\n\n return revStr\n}\n`,
      python: `def reverse_string(string):\n\n  #write your code here\n\n  return revStr`,
      java: `class ReverseString {\n\n  public static void main(String[] args) {\n\n    //write your code here\n\n    return revStr;\n  }\n}`,
    },
    test_cases: [
      { input: '"Hello World!"', output: '"!dlroW olleH"' },
      {
        input: '"We got good weather today?"',
        output: '"?yadot rehtaew doog tog eW"',
      },
    ],
    check_fn: `reverse_string`,
  },
  {
    id: 2,
    question: "Program to print half pyramid using *",
    template: {
      javascript: `function reverse_string(string) {\n\n  // Write your code here\n\n    return revStr;\n}`,
      c: `#include <stdio.h>\n\nvoid reverse_string(char *str) {\n\n // write your code here\n\n return revStr\n}\n`,
      python: `def reverse_string(string):\n\n  #write your code here\n\n  return revStr`,
      java: `class Main {\n\n  public static String HalfPyramid(String[] args) {\n\n    //write your code here\n\n    return revStr;\n  }\n}`,
    },
    test_cases: [
      {
        input: "5",
        output: "*\n* *\n* * *\n* * * *\n* * * * *",
      },
      {
        input: "3",
        output: "*\n* *\n* * *",
      },
    ],
    check_fn: `HalfPyramid`,
  },
];
