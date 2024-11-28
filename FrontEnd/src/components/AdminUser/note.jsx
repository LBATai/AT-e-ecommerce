import React, { useState } from 'react';
import { Table, Button, Input, Badge, Pagination, Space, Modal, Form, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const AdminUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', phone: '', address: '', age: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive', phone: '', address: '', age: '' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Active', phone: '', address: '', age: '' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active', phone: '', address: '', age: '' });

  const columns = [
    {
      title: 'Mã Người Dùng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Người Dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai Trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          status={status === 'Active' ? 'success' : 'error'}
          text={status}
        />
      ),
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const showAddUserModal = () => {
    setIsModalVisible(true);
  };

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setIsModalVisible(false);
    setNewUser({ name: '', email: '', role: 'User', status: 'Active', phone: '', address: '', age: '' });
  };

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Người Dùng</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddUserModal}>
          Thêm Người Dùng Mới
        </Button>
      </div>

      {/* Input tìm kiếm */}
      <Input.Search
        placeholder="Tìm người dùng..."
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        style={{ marginBottom: '20px' }}
      />

      {/* Bảng người dùng */}
      <Table columns={columns} dataSource={users} rowKey="id" pagination={false} />

      {/* Phân trang */}
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        total={users.length}
        pagination={{
          pageSize: 5,
          style: { display: 'flex', justifyContent: 'center' }, // Căn giữa pagination
        }}        
        onChange={(page) => setCurrentPage(page)}
      />

      {/* Modal Thêm Người Dùng */}
      <Modal
        title="Thêm Người Dùng Mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddUser}
        okText="Thêm Người Dùng"
        cancelText="Hủy"
      >
        <Form layout="vertical">
          <Form.Item label="Tên Người Dùng" required>
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Vai Trò">
            <Select
              value={newUser.role}
              onChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Trạng Thái">
            <Select
              value={newUser.status}
              onChange={(value) => setNewUser({ ...newUser, status: value })}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Số Điện Thoại">
            <Input
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Địa Chỉ">
            <Input
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Tuổi">
            <Input
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
