import { Rate, Button, Upload, Modal, Input, Alert, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as CommentService from '../../Service/CommentService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils'
const CommentForm = ({ onSubmit, isOpen, onClose ,onCommentAdded}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const MAX_IMAGES = 5;
  const MIN_REVIEW_LENGTH = 10;
  const MAX_REVIEW_LENGTH = 500;
  const { id } = useParams();  // Lấy productId từ URL
  const user = useSelector((state) => state.user);
  const { TextArea } = Input;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [productId, setProductId] = useState(id);
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
        if (onCommentAdded) {
          onCommentAdded();
        }
        onClose();
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
  const handleImageChange = ({ file, fileList }) => {
    if (fileList.length > MAX_IMAGES) {
      setError(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`);
      return;
    }
    setSelectedImages(fileList);
    setError('');
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <Modal
        title="Viết đánh giá của bạn"
        visible={isOpen}
        onCancel={() => !isSubmitting && onClose()}
        footer={null}
      >
        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}
        {success && (
          <Alert message={success} type="success" showIcon className="mb-4" />
        )}

        <div className="mb-4">
          <label>Đánh giá của bạn:</label>
          <Rate
            value={rating}
            onChange={(value) => {
              setRating(value);
              handleRatingChange(value);
            }}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label>
            Nội dung đánh giá:
            <span className="text-sm text-gray-500 ml-2">
              ({review.length}/{MAX_REVIEW_LENGTH})
            </span>
          </label>
          <Input.TextArea
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
            rows={4}
            maxLength={MAX_REVIEW_LENGTH}
            disabled={isSubmitting}
            value={newComment}
            onChange={(e) => {
              setReview(e.target.value);
              handleCommentChange(e);
            }}
          />

        </div>

        <div className="mb-4">
          <label>
            Hình ảnh sản phẩm:
            <span className="text-sm text-gray-500 ml-2">
              (Tối đa {MAX_IMAGES} ảnh)
            </span>
          </label>
          <Upload
            listType="picture-card"
            fileList={selectedImages}
            onChange={handleImageChange}
            beforeUpload={() => false} // Disable auto-upload
            multiple
            disabled={isSubmitting || selectedImages.length >= MAX_IMAGES}
          >
            {selectedImages.length < MAX_IMAGES && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </div>

        <div className="flex gap-4">
          <Button
            type="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            onClick={handleAddComment}
          >
            Gửi đánh giá
          </Button>
          <Button
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            className="w-full"
          >
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CommentForm;
