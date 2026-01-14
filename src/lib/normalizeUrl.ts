/**
 * Normalizes a URL string by:
 * - Trimming whitespace
 * - Converting to lowercase
 * - Removing www. prefix
 * - Adding https:// if no protocol is present
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  let normalized = url.trim().toLowerCase();
  
  // Remove www. prefix if exists
  if (normalized.startsWith('www.')) {
    normalized = normalized.substring(4);
  }
  
  // Add https:// if no protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }
  
  return normalized;
};
