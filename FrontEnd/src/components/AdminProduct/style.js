import styled from 'styled-components';
import { Table, Button, Input, Modal, Form, message, Upload } from 'antd';

export const ProductContainer = styled.div`
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

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  background-color: ${props = props.danger ? '#fff3f3' : '#f5f3fe'};
  color: ${props = props.danger ? '#ff4757' : '#6c5ce7'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props = props.danger ? '#ffe0e0' : '#ece8fd'};
  }
`;