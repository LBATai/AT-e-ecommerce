import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    message,
    Space,
    Drawer,
    Upload,
    Typography,
    Row,
    Col
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64 } from '../../utils';
import * as BannerService from '../../Service/BannerService';

const AdminBanner = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [avatar, setAvatar] = useState('');
    const [addForm] = Form.useForm(); // Form riêng cho thêm banner
    const [updateForm] = Form.useForm(); // Form riêng cho cập nhật banner
    const [stateBannerDetails, setStateBannerDetails] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { Text, Title } = Typography;


    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

    useEffect(() => {
        fetchAllBanners();
    }, []);

    const fetchAllBanners = async () => {
        setIsLoading(true);
        try {
            const response = await BannerService.getAllBanner();
            if (response?.status === 'OK') {
                setBanners(response.data);
            }
        } catch (error) {
            message.error('Không thể lấy danh sách banner');
        } finally {
            setIsLoading(false);
        }
    };
    const fetchGetDetailsBanner = async () => {
        const res = await BannerService.getDetailsBanner(rowSelected)
        if (res?.data) {
            setStateBannerDetails({
                id: res?.data._id,
                title: res?.data?.title,
                description: res?.data?.description,

            }),
                setAvatar(res?.data?.image);
        }
        return res
    }
    const mutation = useMutationHooks(
        async (newBanner) => {
            const response = await BannerService.createBanner(newBanner);
            return response;
        },
    );
    useEffect(() => {
        if (stateBannerDetails) {
            addForm.setFieldsValue(stateBannerDetails)
        }
    }, [addForm, stateBannerDetails]);
    useEffect(() => {
        if (stateBannerDetails) {
            updateForm.setFieldsValue(stateBannerDetails)
        }
    }, [updateForm, stateBannerDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsBanner()
        }
    }, [rowSelected]);
    useEffect(() => {
        if (mutation.isSuccess) {
            const response = mutation.data;

            if (response && response.message === 'Create banner successfully') {
                message.success('Banner được tạo thành công!');
                setIsModalOpen(false);
                addForm.resetFields();
                updateForm.resetFields();
                setAvatar('');
                setBanners([...banners, response.data]);
            } else {
                message.error('Vui lòng nhập đủ các thông tin của banner!');
            }
        }

        if (mutation.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutation.isSuccess, mutation.isError, mutation.data]);


    const handleDeleteBanner = (record) => {
        Modal.confirm({
            title: `Xác nhận xóa banner: ${record._id}`,
            content: 'Bạn có chắc chắn muốn xóa banner này không?',
            onOk: async () => {
                try {
                    await BannerService.deleteBanner(record._id);
                    message.success('Xóa banner thành công!');
                    fetchAllBanners();
                } catch (error) {
                    message.error('Xóa banner thất bại!');
                }
            },
        });
    };

    const handleDetailBanner = (record) => {
        setRowSelected(record._id);
        setIsDrawerOpen(true);
    };


    const handleDeleteSelectedBanners = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất một banner để xóa.');
            return;
        }

        Modal.confirm({
            title: `Xóa ${selectedRowKeys.length} banner`,
            content: 'Bạn có chắc chắn muốn xóa các banner đã chọn?',
            onOk: async () => {
                try {
                    await BannerService.deleteMultipleBanners(selectedRowKeys);
                    message.success('Xóa banner thành công!');
                    fetchAllBanners();
                    setSelectedRowKeys([]);
                } catch (error) {
                    message.error('Xóa banner thất bại!');
                }
            },
        });
    };
    const columns = [
        { title: 'ID', dataIndex: '_id', key: '_id', width: '200px' },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '200px',
            render: (image) => (
                <img src={image} alt="Banner" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            ),
        },
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '250px',
            render: (record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleDetailBanner(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDeleteBanner(record)}
                    >
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
        const newBanner = {
            ...values,
            image: avatar, // Thêm hình ảnh đã chọn (nếu có)
        };
        mutation.mutate(newBanner); // Gửi yêu cầu tạo sản phẩm
    };
    const mutationUpdateBanner = useMutationHooks(
        (data) => {
            const { id, ...restData } = data;
            console.log('Dữ liệu trong mutationUpdateBanner:', { id, restData });

            const res = BannerService.updateBanner(id, restData); // Gọi hàm updateProduct với đúng tham số
            return res;
        },
    );
    const onFinishUpdateBanner = (values) => {
        const data = {
            ...values,
            image: avatar, // Nếu có thêm image
        };
        console.log('data', data);
        // Truyền id, access_token và dữ liệu cần cập nhật vào mutate
        mutationUpdateBanner.mutate({ id: rowSelected, ...data });
    };

    useEffect(() => {
        if (mutationUpdateBanner.isSuccess) {
            const responseUpdate = mutationUpdateBanner.data;

            if (responseUpdate && responseUpdate.message === 'Update banner successfully') {
                message.success('Banner đã được cập nhật thành công!');
                setIsDrawerOpen(false); // Tắt modal
                setAvatar('');
                // Cập nhật danh sách sản phẩm bằng cách thay thế sản phẩm cũ với sản phẩm mới
                setBanners(prevBanners =>
                    prevBanners.map(banner =>
                        banner._id === responseUpdate.data._id ? responseUpdate.data : banner
                    )
                );
            } else {
                message.error('Có lỗi khi cập nhật banner!');
            }
        }

        if (mutationUpdateBanner.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutationUpdateBanner.isSuccess, mutationUpdateBanner.isError, mutationUpdateBanner.data]);
    return (
        <div style={{ padding: '20px', background: '#fff' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Title level={2} style={{ margin: 0 }}>Quản lý Banner</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                            Thêm Banner
                        </Button>
                        {selectedRowKeys.length > 0 && (
                            <Button
                                type="primary"
                                danger
                                onClick={handleDeleteSelectedBanners}
                            >
                                Xóa các banner đã chọn
                            </Button>
                        )}
                    </div>
                </Col>
                <Col span={24}>
                    <Input.Search placeholder="Tìm banner..." style={{ marginBottom: '10px' }} allowClear />
                </Col>
                <Col span={24}>
                    <Table
                        bordered
                        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                        columns={columns}
                        dataSource={banners}
                        loading={isLoading}
                        pagination={{ pageSize: 10 }}
                        rowKey="_id"
                        onRow={(record) => ({
                            style: { cursor: 'pointer' },
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        })}
                    />
                </Col>
            </Row>
            <Modal title="Thêm Banner Mới" open={isModalOpen} onCancel={handleCancel} footer={null} width={800} maskClosable={false}>
                <Form form={addForm} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Tiêu đề banner"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tiêu đề banner' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Tiêu đề banner phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tiêu đề banner" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả banner"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mô tả banner' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 5
                                        ? Promise.reject(new Error('Mô tả banner phải có ít nhất 5 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mô tả banner" />
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
                        Thêm banner
                    </Button>
                </Form>
            </Modal>
            <Drawer
                title={<Title level={3}>Chỉnh sửa banner</Title>}
                width={600}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                maskClosable={true}
            >
                <Form form={updateForm} layout="vertical" onFinish={onFinishUpdateBanner}>
                    <Form.Item
                        name="title"
                        label="Tiêu đề banner"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tiêu đề banner' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Tiêu đề banner phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tiêu đề banner" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả banner"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mô tả banner' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 5
                                        ? Promise.reject(new Error('Mô tả banner phải có ít nhất 5 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mô tả banner" />
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
                    <Button type="primary" htmlType="submit" loading={mutationUpdateBanner.isLoading} >
                        Lưu thông tin banner
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
};

export default AdminBanner;