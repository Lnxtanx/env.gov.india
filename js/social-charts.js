// Education Chart
let educationChart, equityChart, healthChart, indiaEducationChart;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts only if the canvas elements exist
    initializeCharts();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateChartColors, 100);
        });
    }
    
    // Tab switching - reinitialize charts
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Delay to ensure DOM is updated
            setTimeout(initializeCharts, 500);
        });
    });
    
    // Initial color update
    updateChartColors();
});

function initializeCharts() {
    initializeGlobalCharts();
    initializeIndiaCharts();
}

function initializeGlobalCharts() {
    const educationCtx = document.getElementById('educationChart');
    if (educationCtx) {
        // Destroy existing chart instance if it exists
        if (educationChart) educationChart.destroy();
        
        educationChart = new Chart(educationCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Global Education Access',
                    data: [76, 78, 80, 82, 83, 84, 85, 86, 87, 88],
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    fill: true
                },
                {
                    label: 'Sustainability Education',
                    data: [20, 25, 28, 32, 35, 38, 40, 42, 45, 48],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Education Progress Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Access Rate (%)'
                        }
                    }
                }
            }
        });
    }

    const equityCtx = document.getElementById('equityChart');
    if (equityCtx) {
        // Destroy existing chart instance if it exists
        if (equityChart) equityChart.destroy();
        
        equityChart = new Chart(equityCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Gender Equality', 'Income Distribution', 'Education Access', 'Healthcare Access', 'Social Inclusion', 'Job Opportunities'],
                datasets: [{
                    label: 'Current Status',
                    data: [75, 65, 80, 70, 68, 72],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: '#2ecc71',
                    pointBackgroundColor: '#2ecc71'
                },
                {
                    label: '2030 Targets',
                    data: [95, 85, 95, 90, 88, 92],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Social Equity Indicators'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    const healthCtx = document.getElementById('healthChart');
    if (healthCtx) {
        // Destroy existing chart instance if it exists
        if (healthChart) healthChart.destroy();
        
        healthChart = new Chart(healthCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Physical Health', 'Mental Health', 'Healthcare Access', 'Nutrition', 'Work-Life Balance'],
                datasets: [{
                    label: 'Community Health Index',
                    data: [75, 68, 72, 78, 65],
                    backgroundColor: [
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#f1c40f',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Community Health & Well-being Metrics'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Index Score'
                        }
                    }
                }
            }
        });
    }
    
    // Initialize progress circles
    initializeProgressCircles();
    
    // Initialize map if it exists
    initializeSmartCityMap();
}

function initializeIndiaCharts() {
    const indiaEducationCtx = document.getElementById('indiaEducationChart');
    if (indiaEducationCtx) {
        // Destroy existing chart instance if it exists
        if (indiaEducationChart) indiaEducationChart.destroy();
        
        indiaEducationChart = new Chart(indiaEducationCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Literacy Rate',
                    data: [69, 71, 72, 74, 76, 78, 79, 80, 81, 82],
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    fill: true
                },
                {
                    label: 'Digital Education Access',
                    data: [15, 20, 25, 30, 38, 45, 52, 58, 63, 68],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'India Education Progress'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Rate (%)'
                        }
                    }
                }
            }
        });
    }
}

function initializeProgressCircles() {
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const value = circle.getAttribute('data-value');
        const radius = 24;
        const circumference = 2 * Math.PI * radius;
        const progress = value / 100;
        const dashoffset = circumference * (1 - progress);

        circle.innerHTML = `
            <svg width="70" height="70">
                <circle
                    class="progress-ring-circle-bg"
                    stroke="#e0e0e0"
                    stroke-width="4"
                    fill="transparent"
                    r="${radius}"
                    cx="35"
                    cy="35"
                />
                <circle
                    class="progress-ring-circle"
                    stroke="var(--primary-color, #9b59b6)"
                    stroke-width="4"
                    fill="transparent"
                    r="${radius}"
                    cx="35"
                    cy="35"
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${dashoffset}"
                />
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="progress-text">
                    ${value}%
                </text>
            </svg>
        `;
    });
}

function initializeSmartCityMap() {
    const mapElement = document.getElementById('smartCityMap');
    if (!mapElement) return;
    
    try {
        // Check if map is already initialized
        if (mapElement._leaflet_id) return;
        
        const map = L.map('smartCityMap').setView([40.7128, -74.0060], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add sample sustainable features to the map
        const sustainableLocations = [
            {lat: 40.7128, lng: -74.0060, type: 'park', title: 'Community Garden'},
            {lat: 40.7158, lng: -74.0090, type: 'transport', title: 'Bike Share Station'},
            {lat: 40.7108, lng: -74.0020, type: 'housing', title: 'Green Building'}
        ];

        sustainableLocations.forEach(location => {
            const marker = L.marker([location.lat, location.lng])
                .bindPopup(`<b>${location.title}</b><br>Sustainable ${location.type} initiative`)
                .addTo(map);
        });
    } catch(e) {
        console.warn("Map initialization failed:", e);
    }
}

// Update chart colors based on theme
function updateChartColors() {
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#ffffff' : '#666666';

    // Update Chart.js global defaults
    if (Chart.defaults) {
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = isDark ? '#404040' : '#e0e0e0';
    }

    // Update individual charts
    const charts = [educationChart, equityChart, healthChart, indiaEducationChart];
    
    charts.forEach(chart => {
        if (chart) {
            // Update title color
            if (chart.options && chart.options.plugins && chart.options.plugins.title) {
                chart.options.plugins.title.color = textColor;
            }
            
            // Update axis colors for cartesian charts
            if (chart.options && chart.options.scales) {
                if (chart.options.scales.x) {
                    chart.options.scales.x.ticks = chart.options.scales.x.ticks || {};
                    chart.options.scales.x.ticks.color = textColor;
                }
                if (chart.options.scales.y) {
                    chart.options.scales.y.ticks = chart.options.scales.y.ticks || {};
                    chart.options.scales.y.ticks.color = textColor;
                }
                if (chart.options.scales.r) {
                    chart.options.scales.r.ticks = chart.options.scales.r.ticks || {};
                    chart.options.scales.r.ticks.color = textColor;
                }
            }
            
            chart.update();
        }
    });
} 