import { useMemo } from 'react';

export const useCategories = (posts) => {
  return useMemo(() => {
    return [...new Set(posts.map(post => post.category))];
  }, [posts]);
};