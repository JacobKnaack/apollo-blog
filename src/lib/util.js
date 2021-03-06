export const findKeyInArray = (args) => {
  for (let i = 0; i < args.array.length; i++) {
    if (args.key === args.array[i].key) {
      return args.array[i].value
    }
  }
  return null
}

export const formatDate = (date) => {
  const d = new Date(date)
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = d.getDate();
  var monthIndex = d.getMonth();
  var year = d.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ')
  for (const i in splitStr) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(' ')
}

export default {
  findKeyInArray,
  formatDate,
  titleCase,
}