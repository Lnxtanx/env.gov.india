// India ROI Calculator Configuration
const indiaSectorData = {
    energy: {
        avgReturn: 0.18,
        riskFactor: 0.85,
        marketGrowth: 0.15,
        description: 'India\'s renewable energy sector shows strong growth with government targets of 500 GW by 2030.'
    },
    waste: {
        avgReturn: 0.14,
        riskFactor: 0.80,
        marketGrowth: 0.11,
        description: 'Waste management in India is growing with Swachh Bharat initiatives and increasing urbanization.'
    },
    agriculture: {
        avgReturn: 0.12,
        riskFactor: 0.75,
        marketGrowth: 0.09,
        description: 'Sustainable agriculture in India offers stable returns with growing organic farming adoption.'
    },
    transport: {
        avgReturn: 0.20,
        riskFactor: 0.75,
        marketGrowth: 0.18,
        description: 'Electric mobility in India shows high growth potential with EV policies and infrastructure development.'
    },
    textile: {
        avgReturn: 0.15,
        riskFactor: 0.80,
        marketGrowth: 0.12,
        description: 'Sustainable textile industry in India is growing with eco-friendly production methods and global demand.'
    }
};

// DOM Elements
const calculateIndiaButton = document.getElementById('calculate-india-roi');
const indiaInvestmentInput = document.getElementById('india-investment');
const indiaTimeframeInput = document.getElementById('india-timeframe');
const indiaSectorSelect = document.getElementById('india-sector');
const indiaResultDiv = document.getElementById('india-roi-result');
const currencyToggle = document.getElementById('currency-toggle');

// Track currency (default: INR)
let currentCurrency = 'INR';
const exchangeRate = 83; // 1 USD = 83 INR (approx)

// Calculate ROI
function calculateIndiaROI(investment, timeframe, sector) {
    const {avgReturn, riskFactor, marketGrowth} = indiaSectorData[sector];
    
    // Basic ROI calculation with compound interest
    const projectedReturn = investment * Math.pow(1 + (avgReturn * riskFactor), timeframe);
    const totalReturn = projectedReturn - investment;
    
    // Calculate annual returns
    const annualReturns = [];
    let currentValue = investment;
    for (let year = 1; year <= timeframe; year++) {
        currentValue *= (1 + (avgReturn * riskFactor));
        annualReturns.push({
            year,
            value: currentValue,
            profit: currentValue - investment
        });
    }

    // Market growth impact
    const marketSize = investment * Math.pow(1 + marketGrowth, timeframe);
    
    return {
        totalReturn,
        projectedValue: projectedReturn,
        annualReturns,
        marketSize,
        roi: ((projectedReturn - investment) / investment) * 100
    };
}

// Format currency
function formatIndiaCurrency(value) {
    if (currentCurrency === 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    } else {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value / exchangeRate);
    }
}

// Display Results
function displayIndiaResults(results, sector) {
    const {totalReturn, projectedValue, annualReturns, marketSize, roi} = results;
    
    let html = `
        <div class="result-summary">
            <h4>Investment Summary</h4>
            <p class="sector-description">${indiaSectorData[sector].description}</p>
            <div class="result-metrics">
                <div class="metric">
                    <span class="label">Total Return:</span>
                    <span class="value">${formatIndiaCurrency(totalReturn)}</span>
                </div>
                <div class="metric">
                    <span class="label">Projected Value:</span>
                    <span class="value">${formatIndiaCurrency(projectedValue)}</span>
                </div>
                <div class="metric">
                    <span class="label">ROI:</span>
                    <span class="value">${roi.toFixed(2)}%</span>
                </div>
            </div>
        </div>
        <div class="annual-breakdown">
            <h4>Annual Breakdown</h4>
            <div class="breakdown-table">
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Projected Value</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    annualReturns.forEach(year => {
        html += `
            <tr>
                <td>Year ${year.year}</td>
                <td>${formatIndiaCurrency(year.value)}</td>
                <td>${formatIndiaCurrency(year.profit)}</td>
            </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
        <div class="market-insight">
            <h4>Market Insight</h4>
            <p>Projected market size by end of investment period: ${formatIndiaCurrency(marketSize)}</p>
            <p class="india-insight">India's sustainable economy is projected to reach $1 trillion by 2030, creating over 15 million green jobs.</p>
        </div>
    `;

    indiaResultDiv.innerHTML = html;
    indiaResultDiv.style.display = 'block';
}

// Validate Input
function validateIndiaInput(investment, timeframe) {
    if (isNaN(investment) || investment <= 0) {
        alert('Please enter a valid investment amount');
        return false;
    }
    if (isNaN(timeframe) || timeframe <= 0 || timeframe > 30) {
        alert('Please enter a valid timeframe (1-30 years)');
        return false;
    }
    return true;
}

// Event Listeners
if (calculateIndiaButton) {
    calculateIndiaButton.addEventListener('click', () => {
        const investment = parseFloat(indiaInvestmentInput.value.replace(/,/g, ''));
        const timeframe = parseInt(indiaTimeframeInput.value);
        const sector = indiaSectorSelect.value;

        if (validateIndiaInput(investment, timeframe)) {
            const results = calculateIndiaROI(investment, timeframe, sector);
            displayIndiaResults(results, sector);
        }
    });
}

// Currency toggle
if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
        currencyToggle.textContent = currentCurrency === 'INR' ? 'Switch to USD' : 'Switch to INR';
        
        // Recalculate if results are already displayed
        if (indiaResultDiv.style.display === 'block') {
            const investment = parseFloat(indiaInvestmentInput.value.replace(/,/g, ''));
            const timeframe = parseInt(indiaTimeframeInput.value);
            const sector = indiaSectorSelect.value;
            
            if (validateIndiaInput(investment, timeframe)) {
                const results = calculateIndiaROI(investment, timeframe, sector);
                displayIndiaResults(results, sector);
            }
        }
    });
}

// Add input validation and formatting
if (indiaInvestmentInput) {
    indiaInvestmentInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            value = parseInt(value);
            e.target.value = value.toLocaleString('en-IN');
        }
    });
}

if (indiaTimeframeInput) {
    indiaTimeframeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value > 30) value = 30;
        e.target.value = value;
    });
} 