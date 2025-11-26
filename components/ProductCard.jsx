// components/ProductCard.jsx - Individual Product Card Component
import React from 'react';
import Image from 'next/image';

const ProductCard = ({ product, affiliateTag = '' }) => {
  const handleBuyClick = () => {
    // Add affiliate tag to URL if provided
    let productUrl = product.url;
    if (affiliateTag && !productUrl.includes('tag=')) {
      const separator = productUrl.includes('?') ? '&' : '?';
      productUrl = `${productUrl}${separator}tag=${affiliateTag}`;
    }
    
    // Open in new tab with proper referrer policy
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-green-100 group">
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image || '/img/ayurvedic-placeholder.jpg'}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => {
            e.target.src = '/img/ayurvedic-placeholder.jpg';
          }}
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-3 min-h-[4rem]">
            {product.description}
          </p>
        )}

        {/* Category Tag */}
        {product.category && (
          <div className="flex items-center">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              🌿 {product.category}
            </span>
          </div>
        )}

        {/* Price & Rating */}
        <div className="flex items-center justify-between">
          {product.price && (
            <div className="text-lg font-bold text-green-600">
              {product.price}
            </div>
          )}
          {product.rating && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{product.rating}</span>
              {product.reviews && (
                <span className="ml-1">({product.reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Benefits/Features */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Key Benefits:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {product.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1 flex-shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={handleBuyClick}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          <span>Buy on Amazon</span>
        </button>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-blue-500 mr-1">🚚</span>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-1">🛡️</span>
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;