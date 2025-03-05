// SDG Impact Metrics Configuration
const sdgMetrics = {
    1: {
        name: 'No Poverty',
        metrics: {
            volunteer: { impact: 5, unit: 'people helped' },
            donation: { impact: 2, unit: 'people supported' },
            advocacy: { impact: 10, unit: 'people reached' }
        }
    },
    2: {
        name: 'Zero Hunger',
        metrics: {
            volunteer: { impact: 8, unit: 'meals provided' },
            donation: { impact: 4, unit: 'meals funded' },
            advocacy: { impact: 15, unit: 'people reached' }
        }
    }
    // Add metrics for all 17 SDGs
};

// Local Storage Keys
const IMPACT_DATA_KEY = 'sdg_impact_data';
const TOTAL_IMPACT_KEY = 'total_sdg_impact';

// DOM Elements
const sdgSelect = document.getElementById('sdg-select');
const actionType = document.getElementById('action-type');
const impactValue = document.getElementById('impact-value');
const logButton = document.getElementById('log-impact');
const impactStats = document.getElementById('impact-stats');

// Load saved impact data
let impactData = JSON.parse(localStorage.getItem(IMPACT_DATA_KEY) || '[]');
let totalImpact = JSON.parse(localStorage.getItem(TOTAL_IMPACT_KEY) || '{}');

// Initialize total impact if empty
if (Object.keys(totalImpact).length === 0) {
    totalImpact = {
        volunteer: 0,
        donation: 0,
        advocacy: 0,
        peopleImpacted: 0,
        totalActions: 0
    };
}

// Calculate Impact
function calculateImpact(sdgNumber, actionType, value) {
    const sdg = sdgMetrics[sdgNumber];
    const metric = sdg.metrics[actionType];
    return {
        raw: value,
        impact: value * metric.impact,
        unit: metric.unit
    };
}

// Format number with units
function formatValue(value, unit) {
    if (unit === 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
    return `${value.toLocaleString()} ${unit}`;
}

// Update Impact Display
function updateImpactDisplay() {
    let html = `
        <div class="impact-summary">
            <div class="summary-grid">
                <div class="summary-item">
                    <i class="fas fa-hands-helping"></i>
                    <h4>Volunteer Hours</h4>
                    <p>${formatValue(totalImpact.volunteer, 'hours')}</p>
                </div>
                <div class="summary-item">
                    <i class="fas fa-donate"></i>
                    <h4>Donations</h4>
                    <p>${formatValue(totalImpact.donation, 'USD')}</p>
                </div>
                <div class="summary-item">
                    <i class="fas fa-bullhorn"></i>
                    <h4>Advocacy Hours</h4>
                    <p>${formatValue(totalImpact.advocacy, 'hours')}</p>
                </div>
                <div class="summary-item">
                    <i class="fas fa-users"></i>
                    <h4>People Impacted</h4>
                    <p>${totalImpact.peopleImpacted.toLocaleString()}</p>
                </div>
            </div>
            <div class="total-actions">
                <h4>Total Actions</h4>
                <p>${totalImpact.totalActions.toLocaleString()}</p>
            </div>
        </div>
    `;

    impactStats.innerHTML = html;
}

// Log Impact
function logImpact(sdgNumber, action, value, date) {
    const impact = calculateImpact(sdgNumber, action, value);
    const entry = {
        sdg: sdgNumber,
        action,
        value,
        impact,
        date
    };

    // Update total impact
    totalImpact[action] += value;
    totalImpact.peopleImpacted += impact.impact;
    totalImpact.totalActions++;

    // Save to local storage
    impactData.push(entry);
    localStorage.setItem(IMPACT_DATA_KEY, JSON.stringify(impactData));
    localStorage.setItem(TOTAL_IMPACT_KEY, JSON.stringify(totalImpact));

    // Update display
    updateImpactDisplay();

    // Show success message
    showNotification('Impact Logged', 'Your contribution has been recorded successfully!');
}

// Event Listeners
logButton.addEventListener('click', () => {
    const sdg = parseInt(sdgSelect.value);
    const action = actionType.value;
    const value = parseFloat(impactValue.value);

    if (!value || value <= 0) {
        alert('Please enter a valid value');
        return;
    }

    logImpact(sdg, action, value, new Date().toISOString());
    impactValue.value = '';
});

// Update input label based on action type
actionType.addEventListener('change', () => {
    const action = actionType.value;
    const label = document.querySelector('label[for="impact-value"]');
    label.textContent = action === 'donation' ? 'Amount ($)' : 'Hours';
});

// Initialize display
updateImpactDisplay(); 