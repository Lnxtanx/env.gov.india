// ROI Calculator Configuration
const sectorData = {
    energy: {
        avgReturn: 0.15,
        riskFactor: 0.8,
        marketGrowth: 0.12,
        description: 'Renewable Energy sector shows strong growth potential with decreasing technology costs.'
    },
    waste: {
        avgReturn: 0.12,
        riskFactor: 0.85,
        marketGrowth: 0.09,
        description: 'Waste Management sector benefits from increasing regulatory support and circular economy trends.'
    },
    agriculture: {
        avgReturn: 0.10,
        riskFactor: 0.75,
        marketGrowth: 0.08,
        description: 'Sustainable Agriculture offers stable returns with growing demand for organic products.'
    },
    transport: {
        avgReturn: 0.18,
        riskFactor: 0.70,
        marketGrowth: 0.15,
        description: 'Green Transportation shows high growth potential due to EV adoption and infrastructure development.'
    }
};

// DOM Elements
const calculateButton = document.getElementById('calculate-roi');
const investmentInput = document.getElementById('investment');
const timeframeInput = document.getElementById('timeframe');
const sectorSelect = document.getElementById('sector');
const resultDiv = document.getElementById('roi-result');

// Calculate ROI
function calculateROI(investment, timeframe, sector) {
    const {avgReturn, riskFactor, marketGrowth} = sectorData[sector];
    
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
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Display Results
function displayResults(results, sector) {
    const {totalReturn, projectedValue, annualReturns, marketSize, roi} = results;
    
    let html = `
        <div class="result-summary">
            <h4>Investment Summary</h4>
            <p class="sector-description">${sectorData[sector].description}</p>
            <div class="result-metrics">
                <div class="metric">
                    <span class="label">Total Return:</span>
                    <span class="value">${formatCurrency(totalReturn)}</span>
                </div>
                <div class="metric">
                    <span class="label">Projected Value:</span>
                    <span class="value">${formatCurrency(projectedValue)}</span>
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
                <td>${formatCurrency(year.value)}</td>
                <td>${formatCurrency(year.profit)}</td>
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
            <p>Projected market size by end of investment period: ${formatCurrency(marketSize)}</p>
        </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

// Validate Input
function validateInput(investment, timeframe) {
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
calculateButton.addEventListener('click', () => {
    const investment = parseFloat(investmentInput.value);
    const timeframe = parseInt(timeframeInput.value);
    const sector = sectorSelect.value;

    if (validateInput(investment, timeframe)) {
        const results = calculateROI(investment, timeframe, sector);
        displayResults(results, sector);
    }
});

// Add input validation and formatting
investmentInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
        value = parseInt(value);
        e.target.value = value.toLocaleString('en-US');
    }
});

timeframeInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value > 30) value = 30;
    e.target.value = value;
}); 