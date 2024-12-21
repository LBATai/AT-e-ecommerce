import React, { useState, useEffect } from 'react';
import { List, Input, Button, Rate, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as CommentService from '../../Service/CommentService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {CommentWrapper} from './style'
import { formatDate } from '../../utils'
const CommentSection = () => {
  const { id } = useParams();  // Lấy productId từ URL
  const user = useSelector((state) => state.user);
  const { TextArea } = Input;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [productId, setProductId] = useState(id);
  const [rating, setRating] = useState(0);
  const [userAvatar, setUserAvatar] = useState('');
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    setUserAvatar(user?.avatar);
    setNameUser(user?.name);
  }, [user?.avatar]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  // create new comment
  const commentData = {
    content: newComment,
    rating: rating,
    productId: productId,
    userId: user.id,
    avatarUser: userAvatar,
    nameUser: nameUser,
  };
  const mutationCreateComment = useMutationHooks(
    async (commentData) => {
      const response = await CommentService.createComment(commentData);
      return response;
    }
  );
  const handleAddComment = async () => {
    if (!newComment) {
      message.warning('Vui lòng nhập bình luận');
      return;
    }
    if (rating === 0) {
      message.warning('Vui lòng chọn đánh giá');
      return;
    }
    mutationCreateComment.mutate(commentData, {
      onSuccess: () => {
        // Reset comment và rating sau khi thêm bình luận thành công
        setNewComment('');
        setRating(0);
        // Gọi lại danh sách bình luận
        fetchCommentsByProduct();
        message.success('Thêm bình luận thành công');
      },
      onError: () => {
        message.error('Lỗi khi thêm bình luận');
      }
    });
  };

  // lấy danh sách comment
  useEffect(() => {
    if (id) {
      fetchCommentsByProduct();
    } else {
      message.error('Product ID không hợp lệ');
    }
  }, [productId]);
  const fetchCommentsByProduct = async () => {
    try {
      const response = await CommentService.getCommentsByProduct(productId);
      setComments(response.data);
    } catch (error) {
      message.error('Lỗi khi lấy bình luận.');
    }
  }

  const handleDeleteComment = async (commentId) => {
    // Xử lý xóa bình luận nếu cần
  };

  const handleUpdateComment = async (commentId, updatedContent) => {
    // Xử lý cập nhật bình luận nếu cần
  };

  return (
    <CommentWrapper>
      <h2>Đánh Giá từ Khách Hàng</h2>
      <List
        dataSource={comments}
        renderItem={(item) => (
          <div style={{ marginBottom: '15px' }}>
            <p>
              <span><img alt="user avatar" src={userAvatar} style={{ width: '30px', height: '30px', borderRadius: '50%', }} /></span>
              <span style={{marginTop: '50px'}}>{nameUser}</span>
            </p>
            <p>{formatDate(item.created)}</p>
            <p>
              {item.content}
            </p>
            <Rate disabled value={item.rating} />
            {/* Các nút chỉnh sửa và xóa nếu cần */}
            <Button onClick={() => handleDeleteComment(item._id)}>Xóa</Button>
            <Button onClick={() => handleUpdateComment(item._id, 'Nội dung bình luận mới')}>Cập nhật</Button>
          </div>
        )}
      />
      <div style={{ marginTop: '20px' }}>
        <TextArea 
          placeholder="Nhập bình luận..."
          value={newComment}
          onChange={handleCommentChange}
          prefix={<UserOutlined />}
          autoSize={{ minRows: 1, maxRows: 6 }} // Tự động thay đổi chiều cao
          style={{ width: '40%' }} // Đặt chiều rộng cụ thể
        />
        <div style={{ marginTop: '10px' }}>
          <Rate onChange={handleRatingChange} value={rating} />
        </div>
        <Button
          type="primary"
          onClick={handleAddComment}
          style={{ marginTop: '10px' }}
        >
          Bình luận
        </Button>
      </div>
    </CommentWrapper>
  );
};

export default CommentSection;
