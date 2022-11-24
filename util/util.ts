export const formatStringToPrice = (string: string) => {
  if (string) {
    const price = string
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1,');
    return '$' + price.split('').reverse().join('').replace(/^[,]/, '');
  }
  return '';
};
