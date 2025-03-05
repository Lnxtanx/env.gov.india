// Impact Tracker Configuration
const impactMetrics = {
    volunteer: {
        label: 'Volunteer Hours',
        unit: 'hours',
        impact: {
            co2: 2.5, // kg CO2 offset per hour
            lives: 0.2, // lives impacted per hour
            community: 1.5 // community impact score per hour
        }
    },
    donation: {
        label: 'Donations',
        unit: 'USD',
        impact: {
            co2: 0.5, // kg CO2 offset per dollar
            lives: 0.05, // lives impacted per dollar
            community: 0.3 // community impact score per dollar
        }
    },
    education: {
        label: 'Educational Activities',
        unit: 'hours',
        impact: {
            co2: 1.8, // kg CO2 offset per hour
            lives: 0.3, // lives impacted per hour
            community: 2.0 // community impact score per hour
        }
    },
    advocacy: {
        label: 'Advocacy Work',
        unit: 'hours',
        impact: {
            co2: 3.0, // kg CO2 offset per hour
            lives: 0.4, // lives impacted per hour
            community: 2.5 // community impact score per hour
        }
    }
};

// Local Storage Keys
const STORAGE_KEY = 'social_impact_data';
const TOTAL_IMPACT_KEY = 'total_social_impact';

// DOM Elements
const activitySelect = document.getElementById('activity');
const hoursInput = document.getElementById('hours');
const dateInput = document.getElementById('date');
const trackButton = document.getElementById('track-impact');
const impactStats = document.getElementById('impact-stats');

// Load saved impact data
let impactData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let totalImpact = JSON.parse(localStorage.getItem(TOTAL_IMPACT_KEY) || '{}');

// Initialize total impact if empty
if (Object.keys(totalImpact).length === 0) {
    totalImpact = {
        volunteer: 0,
        donation: 0,
        education: 0,
        advocacy: 0,
        co2: 0,
        lives: 0,
        community: 0
    };
}

// Calculate Impact
function calculateImpact(activity, value) {
    const metric = impactMetrics[activity];
    return {
        co2: metric.impact.co2 * value,
        lives: metric.impact.lives * value,
        community: metric.impact.community * value
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
        <div class="impact-grid">
            <div class="impact-metric">
                <i class="fas fa-clock"></i>
                <h4>Volunteer Hours</h4>
                <p>${formatValue(totalImpact.volunteer, 'hours')}</p>
            </div>
            <div class="impact-metric">
                <i class="fas fa-hand-holding-usd"></i>
                <h4>Donations</h4>
                <p>${formatValue(totalImpact.donation, 'USD')}</p>
            </div>
            <div class="impact-metric">
                <i class="fas fa-book"></i>
                <h4>Education Hours</h4>
                <p>${formatValue(totalImpact.education, 'hours')}</p>
            </div>
            <div class="impact-metric">
                <i class="fas fa-bullhorn"></i>
                <h4>Advocacy Hours</h4>
                <p>${formatValue(totalImpact.advocacy, 'hours')}</p>
            </div>
        </div>
        <div class="impact-summary">
            <h4>Total Impact</h4>
            <div class="summary-metrics">
                <div class="summary-metric">
                    <i class="fas fa-leaf"></i>
                    <p>${totalImpact.co2.toFixed(1)} kg CO2 Offset</p>
                </div>
                <div class="summary-metric">
                    <i class="fas fa-users"></i>
                    <p>${totalImpact.lives.toFixed(1)} Lives Impacted</p>
                </div>
                <div class="summary-metric">
                    <i class="fas fa-star"></i>
                    <p>${totalImpact.community.toFixed(1)} Community Impact Score</p>
                </div>
            </div>
        </div>
    `;

    impactStats.innerHTML = html;
}

// Log Activity
function logActivity(activity, value, date) {
    const impact = calculateImpact(activity, value);
    const entry = {
        activity,
        value,
        date,
        impact
    };

    // Update total impact
    totalImpact[activity] += value;
    totalImpact.co2 += impact.co2;
    totalImpact.lives += impact.lives;
    totalImpact.community += impact.community;

    // Save to local storage
    impactData.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(impactData));
    localStorage.setItem(TOTAL_IMPACT_KEY, JSON.stringify(totalImpact));

    // Update display
    updateImpactDisplay();

    // Show success message
    showNotification('Activity Logged', 'Your impact has been recorded successfully!');
}

// Event Listeners
trackButton.addEventListener('click', () => {
    const activity = activitySelect.value;
    const value = parseFloat(hoursInput.value);
    const date = dateInput.value;

    if (!value || value <= 0) {
        alert('Please enter a valid value');
        return;
    }

    if (!date) {
        alert('Please select a date');
        return;
    }

    logActivity(activity, value, date);
    hoursInput.value = '';
    dateInput.value = '';
});

// Update input label based on activity type
activitySelect.addEventListener('change', () => {
    const activity = activitySelect.value;
    const metric = impactMetrics[activity];
    const label = document.querySelector('label[for="hours"]');
    label.textContent = `${metric.label} (${metric.unit})`;
});

// Initialize display
updateImpactDisplay(); 