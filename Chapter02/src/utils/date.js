const getDate = (date) => (date ? new Date(date) : new Date());

export const getDayOfWeek = (date) => {
  const day = date.getDay();
  switch (day) {
    case 0:
      return '일요일';
    case 1:
      return '월요일';
    case 2:
      return '화요일';
    case 3:
      return '수요일';
    case 4:
      return '목요일';
    case 5:
      return '금요일';
    case 6:
      return '토요일';
    default:
      throw new Error(`알 수 없는 요일입니다. ${day}`);
  }
};

export const addDate = (date, days) => new Date(date).setDate(date.getDate() + days);

export const getTimeStamp = (targetDate = null) => {
  const date = getDate(targetDate);
  const filteredDate = date.toISOString().split('T')[0];
  const filteredTime = date.toTimeString().split(' ')[0];
  return `${filteredDate} ${filteredTime}`;
};

export const getNumericTime = (time = '') => {
  time.replace(/[^0-9]/g, '');
};
