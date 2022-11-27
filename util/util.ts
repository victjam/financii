import moment from 'moment';

export const formatToPrice = (price: number) => {
  return '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (date: string, format: string = 'MMM DD, YYYY') => {
  return moment(date).format(format);
};

export const upperCaseFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
