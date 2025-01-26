import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

const HomePage = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [formData, setFormData] = useState({ id: "", name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      setData(
        data.map((item) =>
          item.id === parseInt(formData.id) ? { ...formData, id: parseInt(formData.id) } : item
        )
      );
    } else {
      setData([...data, { ...formData, id: data.length + 1 }]);
    }
    setFormData({ id: "", name: "", email: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <Card className="p-4 mb-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <form className="mb-4">
          <input
            type="hidden"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
          <div className="flex gap-4 mb-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border rounded p-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border rounded p-2 w-full"
            />
          </div>
          <Button onClick={handleSubmit} className="bg-blue-500 text-white">
            {formData.id ? "Update" : "Add"}
          </Button>
        </form>

        <Table className="w-full border rounded">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    className="mr-2 bg-green-500 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default HomePage;
