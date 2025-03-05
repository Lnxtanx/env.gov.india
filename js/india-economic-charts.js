// India Economic Charts

// Define global chart instances
let indiaGreenEconomyChart, indiaCsrChart, indiaAgricultureChart;

// Initialize India charts when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize India charts when India tab is active or when first loaded if it's the default tab
    const indiaTabButton = document.querySelector('.tab-button[data-tab="india"]');
    const globalTabButton = document.querySelector('.tab-button[data-tab="global"]');
    
    if (indiaTabButton && globalTabButton) {
        // Initialize charts if India tab is active
        if (indiaTabButton.classList.contains('active')) {
            initializeIndiaCharts();
        }
        
        // Add event listener for tab changes
        indiaTabButton.addEventListener('click', function() {
            setTimeout(initializeIndiaCharts, 100);
        });
    } else {
        // If no tab buttons found, initialize charts anyway (fallback)
        initializeIndiaCharts();
    }
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateIndiaChartColors, 100);
        });
    }
    
    // Initial color update
    updateIndiaChartColors();
});

function initializeIndiaCharts() {
    try {
        // Green Economy Growth in India Chart
        const indiaGreenEconomyCtx = document.getElementById('indiaGreenEconomyChart');
        if (indiaGreenEconomyCtx) {
            // Destroy existing chart if it exists
            if (indiaGreenEconomyChart) indiaGreenEconomyChart.destroy();
            
            indiaGreenEconomyChart = new Chart(indiaGreenEconomyCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Renewable Energy Investment ($B)',
                        data: [11.1, 14.2, 9.3, 15.7, 19.2, 24.3, 29.8],
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Green Jobs (100K)',
                        data: [3.2, 4.5, 5.8, 7.2, 9.5, 12.1, 15.0],
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
                            text: 'India\'s Green Economy Growth'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Scale (Investment in $B, Jobs in 100K)'
                            }
                        }
                    }
                }
            });
        }

        // CSR Spending in India Chart
        const indiaCsrCtx = document.getElementById('indiaCsrChart');
        if (indiaCsrCtx) {
            // Destroy existing chart if it exists
            if (indiaCsrChart) indiaCsrChart.destroy();
            
            indiaCsrChart = new Chart(indiaCsrCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Education', 'Healthcare', 'Environment', 'Rural Development', 'Skill Development'],
                    datasets: [{
                        label: 'CSR Spending (₹ Crore)',
                        data: [4500, 3200, 2800, 2100, 1700],
                        backgroundColor: [
                            '#3498db',
                            '#2ecc71',
                            '#f1c40f',
                            '#e67e22',
                            '#9b59b6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'CSR Spending Distribution in India (2023)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '₹ Crore'
                            }
                        }
                    }
                }
            });
        }

        // Sustainable Agriculture in India Chart
        const indiaAgricultureCtx = document.getElementById('indiaAgricultureChart');
        if (indiaAgricultureCtx) {
            // Destroy existing chart if it exists
            if (indiaAgricultureChart) indiaAgricultureChart.destroy();
            
            indiaAgricultureChart = new Chart(indiaAgricultureCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Organic Farming', 'Natural Farming', 'Precision Agriculture', 'Conventional'],
                    datasets: [{
                        data: [15, 12, 8, 65],
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
                            text: 'Agricultural Practices in India (2024)'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error initializing India economic charts:", error);
    }
}

// Update chart colors based on theme
function updateIndiaChartColors() {
    try {
        const isDark = document.body.classList.contains('dark-mode');
        const textColor = isDark ? '#ffffff' : '#666666';

        // Update Chart.js defaults
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = isDark ? '#404040' : '#e0e0e0';

        // Update individual charts
        const charts = [indiaGreenEconomyChart, indiaCsrChart, indiaAgricultureChart];
        
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
        console.error("Error updating India chart colors:", error);
    }
} 