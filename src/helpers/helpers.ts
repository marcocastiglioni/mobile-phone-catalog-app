export const formatSpecName = ( key: string ): string => {
    
    // Convert camelCase to Title Case with spaces
    const formatted = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    // Special case adjustments
    return formatted
      .replace('Os', 'OS')
      .replace('Screen Refresh Rate', 'Screen Refresh Rate');
};