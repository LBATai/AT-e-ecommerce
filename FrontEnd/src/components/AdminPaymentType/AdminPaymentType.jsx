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
    Typography,
    Row,
    Col,
    Switch,
    Upload
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as PaymentTypeService from '../../Service/PaymentTypeService';
import { getBase64 } from '../../utils';

const AdminPaymentType = () => {
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [addForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [statePaymentTypeDetails, setStatePaymentTypeDetails] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [icon, setIcon] = useState('');

    const { Text, Title } = Typography;
    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

    useEffect(() => {
        fetchAllPaymentTypes();
    }, []);

    const fetchAllPaymentTypes = async () => {
        setIsLoading(true);
        try {
            const response = await PaymentTypeService.getAllPaymentTypes();
            if (response?.status === 'OK') {
                setPaymentTypes(response.data);
            }
        } catch (error) {
            message.error('Không thể lấy danh sách phương thức thanh toán');
        } finally {
            setIsLoading(false);
        }
    };
    const fetchGetDetailsPaymentType = async () => {
        const res = await PaymentTypeService.getDetailsPaymentType(rowSelected)
        if (res?.data) {
            setStatePaymentTypeDetails({
                id: res?.data._id,
                name: res?.data?.name,
                description: res?.data?.description,
                enabled: res?.data?.enabled,
                icon: res?.data?.icon
            }),
                setIcon(res?.data?.icon)
        }
        return res
    }
    const mutation = useMutationHooks(
        async (newPaymentType) => {
            const response = await PaymentTypeService.createPaymentType(newPaymentType);
            return response;
        },
    );

    useEffect(() => {
        if (statePaymentTypeDetails) {
            addForm.setFieldsValue(statePaymentTypeDetails)
        }
    }, [addForm, statePaymentTypeDetails]);
    useEffect(() => {
        if (statePaymentTypeDetails) {
            updateForm.setFieldsValue(statePaymentTypeDetails)
        }
    }, [updateForm, statePaymentTypeDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsPaymentType()
        }
    }, [rowSelected]);

    useEffect(() => {
        if (mutation.isSuccess) {
            const response = mutation.data;

            if (response && response.message === 'Create payment type successfully') {
                message.success('Phương thức thanh toán được tạo thành công!');
                setIsModalOpen(false);
                addForm.resetFields();
                updateForm.resetFields();
                setPaymentTypes([...paymentTypes, response.data]);
                setIcon('');
            } else {
                message.error('Vui lòng nhập đủ các thông tin của phương thức thanh toán!');
            }
        }

        if (mutation.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutation.isSuccess, mutation.isError, mutation.data]);

    const handleDeletePaymentType = (record) => {
        Modal.confirm({
            title: `Xác nhận xóa phương thức thanh toán: ${record._id}`,
            content: 'Bạn có chắc chắn muốn xóa phương thức thanh toán này không?',
            onOk: async () => {
                try {
                    await PaymentTypeService.deletePaymentType(record._id);
                    message.success('Xóa phương thức thanh toán thành công!');
                    fetchAllPaymentTypes();
                } catch (error) {
                    message.error('Xóa phương thức thanh toán thất bại!');
                }
            },
        });
    };

    const handleDetailPaymentType = (record) => {
        setRowSelected(record._id);
        setIsDrawerOpen(true);
    };

    const handleDeleteSelectedPaymentTypes = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất một phương thức thanh toán để xóa.');
            return;
        }

        Modal.confirm({
            title: `Xóa ${selectedRowKeys.length} phương thức thanh toán`,
            content: 'Bạn có chắc chắn muốn xóa các phương thức thanh toán đã chọn?',
            onOk: async () => {
                try {
                    await PaymentTypeService.deleteMultiplePaymentTypes(selectedRowKeys);
                    message.success('Xóa phương thức thanh toán thành công!');
                    fetchAllPaymentTypes();
                    setSelectedRowKeys([]);
                } catch (error) {
                    message.error('Xóa phương thức thanh toán thất bại!');
                }
            },
        });
    };

    const columns = [
        { title: 'ID', dataIndex: '_id', key: '_id', width: '200px' },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            width: '200px',
            render: (icon) => (
                icon && (
                    <img src={icon} alt="Payment Type Icon" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                )
            ),
        },
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Trạng thái',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled) => (
                <Switch checked={enabled} disabled />
            )
        },
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
                        onClick={() => handleDetailPaymentType(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDeletePaymentType(record)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
        setIcon('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        updateForm.resetFields();
        addForm.resetFields();
        setIcon('');
    };
    const handleOnchangeIcon = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setIcon(file.preview);
    };

    const onFinish = (values) => {
        const newPaymentType = {
            ...values,
            icon: icon,
        };
        mutation.mutate(newPaymentType); // Send create request
    };
    const mutationUpdatePaymentType = useMutationHooks(
        (data) => {
            const { id, ...restData } = data;
            const res = PaymentTypeService.updatePaymentType(id, restData);
            return res;
        },
    );

    const onFinishUpdatePaymentType = (values) => {
        const data = {
            ...values,
            icon: icon,
        };
        mutationUpdatePaymentType.mutate({ id: rowSelected, ...data });
    };


    useEffect(() => {
        if (mutationUpdatePaymentType.isSuccess) {
            const responseUpdate = mutationUpdatePaymentType.data;

            if (responseUpdate && responseUpdate.message === 'Update payment type successfully') {
                message.success('Phương thức thanh toán đã được cập nhật thành công!');
                setIsDrawerOpen(false); // Tắt modal
                setIcon('');
                // Cập nhật danh sách sản phẩm bằng cách thay thế sản phẩm cũ với sản phẩm mới
                setPaymentTypes(prevPaymentTypes =>
                    prevPaymentTypes.map(paymentType =>
                        paymentType._id === responseUpdate.data._id ? responseUpdate.data : paymentType
                    )
                );
            } else {
                message.error('Có lỗi khi cập nhật phương thức thanh toán!');
            }
        }

        if (mutationUpdatePaymentType.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutationUpdatePaymentType.isSuccess, mutationUpdatePaymentType.isError, mutationUpdatePaymentType.data]);


    return (
        <div style={{ padding: '20px', background: '#fff' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Title level={2} style={{ margin: 0 }}>Quản lý phương thức thanh toán</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                            Thêm phương thức thanh toán
                        </Button>
                        {selectedRowKeys.length > 0 && (
                            <Button
                                type="primary"
                                danger
                                onClick={handleDeleteSelectedPaymentTypes}
                            >
                                Xóa các phương thức thanh toán đã chọn
                            </Button>
                        )}
                    </div>
                </Col>
                <Col span={24}>
                    <Input.Search placeholder="Tìm phương thức thanh toán..." style={{ marginBottom: '10px' }} allowClear />
                </Col>
                <Col span={24}>
                    <Table
                        bordered
                        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                        columns={columns}
                        dataSource={paymentTypes}
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
            <Modal title="Thêm phương thức thanh toán mới" open={isModalOpen} onCancel={handleCancel} footer={null} width={800} maskClosable={false}>
                <Form form={addForm} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Tên phương thức thanh toán"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên phương thức thanh toán' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Tên phương thức thanh toán phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên phương thức thanh toán" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả phương thức thanh toán"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mô tả phương thức thanh toán' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 5
                                        ? Promise.reject(new Error('Mô tả phương thức thanh toán phải có ít nhất 5 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mô tả phương thức thanh toán" />
                    </Form.Item>
                    <Form.Item label="Icon" rules={[{ required: false }]} style={{ display: 'flex', }}>
                        <Upload onChange={handleOnchangeIcon} maxCount={1} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Tải icon lên</Button>
                        </Upload>
                        {icon && (
                            <img
                                src={icon}
                                alt="Icon"
                                style={{ width: "50px", height: "50px", marginTop: "10px" }}
                            />
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
                        Thêm phương thức thanh toán
                    </Button>
                </Form>
            </Modal>

            <Drawer
                title={<Title level={3}>Chỉnh sửa phương thức thanh toán</Title>}
                width={600}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                maskClosable={true}
            >
                <Form form={updateForm} layout="vertical" onFinish={onFinishUpdatePaymentType}>
                    <Form.Item
                        name="name"
                        label="Tên phương thức thanh toán"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên phương thức thanh toán' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Tên phương thức thanh toán phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên phương thức thanh toán" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả phương thức thanh toán"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mô tả phương thức thanh toán' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 5
                                        ? Promise.reject(new Error('Mô tả phương thức thanh toán phải có ít nhất 5 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mô tả phương thức thanh toán" />
                    </Form.Item>
                    <Form.Item label="Icon" rules={[{ required: false }]} style={{ display: 'flex', }}>

                        {icon && (
                            <img
                                src={icon}
                                alt="Icon"
                                style={{ width: "50px", height: "50px", marginTop: "10px" }}
                            />
                        )}
                        <Upload onChange={handleOnchangeIcon} maxCount={1} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Tải icon lên</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="enabled" label="Trạng thái" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutationUpdatePaymentType.isLoading}>
                        Lưu thông tin phương thức thanh toán
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
};

export default AdminPaymentType;