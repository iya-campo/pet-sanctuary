export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const validateRequiredFields = (fields: Record<string, any>, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !fields[field]);
  return missingFields.length > 0 ? missingFields : null;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}.${year}`;
}

export const generateRandomId = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    return randomId;
};