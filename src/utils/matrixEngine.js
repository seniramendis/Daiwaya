/**
 * src/utils/matrixEngine.js
 * Advanced Matrix of Destiny Calculation Engine
 */

export const reduceTo22 = (value) => {
  let total = Math.abs(parseInt(value, 10) || 0);
  if (total === 0) return 22;
  while (total > 22) {
    total = String(total).split('').map(Number).reduce((sum, d) => sum + d, 0);
  }
  return total;
};

const getEmptyNodes = () => ({
  left: 1, top: 1, right: 1, bottom: 1, center: 1, lifePath: 1, timePulse: 1, root: 1,
  moneyChannel: { entrance: 1, heart: 1 },
  relationshipChannel: { entrance: 1, heart: 1 },
  karmicTail: { base: 1, middle: 1, top: 1 },
  purpose: { personal: 1, social: 1, spiritual: 1 },
  skyNode: 1, earthNode: 1,
});

export const getDestinyNodes = ({ dateOfBirth, timeOfBirth = '00:00' }) => {
  if (!dateOfBirth) return getEmptyNodes();
  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) return getEmptyNodes();

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Core Cardinal Nodes
  const left = reduceTo22(day);
  const top = reduceTo22(month);
  const yearDigitSum = String(year).split('').map(Number).reduce((s, d) => s + d, 0);
  const right = reduceTo22(yearDigitSum);
  const bottom = reduceTo22(left + top + right);
  const center = reduceTo22(left + top + right + bottom);

  // Time calculations
  const timeParts = timeOfBirth.split(':');
  const hour = parseInt(timeParts[0], 10) || 0;
  const minute = parseInt(timeParts[1], 10) || 0;
  const timePulse = reduceTo22(hour + minute) || 1;
  const lifePath = reduceTo22(left + top + right + bottom);
  const root = reduceTo22(center + timePulse);

  // Advanced Sub-Nodes
  const relationshipEntrance = reduceTo22(center + bottom);
  const relationshipHeart = reduceTo22(center + relationshipEntrance);
  const moneyEntrance = reduceTo22(center + right);
  const moneyHeart = reduceTo22(center + moneyEntrance);
  const karmicMiddle = reduceTo22(bottom + center);
  const karmicTop = reduceTo22(karmicMiddle + center);
  const personalPurpose = reduceTo22(left + right);
  const socialPurpose = reduceTo22(top + bottom);
  const spiritualPurpose = reduceTo22(personalPurpose + socialPurpose);

  // Sky/Earth diagonal nodes
  const skyNode = reduceTo22(top + right);
  const earthNode = reduceTo22(left + bottom);

  return {
    left, top, right, bottom, center, lifePath, timePulse, root,
    skyNode, earthNode,
    moneyChannel: { entrance: moneyEntrance, heart: moneyHeart },
    relationshipChannel: { entrance: relationshipEntrance, heart: relationshipHeart },
    karmicTail: { base: bottom, middle: karmicMiddle, top: karmicTop },
    purpose: { personal: personalPurpose, social: socialPurpose, spiritual: spiritualPurpose },
  };
};

const letterValueMap = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};
const vowels = new Set(['A','E','I','O','U','Y']);

const reduceName = (fullName, filterFn) => {
  if (!fullName || typeof fullName !== 'string') return 1;
  const sum = String(fullName).toUpperCase().split('')
    .filter(c => /[A-Z]/.test(c) && filterFn(c))
    .reduce((acc, c) => acc + (letterValueMap[c] || 0), 0);
  return reduceTo22(sum) || 1;
};

export const getNameVibration = (n) => reduceName(n, () => true);
export const getExpressionNumber = (n) => reduceName(n, () => true);
export const getSoulNumber = (n) => reduceName(n, c => vowels.has(c));
export const getPersonalityNumber = (n) => reduceName(n, c => !vowels.has(c));