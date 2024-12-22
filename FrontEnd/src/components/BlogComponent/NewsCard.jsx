import React from 'react';
import { formatDate } from './dateUtils';

const NewsCard = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
          {post.category}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {formatDate(post.date)}
          </span>
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            Đọc thêm →
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;