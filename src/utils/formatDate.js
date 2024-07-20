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
  date = new Date(date);

  date.setHours(23, 59, 59, 999);

  const solveDate = date.toISOString();

  return solveDate;
}

export function makeLowerRangeAndToISO(date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);

  const solveDate = date.toISOString();

  return solveDate;
}

export function getDateNow() {
  const today = new Date();

  return {
    startOfDay: makeLowerRangeAndToISO(today),
    endOfDay: makeUpperRangeAndToISO(today),
  };
}

export function getDateNowAnd15Ago() {
  const today = new Date();

  const date15DaysAgo = sub(today, {
    days: 15,
  });

  return {
    startDate: makeLowerRangeAndToISO(date15DaysAgo),
    endDate: makeUpperRangeAndToISO(today),
  };
}
