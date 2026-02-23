/**
 * Format amount in Indian Rupees
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show ₹ symbol (default: true)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })
  return showSymbol ? `₹${formatted}` : formatted
}

/**
 * Format amount with decimals
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrencyWithDecimals = (amount, decimals = 2) => {
  const formatted = amount.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  })
  return `₹${formatted}`
}

/**
 * Parse currency string to number
 * @param {string} currencyString - Currency string to parse
 * @returns {number} Parsed number
 */
export const parseCurrency = (currencyString) => {
  return parseFloat(currencyString.replace(/[₹,]/g, ''))
}
