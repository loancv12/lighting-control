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
