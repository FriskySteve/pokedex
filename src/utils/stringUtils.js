export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitWords = (string) => {
  return string.split("_").join(" ");
};

export const darkBG =
  "dark:bg-zinc-800 dark:text-yellow-500 dark:placeholder-yellow-500";

export const darkBGCards =
  "dark:bg-zinc-700 dark:text-yellow-500 dark:placeholder-yellow-500";
