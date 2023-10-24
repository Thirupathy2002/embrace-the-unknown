export const langOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
]

export const initialCode = {
  javascript: `function add(a, b) { 
  return a + b;
}`,

  python: `def add(a, b):
  return a + b`,

  c: `int add(int a, int b) {
    return a + b;
}
`,

  cpp: `int add(int a, int b) {
    return a + b;
}
`,

  java: `public class Main {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println(result);
    }
}`,
}

export const selectStyles = {
  control: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    minWidth: "150px",
    maxWidth: "fit-content",
    backgroundColor: "#161B22",
    color: "#dadada",
    margin: "5px 0",
    cursor: "pointer",
    border: "none",
    borderColor: isFocused ? "#dadada" : "#161B22",
  }),
  option: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#161B22",
    color: "#dadada",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#161B22",
    color: "#dadada",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#dadada",
  }),
}
