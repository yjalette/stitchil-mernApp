import { getName, getCode } from 'country-list';

export const getCountryName = code => getName(code);

export const getCountryCode = country => getCode(country);