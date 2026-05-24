import archetypes from '../data/archetypes';

const API_URL = import.meta.env.VITE_ARCHETYPE_API_URL;

export const fetchArchetype = async (center) => {
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/${center}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Archetype API request failed, falling back to local data.', error);
    }
  }
  return archetypes[center] || archetypes[1];
};
