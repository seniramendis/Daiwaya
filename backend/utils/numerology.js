export const reduceTo22 = (value) => {
  if (!value || value <= 0) return 1;
  if (value <= 22) return value;

  let total = value;
  while (total > 22) {
    total = String(total)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return Math.max(1, Math.min(total, 22));
};

export const getDestinyNodes = ({ dateOfBirth, timeOfBirth = '00:00' }) => {
  try {
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return { left: 1, top: 1, right: 1, bottom: 1, lifePath: 1, timePulse: 1, root: 1 };
    }

    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // Calculate individual nodes
    const left = reduceTo22(day);
    const top = reduceTo22(month);
    const yearDigitSum = String(year)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    const right = reduceTo22(yearDigitSum);

    // Anchor/Bottom (sum of the three cardinal points)
    const bottom = reduceTo22(left + top + right);

    // Life Path (day + month + yearDigitSum)
    const lifePath = reduceTo22(day + month + yearDigitSum);

    // Time Pulse (hour + minute from timeOfBirth)
    const [hourStr, minuteStr] = timeOfBirth.split(':');
    const hour = parseInt(hourStr, 10) || 0;
    const minute = parseInt(minuteStr, 10) || 0;
    const timePulse = reduceTo22(hour + minute) || 1;

    // Root Number (day + month + yearDigitSum + timePulse)
    const root = reduceTo22(day + month + yearDigitSum + timePulse);

    return {
      left,
      top,
      right,
      bottom,
      lifePath,
      timePulse,
      root,
    };
  } catch (error) {
    console.error('Error calculating destiny nodes:', error);
    return { left: 1, top: 1, right: 1, bottom: 1, lifePath: 1, timePulse: 1, root: 1 };
  }
};

const letterValueMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

export const getNameVibration = (fullName) => {
  if (!fullName || fullName.trim().length === 0) return 1;

  const sum = fullName
    .toUpperCase()
    .split('')
    .reduce((total, char) => {
      return total + (letterValueMap[char] || 0);
    }, 0);

  return reduceTo22(sum);
};

export const getExpressionNumber = (fullName) => {
  return getNameVibration(fullName);
};

export const getSoulNumber = (fullName) => {
  if (!fullName || fullName.trim().length === 0) return 1;

  const vowels = 'AEIOUY';
  const sum = fullName
    .toUpperCase()
    .split('')
    .reduce((total, char) => {
      if (vowels.includes(char)) {
        return total + (letterValueMap[char] || 0);
      }
      return total;
    }, 0);

  return reduceTo22(sum);
};

export const getPersonalityNumber = (fullName) => {
  if (!fullName || fullName.trim().length === 0) return 1;

  const vowels = 'AEIOUY';
  const sum = fullName
    .toUpperCase()
    .split('')
    .reduce((total, char) => {
      if (!vowels.includes(char) && letterValueMap[char]) {
        return total + letterValueMap[char];
      }
      return total;
    }, 0);

  return reduceTo22(sum);
};

export const generateReading = (profile) => {
  const nodes = getDestinyNodes({
    dateOfBirth: profile.dateOfBirth,
    timeOfBirth: profile.timeOfBirth || '00:00',
  });

  const nameVibration = getNameVibration(profile.fullName);
  const expressionNumber = getExpressionNumber(profile.fullName);
  const soulNumber = getSoulNumber(profile.fullName);
  const personalityNumber = getPersonalityNumber(profile.fullName);

  // Center is the sum of the four cardinal points
  const center = reduceTo22(nodes.left + nodes.top + nodes.right + nodes.bottom);

  return {
    ...nodes,
    nameVibration,
    expressionNumber,
    soulNumber,
    personalityNumber,
    center,
  };
};
