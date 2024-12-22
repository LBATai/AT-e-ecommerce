import styled from 'styled-components';

export const ReviewFormContainer = styled.div`
  position: relative;
  margin-top: 200px;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fef2f2;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  z-index: ${props => props.isOpen ? '50' : '-10'};
`;

export const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, ${props => props.isOpen ? '-50%' : '-60%'});
  transition: all 0.3s;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  z-index: ${props => props.isOpen ? '50' : '-10'};
  margin: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  color: #9ca3af;
  transition: color 0.2s;

  &:hover {
    color: #4b5563;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ReviewSection = styled.div`
  margin-bottom: 1rem;
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const StarButton = styled.button`
  padding: 0.25rem;

  svg {
    transition: color 0.2s;
    color: ${props => props.active ? '#fbbf24' : '#d1d5db'};
    fill: ${props => props.active ? '#fbbf24' : 'none'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const TextAreaContainer = styled.div`
  margin-bottom: 1rem;
`;

export const CharCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

export const ImageUploadSection = styled.div`
  margin-bottom: 1rem;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ImagePreviewWrapper = styled.div`
  position: relative;
  
  &:hover button {
    opacity: 1;
  }
`;

export const ImagePreview = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 9999px;
  padding: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #dc2626;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;