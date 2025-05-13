export const tooltip = function (text: string, length: number) {
  if (!text) {
    return "";
  }
  return text.length > length ? text : "";
};
