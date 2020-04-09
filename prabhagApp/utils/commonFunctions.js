import { createStructuredSelector } from 'reselect';

export function currencyInIndiaFormat(x) {
  if (!x && x !== 0) return;
  x = x || '0';
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != '') lastThree = `,${lastThree}`;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}

export function restrictSpecialCharacter(text) {
  if (!text) return true;
  const regex = new RegExp('^[^!-\\/:-@\\[-`{-~ ]+$');
  return regex.test(text);
}

export function checkForNumber(text) {
  if (!text) return true;
  const regex = new RegExp('^[0-9]+$');
  return regex.test(text);
}

export function checkForAlphaNumeric(text) {
  if (!text) return true;
  const regex = new RegExp('^[0-9a-zA-Z ]+$')
  // const regex = new RegExp('^\w+$')
  // const regex = new RegExp('^[\w]|_+$')
  return regex.test(text);
}

export function getNumberInRupeeFormat(num) {
  if (!num) return '--';
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    style: 'currency',
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(num);
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function emailValidator(text = '') {
  if (!text) return;
  return emailRegex.test(text.toLowerCase());
}

const phoneRegex = /^[0-9]{10}$/;
export function phoneValidator(text = '') {
  if (!text) return;
  return phoneRegex.test(text.toLowerCase());
}

export function usernameValidator(text = '') {
  return phoneValidator(text) || emailValidator(text);
}

export function mapDispatchToPropsCreator(obj) {
  return dispatch =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = (...args) => dispatch(value(...args));
      return acc;
    }, {});
}

export function createStructuredSelectorCreator(obj) {
  return createStructuredSelector(
    Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value();
      return acc;
    }, {}),
  );
}

export function truncateString(data, length) {
  if (typeof data !== 'string' && !(data instanceof String)) {
    return data;
  }

  if (data.length <= length) {
    return data;
  }

  return `${data.slice(0, length).trim()}...`;
}

// export function isNullish(value) {
//   return value === undefined || value === null || value !== value;
// }
