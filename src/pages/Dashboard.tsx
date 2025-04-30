import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Input } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import api from '../api';
import { Customer } from '../models/Customer';


export default function Dashboard() {
    const [data, setData] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/api/customers').then(res => setData(res.data));
    }, []);

    const filteredData = data.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const incomeVsExpenses = filteredData.map(c => ({
        name: c.name,
        income: c.monthlyIncome,
        expenses: c.monthlyExpenses
    }));

    const pieData = [
        { name: 'High Risk', value: filteredData.filter(d => d.creditScore < 600).length },
        { name: 'Medium Risk', value: filteredData.filter(d => d.creditScore >= 600 && d.creditScore < 750).length },
        { name: 'Low Risk', value: filteredData.filter(d => d.creditScore >= 750).length }
    ];

    const colors = ['#ff4d4f', '#faad14', '#52c41a'];

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24} md={8}>
                    <Card><Statistic title="Total Customers" value={filteredData.length} /></Card>
                </Col>
                <Col span={24} md={8}>
                    <Card><Statistic title="Avg Income" value={
                        Math.round(filteredData.reduce((sum, d) => sum + d.monthlyIncome, 0) / (filteredData.length || 1))
                    } /></Card>
                </Col>
                <Col span={24} md={8}>
                    <Card><Statistic title="Total Loans" value={
                        filteredData.reduce((sum, d) => sum + d.outstandingLoans, 0)
                    } /></Card>
                </Col>
            </Row>

            <Row style={{ margin: '20px 0' }}>
                <Col span={24}>
                    <Input.Search
                        placeholder="Search by name"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ maxWidth: 300 }}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24} md={12}>
                    <Card title="Income vs Expenses">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={incomeVsExpenses}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#1890ff" />
                                <Line type="monotone" dataKey="expenses" stroke="#ff4d4f" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                <Col span={24} md={12}>
                    <Card title="Risk Distribution">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                                    {pieData.map((_, i) => (
                                        <Cell key={i} fill={colors[i]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            <Card title="Customer Table" style={{ marginTop: 24 }}>
                <Table
                    dataSource={filteredData}
                    rowKey="customerId"
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            filterSearch: true,
                            filters: [...new Set(data.map(d => ({
                                text: d.name,
                                value: d.name
                            })))],
                            onFilter: (value, record) =>
                                record.name.toLowerCase().includes(String(value).toLowerCase())
                        },
                        { title: 'Credit Score', dataIndex: 'creditScore' },
                        { title: 'Income', dataIndex: 'monthlyIncome' },
                        { title: 'Status', dataIndex: 'status' },
                    ]}
                />
            </Card>
        </div>
    );
}
