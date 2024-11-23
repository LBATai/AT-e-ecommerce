import styled from 'styled-components';

export const UserContainer = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5f50d9;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
  }
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f5f6fa;
  color: #636e72;
  font-weight: 600;
  border-bottom: 2px solid #dfe6e9;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f8f9fb;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dfe6e9;
  color: #2d3436;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.danger ? '#fff3f3' : '#f5f3fe'};
  color: ${props => props.danger ? '#ff4757' : '#6c5ce7'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.danger ? '#ffe0e0' : '#ece8fd'};
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'Active' ? '#e3fcef' : 
    props.status === 'Inactive' ? '#fff3f3' : '#f5f6fa'
  };
  color: ${props => 
    props.status === 'Active' ? '#00b894' : 
    props.status === 'Inactive' ? '#ff4757' : '#636e72'
  };
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #dfe6e9;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #dfe6e9;
  border-radius: 4px;
  background-color: white;
  color: ${props => props.disabled ? '#b2bec3' : '#2d3436'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background-color: #f5f6fa;
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PageNumber = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#6c5ce7' : '#dfe6e9'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#6c5ce7' : 'white'};
  color: ${props => props.active ? 'white' : '#2d3436'};
  cursor: pointer;
  
  &:hover:not(.active) {
    background-color: #f5f6fa;
  }
`;

// Modal Styles for Add/Edit User
export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3436;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary && `
    background-color: #6c5ce7;
    color: white;
    border: none;
    
    &:hover {
      background-color: #5f50d9;
    }
  `}
  
  ${props => props.secondary && `
    background-color: white;
    color: #636e72;
    border: 1px solid #dfe6e9;
    
    &:hover {
      background-color: #f5f6fa;
    }
  `}
`;