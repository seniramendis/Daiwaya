/**
 * src/utils/matrixEngine.js
 * Advanced Matrix of Destiny Calculation Engine
 */

export const reduceTo22 = (value) => {
  let total = Math.abs(parseInt(value, 10) || 0);
  if (total === 0) return 22; // In Matrix numerology, 0/22 maps to The Fool (22)

  while (total > 22) {
    total = String(total)
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  return total;
};

const getEmptyNodes = () => ({
  left: 1, top: 1, right: 1, bottom: 1, center: 1, lifePath: 1, timePulse: 1, root: 1,
  moneyChannel: { entrance: 1, heart: 1 },
  relationshipChannel: { entrance: 1, heart: 1 },
  karmicTail: { base: 1, middle: 1, top: 1 },
  purpose: { personal: 1, social: 1, spiritual: 1 }
});

export const getDestinyNodes = ({ dateOfBirth, timeOfBirth = '00:00' }) => {
  if (!dateOfBirth) return getEmptyNodes();

  // 1. Safe Date Parsing (Prevents Timezone/UTC shift bugs)
  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) return getEmptyNodes();

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // 2. Core Cardinal Nodes
  const left = reduceTo22(day);
  const top = reduceTo22(month);
  
  const yearDigitSum = String(year).split('').map(Number).reduce((sum, digit) => sum + digit, 0);
  const right = reduceTo22(yearDigitSum);
  
  const bottom = reduceTo22(left + top + right);
  const center = reduceTo22(left + top + right + bottom);

  // 3. Time & Root calculations
  const timeParts = timeOfBirth.split(':');
  const hour = parseInt(timeParts[0], 10) || 0;
  const minute = parseInt(timeParts[1], 10) || 0;
  
  const timePulse = reduceTo22(hour + minute) || 1;
  const lifePath = reduceTo22(left + top + right + bottom); // Standard global resolution
  const root = reduceTo22(center + timePulse);

  // 4. Advanced Matrix Sub-Nodes (Channels & Tails)
  const relationshipEntrance = reduceTo22(center + bottom);
  const relationshipHeart = reduceTo22(center + relationshipEntrance);
  
  const moneyEntrance = reduceTo22(center + right);
  const moneyHeart = reduceTo22(center + moneyEntrance);
  
  const karmicMiddle = reduceTo22(bottom + center);
  const karmicTop = reduceTo22(karmicMiddle + center);
  
  const personalPurpose = reduceTo22(left + right);
  const socialPurpose = reduceTo22(top + bottom);
  const spiritualPurpose = reduceTo22(personalPurpose + socialPurpose);

  return {
    // Root level parameters to keep existing UI from breaking
    left, top, right, bottom, center, lifePath, timePulse, root,
    
    // New nested objects for advanced UI plotting
    moneyChannel: { entrance: moneyEntrance, heart: moneyHeart },
    relationshipChannel: { entrance: relationshipEntrance, heart: relationshipHeart },
    karmicTail: { base: bottom, middle: karmicMiddle, top: karmicTop },
    purpose: { personal: personalPurpose, social: socialPurpose, spiritual: spiritualPurpose }
  };
};

// --- Embedded Name Numerology Logic ---
const letterValueMap = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const vowels = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

const reduceName = (fullName, filterFn) => {
  if (!fullName || typeof fullName !== 'string') return 1;
  
  const sum = String(fullName)
    .toUpperCase()
    .split('')
    .filter((char) => /[A-Z]/.test(char) && filterFn(char))
    .reduce((acc, char) => acc + (letterValueMap[char] || 0), 0);

  return reduceTo22(sum) || 1;
};

export const getNameVibration = (fullName) => reduceName(fullName, () => true);
export const getExpressionNumber = (fullName) => reduceName(fullName, () => true);
export const getSoulNumber = (fullName) => reduceName(fullName, (char) => vowels.has(char));
export const getPersonalityNumber = (fullName) => reduceName(fullName, (char) => !vowels.has(char));