const FeaturedPost = ({ post }) => {
    return (
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('vi-VN')}</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Đọc thêm
            </button>
          </div>
        </div>
      </article>
    );
  };
  
  export default FeaturedPost;