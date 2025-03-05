/**
 * Environmental Page Animations
 * Simple CSS-based animations triggered by Intersection Observer
 */
(function() {
    // Wait for DOM content to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing CSS-based animations');
        initializeAnimations();
    });

    // Initialize all animations
    function initializeAnimations() {
        console.log("Initializing animations...");
        
        // Initialize scroll animations
        setupScrollAnimations();
        
        // Apply default animations to elements
        applyDefaultAnimations();
        
        // Initialize counters
        initializeCounters();
        
        // Initialize rainwater animation if the element exists
        initializeRainwaterAnimation();
        
        // Animate content headers
        animateContentHeaders();
        
        // Initialize nature decorations
        initializeNatureDecorations();
        
        // Setup special animations
        initializeGaugeAnimation();
        initializeFadeInUpAnimations();
        initializePulseHoverEffects();
        
        // Initialize section-specific animations
        initializeSectionAnimations();
        
        // Setup theme toggle
        setupThemeToggle();
        
        // Initialize disaster map interactions
        initializeDisasterMap();
        animateDisastersIntro();
    }
    
    // Setup scroll-triggered animations using Intersection Observer
    function setupScrollAnimations() {
        console.log('Setting up scroll animations');
        
        // Animation types and their corresponding CSS classes
        const animationTypes = {
            'fade-in': 'animate-fade-in',
            'slide-up': 'animate-slide-up',
            'slide-down': 'animate-slide-down',
            'slide-left': 'animate-slide-left',
            'slide-right': 'animate-slide-right',
            'zoom-in': 'animate-zoom-in',
            'zoom-out': 'animate-zoom-out',
            'flip': 'animate-flip',
            'pulse': 'animate-pulse',
            'fade-in-up': 'animate-fade-in-up',
            'slide-in-right': 'animate-slide-in-right',
            'pulse-on-hover': 'pulse-on-hover'
        };
        
        // Get all elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        // Create options for the Intersection Observer
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the element must be visible
        };
        
        // Create a new Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Find which animation to apply
                    let animationClass = '';
                    for (const [type, className] of Object.entries(animationTypes)) {
                        if (element.classList.contains(className)) {
                            // Animation class already exists, we don't need to add it
                            animationClass = className;
                            break;
                        }
                    }
                    
                    // If no animation class was found but element should animate
                    if (!animationClass && element.classList.contains('animate-on-scroll')) {
                        // Add the default animation if none specified
                        element.classList.add('animated');
                        
                        // Apply specific animation classes if they exist
                        for (const [type, className] of Object.entries(animationTypes)) {
                            if (element.classList.contains(className)) {
                                element.classList.add('animated');
                                break;
                            }
                        }
                    }
                    
                    // Add visibility class to trigger the animation
                    element.classList.add('visible');
                    
                    // Stop observing the element after animation is applied
                    observer.unobserve(element);
                }
            });
        }, options);
        
        // Start observing all elements with the animate-on-scroll class
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Apply default animations to elements based on their type
    function applyDefaultAnimations() {
        // Hero stats
        document.querySelectorAll('.hero-stats .stat-item').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'slide-up');
            el.setAttribute('data-animation-delay', index * 200);
        });
        
        // Info cards
        document.querySelectorAll('.info-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'fade-in');
        });
        
        // Pollution types
        document.querySelectorAll('.pollution-type').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'zoom-in');
            el.setAttribute('data-animation-delay', index * 200);
        });
        
        // Hierarchy levels
        document.querySelectorAll('.hierarchy-level').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'slide-left');
            el.setAttribute('data-animation-delay', index * 200);
        });
        
        // Energy types
        document.querySelectorAll('.energy-type').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'slide-up');
            el.setAttribute('data-animation-delay', index * 200);
        });
        
        // Action cards
        document.querySelectorAll('.action-card').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation-type', 'fade-in');
            el.setAttribute('data-animation-delay', index * 200);
        });
    }
    
    // Initialize fade-in-up animations for elements with that class
    function initializeFadeInUpAnimations() {
        console.log('Initializing fade-in-up animations');
        
        // Apply to pollution types if they don't already have animation classes
        document.querySelectorAll('.pollution-type').forEach((el, index) => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
            }
            if (!el.classList.contains('animate-fade-in-up')) {
                el.classList.add('animate-fade-in-up');
            }
            
            // Add delay class based on index if not already present
            if (!el.classList.contains(`delay-${(index+1)*100}`)) {
                el.classList.add(`delay-${(index+1)*100}`);
            }
        });
        
        // Hierarchy levels
        document.querySelectorAll('.hierarchy-level').forEach((el, index) => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
            }
            if (!el.classList.contains('animate-slide-right')) {
                el.classList.add('animate-slide-right');
            }
            
            // Add delay class based on index if not already present
            if (!el.classList.contains(`delay-${(index+1)*100}`)) {
                el.classList.add(`delay-${(index+1)*100}`);
            }
        });
    }
    
    // Initialize pulse hover effects
    function initializePulseHoverEffects() {
        console.log('Initializing pulse hover effects');
        
        // Add pulse-on-hover class to action cards if they don't have it already
        document.querySelectorAll('.action-card').forEach(card => {
            if (!card.classList.contains('pulse-on-hover')) {
                card.classList.add('pulse-on-hover');
            }
        });
        
        // Add pulse-on-hover to social links if they don't have it already
        document.querySelectorAll('.social-links a').forEach(link => {
            if (!link.classList.contains('pulse-on-hover')) {
                link.classList.add('pulse-on-hover');
            }
        });
    }
    
    // Temperature gauge animation
    function initializeGaugeAnimation() {
        const gauge = document.querySelector('.gauge-fill');
        if (!gauge) return;
        
        const gaugeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gauge.style.transition = 'width 1.5s ease-out';
                    gauge.style.width = '75%';
                    gaugeObserver.unobserve(gauge);
                }
            });
        }, { threshold: 0.1 });
        
        gaugeObserver.observe(gauge);
    }
    
    // Rainwater animation
    function initializeRainwaterAnimation() {
        console.log('Initializing rainwater animation');
        
        const rainSystems = document.querySelectorAll('.rainwater-system');
        if (!rainSystems.length) {
            return;
        }
        
        rainSystems.forEach(system => {
            // Clear any existing raindrops
            const existingDrops = system.querySelectorAll('.raindrop');
            existingDrops.forEach(drop => drop.remove());
            
            // Get the cloud element
            const cloud = system.querySelector('.rain-cloud');
            if (!cloud) {
                return;
            }
            
            // Create raindrops
            for (let i = 0; i < 10; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'raindrop';
                
                // Set random positions
                raindrop.style.left = `${10 + (i * 8)}%`;
                raindrop.style.animationDelay = `${0.1 * i}s`;
                raindrop.style.animationDuration = `${1 + Math.random() * 0.5}s`;
                
                cloud.appendChild(raindrop);
            }
            
            // Add animation classes
            system.classList.add('animate-flow');
            
            // Get the tank element
            const tank = system.querySelector('.collection-tank');
            if (tank) {
                // Reset tank animation
                tank.style.animation = 'none';
                tank.offsetHeight; // Trigger reflow
                tank.style.animation = 'tankFill 10s forwards';
            }
        });
    }
    
    // Counter animation for statistics
    function initializeCounters() {
        const counters = document.querySelectorAll('.counter, .count-up');
        if (!counters.length) return;
        
        counters.forEach(counter => {
            const target = parseFloat(counter.textContent.replace(/,/g, '').replace(/[^\d.-]/g, ''));
            if (isNaN(target)) return;
            
            const isPercentage = counter.textContent.includes('%');
            const hasDegree = counter.textContent.includes('°');
            const hasDecimal = counter.textContent.includes('.');
            const suffix = hasDegree ? '°C' : (isPercentage ? '%' : '');
            const decimals = hasDecimal ? counter.textContent.split('.')[1].length : 0;
            
            // Reset to zero
            counter.textContent = formatNumber(0, decimals, suffix);
            
            // Create observer to start counter when visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter, 0, target, 2000, decimals, suffix);
                        counterObserver.unobserve(counter);
                    }
                });
            }, { threshold: 0.1 });
            
            counterObserver.observe(counter);
        });
    }
    
    // Animate a counter from start to end value
    function animateCounter(element, start, end, duration, decimals, suffix) {
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Use easeOutQuad for smoother animation
            const easedProgress = 1 - (1 - progress) * (1 - progress);
            const currentValue = start + (end - start) * easedProgress;
            
            element.textContent = formatNumber(currentValue, decimals, suffix);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Format number with commas and specified decimals
    function formatNumber(value, decimals, suffix) {
        return value.toFixed(decimals)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    }
    
    // Setup theme toggle
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            updateThemeIcon(themeToggle);
        });
        
        // Initial icon setup
        updateThemeIcon(themeToggle);
    }
    
    // Update theme icon based on current mode
    function updateThemeIcon(toggleButton) {
        const isDark = document.body.classList.contains('dark-mode');
        const icon = toggleButton.querySelector('i');
        
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Add animations to section headers
    function animateContentHeaders() {
        console.log('Initializing content header animations');
        
        // Animate section headings
        document.querySelectorAll('.content-section h2').forEach((header, index) => {
            if (!header.classList.contains('animate-on-scroll')) {
                header.classList.add('animate-on-scroll');
                header.classList.add('animate-slide-up');
                header.classList.add(`delay-${100}`);
            }
            
            // Also animate the icon within the header
            const icon = header.querySelector('i');
            if (icon) {
                icon.style.display = 'inline-block';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        // Add hover effect to section headings
        document.querySelectorAll('.content-section h2').forEach(header => {
            header.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                }
            });
            
            header.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }

    // Initialize section-specific animations
    function initializeSectionAnimations() {
        console.log('Initializing section-specific animations');
        
        // Make section content visible when scrolled into view
        const sections = document.querySelectorAll('.content-section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animations to list items
                    const listItems = entry.target.querySelectorAll('.info-list li, .impact-list li');
                    listItems.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 100}ms`;
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 100 + (index * 100));
                    });
                    
                    // Animate statistic highlights
                    const statHighlights = entry.target.querySelectorAll('.stat-highlight');
                    statHighlights.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.animation = 'pulse 2s 1';
                        }, 500 + (index * 150));
                    });
                    
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Special animations for each section type
        animateDisastersSection();
        animateBiodiversitySection();
        animateWaterSection();
        animateEnergySection();
    }

    // Animate disasters section with special effects
    function animateDisastersSection() {
        const disastersSection = document.querySelector('.natural-disasters');
        if (!disastersSection) return;
        
        // Add background particle effect
        const particleContainer = document.createElement('div');
        particleContainer.className = 'disaster-particles';
        disastersSection.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'disaster-particle';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particleContainer.appendChild(particle);
        }
        
        // Enhance icons with interactive effects
        disastersSection.querySelectorAll('.disaster-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Animate biodiversity section
    function animateBiodiversitySection() {
        const bioSection = document.querySelector('.biodiversity');
        if (!bioSection) return;
        
        // Floating leaf effect
        for (let i = 0; i < 10; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            leaf.innerHTML = '<i class="fas fa-leaf"></i>';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * 100}%`;
            leaf.style.animationDuration = `${10 + Math.random() * 20}s`;
            leaf.style.animationDelay = `${Math.random() * 5}s`;
            leaf.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`;
            bioSection.appendChild(leaf);
        }
    }

    // Enhance water section with additional water effects
    function animateWaterSection() {
        const waterSection = document.querySelector('.water-conservation');
        if (!waterSection) return;
        
        // Make water ripple effect on hover
        const waterSystem = waterSection.querySelector('.rainwater-system');
        if (waterSystem) {
            waterSystem.addEventListener('mouseenter', function() {
                this.classList.add('ripple-effect');
            });
            
            waterSystem.addEventListener('mouseleave', function() {
                this.classList.remove('ripple-effect');
            });
        }
    }

    // Add energy particles to energy section
    function animateEnergySection() {
        const energySection = document.querySelector('.renewable-energy');
        if (!energySection) return;
        
        // Add energy particles
        energySection.querySelectorAll('.energy-type').forEach(energyType => {
            const particles = document.createElement('div');
            particles.className = 'energy-particles';
            
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'energy-particle';
                particle.style.animationDuration = `${1 + Math.random() * 2}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                particles.appendChild(particle);
            }
            
            energyType.appendChild(particles);
        });
    }

    // Initialize nature decorations with enhanced animations
    function initializeNatureDecorations() {
        console.log("Initializing enhanced nature decorations...");
        
        // Randomize leaf decorations to make them more natural
        document.querySelectorAll('.leaf-decoration').forEach(leaf => {
            // Randomize animation delay
            const delay = Math.random() * 8;
            leaf.style.animationDelay = `${delay}s`;
            
            // Randomize animation duration slightly
            const duration = 6 + Math.random() * 4;
            leaf.style.animationDuration = `${duration}s`;
            
            // Store original values for reset
            leaf.dataset.originalDuration = `${duration}s`;
            leaf.dataset.originalDelay = `${delay}s`;
            
            // Slight random rotation
            const rotation = Math.random() * 10 - 5;
            leaf.style.transform = `rotate(${rotation}deg)`;
        });
        
        // Randomize nature icons
        document.querySelectorAll('.nature-icon').forEach(icon => {
            // Randomize animation delay
            const delay = Math.random() * 6;
            icon.style.animationDelay = `${delay}s`;
            
            // Randomize animation duration slightly
            const duration = 4 + Math.random() * 3;
            icon.style.animationDuration = `${duration}s`;
            
            // Store original values
            icon.dataset.originalDuration = `${duration}s`;
            
            // Random size variations
            const size = 0.9 + Math.random() * 0.3;
            icon.style.transform = `scale(${size})`;
        });
        
        // Add enhanced hover effects to ecosystem info
        const ecosystemInfo = document.querySelector('.ecosystem-info');
        if (ecosystemInfo) {
            ecosystemInfo.addEventListener('mouseenter', () => {
                const leaves = document.querySelectorAll('.ecosystem-bridge .leaf-decoration');
                leaves.forEach(leaf => {
                    // Speed up animations on hover
                    leaf.style.animationDuration = '3s';
                    leaf.style.transform = 'scale(1.2) rotate(5deg)';
                    leaf.style.opacity = '0.9';
                });
            });
            
            ecosystemInfo.addEventListener('mouseleave', () => {
                const leaves = document.querySelectorAll('.ecosystem-bridge .leaf-decoration');
                leaves.forEach(leaf => {
                    // Reset to original values
                    leaf.style.animationDuration = leaf.dataset.originalDuration || '6s';
                    leaf.style.transform = '';
                    leaf.style.opacity = '0.6';
                });
            });
        }
        
        // Make sure leafy backgrounds are properly positioned and add subtle animation
        document.querySelectorAll('.leafy-background').forEach(bg => {
            const parentHeight = bg.parentElement.offsetHeight;
            bg.style.height = `${parentHeight}px`;
            
            // Add subtle "breathing" animation
            const breatheAnimation = [
                { opacity: 0.15, transform: 'scale(1)' },
                { opacity: 0.25, transform: 'scale(1.05)' },
                { opacity: 0.15, transform: 'scale(1)' }
            ];
            
            const breatheTiming = {
                duration: 8000,
                iterations: Infinity
            };
            
            bg.animate(breatheAnimation, breatheTiming);
        });
        
        // Add enhanced parallax effect to dividers on scroll
        window.addEventListener('scroll', () => {
            const dividers = document.querySelectorAll('.nature-divider, .green-divider');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            dividers.forEach(divider => {
                const rect = divider.getBoundingClientRect();
                
                // If divider is in viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const distance = (windowHeight - rect.top) / windowHeight;
                    
                    // Parallax for divider itself - subtle movement
                    divider.style.backgroundPosition = `${50 + (distance * 5)}% 50%`;
                    
                    // Enhanced parallax for decorative elements
                    const leaves = divider.querySelectorAll('.leaf-decoration, .nature-icon');
                    leaves.forEach((leaf, index) => {
                        const direction = index % 2 === 0 ? 1 : -1;
                        const speed = 0.5 + (index % 3) * 0.2;
                        const offsetY = distance * direction * 10 * speed;
                        const offsetX = distance * (direction * -1) * 5 * speed;
                        
                        leaf.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetY / 2}deg)`;
                        leaf.style.opacity = 0.6 + (distance * 0.4);
                    });
                }
            });
            
            // Add parallax to vine decorations
            document.querySelectorAll('.vine-decoration').forEach((vine, index) => {
                const rect = vine.getBoundingClientRect();
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const distance = (windowHeight - rect.top) / windowHeight;
                    const parallaxDirection = index % 2 === 0 ? 1 : -1;
                    
                    vine.style.transform = `translateX(${parallaxDirection * distance * 10}px)`;
                    vine.style.opacity = 0.4 + (distance * 0.4);
                }
            });
        });
    }

    // Initialize disaster map interactions
    function initializeDisasterMap() {
        const regions = document.querySelectorAll('.region');
        
        if (regions.length === 0) return;
        
        console.log('Initializing disaster map interactions');
        
        regions.forEach(region => {
            // Position region names relative to their parent region
            const regionName = region.querySelector('.region-name');
            if (regionName) {
                regionName.style.top = '-25px';
                regionName.style.left = '50%';
                regionName.style.transform = 'translateX(-50%)';
            }
            
            // Position region info tooltips
            const regionInfo = region.querySelector('.region-info');
            if (regionInfo) {
                regionInfo.style.top = '30px';
                regionInfo.style.left = '0';
            }
            
            // Add hover animations
            region.addEventListener('mouseenter', () => {
                if (regionName) regionName.style.fontWeight = '700';
                region.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
            });
            
            region.addEventListener('mouseleave', () => {
                if (regionName) regionName.style.fontWeight = '600';
                region.style.boxShadow = 'none';
            });
        });
        
        // Create pulsing effect for regions
        function pulseRegions() {
            regions.forEach((region, index) => {
                setTimeout(() => {
                    region.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        region.style.transform = 'scale(1)';
                    }, 500);
                }, index * 300);
            });
        }
        
        // Pulse regions occasionally
        pulseRegions();
        setInterval(pulseRegions, 10000);
    }

    function animateDisastersIntro() {
        console.log("Initializing disaster intro animations");
        
        const disasterIntroSection = document.querySelector('.natural-disasters .section-intro');
        if (!disasterIntroSection) return;
        
        // Create disaster intro animation container
        const animationContainer = document.createElement('div');
        animationContainer.className = 'disaster-intro-animation';
        disasterIntroSection.after(animationContainer);
        
        // Add weather effects background
        const weatherEffects = document.createElement('div');
        weatherEffects.className = 'weather-effects';
        
        // Add rain container
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        
        // Create raindrops
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            // Randomize raindrop properties
            const leftPos = Math.random() * 100;
            const duration = 0.5 + Math.random() * 0.7;
            const delay = Math.random() * 5;
            const size = 1 + Math.random() * 2;
            
            raindrop.style.left = `${leftPos}%`;
            raindrop.style.animationDuration = `${duration}s`;
            raindrop.style.animationDelay = `${delay}s`;
            raindrop.style.width = `${size}px`;
            raindrop.style.height = `${size * 10}px`;
            
            rainContainer.appendChild(raindrop);
        }
        
        // Add cyclone container
        const cycloneContainer = document.createElement('div');
        cycloneContainer.className = 'cyclone-container';
        
        // Create cyclone element
        const cyclone = document.createElement('div');
        cyclone.className = 'cyclone';
        
        // Create cyclone spiral layers
        for (let i = 1; i <= 5; i++) {
            const spiralLayer = document.createElement('div');
            spiralLayer.className = `cyclone-layer layer-${i}`;
            cyclone.appendChild(spiralLayer);
        }
        
        cycloneContainer.appendChild(cyclone);
        
        // Add lightning container
        const lightningContainer = document.createElement('div');
        lightningContainer.className = 'lightning-container';
        
        // Create lightning flash element
        const lightningFlash = document.createElement('div');
        lightningFlash.className = 'lightning-flash';
        lightningContainer.appendChild(lightningFlash);
        
        // Setup lightning flashes at random intervals
        function createLightningFlash() {
            lightningFlash.style.opacity = '0';
            
            // Random delay between flashes
            const randomDelay = 2000 + Math.random() * 5000;
            
            setTimeout(() => {
                // First flash
                lightningFlash.style.opacity = '1';
                
                setTimeout(() => {
                    // Fade out
                    lightningFlash.style.opacity = '0';
                    
                    // Sometimes add a second flash
                    if (Math.random() > 0.5) {
                        setTimeout(() => {
                            lightningFlash.style.opacity = '0.8';
                            
                            setTimeout(() => {
                                lightningFlash.style.opacity = '0';
                                createLightningFlash();
                            }, 50);
                        }, 100);
                    } else {
                        createLightningFlash();
                    }
                }, 50);
            }, randomDelay);
        }
        
        // Start lightning animation sequence
        createLightningFlash();
        
        // Add weather effects to the animation container
        weatherEffects.appendChild(rainContainer);
        weatherEffects.appendChild(cycloneContainer);
        weatherEffects.appendChild(lightningContainer);
        animationContainer.appendChild(weatherEffects);
        
        // Add disaster statistics with animated counters
        const statsContainer = document.createElement('div');
        statsContainer.className = 'disaster-intro-stats';
        
        const statsData = [
            { icon: 'fa-temperature-high', value: '1.1°C', text: 'Global temperature rise since pre-industrial times' },
            { icon: 'fa-cloud-showers-heavy', value: '20%', text: 'Increase in extreme rainfall events in India' },
            { icon: 'fa-fire-alt', value: '75%', text: 'Of extreme weather events are now linked to climate change' },
            { icon: 'fa-chart-line', value: '3X', text: 'Increase in climate disasters since 1970s' }
        ];
        
        statsData.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'disaster-stat-item';
            statItem.innerHTML = `
                <i class="fas ${stat.icon}"></i>
                <span class="stat-value counter">${stat.value}</span>
                <p>${stat.text}</p>
            `;
            statsContainer.appendChild(statItem);
            
            // Add randomized animation delay for more natural look
            const delay = 100 + Math.random() * 400;
            statItem.style.animationDelay = `${delay}ms`;
        });
        
        animationContainer.appendChild(statsContainer);
        
        // Add disaster timeline visualization
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'disaster-timeline-container';
        timelineContainer.innerHTML = `
            <h4 class="timeline-title"><i class="fas fa-history"></i> Major Disasters in India Timeline</h4>
            <div class="timeline-track">
                <div class="timeline-line"></div>
                <div class="timeline-events">
                    <div class="timeline-event" data-year="1999">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">1999</span>
                            <h5>Odisha Super Cyclone</h5>
                            <p>Claimed over 10,000 lives and affected 15 million people</p>
                        </div>
                    </div>
                    <div class="timeline-event" data-year="2001">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">2001</span>
                            <h5>Gujarat Earthquake</h5>
                            <p>7.7 magnitude, killed 20,000 and destroyed 400,000 homes</p>
                        </div>
                    </div>
                    <div class="timeline-event" data-year="2004">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">2004</span>
                            <h5>Indian Ocean Tsunami</h5>
                            <p>Caused by 9.1 earthquake, killed 230,000 across region</p>
                        </div>
                    </div>
                    <div class="timeline-event" data-year="2013">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">2013</span>
                            <h5>Uttarakhand Floods</h5>
                            <p>Claimed 6,000 lives and damaged infrastructure worth ₹30,000 Cr</p>
                        </div>
                    </div>
                    <div class="timeline-event" data-year="2018">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">2018</span>
                            <h5>Kerala Floods</h5>
                            <p>Affected 5.4 million people, 400+ fatalities</p>
                        </div>
                    </div>
                    <div class="timeline-event" data-year="2020">
                        <div class="event-dot"></div>
                        <div class="event-content">
                            <span class="event-year">2020</span>
                            <h5>Cyclone Amphan</h5>
                            <p>Caused $13 billion in damage, strongest in Bay of Bengal since 1999</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="timeline-slider">
                <input type="range" min="1999" max="2020" value="2013" class="time-slider" id="timeSlider">
                <div class="slider-labels">
                    <span>1999</span>
                    <span>2020</span>
                </div>
            </div>
        `;
        
        animationContainer.appendChild(timelineContainer);
        
        // Setup timeline interaction
        setTimeout(() => {
            const slider = document.getElementById('timeSlider');
            const events = document.querySelectorAll('.timeline-event');
            
            if (slider && events.length) {
                slider.addEventListener('input', function() {
                    const year = this.value;
                    document.querySelectorAll('.timeline-event').forEach(event => {
                        const eventYear = parseInt(event.getAttribute('data-year'));
                        
                        if (eventYear <= year) {
                            event.classList.add('active');
                        } else {
                            event.classList.remove('active');
                        }
                        
                        if (eventYear === parseInt(year)) {
                            event.classList.add('current');
                        } else {
                            event.classList.remove('current');
                        }
                    });
                });
                
                // Trigger initial state
                slider.dispatchEvent(new Event('input'));
                
                // Add scroll animation for timeline events
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                };
                
                const timelineObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                events.forEach((event, index) => {
                                    setTimeout(() => {
                                        event.classList.add('visible');
                                    }, index * 200);
                                });
                            }, 500);
                            timelineObserver.unobserve(entry.target);
                        }
                    });
                }, observerOptions);
                
                timelineObserver.observe(timelineContainer);
            }
        }, 100);
        
        // Add floating disaster icons that animate across the screen
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'floating-disaster-icons';
        
        const disasterIcons = [
            'fa-water', 'fa-fire', 'fa-wind', 'fa-mountain', 
            'fa-cloud-showers-heavy', 'fa-temperature-high'
        ];
        
        // Create 12 floating icons (will be randomly positioned via CSS)
        for (let i = 0; i < 12; i++) {
            const icon = document.createElement('i');
            const randomIcon = disasterIcons[Math.floor(Math.random() * disasterIcons.length)];
            
            icon.className = `fas ${randomIcon} floating-icon`;
            
            // Randomize animation properties for more natural movement
            const size = 16 + Math.random() * 24;
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 5;
            const opacity = 0.3 + Math.random() * 0.3;
            
            icon.style.fontSize = `${size}px`;
            icon.style.animationDuration = `${duration}s`;
            icon.style.animationDelay = `${delay}s`;
            icon.style.opacity = opacity;
            
            // Randomize starting positions
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            
            iconsContainer.appendChild(icon);
        }
        
        animationContainer.appendChild(iconsContainer);
        
        // Initialize counters in this section
        const counters = animationContainer.querySelectorAll('.counter');
        counters.forEach(counter => {
            const value = counter.textContent;
            
            // Parse the counter value
            let numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
            let suffix = value.replace(/[\d.-]/g, '');
            
            animateCounter(counter, 0, numericValue, 2000, 0, suffix);
        });
    }
})(); 