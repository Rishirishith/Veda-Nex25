// components/ProductGrid.jsx - Main Products Grid Component
import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products = [], 
  affiliateTag = '',
  showFilters = true,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  title = '🌿 Ayurvedic Products'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = products.reduce((acc, product) => {
      if (product.category && !acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    return ['all', ...cats.sort()];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || 0);
          const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || 0);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || 0);
          const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || 0);
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => {
          const ratingA = parseFloat(a.rating || 0);
          const ratingB = parseFloat(b.rating || 0);
          return ratingB - ratingA;
        });
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  const categoryIcons = {
    'all': '🌿',
    'immunity': '🛡️',
    'herbs': '🌱',
    'oils': '🫒',
    'supplements': '💊',
    'tea': '🍃',
    'skincare': '✨',
    'digestion': '🌀',
    'stress': '🧘',
    'energy': '⚡',
    'detox': '🌿',
    'pain': '💆'
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover authentic Ayurvedic products sourced from trusted brands. 
          Each product is carefully selected to support your natural wellness journey.
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-green-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  {categoryIcons[category.toLowerCase()] || '🌿'} {' '}
                  {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="default">Default</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== 'all' && (
                <span className="ml-1">
                  in <span className="font-medium text-green-600">{selectedCategory}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`grid ${gridCols} gap-6 md:gap-8`}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              affiliateTag={affiliateTag}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or check back later for new products.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('default');
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Trust Section */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🌟 Why Choose Our Ayurvedic Products?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-500 text-lg">✓</span>
              <span className="text-gray-700">Authentic & Traditional</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-blue-500 text-lg">🔬</span>
              <span className="text-gray-700">Quality Tested</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-orange-500 text-lg">🚚</span>
              <span className="text-gray-700">Fast Amazon Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 max-w-3xl mx-auto">
          * As an Amazon Associate, we earn from qualifying purchases. 
          Prices and availability are subject to change. 
          Please consult with a healthcare professional before starting any new supplement regimen.
        </p>
      </div>
    </div>
  );
};

export default ProductGrid;