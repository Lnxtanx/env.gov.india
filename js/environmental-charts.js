// Environmental Charts
(function() {
    // Store chart instances for reference
    let chartInstances = [];
    
    // Wait for DOM content to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded - initializing environmental charts");
        
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library is not loaded - charts will not be displayed');
            return;
        }
        
        // Initialize charts
        initializeCharts();
        
        // Setup theme toggle listener
        setupThemeToggle();
    });
    
    // Initialize all charts
    function initializeCharts() {
        // Temperature Chart
        createChart('temperatureChart', {
            type: 'line',
            data: {
                labels: ['1880', '1900', '1920', '1940', '1960', '1980', '2000', '2020'],
                datasets: [{
                    label: 'Global Temperature Anomaly (°C)',
                    data: [-0.16, -0.09, -0.27, 0.12, 0.03, 0.27, 0.61, 1.02],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Global Temperature Change Over Time',
                        padding: 20
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature Anomaly (°C)'
                        }
                    }
                }
            }
        });
        
        // Emissions Chart
        createChart('emissionsChart', {
            type: 'line',
            data: {
                labels: ['1990', '2000', '2010', '2020', '2030 (Projected)'],
                datasets: [{
                    label: 'CO2 Emissions',
                    data: [22.7, 25.5, 33.1, 34.8, 37.0],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: 'Target Reduction',
                    data: [22.7, 25.5, 33.1, 34.8, 17.4],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Global CO2 Emissions (Billion Tonnes)',
                        padding: 20
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Billion Tonnes CO2'
                        }
                    }
                }
            }
        });
        
        // India Emissions Chart
        createChart('indiaEmissionsChart', {
            type: 'line',
            data: {
                labels: ['1990', '2000', '2010', '2015', '2020', '2030 (Target)'],
                datasets: [{
                    label: 'India CO2 Emissions',
                    data: [0.6, 1.0, 1.7, 2.1, 2.4, 3.3],
                    borderColor: '#ff9f43',
                    backgroundColor: 'rgba(255, 159, 67, 0.1)',
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: 'Emissions Intensity Reduction',
                    data: [100, 95, 85, 75, 65, 45],
                    borderColor: '#1e90ff',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'India\'s Emissions & Intensity Reduction',
                        padding: 20
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Billion Tonnes CO2'
                        },
                        position: 'left'
                    },
                    y1: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Emissions Intensity (% of 2005 level)'
                        },
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
        
        // Check for elements in new layout structure
        // For the Water Conservation section, let's create a rainfall chart
        if (document.querySelector('.water-conservation')) {
            // Create a canvas element for water chart if needed
            let waterChartContainer = document.querySelector('.water-conservation .rainwater-system');
            if (waterChartContainer && !document.getElementById('waterRainfallChart')) {
                const canvas = document.createElement('canvas');
                canvas.id = 'waterRainfallChart';
                canvas.height = 300;
                waterChartContainer.appendChild(canvas);
                
                // Create rainfall chart
                createChart('waterRainfallChart', {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Average Rainfall (mm)',
                            data: [20, 30, 40, 50, 80, 120, 250, 230, 180, 90, 40, 20],
                            backgroundColor: 'rgba(52, 152, 219, 0.6)',
                            borderColor: 'rgba(52, 152, 219, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Average Monthly Rainfall',
                                padding: 20
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Rainfall (mm)'
                                }
                            }
                        }
                    }
                });
            }
        }
        
        // For the Biodiversity section, create species diversity chart
        if (document.querySelector('.biodiversity')) {
            // Create a canvas element for biodiversity chart if needed
            let bioChartContainer = document.querySelector('.biodiversity .conservation-initiatives');
            if (bioChartContainer && !document.getElementById('speciesDiversityChart')) {
                const chartDiv = document.createElement('div');
                chartDiv.className = 'biodiversity-chart-container mt-4';
                
                const heading = document.createElement('h3');
                heading.textContent = 'Species Conservation Status';
                
                const canvas = document.createElement('canvas');
                canvas.id = 'speciesDiversityChart';
                canvas.height = 300;
                
                chartDiv.appendChild(heading);
                chartDiv.appendChild(canvas);
                bioChartContainer.appendChild(chartDiv);
                
                // Create species diversity chart
                createChart('speciesDiversityChart', {
                    type: 'pie',
                    data: {
                        labels: ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in Wild'],
                        datasets: [{
                            data: [65, 12, 10, 7, 5, 1],
                            backgroundColor: [
                                '#2ecc71',
                                '#f1c40f',
                                '#e67e22',
                                '#e74c3c',
                                '#c0392b',
                                '#000000'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Conservation Status of Species in India (%)',
                                padding: 20
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }
        
        // Initialize the Water Usage Chart only if the element exists
        if (document.getElementById('waterUsageChart')) {
            createChart('waterUsageChart', {
                type: 'doughnut',
                data: {
                    labels: ['Agriculture', 'Industry', 'Domestic', 'Energy', 'Other'],
                    datasets: [{
                        data: [70, 19, 11, 3, 2],
                        backgroundColor: [
                            '#3498db',
                            '#e67e22',
                            '#2ecc71',
                            '#9b59b6',
                            '#95a5a6'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Global Water Usage by Sector (%)',
                            padding: 20
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw}%`;
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
        }
        
        // Initialize the Biodiversity Chart only if the element exists
        if (document.getElementById('biodiversityChart')) {
            createChart('biodiversityChart', {
                type: 'bar',
                data: {
                    labels: ['Mammals', 'Birds', 'Reptiles', 'Amphibians', 'Fish', 'Plants'],
                    datasets: [{
                        label: 'Endangered Species',
                        data: [1141, 1217, 751, 1808, 2215, 12151],
                        backgroundColor: [
                            '#e74c3c',
                            '#3498db',
                            '#2ecc71',
                            '#f1c40f',
                            '#9b59b6',
                            '#1abc9c'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Endangered Species by Category',
                            padding: 20
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw.toLocaleString()} species`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Species'
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Create a chart with error handling
    function createChart(elementId, config) {
        // Check if element exists before creating chart
        const canvas = document.getElementById(elementId);
        
        if (!canvas) {
            console.log(`Chart element #${elementId} not found in the document`);
            return null;
        }
        
        // Clear any existing chart
        const existingChartIndex = chartInstances.findIndex(chart => chart.id === elementId);
        if (existingChartIndex !== -1) {
            chartInstances[existingChartIndex].instance.destroy();
            chartInstances.splice(existingChartIndex, 1);
        }
        
        // Create new chart
        const ctx = canvas.getContext('2d');
        const chartInstance = new Chart(ctx, config);
        
        // Store chart instance for reference
        chartInstances.push({
            id: elementId,
            instance: chartInstance
        });
        
        return chartInstance;
    }
    
    // Theme toggle setup
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Initial update based on current theme
            updateChartColors();
            
            // Listen for theme changes
            themeToggle.addEventListener('click', function() {
                // Add delay to ensure DOM classes are updated first
                setTimeout(updateChartColors, 100);
            });
        }
    }
    
    // Update chart colors based on theme
    function updateChartColors() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const textColor = isDarkMode ? '#ffffff' : '#666666';
        const gridColor = isDarkMode ? '#555555' : '#e0e0e0';
        
        // Check if Chart is available
        if (typeof Chart === 'undefined') return;
        
        // Update Chart.js defaults
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = gridColor;
        
        // Update each chart in the registry
        chartInstances.forEach(chart => {
            if (!chart || !chart.options) return;
            
            try {
                // Update title colors
                if (chart.options.plugins && chart.options.plugins.title) {
                    chart.options.plugins.title.color = textColor;
                }
                
                // Update scale colors
                if (chart.options.scales) {
                    Object.keys(chart.options.scales).forEach(scaleKey => {
                        const scale = chart.options.scales[scaleKey];
                        if (scale && scale.ticks) {
                            scale.ticks.color = textColor;
                        }
                        if (scale && scale.grid) {
                            scale.grid.color = gridColor;
                        }
                    });
                }
                
                // Update the chart with new color scheme
                chart.update('none'); // 'none' means no animation for better performance
            } catch (error) {
                console.warn(`Error updating colors for chart:`, error);
            }
        });
    }
})(); 