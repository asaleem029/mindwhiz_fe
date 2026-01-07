import React, { useState, useEffect } from "react";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { api } from "@/utils/api";

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get('/products');
      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
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
        {products?.map((product) => (
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
