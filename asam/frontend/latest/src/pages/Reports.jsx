// const Reports = () => {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl mb-4">Sales Reports</h2>
//         <p>Here are your reports.</p>
//       </div>
//     );
//   };
  
//  
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, Nav, Table } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' });
  
  // Sample data - would be replaced with actual API calls in a real application
  const monthlyData = [
    { name: 'Jan', sales: 4000, profit: 2400, expenses: 1600 },
    { name: 'Feb', sales: 3000, profit: 1398, expenses: 1602 },
    { name: 'Mar', sales: 2000, profit: 9800, expenses: 2200 },
    { name: 'Apr', sales: 2780, profit: 3908, expenses: 2000 },
    { name: 'May', sales: 1890, profit: 4800, expenses: 2181 },
    { name: 'Jun', sales: 2390, profit: 3800, expenses: 2500 },
    { name: 'Jul', sales: 3490, profit: 4300, expenses: 2100 },
    { name: 'Aug', sales: 4000, profit: 2400, expenses: 1600 },
    { name: 'Sep', sales: 3000, profit: 1398, expenses: 1602 },
    { name: 'Oct', sales: 2000, profit: 9800, expenses: 2200 },
    { name: 'Nov', sales: 2780, profit: 3908, expenses: 2000 },
    { name: 'Dec', sales: 1890, profit: 4800, expenses: 2181 },
  ];
  
  const dailyData = [
    { name: '1', sales: 400, profit: 240, expenses: 160 },
    { name: '2', sales: 300, profit: 139, expenses: 161 },
    { name: '3', sales: 200, profit: 980, expenses: 220 },
    { name: '4', sales: 278, profit: 390, expenses: 200 },
    { name: '5', sales: 189, profit: 480, expenses: 218 },
    { name: '6', sales: 239, profit: 380, expenses: 250 },
    { name: '7', sales: 349, profit: 430, expenses: 210 },
    { name: '8', sales: 400, profit: 240, expenses: 160 },
    { name: '9', sales: 300, profit: 139, expenses: 161 },
    { name: '10', sales: 200, profit: 980, expenses: 220 },
    // More daily data would be added here
  ];
  
  // Choose which data to display based on timePeriod
  const displayData = timePeriod === 'monthly' ? monthlyData : dailyData;
  
  // For the pie chart - product category breakdown
  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Food', value: 300 },
    { name: 'Books', value: 200 },
    { name: 'Other', value: 100 }
  ];
  
  // Table data for top products
  const topProducts = [
    { id: 1, name: 'Laptop', sales: 245, revenue: 245000 },
    { id: 2, name: 'Smartphone', sales: 190, revenue: 95000 },
    { id: 3, name: 'Headphones', sales: 150, revenue: 15000 },
    { id: 4, name: 'Monitor', sales: 120, revenue: 36000 },
    { id: 5, name: 'Keyboard', sales: 100, revenue: 10000 },
  ];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h1>Sales Analysis Dashboard</h1>
        </Col>
      </Row>
      
      {/* Controls */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Time Period</Form.Label>
                  <Form.Select 
                    value={timePeriod} 
                    onChange={(e) => setTimePeriod(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={dateRange.start} 
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={dateRange.end} 
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button variant="primary">Apply Filters</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <div className="text-center">
                    <h3>Total Sales</h3>
                    <h2 className="text-primary">$124,500</h2>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <h3>Total Profit</h3>
                    <h2 className="text-success">$45,300</h2>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <h3>Profit Margin</h3>
                    <h2 className="text-info">36.4%</h2>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Charts Row */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="h-100">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="sales">
                <Nav.Item>
                  <Nav.Link eventKey="sales">Sales</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="profit">Profit</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <h5>{timePeriod === 'monthly' ? 'Monthly' : 'Daily'} Sales Overview</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="h-100">
            <Card.Body>
              <h5>Sales by Category</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Second Row of Charts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Sales vs Expenses</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="expenses" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Top Selling Products</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;