export const reduceTo22 = (value) => {
  let total = Math.abs(Number(value) || 0);
  if (total === 0) return 0;

  while (total > 22 && total !== 22) {
    const digits = String(total).split('').map(Number);
    total = digits.reduce((sum, digit) => sum + digit, 0);
  }

  return Math.max(1, Math.min(total, 22));
};

export const getDestinyNodes = ({ dateOfBirth, timeOfBirth }) => {
  if (!dateOfBirth || !timeOfBirth) {
    return {
      left: 0, top: 0, right: 0, bottom: 0,
      lifePath: 0, timePulse: 0, root: 0,
    };
  }

  const birthDate = new Date(`${dateOfBirth}T${timeOfBirth}`);
  if (isNaN(birthDate.getTime())) {
    return {
      left: 0, top: 0, right: 0, bottom: 0,
      lifePath: 0, timePulse: 0, root: 0,
    };
  }

  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  const hour = birthDate.getHours();
  const minute = birthDate.getMinutes();

  const dayNumber = reduceTo22(day);
  const monthNumber = reduceTo22(month);
  const yearSum = String(year).split('').reduce((s, d) => s + Number(d), 0);
  const yearNumber = reduceTo22(yearSum);
  
  const bottom = reduceTo22(dayNumber + monthNumber + yearNumber);
  const lifePath = reduceTo22(day + month + yearSum);
  const timePulse = reduceTo22(hour + minute) || 1;
  const root = reduceTo22(dayNumber + monthNumber + yearNumber + timePulse);

  return {
    left: dayNumber || 1,
    top: monthNumber || 1,
    right: yearNumber || 1,
    bottom: bottom || 1,
    lifePath: lifePath || 1,
    timePulse,
    root: root || 1,
  };
};

const letterValueMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const vowels = new Set(['A', 'E', 'I', 'O', 'U']);

const reduceName = (fullName, filterFn) => {
  if (!fullName || typeof fullName !== 'string') return 0;
  
  const sum = String(fullName)
    .toUpperCase()
    .split('')
    .filter((char) => /[A-Z]/.test(char) && filterFn(char))
    .reduce((acc, char) => acc + (letterValueMap[char] || 0), 0);

  return reduceTo22(sum) || 0;
};

export const getNameVibration = (fullName) => reduceName(fullName, () => true);
export const getExpressionNumber = (fullName) => reduceName(fullName, () => true);
export const getSoulNumber = (fullName) => reduceName(fullName, (char) => vowels.has(char));
export const getPersonalityNumber = (fullName) => reduceName(fullName, (char) => !vowels.has(char));
