import { parse } from 'date-fns';

export const timeEpoch = (value: string)  => parse(value, 'dd-MM-yyyy', new Date).valueOf();