import { useEffect, useState } from 'react';
import { Card, Select, Table, message, Grid } from 'antd';
import api from '../api';
import { Customer } from '../models/Customer';

const { Option } = Select;
const { useBreakpoint } = Grid;

const Workflow = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const screens = useBreakpoint();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/api/customers');
            setCustomers(res.data);
        } catch (err) {
            message.error('Failed to fetch customers');
        }
    };

    const handleStatusChange = async (id: string, status: Customer['status']) => {
        try {
            await api.post(`/api/customers/${id}/status`, { status });
            message.success(`Status updated to ${status}`);
            fetchCustomers(); // refresh
        } catch (err) {
            message.error('Failed to update status');
        }
    };

    return (
        <Card title="Workflow Automation" bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <div style={{ overflowX: 'auto' }}>
                <Table
                    dataSource={customers}
                    rowKey="customerId"
                    pagination={{ pageSize: 5 }}
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'Credit Score', dataIndex: 'creditScore' },
                        { title: 'Current Status', dataIndex: 'status' },
                        {
                            title: 'Update Status',
                            render: (_, record) => (
                                <Select
                                    value={record.status}
                                    style={{ width: 140 }}
                                    onChange={(value) => handleStatusChange(record.customerId, value)}
                                >
                                    <Option value="Review">Review</Option>
                                    <Option value="Approved">Approved</Option>
                                    <Option value="Rejected">Rejected</Option>
                                </Select>
                            )
                        }
                    ]}
                />
            </div>
        </Card>
    );
};

export default Workflow;
