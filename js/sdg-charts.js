// SDG Progress Overview Chart
const sdgProgressCtx = document.getElementById('sdgProgressChart').getContext('2d');
new Chart(sdgProgressCtx, {
    type: 'bar',
    data: {
        labels: ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4', 'Goal 5', 'Goal 6', 'Goal 7', 'Goal 8', 'Goal 9', 'Goal 10', 'Goal 11', 'Goal 12', 'Goal 13', 'Goal 14', 'Goal 15', 'Goal 16', 'Goal 17'],
        datasets: [{
            label: 'Current Progress',
            data: [65, 58, 72, 68, 70, 55, 62, 75, 63, 58, 67, 54, 48, 45, 52, 60, 56],
            backgroundColor: [
                '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2',
                '#FCC30B', '#A21942', '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E',
                '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A'
            ]
        },
        {
            label: '2030 Targets',
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            type: 'line',
            borderColor: '#666666',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'SDG Progress Overview'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Progress: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Progress (%)'
                }
            }
        }
    }
});

// Progress Bar Animation
document.querySelectorAll('.progress-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.width = progress + '%';
    }, 500);
});

// Theme Color Update
function updateChartColors() {
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#ffffff' : '#666666';

    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = isDark ? '#404040' : '#e0e0e0';

    // Refresh all charts
    Chart.instances.forEach(chart => {
        chart.options.plugins.title.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.update();
    });
}

// Listen for theme changes
document.getElementById('theme-toggle').addEventListener('click', () => {
    setTimeout(updateChartColors, 0);
}); 