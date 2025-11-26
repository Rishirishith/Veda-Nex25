// pages/products.js - Amazon Products Page
import React from 'react';
import ProductGrid from '../src/components/ProductGrid';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Ayurvedic Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic Ayurvedic products sourced from trusted suppliers. 
              Each product is carefully selected to support your natural wellness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-green-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span>Customer Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid />
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Important Disclaimer
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            As an Amazon Associate, we earn from qualifying purchases. The products shown are 
            for informational purposes only and are not intended to diagnose, treat, cure, or 
            prevent any disease. Always consult with a healthcare professional before starting 
            any new supplement or health regimen. Individual results may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;