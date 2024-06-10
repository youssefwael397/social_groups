// src/utils/truncate.ts
export const truncateDescription = (
  description: string,
  maxLength: number = 80
) => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
};
