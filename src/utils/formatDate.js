import { sub } from "date-fns";

export const onlyTime = (date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  const dateF = new Date(date);
  let formattedDate = Intl.DateTimeFormat("vi-VN", options).format(dateF);
  return formattedDate;
};

export const onlyDate = (date) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateF = new Date(date);
  let formattedDate = Intl.DateTimeFormat("vi-VN", options).format(dateF);
  return formattedDate;
};

export function makeUpperRangeAndToISO(date) {
  if (date instanceof Date) {
    date.setUTCHours(23, 59, 59, 999);

    const solveDate = date.toISOString();

    return solveDate;
  } else throw new Error("Input must be instance of Date");
}

export function makeLowerRangeAndToISO(date) {
  if (date instanceof Date) {
    date.setUTCHours(0, 0, 0, 0);

    const solveDate = date.toISOString();

    return solveDate;
  } else throw new Error("Input must be instance of Date");
}

export function getDateNow() {
  const today = new Date();
  // return today;
  return makeUpperRangeAndToISO(today);
}

export function getDateNowAnd15Ago() {
  const today = getDateNow();

  let date15DaysAgo = sub(today, {
    days: 15,
  });

  date15DaysAgo = makeLowerRangeAndToISO(date15DaysAgo);

  return { startDate: date15DaysAgo, endDate: today };
}
