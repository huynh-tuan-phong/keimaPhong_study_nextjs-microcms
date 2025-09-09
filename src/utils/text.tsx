export const truncateChars = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export const truncateWords = (str: string, numWords: number): string => {
  const words = str.trim().split(/\s+/);
  if(words.length <= numWords) return str;
  return words.slice(0, numWords).join(" ") + "...";
}
