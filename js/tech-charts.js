// Technology Trends Chart
const techTrendsCtx = document.getElementById('techTrendsChart').getContext('2d');
new Chart(techTrendsCtx, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Clean Energy',
            data: [35, 42, 48, 55, 62, 70],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            fill: true
        },
        {
            label: 'Smart Cities',
            data: [25, 32, 40, 48, 55, 65],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            fill: true
        },
        {
            label: 'AgriTech',
            data: [20, 28, 35, 42, 50, 60],
            borderColor: '#e67e22',
            backgroundColor: 'rgba(230, 126, 34, 0.1)',
            fill: true
        },
        {
            label: 'Waste Management',
            data: [30, 38, 45, 52, 60, 68],
            borderColor: '#9b59b6',
            backgroundColor: 'rgba(155, 89, 182, 0.1)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Sustainable Technology Adoption Trends'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Adoption Rate: ${context.raw}%`;
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
                    text: 'Adoption Rate (%)'
                }
            }
        }
    }
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

// Animate stats on scroll
const stats = document.querySelectorAll('.stat .value');
let animated = false;

function animateStats() {
    if (animated) return;

    stats.forEach(stat => {
        const value = stat.textContent;
        let start = 0;
        const end = parseInt(value);
        const duration = 2000;
        const increment = end / (duration / 16);

        function updateValue() {
            start += increment;
            if (start < end) {
                stat.textContent = Math.round(start) + (value.includes('%') ? '%' : '');
                requestAnimationFrame(updateValue);
            } else {
                stat.textContent = value;
            }
        }

        updateValue();
    });

    animated = true;
}

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-card').forEach(card => {
    observer.observe(card);
}); 