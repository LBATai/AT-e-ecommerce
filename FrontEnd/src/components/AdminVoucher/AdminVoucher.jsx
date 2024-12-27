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
    DatePicker,
    Select
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as VoucherService from '../../Service/VoucherService';
const { Text, Title } = Typography;
const AdminVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [addForm] = Form.useForm(); // Form riêng cho thêm voucher
    const [updateForm] = Form.useForm(); // Form riêng cho cập nhật voucher
    const [stateVoucherDetails, setStateVoucherDetails] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

    useEffect(() => {
        fetchAllVouchers();
    }, []);

    const fetchAllVouchers = async () => {
        setIsLoading(true);
        try {
            const response = await VoucherService.getAllVoucher();
            if (response?.status === 'OK') {
                setVouchers(response.data);
            }
        } catch (error) {
            message.error('Không thể lấy danh sách voucher');
        } finally {
            setIsLoading(false);
        }
    };
    const fetchGetDetailsVoucher = async () => {
        const res = await VoucherService.getDetailsVoucher(rowSelected)
        if (res?.data) {
            setStateVoucherDetails({
                id: res?.data._id,
                code: res?.data?.code,
                discount: res?.data?.discount,
                expiryDate: res?.data?.expiryDate,
                status: res?.data?.status,
                maxIssuance: res?.data?.maxIssuance,
                maxUsage: res?.data?.maxUsage,
            });
        }
        return res
    }
    const mutation = useMutationHooks(
        async (newVoucher) => {
            const response = await VoucherService.createVoucher(newVoucher);
            return response;
        },
    );
    useEffect(() => {
        if (stateVoucherDetails) {
            addForm.setFieldsValue(stateVoucherDetails)
        }
    }, [addForm, stateVoucherDetails]);
    useEffect(() => {
        if (stateVoucherDetails) {
            updateForm.setFieldsValue(stateVoucherDetails)
        }
    }, [updateForm, stateVoucherDetails]);
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsVoucher()
        }
    }, [rowSelected]);

    useEffect(() => {
        if (mutation.isSuccess) {
            const response = mutation.data;

            if (response && response.message === 'Create voucher successfully') {
                message.success('Voucher được tạo thành công!');
                setIsModalOpen(false);
                addForm.resetFields();
                updateForm.resetFields();
                setVouchers([...vouchers, response.data]);
            } else {
                message.error('Vui lòng nhập đủ các thông tin của voucher!');
            }
        }

        if (mutation.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutation.isSuccess, mutation.isError, mutation.data]);



    const handleDeleteVoucher = (record) => {
        Modal.confirm({
            title: `Xác nhận xóa voucher: ${record._id}`,
            content: 'Bạn có chắc chắn muốn xóa voucher này không?',
            onOk: async () => {
                try {
                    await VoucherService.deleteVoucher(record._id);
                    message.success('Xóa voucher thành công!');
                    fetchAllVouchers();
                } catch (error) {
                    message.error('Xóa voucher thất bại!');
                }
            },
        });
    };

    const handleDetailVoucher = (record) => {
        setRowSelected(record._id);
        setIsDrawerOpen(true);
    };

    const handleDeleteSelectedVouchers = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất một voucher để xóa.');
            return;
        }

        Modal.confirm({
            title: `Xóa ${selectedRowKeys.length} voucher`,
            content: 'Bạn có chắc chắn muốn xóa các voucher đã chọn?',
            onOk: async () => {
                try {
                    await VoucherService.deleteMultipleVouchers(selectedRowKeys);
                    message.success('Xóa voucher thành công!');
                    fetchAllVouchers();
                    setSelectedRowKeys([]);
                } catch (error) {
                    message.error('Xóa voucher thất bại!');
                }
            },
        });
    };
    const columns = [
        { title: 'ID', dataIndex: '_id', key: '_id', width: '200px' },
        { title: 'Code', dataIndex: 'code', key: 'code', width: '150px' },
        { title: 'Discount', dataIndex: 'discount', key: 'discount', width: '100px' },
        {
            title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate', width: '150px', render: (expiryDate) => {
                const date = new Date(expiryDate);
                return date.toLocaleDateString();
            }
        },
        { title: 'Status', dataIndex: 'status', key: 'status', width: '100px' },
        { title: 'Max Issuance', dataIndex: 'maxIssuance', key: 'maxIssuance', width: '120px' },
        { title: 'Max Usage', dataIndex: 'maxUsage', key: 'maxUsage', width: '120px' },
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
                        onClick={() => handleDetailVoucher(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDeleteVoucher(record)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        updateForm.resetFields();
        addForm.resetFields();
    };
    const onFinish = (values) => {
        const newVoucher = {
            ...values,
            expiryDate: values['expiryDate']?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

        };
        mutation.mutate(newVoucher); // Gửi yêu cầu tạo voucher
    };
    const mutationUpdateVoucher = useMutationHooks(
        (data) => {
            const { id, ...restData } = data;
            console.log('Dữ liệu trong mutationUpdateVoucher:', { id, restData });

            const res = VoucherService.updateVoucher(id, restData); // Gọi hàm updateProduct với đúng tham số
            return res;
        },
    );
    const onFinishUpdateVoucher = (values) => {
        const data = {
            ...values,
            expiryDate: values['expiryDate']?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        };
        console.log('data', data);
        // Truyền id, access_token và dữ liệu cần cập nhật vào mutate
        mutationUpdateVoucher.mutate({ id: rowSelected, ...data });
    };
    useEffect(() => {
        if (mutationUpdateVoucher.isSuccess) {
            const responseUpdate = mutationUpdateVoucher.data;

            if (responseUpdate && responseUpdate.message === 'Update voucher successfully') {
                message.success('Voucher đã được cập nhật thành công!');
                setIsDrawerOpen(false); // Tắt modal

                // Cập nhật danh sách sản phẩm bằng cách thay thế sản phẩm cũ với sản phẩm mới
                setVouchers(prevVouchers =>
                    prevVouchers.map(voucher =>
                        voucher._id === responseUpdate.data._id ? responseUpdate.data : voucher
                    )
                );
            } else {
                message.error('Có lỗi khi cập nhật voucher!');
            }
        }

        if (mutationUpdateVoucher.isError) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }, [mutationUpdateVoucher.isSuccess, mutationUpdateVoucher.isError, mutationUpdateVoucher.data]);

    return (
        <div style={{ padding: '20px', background: '#fff' }}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Title level={2} style={{ margin: 0 }}>Quản lý Voucher</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                            Thêm Voucher
                        </Button>
                        {selectedRowKeys.length > 0 && (
                            <Button
                                type="primary"
                                danger
                                onClick={handleDeleteSelectedVouchers}
                            >
                                Xóa các voucher đã chọn
                            </Button>
                        )}
                    </div>
                </Col>
                <Col span={24}>
                    <Input.Search placeholder="Tìm voucher..." style={{ marginBottom: '10px' }} allowClear />
                </Col>
                <Col span={24}>
                    <Table
                        bordered
                        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                        columns={columns}
                        dataSource={vouchers}
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

            <Modal title="Thêm Voucher Mới" open={isModalOpen} onCancel={handleCancel} footer={null} width={800} maskClosable={false}>
                <Form form={addForm} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="code"
                        label="Mã voucher"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã voucher' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Mã voucher phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mã voucher" />
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Mức giảm giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mức giảm giá' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Mức giảm giá phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mức giảm giá" />
                    </Form.Item>
                    <Form.Item
                        name="expiryDate"
                        label="Ngày hết hạn"
                        rules={[
                            { required: true, message: 'Vui lòng chọn ngày hết hạn' },
                        ]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"

                        />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Trạng thái"
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="maxIssuance"
                        label="Số lượng phát hành tối đa"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng phát hành tối đa' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Số lượng phát hành tối đa phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lượng phát hành tối đa" />
                    </Form.Item>
                    <Form.Item
                        name="maxUsage"
                        label="Số lần sử dụng tối đa"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lần sử dụng tối đa' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Số lần sử dụng tối đa phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lần sử dụng tối đa" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
                        Thêm voucher
                    </Button>
                </Form>
            </Modal>
            <Drawer
                title={<Title level={3}>Chỉnh sửa voucher</Title>}
                width={600}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                maskClosable={true}
            >
                <Form form={updateForm} layout="vertical" onFinish={onFinishUpdateVoucher}>
                    <Form.Item
                        name="code"
                        label="Mã voucher"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã voucher' },
                            {
                                validator: (_, value) =>
                                    value && value.trim().length < 3
                                        ? Promise.reject(new Error('Mã voucher phải có ít nhất 3 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mã voucher" />
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Mức giảm giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mức giảm giá' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Mức giảm giá phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập mức giảm giá" />
                    </Form.Item>
                    <Form.Item
                        name="expiryDate"
                        label="Ngày hết hạn"
                        rules={[
                            { required: true, message: 'Vui lòng chọn ngày hết hạn' },
                        ]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Trạng thái"
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="maxIssuance"
                        label="Số lượng phát hành tối đa"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng phát hành tối đa' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Số lượng phát hành tối đa phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lượng phát hành tối đa" />
                    </Form.Item>
                    <Form.Item
                        name="maxUsage"
                        label="Số lần sử dụng tối đa"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lần sử dụng tối đa' },
                            {
                                validator: (_, value) =>
                                    value && !/^\d+$/.test(value)
                                        ? Promise.reject(new Error('Số lần sử dụng tối đa phải là số'))
                                        : Promise.resolve(),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lần sử dụng tối đa" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={mutationUpdateVoucher.isLoading} >
                        Lưu thông tin voucher
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
};

export default AdminVoucher;