import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    description: '',
    price: '',
    discounted_price: '', // Will store ID
    images: [],
    categoryId: '',
    brandId: '',
    status: true,
    featured: false
  });
  
  // States for dropdown options
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for image uploads
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch categories, brands, and prices on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, these would be actual API calls
        // For demo purposes, using placeholder data
        setCategories([
          { _id: '1', name: 'Electronics' },
          { _id: '2', name: 'Clothing' },
          { _id: '3', name: 'Home & Kitchen' }
        ]);
        
        setBrands([
          { _id: '1', name: 'Apple' },
          { _id: '2', name: 'Samsung' },
          { _id: '3', name: 'Nike' }
        ]);
        
        setPrices([
          { _id: '1', name: 'Standard Discount' },
          { _id: '2', name: 'Holiday Special' },
          { _id: '3', name: 'Clearance Sale' }
        ]);
      } catch (err) {
        setError('Failed to load form data. Please refresh the page.');
      }
    };
    
    fetchData();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    
    // In a real application, you would upload these to your server/cloud storage
    // For demo purposes, we'll just simulate the upload
    setTimeout(() => {
      const uploadedFileUrls = files.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...uploadedFileUrls]);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedFileUrls]
      }));
      setIsUploading(false);
    }, 1500);
  };
  
  // Remove uploaded image
  const removeImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    
    const updatedFormImages = [...formData.images];
    updatedFormImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: updatedFormImages
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.name || !formData.summary || !formData.description || !formData.price ||
        !formData.discounted_price || formData.images.length === 0 || !formData.categoryId || !formData.brandId) {
      setError('Please fill in all required fields and upload at least one image.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call to create the product
      // For demo purposes, simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Product data to be submitted:', formData);
      
      // Success
      setSuccess('Product created successfully!');
      
      // Reset form after success
      setTimeout(() => {
        navigate('/products'); // Navigate to products list
      }, 2000);
    } catch (err) {
      setError('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Create New Product</h1>
          
          <Card className="shadow-sm">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Summary*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        A brief overview of the product (shown in listings)
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Detailed product description (shown on product page)
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($)*</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Discount Type*</Form.Label>
                      <Form.Select
                        name="discounted_price"
                        value={formData.discounted_price}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Discount Type</option>
                        {prices.map(price => (
                          <option key={price._id} value={price._id}>
                            {price.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Category*</Form.Label>
                      <Form.Select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Brand*</Form.Label>
                      <Form.Select
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand._id} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Row>
                        <Col xs={6}>
                          <Form.Check
                            type="switch"
                            id="status-switch"
                            label="Active Status"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col xs={6}>
                          <Form.Check
                            type="switch"
                            id="featured-switch"
                            label="Featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>Product Images*</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <Form.Text className="text-muted">
                    Upload at least one product image. You can select multiple files.
                  </Form.Text>
                  
                  {isUploading && (
                    <div className="text-center my-3">
                      <Spinner animation="border" variant="primary" size="sm" />
                      <span className="ms-2">Uploading images...</span>
                    </div>
                  )}
                  
                  {uploadedImages.length > 0 && (
                    <Row className="mt-3">
                      {uploadedImages.map((image, index) => (
                        <Col key={index} xs={6} md={3} className="mb-3">
                          <div className="position-relative">
                            <img 
                              src={image}
                              alt={`Product preview ${index + 1}`}
                              className="img-thumbnail"
                              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Form.Group>
                
                <div className="d-flex justify-content-end gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/products')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Creating Product...
                      </>
                    ) : 'Create Product'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPage;