/**
 * @param {number} number
 * @param {boolean} include
 * @return {number}
 */
export function randomIndex(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}