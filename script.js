document.addEventListener('DOMContentLoaded', function() {
    var currencySelect = document.getElementById('currency');
    var unitSelect = document.getElementById('unit');
    var prices = {
        'USD': {
            'basic': '$10',
            'standard': '$20',
            'premium': '$30'
        },
        'EUR': {
            'basic': '€8',
            'standard': '€16',
            'premium': '€24'
        },
        'GBP': {
            'basic': '£7',
            'standard': '£14',
            'premium': '£21'
        },
        'INR': {
            'basic': '₹500',
            'standard': '₹1500',
            'premium': '₹2000'
        }
    };

    currencySelect.addEventListener('change', updatePrices);
    unitSelect.addEventListener('change', updatePrices);

    function updatePrices() {
        var currency = currencySelect.value;
        var unit = unitSelect.value;
        var pricesElements = document.querySelectorAll('.price-col h3');

        pricesElements.forEach(function(price, index) {
            var planType = index === 1 ? 'standard' : (index === 0 ? 'basic' : 'premium');
            var selectedPrice = prices[currency][planType];

            if (unit === 'annually') {
                selectedPrice = applyAnnualDiscount(selectedPrice, currency);
            }

            price.textContent = selectedPrice + '/' + (unit === 'annually' ? 'year' : 'month');
        });
    }

    function applyAnnualDiscount(price, currency) {
        var currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'INR': '₹'
        };

        var annualPrice = parseFloat(price.replace(/[^\d.-]/g, '')) * 12 * 0.9;
        return currencySymbols[currency] + annualPrice.toFixed(2);
    }

    // Initial update of prices when the page loads
    updatePrices();
});
