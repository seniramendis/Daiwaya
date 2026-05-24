/**
 * backend/utils/numerology.js
 * Synchronized Backend Matrix Engine
 */

export const reduceTo22 = (value) => {
  let total = Math.abs(parseInt(value, 10) || 0);
  if (total === 0) return 22;

  while (total > 22) {
    total = String(total)
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  return total;
};

export const getDestinyNodes = ({ dateOfBirth, timeOfBirth = '00:00' }) => {
  if (!dateOfBirth) throw new Error("Invalid birth date provided");

  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) throw new Error("Date must be YYYY-MM-DD");

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const left = reduceTo22(day);
  const top = reduceTo22(month);
  
  const yearDigitSum = String(year).split('').map(Number).reduce((sum, digit) => sum + digit, 0);
  const right = reduceTo22(yearDigitSum);
  
  const bottom = reduceTo22(left + top + right);
  const center = reduceTo22(left + top + right + bottom);

  const timeParts = timeOfBirth.split(':');
  const hour = parseInt(timeParts[0], 10) || 0;
  const minute = parseInt(timeParts[1], 10) || 0;
  
  const timePulse = reduceTo22(hour + minute) || 1;
  const lifePath = reduceTo22(left + top + right + bottom);
  const root = reduceTo22(center + timePulse);

  return {
    left, top, right, bottom, center, lifePath, timePulse, root,
    moneyChannel: { entrance: reduceTo22(center + right), heart: reduceTo22(center + reduceTo22(center + right)) },
    relationshipChannel: { entrance: reduceTo22(center + bottom), heart: reduceTo22(center + reduceTo22(center + bottom)) },
    karmicTail: { base: bottom, middle: reduceTo22(bottom + center), top: reduceTo22(reduceTo22(bottom + center) + center) },
    purpose: { personal: reduceTo22(left + right), social: reduceTo22(top + bottom), spiritual: reduceTo22(reduceTo22(left + right) + reduceTo22(top + bottom)) }
  };
};

const letterValueMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const vowels = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

export const getNameVibration = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return 1;
  const sum = fullName.toUpperCase().split('').filter(c => /[A-Z]/.test(c)).reduce((acc, char) => acc + (letterValueMap[char] || 0), 0);
  return reduceTo22(sum);
};

export const getExpressionNumber = (fullName) => getNameVibration(fullName);

export const getSoulNumber = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return 1;
  const sum = fullName.toUpperCase().split('').filter(c => /[A-Z]/.test(c) && vowels.has(c)).reduce((acc, char) => acc + (letterValueMap[char] || 0), 0);
  return reduceTo22(sum);
};

export const getPersonalityNumber = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return 1;
  const sum = fullName.toUpperCase().split('').filter(c => /[A-Z]/.test(c) && !vowels.has(c)).reduce((acc, char) => acc + (letterValueMap[char] || 0), 0);
  return reduceTo22(sum);
};

// Generates the comprehensive reading profile including the new matrix elements
export const generateReading = (profile) => {
  try {
    const nodes = getDestinyNodes({
      dateOfBirth: profile.dateOfBirth,
      timeOfBirth: profile.timeOfBirth || '00:00',
    });

    const nameVibration = getNameVibration(profile.fullName);
    const expressionNumber = getExpressionNumber(profile.fullName);
    const soulNumber = getSoulNumber(profile.fullName);
    const personalityNumber = getPersonalityNumber(profile.fullName);

    return {
      ...nodes,
      nameVibration,
      expressionNumber,
      soulNumber,
      personalityNumber,
    };
  } catch (error) {
    console.error('Reading Generation Error:', error);
    throw error;
  }
};