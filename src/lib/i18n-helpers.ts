/**
 * Obté el valor d'un camp traduït amb fallback automàtic
 * Prioritat: idioma actual → anglès → camp original
 */
export function getLocalizedField<T extends Record<string, any>>(
  item: T,
  field: string,
  language: string
): string {
  if (!item) return '';
  
  // Normalitzar idioma (ca, es, en)
  const lang = language?.substring(0, 2) || 'en';
  
  // Intentar camp específic de l'idioma
  const localizedField = `${field}_${lang}`;
  if (item[localizedField]) {
    return item[localizedField];
  }
  
  // Fallback a anglès
  const englishField = `${field}_en`;
  if (item[englishField]) {
    return item[englishField];
  }
  
  // Fallback al camp original
  return item[field] || '';
}
