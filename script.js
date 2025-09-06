
        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Update active nav link if it exists for this page
            const activeNavLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('show');
        });
        
        // Navigation link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
                
                // Close mobile menu if open
                document.querySelector('nav ul').classList.remove('show');
            });
        });
        
        // Auth button clicks
        document.querySelectorAll('.auth-buttons a').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // The onclick attribute already handles page navigation
            });
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
            
            // Initialize AI assistant with sample message
            setTimeout(() => {
                addAIMessage("I can help you find team members based on skills, interests, or project needs. Try asking me something like 'Find me a web developer for my e-commerce project'");
            }, 1500);
            
            // Initialize match finder button
            document.querySelector('.match-form button').addEventListener('click', function() {
                const skillsInput = document.querySelector('.match-form input');
                if (skillsInput.value.trim() !== '') {
                    showPage('find-match');
                } else {
                    alert('Please enter some skills to find matches');
                }
            });
        });

        // AI Assistant functionality
        const aiToggle = document.querySelector('.ai-toggle');
        const aiPanel = document.querySelector('.ai-panel');
        const aiClose = document.querySelector('.ai-close');
        const aiInput = document.querySelector('.ai-input input');
        const aiButton = document.querySelector('.ai-input button');
        const aiConversation = document.querySelector('.ai-conversation');

        aiToggle.addEventListener('click', () => {
            aiPanel.classList.toggle('active');
        });

        aiClose.addEventListener('click', () => {
            aiPanel.classList.remove('active');
        });

        function addAIMessage(text) {
            const message = document.createElement('div');
            message.classList.add('message', 'ai-message');
            message.textContent = text;
            aiConversation.appendChild(message);
            aiConversation.scrollTop = aiConversation.scrollHeight;
        }

        function addUserMessage(text) {
            const message = document.createElement('div');
            message.classList.add('message', 'user-message');
            message.textContent = text;
            aiConversation.appendChild(message);
            aiConversation.scrollTop = aiConversation.scrollHeight;
        }

        aiButton.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const message = aiInput.value.trim();
            if (message) {
                addUserMessage(message);
                aiInput.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    let response;
                    
                    if (message.toLowerCase().includes('web developer') || message.toLowerCase().includes('developer')) {
                        response = "I've found 3 web developers who might be a good fit for your project. Would you like me to show you their profiles?";
                    } else if (message.toLowerCase().includes('designer')) {
                        response = "I see you're looking for a designer. We have several talented UI/UX designers available. What type of project are you working on?";
                    } else if (message.toLowerCase().includes('project') || message.toLowerCase().includes('idea')) {
                        response = "That sounds interesting! To help you find the right team members, could you tell me what skills are needed for your project?";
                    } else if (message.toLowerCase().includes('hackathon')) {
                        response = "Great! We have several hackathons coming up. Are you looking for a team to join or teammates for your own project?";
                    } else if (message.toLowerCase().includes('match') || message.toLowerCase().includes('find')) {
                        response = "I can help you find team members for your project. You can also use our matching system on the 'Find Match' page for more detailed results.";
                        setTimeout(() => {
                            addAIMessage("Would you like me to take you to the matching page?");
                        }, 1000);
                    } else {
                        response = "I can help you find team members for your project. Tell me about your project or what skills you're looking for.";
                    }
                    
                    addAIMessage(response);
                }, 1000);
            }
        }
        
        // Close AI panel when clicking outside
        document.addEventListener('click', function(e) {
            if (aiPanel.classList.contains('active') && 
                !aiPanel.contains(e.target) && 
                !aiToggle.contains(e.target)) {
                aiPanel.classList.remove('active');
            }
        });
    