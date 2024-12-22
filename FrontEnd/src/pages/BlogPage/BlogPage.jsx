import React, { useState, useEffect } from 'react';
import FeaturedPost from '../../components/BlogComponent/FeaturedPost';
import BlogContent from '../../components/BlogComponent/BlogContent';
import NewsGrid from '../../components/BlogComponent/NewsGrid';
import CategoryFilter from '../../components/BlogComponent/CategoryFilter';
import { useCategories } from '../../components/BlogComponent/hooks/useCategories';
import { fashionPosts } from '../../components/BlogComponent/data/sampleData';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = useCategories(fashionPosts);
  
  const filteredPosts = selectedCategory
    ? fashionPosts.filter(post => post.category === selectedCategory)
    : fashionPosts;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <FeaturedPost post={fashionPosts[0]} />
        
        <BlogContent />
        
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin tức thời trang</h2>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <NewsGrid posts={filteredPosts.slice(1)} />
        </section>
      </main>
    </div>
  );
};

export default BlogPage;