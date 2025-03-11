import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import salesData from "./sales.json";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SalesAnalytics = () => {
  const [sales, setSales] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");

  useEffect(() => {
    setSales(salesData);
  }, []);

  const groupedSales = sales.reduce((acc, sale) => {
    const date = timeFrame === "monthly" ? sale.date.slice(0, 7) : sale.date;
    acc[date] = (acc[date] || 0) + sale.amount;
    return acc;
  }, {});

  const labels = Object.keys(groupedSales);
  const dataValues = Object.values(groupedSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales Growth",
        data: dataValues,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <Container>
      <h2 className="text-center my-4">Admin Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Total Sales</h5>
            <h3>${dataValues.reduce((a, b) => a + b, 0)}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Average Sales</h5>
            <h3>${(dataValues.reduce((a, b) => a + b, 0) / dataValues.length).toFixed(2)}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Top Sales Day</h5>
            <h3>{labels[dataValues.indexOf(Math.max(...dataValues))]}</h3>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mb-3">
        <Button className="mx-2" variant="primary" onClick={() => setTimeFrame("daily")}>
          Daily
        </Button>
        <Button className="mx-2" variant="primary" onClick={() => setTimeFrame("monthly")}>
          Monthly
        </Button>
      </div>
      <Row>
        <Col md={8}>
          <Line data={chartData} />
        </Col>
        <Col md={4}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sales Amount</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((date, index) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>${dataValues[index]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesAnalytics;
