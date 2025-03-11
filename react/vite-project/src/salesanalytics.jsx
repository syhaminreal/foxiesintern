import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
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
      <h2 className="text-center my-4">Sales Analytics</h2>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary mx-2" onClick={() => setTimeFrame("daily")}>
          Daily
        </button>
        <button className="btn btn-primary mx-2" onClick={() => setTimeFrame("monthly")}>
          Monthly
        </button>
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
