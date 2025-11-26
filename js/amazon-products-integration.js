// js/amazon-products-integration.js - Amazon Product Integration for Chat
class AmazonProductsChat {
    constructor() {
        this.products = [];
        this.initializeProducts();
    }

    // Initialize products from our data file
    async initializeProducts() {
        try {
            // Import product data (for ES6 modules)
            const module = await import('../data/ayurvedicProducts.js');
            this.products = module.ayurvedicProducts;
        } catch (error) {
            console.log('Loading products from fallback data...');
            this.loadFallbackProducts();
        }
    }

    // Fallback product data in case module import fails
    loadFallbackProducts() {
        this.products = [
            {
                id: 1,
                title: "Organic Turmeric Curcumin Supplement with Black Pepper",
                description: "Premium quality turmeric curcumin capsules with black pepper extract for enhanced absorption. Supports joint health, immunity, and natural anti-inflammatory response.",
                image: "https://m.media-amazon.com/images/I/71uqX3Qe4UL._SL1500_.jpg",
                url: "https://www.amazon.in/dp/B078K6TVY2?tag=vedanex0c-21&linkCode=ogi&th=1&psc=1",
                price: "₹2,099",
                originalPrice: "$24.99",
                rating: "4.5",
                reviews: "2,847",
                category: "supplements",
                badge: "Best Seller",
                benefits: [
                    "Supports joint health and mobility",
                    "Natural anti-inflammatory properties",
                    "Enhanced with black pepper for absorption",
                    "Non-GMO and gluten-free"
                ]
            },
            {
                id: 2,
                title: "Pure Ashwagandha Root Powder - Organic Stress Relief",
                description: "Traditional Ashwagandha root powder sourced from organic farms. Known as an adaptogen to help manage stress and support energy levels.",
                image: "https://m.media-amazon.com/images/I/71+5nvmLnzL._SL1500_.jpg",
                url: "https://www.amazon.in/dp/B07Q4JTQGL?tag=vedanex0c-21&linkCode=ogi&th=1&psc=1",
                price: "₹1,675",
                originalPrice: "$19.95",
                rating: "4.7",
                reviews: "1,923",
                category: "herbs",
                benefits: [
                    "Helps manage stress and anxiety",
                    "Supports energy and vitality",
                    "Traditional Ayurvedic adaptogen",
                    "100% organic and pure"
                ]
            },
            {
                id: 3,
                title: "Cold-Pressed Sesame Oil for Ayurvedic Massage",
                description: "Pure, unrefined sesame oil perfect for Abhyanga (self-massage) and cooking.",
                image: "https://m.media-amazon.com/images/I/61YJOqDLqzL._SL1024_.jpg",
                url: "https://www.amazon.com/dp/B01M0TFSOL?tag=vedanex-20&linkCode=ogi&th=1&psc=1",
                price: "$16.99",
                rating: "4.3",
                reviews: "856",
                category: "oils",
                benefits: [
                    "Perfect for Abhyanga massage",
                    "Cold-pressed and unrefined",
                    "Rich in vitamin E and antioxidants",
                    "Suitable for cooking and skincare"
                ]
            },
            {
                id: 4,
                title: "Triphala Powder - Three Fruit Digestive Support",
                description: "Authentic Triphala powder made from three sacred fruits: Amalaki, Bibhitaki, and Haritaki.",
                image: "https://m.media-amazon.com/images/I/81X3dGZUjZL._SL1500_.jpg",
                url: "https://www.amazon.com/dp/B00L9HZJLM?tag=vedanex-20&linkCode=ogi&th=1&psc=1",
                price: "$22.50",
                rating: "4.6",
                reviews: "1,456",
                category: "digestion",
                benefits: [
                    "Supports healthy digestion",
                    "Natural detoxification",
                    "Traditional three-fruit formula",
                    "Rich in vitamin C and antioxidants"
                ]
            }
        ];
    }

    // Find products based on health condition
    findProductsForCondition(condition) {
        const conditionLower = condition.toLowerCase();
        let relevantProducts = [];

        // Map conditions to product categories and specific products
        const conditionMapping = {
            'diabetes': ['supplements', 'herbs'],
            'joint pain': ['supplements', 'oils'],
            'arthritis': ['supplements', 'oils'],
            'stress': ['herbs'],
            'anxiety': ['herbs'],
            'digestion': ['digestion', 'herbs'],
            'stomach': ['digestion'],
            'inflammation': ['supplements'],
            'immunity': ['supplements', 'herbs'],
            'massage': ['oils'],
            'skin': ['oils'],
            'energy': ['herbs', 'supplements']
        };

        // Find matching categories
        const matchingCategories = [];
        for (const [cond, categories] of Object.entries(conditionMapping)) {
            if (conditionLower.includes(cond)) {
                matchingCategories.push(...categories);
            }
        }

        // Get products from matching categories
        if (matchingCategories.length > 0) {
            relevantProducts = this.products.filter(product => 
                matchingCategories.includes(product.category)
            );
        }

        // If no specific match, return top-rated products
        if (relevantProducts.length === 0) {
            relevantProducts = this.products
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                .slice(0, 3);
        }

        return relevantProducts.slice(0, 4); // Max 4 products
    }

