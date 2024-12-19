import React, { useState, useEffect } from 'react';
import { List, Input, Button, Rate, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getCommentsByProduct, createComment, deleteComment, updateComment } from '../../Service/CommentService';

const CommentSection = ({ initialComments, productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  console.log("Product ID:", productId); // Kiểm tra xem productId đã được truyền đúng chưa

//   useEffect(() => {
//     // Lấy danh sách bình luận khi component mount
//     const fetchComments = async () => {
//       try {
//         const fetchedComments = await getCommentsByProduct(productId);
//         setComments(fetchedComments);
//       } catch (error) {
//         message.error('Lỗi khi lấy bình luận.');
//       }
//     };
//     fetchComments();
//   }, [productId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleAddComment = async () => {
    if (!newComment) {
      message.warning('Vui lòng nhập bình luận');
      return;
    }

    const commentData = {
      content: newComment,
      rating: rating,
    };

    try {
      const newCommentItem = await createComment(productId, commentData);
      setComments([newCommentItem, ...comments]);
      setNewComment('');
      setRating(0);
      message.success('Bình luận đã được thêm.');
    } catch (error) {
      message.error('Lỗi khi thêm bình luận.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
      message.success('Bình luận đã được xóa.');
    } catch (error) {
      message.error('Lỗi khi xóa bình luận.');
    }
  };

  const handleUpdateComment = async (commentId, updatedContent) => {
    try {
      const updatedComment = await updateComment(commentId, { content: updatedContent });
      setComments(comments.map(comment => (comment._id === commentId ? updatedComment : comment)));
      message.success('Bình luận đã được cập nhật.');
    } catch (error) {
      message.error('Lỗi khi cập nhật bình luận.');
    }
  };

  return (
    <div>
      <h2>Đánh Giá từ Khách Hàng</h2>
      <List
        dataSource={comments}
        renderItem={(item) => (
          <div style={{ marginBottom: '15px' }}>
            <strong>{item.author}</strong> - {item.datetime}
            <p>{item.content}</p>
            <Rate disabled value={item.rating} />
            {/* Các nút chỉnh sửa và xóa nếu cần */}
            <Button onClick={() => handleDeleteComment(item._id)}>Xóa</Button>
            <Button onClick={() => handleUpdateComment(item._id, 'Nội dung bình luận mới')}>Cập nhật</Button>
          </div>
        )}
      />
      <div style={{ marginTop: '20px' }}>
        <Input
          placeholder="Nhập bình luận..."
          value={newComment}
          onChange={handleCommentChange}
          prefix={<UserOutlined />}
        />
        <div style={{ marginTop: '10px' }}>
          <Rate onChange={handleRatingChange} value={rating} />
        </div>
        <Button
          type="primary"
          onClick={handleAddComment}
          style={{ marginTop: '10px' }}
        >
          Thêm Bình Luận
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
