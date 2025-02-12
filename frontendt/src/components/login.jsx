import { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (ev) => {
        setForm({ ...form, [ev.target.name]: ev.target.value });
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("/login", form);
            if (data.user.type === "Customer") {
                localStorage.setItem("authToken", data.token);
                navigate("/");
            } else {
                toast.error("Access Denied");
            }
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Col xl={4} className="bg-white mx-auto my-3 py-3 rounded-2 shadow p-4">
            <Row>
                <Col className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 form-check">
                            <Form.Check
                                type="checkbox"
                                label="Remember Me"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                        </Form.Group>

                        <div className="mb-3 d-grid">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Log in"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};