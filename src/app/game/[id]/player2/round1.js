export const round1 = [
  {
    id: 1,
    question: "Write a code to reverse a string?",
    template: {
      javascript: `function reverse_string(string) {\n\n  // Write your code here\n\n    return revStr;\n}`,
      c: `#include <stdio.h>\n\nvoid reverse_string(char *str) {\n\n // write your code here\n\n return revStr\n}\n`,
      python: `def reverse_string(string):\n\n  #write your code here\n\n  return revStr`,
    },
    test_cases: [
      { input: '"Hello World!"', output: '"!dlroW olleH"' },
      {
        input: '"We got good weather today?"',
        output: '"?yadot re_HTew doog tog eW"',
      },
    ],
    check_fn: `reverse_string`,
  },
]