    // Generate product recommendation HTML for chat
    generateProductRecommendationHTML(products, condition = '') {
        if (!products || products.length === 0) return '';

        const conditionText = condition ? ` for ${condition}` : '';
        
        let html = `
        <div style="background: linear-gradient(135deg, #f0f8ff, #e8f5e8); padding: 20px; border-radius: 12px; margin: 15px 0; border-left: 4px solid var(--techwave-main-color);">
            <h4 style="color: var(--techwave-main-color); margin-bottom: 15px; display: flex; align-items: center;">
                🛒 Recommended Ayurvedic Products${conditionText}
            </h4>
            <div style="display: grid; gap: 15px;">
        `;

        products.forEach(product => {
            const stars = '★'.repeat(Math.floor(parseFloat(product.rating))) + 
                         '☆'.repeat(5 - Math.floor(parseFloat(product.rating)));
            
            // Add India-specific badges
            const inrPrice = parseFloat(product.price.replace('₹', '').replace(',', ''));
            const badges = [];
            if (inrPrice > 499) badges.push('<span style="background: #4CAF50; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; margin-right: 4px;">Free Delivery</span>');
            if (inrPrice > 1999) badges.push('<span style="background: #2196F3; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; margin-right: 4px;">No Cost EMI</span>');
            badges.push('<span style="background: #FF9800; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">COD</span>');
            
            html += `
                <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; gap: 15px; align-items: center;">
                    <img src="${product.image}" alt="${product.title}" style="width: 80px; height: 80px; border-radius: 6px; object-fit: cover; flex-shrink: 0;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBGOEZGIi8+CjxwYXRoIGQ9Ik0yNSAzNUg1NVY0NUgyNVYzNVoiIGZpbGw9IiM0QURFODAiLz4KPC9zdmc+Cg=='">
                    <div style="flex: 1;">
                        <h5 style="margin: 0 0 8px 0; color: var(--techwave-heading-color); font-size: 14px; line-height: 1.3;">${product.title}</h5>
                        <div style="margin-bottom: 6px;">
                            <span style="color: #ff9800; font-size: 14px;">${stars}</span>
                            <span style="color: var(--techwave-body-color); font-size: 12px; margin-left: 8px;">${product.rating} (${product.reviews} reviews)</span>
                        </div>
                        <div style="margin-bottom: 8px;">
                            ${badges.join('')}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="font-weight: bold; color: var(--techwave-main-color); font-size: 16px;">${product.price}</span>
                                ${product.originalPrice ? `<span style="color: #666; font-size: 11px; text-decoration: line-through; margin-left: 4px;">${product.originalPrice}</span>` : ''}
                            </div>
                            <a href="${product.url}" target="_blank" rel="noopener" style="background: #FF9900; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: 500; transition: all 0.3s ease;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                                🛒 Amazon.in
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
            <div style="margin-top: 15px; padding: 12px; background: rgba(33, 150, 243, 0.1); border-radius: 6px; font-size: 12px; color: var(--techwave-body-color);">
                <div style="margin-bottom: 8px;">
                    <strong>🇮🇳 India Specific:</strong> 
                    <span style="background: #4CAF50; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">Free Delivery ₹499+</span>
                    <span style="background: #FF9800; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">COD Available</span>
                    <span style="background: #2196F3; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">No Cost EMI</span>
                </div>
                <strong>💡 Disclaimer:</strong> As an Amazon Associate, we earn from qualifying purchases. These products are suggestions based on traditional Ayurvedic practices. Please consult with a healthcare professional before use.
            </div>
        </div>
        `;

        return html;
    }

    // Enhanced search for specific product requests
    searchProducts(query) {
        const queryLower = query.toLowerCase();
        
        // Direct product name searches
        const directMatches = this.products.filter(product => {
            return product.title.toLowerCase().includes(queryLower) ||
                   product.description.toLowerCase().includes(queryLower) ||
                   product.benefits.some(benefit => benefit.toLowerCase().includes(queryLower));
        });

        if (directMatches.length > 0) {
            return directMatches;
        }

        // Keyword-based searches
        const keywords = {
            'turmeric': [1],
            'ashwagandha': [2],
            'sesame': [3],
            'oil': [3],
            'triphala': [4],
            'digestive': [4],
            'supplement': [1, 2],
            'powder': [2, 4],
            'organic': [1, 2, 3, 4]
        };

        const matchingIds = [];
        for (const [keyword, ids] of Object.entries(keywords)) {
            if (queryLower.includes(keyword)) {
                matchingIds.push(...ids);
            }
        }

        if (matchingIds.length > 0) {
            return this.products.filter(product => matchingIds.includes(product.id));
        }

        return [];
    }
}

// Initialize the Amazon products chat integration
window.amazonProductsChat = new AmazonProductsChat();

// Function to integrate with existing chat system
window.getAmazonProductRecommendations = function(userInput, condition = '') {
    if (!window.amazonProductsChat) {
        console.log('Amazon products not initialized yet');
        return '';
    }

    // Check if user is asking for products specifically
    const productQueries = [
        'recommend products', 'suggest products', 'buy products',
        'amazon products', 'supplements', 'ayurvedic products',
        'where to buy', 'purchase', 'shopping', 'buy'
    ];

    const isProductQuery = productQueries.some(query => 
        userInput.toLowerCase().includes(query)
    );

    if (isProductQuery || condition) {
        const products = condition ? 
            window.amazonProductsChat.findProductsForCondition(condition) :
            window.amazonProductsChat.searchProducts(userInput);
            
        if (products.length > 0) {
            return window.amazonProductsChat.generateProductRecommendationHTML(products, condition);
        }
    }

    return '';
};