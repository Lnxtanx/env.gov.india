// Technology Impact Metrics
const techMetrics = {
    solar: {
        name: 'Solar Energy',
        metrics: {
            small: {
                cost: 10000,
                co2: 4.5, // tons CO2 offset per year
                roi: 15, // % ROI per year
                energy: 5000 // kWh per year
            },
            medium: {
                cost: 25000,
                co2: 12.5,
                roi: 18,
                energy: 15000
            },
            large: {
                cost: 50000,
                co2: 28.0,
                roi: 20,
                energy: 35000
            }
        }
    },
    smart: {
        name: 'Smart City Solutions',
        metrics: {
            small: {
                cost: 15000,
                efficiency: 20, // % efficiency improvement
                savings: 12, // % cost savings
                impact: 1000 // people impacted
            },
            medium: {
                cost: 35000,
                efficiency: 30,
                savings: 18,
                impact: 5000
            },
            large: {
                cost: 75000,
                efficiency: 40,
                savings: 25,
                impact: 15000
            }
        }
    },
    agri: {
        name: 'Agricultural Tech',
        metrics: {
            small: {
                cost: 8000,
                yield: 25, // % yield increase
                water: 30, // % water savings
                area: 5 // acres covered
            },
            medium: {
                cost: 20000,
                yield: 35,
                water: 40,
                area: 15
            },
            large: {
                cost: 45000,
                yield: 45,
                water: 50,
                area: 40
            }
        }
    },
    waste: {
        name: 'Waste Management',
        metrics: {
            small: {
                cost: 12000,
                reduction: 30, // % waste reduction
                recycling: 40, // % recycling rate
                processing: 100 // tons per year
            },
            medium: {
                cost: 30000,
                reduction: 40,
                recycling: 60,
                processing: 500
            },
            large: {
                cost: 65000,
                reduction: 50,
                recycling: 80,
                processing: 2000
            }
        }
    }
};

// DOM Elements
const techType = document.getElementById('tech-type');
const implementationScale = document.getElementById('implementation-scale');
const budget = document.getElementById('budget');
const calculateButton = document.getElementById('calculate-impact');
const impactMetrics = document.getElementById('impact-metrics');

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Calculate ROI and Payback Period
function calculateFinancials(cost, savings, years = 10) {
    const annualSavings = cost * (savings / 100);
    const paybackPeriod = cost / annualSavings;
    const totalReturn = (annualSavings * years) - cost;
    const roi = (totalReturn / cost) * 100;

    return {
        paybackPeriod: paybackPeriod.toFixed(1),
        roi: roi.toFixed(1),
        annualSavings: formatCurrency(annualSavings),
        totalReturn: formatCurrency(totalReturn)
    };
}

// Calculate Technology Impact
function calculateTechImpact(type, scale, budgetAmount) {
    const tech = techMetrics[type];
    const metrics = tech.metrics[scale];

    if (budgetAmount < metrics.cost) {
        return {
            error: `Minimum budget required: ${formatCurrency(metrics.cost)}`
        };
    }

    let impact = {
        cost: metrics.cost,
        ...metrics
    };

    // Calculate financials
    if (type === 'solar') {
        const financials = calculateFinancials(metrics.cost, metrics.roi);
        impact = {
            ...impact,
            ...financials,
            energyGeneration: `${metrics.energy.toLocaleString()} kWh/year`,
            co2Offset: `${metrics.co2.toFixed(1)} tons/year`
        };
    } else if (type === 'smart') {
        const financials = calculateFinancials(metrics.cost, metrics.savings);
        impact = {
            ...impact,
            ...financials,
            efficiencyGain: `${metrics.efficiency}%`,
            peopleImpacted: metrics.impact.toLocaleString()
        };
    } else if (type === 'agri') {
        const financials = calculateFinancials(metrics.cost, metrics.yield);
        impact = {
            ...impact,
            ...financials,
            yieldIncrease: `${metrics.yield}%`,
            waterSaved: `${metrics.water}%`,
            areaCovered: `${metrics.area} acres`
        };
    } else if (type === 'waste') {
        const financials = calculateFinancials(metrics.cost, metrics.reduction);
        impact = {
            ...impact,
            ...financials,
            wasteReduction: `${metrics.reduction}%`,
            recyclingRate: `${metrics.recycling}%`,
            wasteProcessed: `${metrics.processing} tons/year`
        };
    }

    return impact;
}

// Display Impact Results
function displayImpact(impact) {
    if (impact.error) {
        impactMetrics.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${impact.error}</p>
            </div>
        `;
        return;
    }

    let metricsHtml = `
        <div class="impact-grid">
            <div class="metric">
                <h4>Initial Investment</h4>
                <p>${formatCurrency(impact.cost)}</p>
            </div>
            <div class="metric">
                <h4>Payback Period</h4>
                <p>${impact.paybackPeriod} years</p>
            </div>
            <div class="metric">
                <h4>ROI</h4>
                <p>${impact.roi}%</p>
            </div>
            <div class="metric">
                <h4>Annual Savings</h4>
                <p>${impact.annualSavings}</p>
            </div>
    `;

    // Add technology-specific metrics
    const type = techType.value;
    if (type === 'solar') {
        metricsHtml += `
            <div class="metric">
                <h4>Energy Generation</h4>
                <p>${impact.energyGeneration}</p>
            </div>
            <div class="metric">
                <h4>CO2 Offset</h4>
                <p>${impact.co2Offset}</p>
            </div>
        `;
    } else if (type === 'smart') {
        metricsHtml += `
            <div class="metric">
                <h4>Efficiency Gain</h4>
                <p>${impact.efficiencyGain}</p>
            </div>
            <div class="metric">
                <h4>People Impacted</h4>
                <p>${impact.peopleImpacted}</p>
            </div>
        `;
    } else if (type === 'agri') {
        metricsHtml += `
            <div class="metric">
                <h4>Yield Increase</h4>
                <p>${impact.yieldIncrease}</p>
            </div>
            <div class="metric">
                <h4>Water Saved</h4>
                <p>${impact.waterSaved}</p>
            </div>
            <div class="metric">
                <h4>Area Covered</h4>
                <p>${impact.areaCovered}</p>
            </div>
        `;
    } else if (type === 'waste') {
        metricsHtml += `
            <div class="metric">
                <h4>Waste Reduction</h4>
                <p>${impact.wasteReduction}</p>
            </div>
            <div class="metric">
                <h4>Recycling Rate</h4>
                <p>${impact.recyclingRate}</p>
            </div>
            <div class="metric">
                <h4>Waste Processed</h4>
                <p>${impact.wasteProcessed}</p>
            </div>
        `;
    }

    metricsHtml += `</div>`;
    impactMetrics.innerHTML = metricsHtml;
}

// Event Listeners
calculateButton.addEventListener('click', () => {
    const type = techType.value;
    const scale = implementationScale.value;
    const budgetAmount = parseFloat(budget.value);

    if (!budgetAmount || budgetAmount <= 0) {
        alert('Please enter a valid budget amount');
        return;
    }

    const impact = calculateTechImpact(type, scale, budgetAmount);
    displayImpact(impact);
}); 