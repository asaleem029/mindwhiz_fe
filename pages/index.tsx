import React, { useState, useEffect } from "react";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { api } from "@/utils/api";

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://via.placeholder.com/300",
      description: "High-quality wireless headphones with noise cancellation",
      availability: "In Stock",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 249.99,
      image: "https://via.placeholder.com/300",
      description: "Feature-rich smartwatch with health tracking",
      availability: "In Stock",
    },
    {
      id: "3",
      name: "Laptop Stand",
      price: 49.99,
      image: "https://via.placeholder.com/300",
      description: "Ergonomic aluminum laptop stand",
      availability: "In Stock",
    },
    {
      id: "4",
      name: "USB-C Hub",
      price: 39.99,
      image: "https://via.placeholder.com/300",
      description: "Multi-port USB-C hub with HDMI and SD card reader",
      availability: "Out of Stock",
    },
    {
      id: "5",
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "https://via.placeholder.com/300",
      description: "RGB mechanical keyboard with cherry switches",
      availability: "In Stock",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
      </div>
      <div className="product-listing">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductListing;
