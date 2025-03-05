// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Notifications
const notificationBtn = document.getElementById('notifications');
let notificationsEnabled = false;

notificationBtn.addEventListener('click', async () => {
    if (!notificationsEnabled) {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                notificationsEnabled = true;
                notificationBtn.innerHTML = '<i class="fas fa-bell-slash"></i>';
                showNotification('Notifications enabled!', 'You will now receive updates about sustainability.');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    } else {
        notificationsEnabled = false;
        notificationBtn.innerHTML = '<i class="fas fa-bell"></i>';
    }
});

function showNotification(title, body) {
    if (notificationsEnabled) {
        new Notification(title, {
            body: body,
            icon: '/images/logo.png'
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        console.log('Newsletter signup:', email);
        showNotification('Newsletter Signup', 'Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Sample Events Data
const sampleEvents = [
    {
        title: 'Global Climate Summit 2024',
        date: '2024-06-15',
        location: 'Virtual Event',
        description: 'Join world leaders in discussing climate action strategies.'
    },
    {
        title: 'Sustainable Tech Expo',
        date: '2024-07-20',
        location: 'San Francisco, CA',
        description: 'Showcase of latest green technologies and innovations.'
    },
    {
        title: 'Ocean Conservation Conference',
        date: '2024-08-10',
        location: 'Sydney, Australia',
        description: 'Focus on marine ecosystem protection and plastic pollution.'
    }
];

// Populate Events
const eventsGrid = document.querySelector('.events-grid');
if (eventsGrid) {
    sampleEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'topic-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><i class="far fa-calendar"></i> ${event.date}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p>${event.description}</p>
            <a href="#" class="learn-more">Register →</a>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all topic cards and sections
document.querySelectorAll('.topic-card, section').forEach(el => {
    observer.observe(el);
});

// Add fade-in animation CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-in forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 