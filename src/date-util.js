// Function to compare dates for sorting
export const compareDates = (dateString1, dateString2, sortOrder) => {
  const date1 = new Date(dateString1.date);
  const date2 = new Date(dateString2.date);

  // Compare the dates based on the sorting order
  if (sortOrder === 'asc') {
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  } else if (sortOrder === 'desc') {
    if (date1 < date2) {
      return 1;
    } else if (date1 > date2) {
      return -1;
    } else {
      return 0;
    }
  } else {
    throw new Error('Invalid sortOrder. Use "asc" for ascending or "desc" for descending.');
  }
};