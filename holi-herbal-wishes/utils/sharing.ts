
import { HoliState } from '../types';

export const generateShareLink = (state: HoliState): string => {
  // Use encodeURIComponent + btoa for robust Unicode support
  const jsonString = JSON.stringify(state);
  const serialized = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
  
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('wish', serialized);
  return url.toString();
};

export const decodeShareLink = (param: string): HoliState | null => {
  try {
    const decoded = decodeURIComponent(Array.prototype.map.call(atob(param), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(decoded) as HoliState;
  } catch (e) {
    console.error("Failed to decode share link", e);
    return null;
  }
};
