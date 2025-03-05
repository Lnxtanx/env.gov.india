// Define global chart instances
let businessModelChart, investmentChart, economicImpactChart;

// Initialize charts when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateChartColors, 100);
        });
    }
    
    // Listen for tab changes to reinitialize charts if needed
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(function() {
                // Reinitialize charts based on which tab is active
                if (document.querySelector('.tab-button[data-tab="global"]').classList.contains('active')) {
                    initializeCharts(); // Global charts
                } else {
                    // India charts are initialized in india-economic-charts.js
                }
            }, 100);
        });
    });
    
    // Initial color update
    updateChartColors();
});

function initializeCharts() {
    try {
        // Business Model Chart
        const businessModelCtx = document.getElementById('businessModelChart');
        if (businessModelCtx) {
            // Destroy existing chart if it exists
            if (businessModelChart) businessModelChart.destroy();
            
            businessModelChart = new Chart(businessModelCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Circular Economy', 'Green Products', 'Sharing Economy', 'Traditional'],
                    datasets: [{
                        data: [30, 25, 15, 30],
                        backgroundColor: [
                            '#2ecc71',
                            '#3498db',
                            '#9b59b6',
                            '#95a5a6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Business Model Distribution 2024'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Investment Chart
        const investmentCtx = document.getElementById('investmentChart');
        if (investmentCtx) {
            // Destroy existing chart if it exists
            if (investmentChart) investmentChart.destroy();
            
            investmentChart = new Chart(investmentCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Green Bonds ($B)',
                        data: [167.3, 258.9, 290.1, 522.7, 478.2, 515.8, 600.5],
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        fill: true
                    },
                    {
                        label: 'ESG Funds ($B)',
                        data: [1000, 1500, 2000, 2500, 3200, 3800, 4500],
                        borderColor: '#2980b9',
                        backgroundColor: 'rgba(41, 128, 185, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Sustainable Investment Growth'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Billion USD ($)'
                            }
                        }
                    }
                }
            });
        }

        // Economic Impact Chart
        const economicImpactCtx = document.getElementById('economicImpactChart');
        if (economicImpactCtx) {
            // Destroy existing chart if it exists
            if (economicImpactChart) economicImpactChart.destroy();
            
            economicImpactChart = new Chart(economicImpactCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Renewable Energy', 'Sustainable Agriculture', 'Green Building', 'Clean Transport', 'Waste Management'],
                    datasets: [{
                        label: 'Jobs Created (Millions)',
                        data: [11.5, 8.2, 6.7, 4.8, 3.9],
                        backgroundColor: '#3498db'
                    },
                    {
                        label: 'Market Size ($B)',
                        data: [366, 235, 198, 157, 89],
                        backgroundColor: '#2ecc71'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Economic Impact by Sector (2024)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Scale (Jobs in M, Market in $B)'
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error initializing economic charts:", error);
    }
}

// Update chart colors based on theme
function updateChartColors() {
    try {
        const isDark = document.body.classList.contains('dark-mode');
        const textColor = isDark ? '#ffffff' : '#666666';

        // Update Chart.js defaults
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = isDark ? '#404040' : '#e0e0e0';

        // Update individual charts
        const charts = [businessModelChart, investmentChart, economicImpactChart];
        
        charts.forEach(chart => {
            if (chart) {
                if (chart.options.plugins && chart.options.plugins.title) {
                    chart.options.plugins.title.color = textColor;
                }
                
                if (chart.options.scales && chart.options.scales.x) {
                    chart.options.scales.x.ticks.color = textColor;
                }
                
                if (chart.options.scales && chart.options.scales.y) {
                    chart.options.scales.y.ticks.color = textColor;
                }
                
                chart.update();
            }
        });
    } catch (error) {
        console.error("Error updating chart colors:", error);
    }
} 