export const langOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  // { value: "java", label: "Java" },
  { value: "c", label: "C" },
]

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
