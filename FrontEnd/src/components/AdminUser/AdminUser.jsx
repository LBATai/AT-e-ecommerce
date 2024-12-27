import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Upload, Space, Select } from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux'
import * as UserService from '../../Service/UserService';

const AdminUser = () => {
  const user = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [avatar, setAvatar] = useState('');
  const [users, setUsers] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [stateUserDetails, setStateUserDetails] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.getAllUser();
      if (response && response.status === "OK") {
        setUsers(response.data);
      } else {
        console.error("Dữ liệu không hợp lệ:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      message.error("Không thể lấy danh sách tài khoản", 3);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGetDetailsUser = async () => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        id: res?.data._id,
        name: res?.data?.name,
        phone: res?.data?.phone,
        email: res?.data?.email,
        age: res?.data?.age,
        address: res?.data?.address,
        password: res?.data?.password,
        role: res?.data?.role,
        avatar: res?.data?.avatar
      }),
        setAvatar(res?.data?.avatar);
    }
    return res
  }

  const mutation = useMutationHooks(
    async (newUser) => {
      const response = await UserService.signUp(newUser);
      return response;
    },
  );
  useEffect(() => {
    if (stateUserDetails) {
      addForm.setFieldsValue(stateUserDetails)
    }
  }, [addForm, stateUserDetails]);
  useEffect(() => {
    if (stateUserDetails) {
      updateForm.setFieldsValue(stateUserDetails)
    }
  }, [updateForm, stateUserDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser()
    }
  }, [rowSelected]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const response = mutation.data;

      if (response && response.message === 'User created successfully') {
        message.success('Tài khoản được tạo thành công!', 3);
        setIsModalOpen(false);
        addForm.resetFields();
        updateForm.resetFields();
        setAvatar('');
        setUsers([...users, response.data]);
      } else if (response && response.message === 'Email already exists') {
        message.error('Email đã tồn tại!', 3);
      } else {
        message.error('Vui lòng nhập đủ các thông tin của tài khoản!', 3);
      }
    }

    if (mutation.isError) {
      message.error('Đã xảy ra lỗi, vui lòng thử lại!', 3);
    }
  }, [mutation.isSuccess, mutation.isError, mutation.data]);

  const handleDetailUser = (record) => {
    setRowSelected(record._id);
    setSelectedUserName(record.name);
    setIsOpenDrawer(true);
  };

  const handleDeleteUser = (record) => {
    setSelectedUserName(record.name);
    Modal.confirm({
      title: `Xác nhận xóa tài khoản: ${record.name}`,
      content: 'Bạn có chắc chắn muốn xóa tài khoản này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await UserService.deleteUser(record._id);
          if (res?.status === 'OK') {
            message.success('Xóa tài khoản thành công!', 3);
            fetchAllUser();
          } else {
            message.error('Xóa tài khoản thất bại!', 3);
          }
        } catch (error) {
          console.error('Lỗi khi xóa tài khoản :', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!', 3);
        }
      },
    });
  };

  const handleDeleteSelectedUsers = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một tài khoản để xóa.', 3);
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa tài khoản',
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} tài khoản này không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await UserService.deleteMultipleUsers(selectedRowKeys);
          if (res?.status === 'OK') {
            message.success('Xóa tài khoản thành công!', 3);
            fetchAllUser();
            setSelectedRowKeys([]);
          } else {
            message.error('Xóa tài khoản thất bại!', 3);
          }
        } catch (error) {
          console.error('Lỗi khi xóa tài khoản:', error);
          message.error('Đã xảy ra lỗi khi xóa tài khoản!', 3);
        }
      },
    });
  };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchText.toLowerCase())
    );
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        if (role === "admin") {
          return "Admin"
        } else if (role === "sale") {
          return "Sale"
        }
        return "User"
      }
    },
    {
      title: 'Địa chỉ',
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
      render: (record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleDetailUser(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteUser(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setAvatar('');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    updateForm.resetFields();
    addForm.resetFields();
    setAvatar('');
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const onFinish = (values) => {
    const newUser = {
      ...values,
      avatar,
    };
    mutation.mutate(newUser);
  };

  const mutationUpdateUser = useMutationHooks(
    (data) => {
      const { id, access_token, ...restData } = data;
      const res = UserService.updateUser(id, access_token, restData);
      return res;
    },
  );

  const onFinishUpdateUser = (values) => {
    const data = {
      ...values,
      avatar,
    };
    mutationUpdateUser.mutate({ id: rowSelected, access_token: user?.access_token, ...data });
  };

  useEffect(() => {
    if (mutationUpdateUser.isSuccess) {
      const responseUpdate = mutationUpdateUser.data;

      if (responseUpdate && responseUpdate.message === 'Update user successfully') {
        message.success('Tài khoản đã được cập nhật thành công!', 3);
        setIsOpenDrawer(false);
        setAvatar('');
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === responseUpdate.data._id ? responseUpdate.data : user
          )
        );
      } else {
        message.error('Có lỗi khi cập nhật sản phẩm!', 3);
      }
    }

    if (mutationUpdateUser.isError) {
      message.error('Đã xảy ra lỗi, vui lòng thử lại!', 3);
    }
  }, [mutationUpdateUser.isSuccess, mutationUpdateUser.isError, mutationUpdateUser.data]);

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Tài Khoản: {users.length}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm Tài Khoản Mới
        </Button>
        {selectedRowKeys.length > 0 && (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelectedUsers}
          >
            Xóa các tài khoản đã chọn
          </Button>
        )}
      </div>
     <Input.Search
          placeholder="Tìm tài khoản..."
          style={{ marginBottom: '20px' }}
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
        />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 5,
          style: { display: 'flex', justifyContent: 'center' },
        }}
        dataSource={filteredUsers}
         onRow={(record) => {
          return {
            onClick: () => {
              setRowSelected(record._id)
            }
          }
        }}
      />
      <Modal title="Thêm Tài Khoản Mới" open={isModalOpen} onCancel={handleCancel} footer={null} width={800} maskClosable={false}>
        <Form form={addForm} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên tài khoản"
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản' },
              {
                validator: (_, value) =>
                  value && value.trim().length < 3
                    ? Promise.reject(new Error('Tên tài khoản phải có ít nhất 3 ký tự'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
            ]}
          >
            <Input type="email" placeholder="Nhập email" />
          </Form.Item>
           <Form.Item
            name="role"
            label="Quyền"
            rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
          >
            <Select placeholder="Chọn quyền">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
               <Select.Option value="sale">Sale</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                validator: (_, value) =>
                  value && !/^\d{10}$/.test(value)
                    ? Promise.reject(new Error('Số điện thoại phải bao gồm đúng 10 chữ số'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input type="tel" placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              {
                validator: (_, value) =>
                  value && value.trim().length < 8
                    ? Promise.reject(new Error('Mật khẩu phải có ít nhất 8 ký tự'))
                    : Promise.resolve(),
              },
              {
                validator: (_, value) =>
                  value && !/[A-Z]/.test(value)
                    ? Promise.reject(new Error('Mật khẩu phải chứa ít nhất một chữ cái viết hoa'))
                    : Promise.resolve(),
              },
              {
                validator: (_, value) =>
                  value && !/[a-z]/.test(value)
                    ? Promise.reject(new Error('Mật khẩu phải chứa ít nhất một chữ cái viết thường'))
                    : Promise.resolve(),
              },
              {
                validator: (_, value) =>
                  value && !/\d/.test(value)
                    ? Promise.reject(new Error('Mật khẩu phải chứa ít nhất một chữ số'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              {
                validator: (_, value) =>
                  value && value.trim().length < 5
                    ? Promise.reject(new Error('Địa chỉ phải có ít nhất 5 ký tự'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[
              { required: true, message: 'Vui lòng nhập tuổi' },
              {
                validator: (_, value) =>
                  value && (!/^\d+$/.test(value) || parseInt(value, 10) < 15 || parseInt(value, 10) > 100)
                    ? Promise.reject(new Error('Tuổi phải là số từ 15 đến 100'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input placeholder="Nhập tuổi" />
          </Form.Item>
          <Form.Item label="Hình Ảnh" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh đại diện' }]} style={{ display: 'flex', }}>
            <Upload onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Thêm tài khoản
          </Button>
        </Form>
      </Modal>
      <DrawerComponent title={`Chỉnh sửa tài khoản: ${selectedUserName}`} isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%" maskClosable={false}>
        <Form form={updateForm} layout="vertical" onFinish={onFinishUpdateUser}>
          <Form.Item
            name="name"
            label="Tên tài khoản"
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản' },
              {
                validator: (_, value) =>
                  value && value.trim().length < 3
                    ? Promise.reject(new Error('Tên tài khoản phải có ít nhất 3 ký tự'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input disabled placeholder="Nhập tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
            ]}
          >
            <Input disabled type="email" placeholder="Nhập email" />
          </Form.Item>
           <Form.Item
            name="role"
            label="Quyền"
            rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
          >
            <Select placeholder="Chọn quyền">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
                <Select.Option value="sale">Sale</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                validator: (_, value) =>
                  value && !/^\d{10}$/.test(value)
                    ? Promise.reject(new Error('Số điện thoại phải bao gồm đúng 10 chữ số'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input disabled type="tel" placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ' },
              {
                validator: (_, value) =>
                  value && value.trim().length < 5
                    ? Promise.reject(new Error('Địa chỉ phải có ít nhất 5 ký tự'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input disabled placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[
              { required: true, message: 'Vui lòng nhập tuổi' },
              {
                validator: (_, value) =>
                  value && (!/^\d+$/.test(value) || parseInt(value, 10) < 15 || parseInt(value, 10) > 100)
                    ? Promise.reject(new Error('Tuổi phải là số từ 15 đến 100'))
                    : Promise.resolve(),
              },
            ]}
          >
            <Input disabled placeholder="Nhập tuổi" />
          </Form.Item>
          <Form.Item label="Hình Ảnh" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh đại diện' }]} style={{ display: 'flex', }}>
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading} >
            Lưu thông tin tài khoản
          </Button>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminUser;