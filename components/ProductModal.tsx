import React from 'react';
import { Product } from './ProductCard';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const availability = product.availability || (product.available ? 'In Stock' : 'Out of Stock');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-description">{product.description ?? 'No description available.'}</p>
            <p className="modal-price">${product.price}</p>
            <p className={`modal-availability ${availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
              {availability}
            </p>
            <div className="modal-actions">
              <button className="btn-add-cart">Add to Cart</button>
              <button className="btn-close" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

