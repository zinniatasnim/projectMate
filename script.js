
        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('show');
        });

        // Simple animation for stats counting up
        document.addEventListener('DOMContentLoaded', function() {
            const statItems = document.querySelectorAll('.stat-item');
            
            statItems.forEach(item => {
                const statNumber = item.querySelector('.stat-number');
                const target = parseInt(statNumber.textContent);
                let current = 0;
                const increment = target / 50;
                
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        statNumber.textContent = Math.round(current) + (statNumber.textContent.includes('%') ? '%' : '+');
                        setTimeout(updateNumber, 50);
                    } else {
                        statNumber.textContent = target + (statNumber.textContent.includes('%') ? '%' : '+');
                    }
                };
                
                // Start counting when element is in viewport
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateNumber();
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(item);
            });
        });
    