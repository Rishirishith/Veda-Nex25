// js/currency-converter.js - Real-time USD to INR conversion for Amazon products

class CurrencyConverter {
    constructor() {
        this.exchangeRate = 84.00; // USD to INR rate (approximate)
        this.lastUpdated = new Date();
        this.initializeRealTimeRates();
    }

    // Initialize with real-time exchange rates
    async initializeRealTimeRates() {
        try {
            // Using a free exchange rate API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            
            if (data.rates && data.rates.INR) {
                this.exchangeRate = data.rates.INR;
                this.lastUpdated = new Date();
                console.log(`Exchange rate updated: 1 USD = ₹${this.exchangeRate}`);
                
                // Update all product prices on the page
                this.updateProductPrices();
            }
        } catch (error) {
            console.log('Using fallback exchange rate:', this.exchangeRate);
            // Fallback to manual rate if API fails
        }
    }

    // Convert USD to INR
    convertUSDToINR(usdAmount) {
        // Remove $ symbol and convert to number
        const numericAmount = parseFloat(usdAmount.replace('$', ''));
        const inrAmount = Math.round(numericAmount * this.exchangeRate);
        return `₹${inrAmount.toLocaleString('en-IN')}`;
    }

    // Convert INR to USD (for reference)
    convertINRToUSD(inrAmount) {
        const numericAmount = parseFloat(inrAmount.replace('₹', '').replace(/,/g, ''));
        const usdAmount = (numericAmount / this.exchangeRate).toFixed(2);
        return `$${usdAmount}`;
    }

    // Update product prices on the page
    updateProductPrices() {
        // Update prices in product cards
        const priceElements = document.querySelectorAll('.amazon-product-price, .product-price');
        priceElements.forEach(element => {
            const originalPrice = element.getAttribute('data-usd-price');
            if (originalPrice) {
                const convertedPrice = this.convertUSDToINR(originalPrice);
                element.textContent = convertedPrice;
            }
        });

        // Update price tooltips
        this.addPriceTooltips();
    }

    // Add tooltips showing USD equivalent
    addPriceTooltips() {
        const priceElements = document.querySelectorAll('.amazon-product-price, .product-price');
        priceElements.forEach(element => {
            const inrPrice = element.textContent;
            const usdPrice = this.convertINRToUSD(inrPrice);
            element.title = `Original: ${usdPrice} | Rate: 1 USD = ₹${this.exchangeRate.toFixed(2)}`;
        });
    }

    // Get current exchange rate info
    getExchangeRateInfo() {
        return {
            rate: this.exchangeRate,
            lastUpdated: this.lastUpdated,
            formattedRate: `1 USD = ₹${this.exchangeRate.toFixed(2)}`
        };
    }

    // Format Indian currency
    formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Regional pricing suggestions
    getRegionalPricing(baseUSDPrice) {
        const usdAmount = parseFloat(baseUSDPrice.replace('$', ''));
        const inrAmount = usdAmount * this.exchangeRate;
        
        return {
            india: this.formatINR(inrAmount),
            discount: Math.round(inrAmount * 0.1), // 10% local discount
            shipping: 'Free delivery in India',
            cod: 'Cash on Delivery available',
            emi: `EMI starting ₹${Math.round(inrAmount / 12)}/month`
        };
    }
}

// Initialize currency converter
window.currencyConverter = new CurrencyConverter();

// Amazon India specific functionality
class AmazonIndiaIntegration {
    constructor() {
        this.affiliateTag = 'vedanex0c-21'; // Amazon India affiliate tag
        this.baseURL = 'https://www.amazon.in';
        this.setupIndianFeatures();
    }

    // Setup India-specific features
    setupIndianFeatures() {
        // Add India-specific payment methods
        this.addPaymentMethods();
        
        // Add regional language support
        this.addLanguageSupport();
        
        // Add delivery information
        this.addDeliveryInfo();
    }

    // Add Indian payment methods info
    addPaymentMethods() {
        const paymentInfo = {
            methods: [
                '💳 Credit/Debit Cards',
                '📱 UPI (PhonePe, GPay, Paytm)',
                '💰 Cash on Delivery',
                '🏦 Net Banking',
                '📱 Amazon Pay',
                '💳 EMI Options'
            ],
            emi: 'No Cost EMI available on orders above ₹1,999',
            cod: 'Cash on Delivery available for orders under ₹50,000'
        };

        return paymentInfo;
    }

    // Add regional language support
    addLanguageSupport() {
        const languages = [
            { code: 'hi', name: 'हिंदी' },
            { code: 'ta', name: 'தமிழ்' },
            { code: 'te', name: 'తెలుగు' },
            { code: 'kn', name: 'ಕನ್ನಡ' },
            { code: 'ml', name: 'മലയാളം' },
            { code: 'bn', name: 'বাংলা' },
            { code: 'gu', name: 'ગુજરાતી' },
            { code: 'mr', name: 'मराठी' }
        ];

        return languages;
    }

    // Add delivery information for India
    addDeliveryInfo() {
        return {
            freeDelivery: 'Free delivery on orders above ₹499',
            primeFree: 'Free delivery with Amazon Prime',
            codAvailable: 'Cash on Delivery available',
            estimatedDays: '2-4 business days in major cities',
            returnPolicy: '10-day return policy'
        };
    }

    // Generate India-specific product URL
    generateIndiaURL(productId, productTitle) {
        const cleanTitle = productTitle.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
        
        return `${this.baseURL}/dp/${productId}?tag=${this.affiliateTag}&linkCode=ogi&th=1&psc=1`;
    }

    // Add India-specific product badges
    getIndiaBadges(product) {
        const badges = [];
        
        if (parseFloat(product.price.replace('₹', '').replace(',', '')) > 1999) {
            badges.push('🚚 Free Delivery');
        }
        
        if (parseFloat(product.price.replace('₹', '').replace(',', '')) > 1999) {
            badges.push('💳 No Cost EMI');
        }
        
        badges.push('💰 COD Available');
        
        return badges;
    }
}

// Initialize Amazon India integration
window.amazonIndia = new AmazonIndiaIntegration();

// Enhanced product display for Indian market
function enhanceProductDisplayForIndia() {
    // Add currency converter info to page
    const exchangeRateInfo = window.currencyConverter.getExchangeRateInfo();
    
    // Create currency info banner
    const currencyBanner = document.createElement('div');
    currencyBanner.className = 'currency-info-banner';
    currencyBanner.innerHTML = `
        <div style="background: #e8f5e8; padding: 10px; border-radius: 8px; margin: 10px 0; text-align: center;">
            <span style="font-size: 14px; color: #2e7d32;">
                💱 Current Exchange Rate: ${exchangeRateInfo.formattedRate} | 
                Last Updated: ${exchangeRateInfo.lastUpdated.toLocaleString('en-IN')}
            </span>
        </div>
    `;
    
    return currencyBanner;
}

// Auto-update prices every hour
setInterval(() => {
    if (window.currencyConverter) {
        window.currencyConverter.initializeRealTimeRates();
    }
}, 3600000); // 1 hour = 3600000 ms