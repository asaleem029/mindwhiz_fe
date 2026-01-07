import React from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    available?: boolean;
    availability?: 'In Stock' | 'Out of Stock';
}

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <button 
                    className="btn-view-details"
                    onClick={() => onViewDetails(product)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};
