export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitWords = (string) => {
  return string.split("_").join(" ");
};
