import { Badge, Card, Progress, Table, Tag, Grid } from 'antd';
import { useEffect, useState } from 'react';
import api from '../api';
import { Customer } from '../models/Customer';
import { calculateRiskScore } from '../utils/calculateRiskScore';

const { useBreakpoint } = Grid;

const RiskAssessment = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const screens = useBreakpoint();

    useEffect(() => {
        api.get('/api/customers').then(res => {
            setCustomers(res.data);

            res.data.forEach((c: Customer) => {
                const score = calculateRiskScore(c);
                if (score < 40) {
                    api.post('/api/customers/alerts', {
                        customerId: c.customerId,
                        riskScore: score
                    });
                }
            });
        });
    }, []);

    const getRiskTag = (score: number) => {
        if (score >= 75) return <Tag color="green">Low</Tag>;
        if (score >= 50) return <Tag color="orange">Medium</Tag>;
        return <Tag color="red">High</Tag>;
    };

    return (
        <Card title="Customer Risk Assessment" bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <div style={{ overflowX: 'auto' }}>
                <Table
                    dataSource={customers}
                    rowKey="customerId"
                    pagination={{ pageSize: 5 }}
                    columns={[
                        { title: 'Name', dataIndex: 'name', responsive: ['xs', 'sm', 'md', 'lg', 'xl'] },
                        { title: 'Credit Score', dataIndex: 'creditScore' },
                        {
                            title: 'Risk Score',
                            render: (_, record) => {
                                const score = calculateRiskScore(record);
                                return (
                                    <Progress
                                        percent={score}
                                        steps={10}
                                        strokeColor={score > 75 ? 'green' : score > 50 ? 'orange' : 'red'}
                                    />
                                );
                            }
                        },
                        {
                            title: 'Risk Level',
                            render: (_, record) => {
                                const score = calculateRiskScore(record);
                                return getRiskTag(score);
                            }
                        },
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            render: (status) => (
                                <Badge
                                    status={
                                        status === 'Approved'
                                            ? 'success'
                                            : status === 'Rejected'
                                                ? 'error'
                                                : 'processing'
                                    }
                                    text={status}
                                />
                            )
                        }
                    ]}
                />
            </div>
        </Card>
    );
};

export default RiskAssessment;
