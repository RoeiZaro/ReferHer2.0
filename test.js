const isNumberZero = (number, x) => {
  number--;
  x++;
  if (number === 0) {
    return x;
  } else return isNumberZero(number, x);
};
console.log(isNumberZero(5, 0));
