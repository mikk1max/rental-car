export const convertStrToArray = (str) => {
  return str.split(",");
};

export const convertBigNumberToStr = (num) => {
  const numStr = String(num);
  const divisor = Number("1" + "0".repeat(numStr.length - 1));
  return String(num / divisor).replace(".", " ");
};
