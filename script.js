document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  
    // Scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  
    // Experience tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabs.length > 0 && tabContents.length > 0) {
      // Show first tab content by default
      tabs[0].classList.add('active');
      tabContents[0].style.display = 'block';
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs and hide all contents
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.style.display = 'none');
          
          // Add active class to clicked tab and show corresponding content
          tab.classList.add('active');
          tabContents[index].style.display = 'block';
        });
      });
    }
  
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  
    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const image = card.querySelector('.project-image');
      
      card.addEventListener('mouseenter', () => {
        image.style.transform = 'translateY(-7px)';
      });
      
      card.addEventListener('mouseleave', () => {
        image.style.transform = 'translateY(0)';
      });
    });

    // Add scroll progress indicator
    const addScrollProgress = () => {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
  
      window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
      });
    };
  
    // Add reveal animations on scroll
    const addRevealAnimations = () => {
      const sections = document.querySelectorAll('section');
      let isEven = true;
  
      sections.forEach(section => {
        if(isEven) {
          section.classList.add('slide-in-left');
        } else {
          section.classList.add('slide-in-right');
        }
        isEven = !isEven;
      });
    };
  
    // Add typing effect to hero title
    const addTypingEffect = () => {
      const tagline = document.querySelector('.tagline');
      tagline.classList.add('typing-effect');
    };
  
    // Initialize new animations
    addScrollProgress();
    addRevealAnimations();
    addTypingEffect();
  
    // Parallax effect for project cards
    window.addEventListener('mousemove', (e) => {
      projectCards.forEach(card => {
        const speed = 5;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        card.style.transform = `
          perspective(1000px)
          rotateY(${(x - rect.width / 2) / speed}deg)
          rotateX(${-(y - rect.height / 2) / speed}deg)
        `;
      });
    });
  
    // Reset parallax on mouse leave
    projectCards.forEach(card => {
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
      });
    });

    // Custom cursor
    const cursor = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2,
        element: document.getElementById('custom-cursor'),
        trail: document.getElementById('cursor-trail')
    };

    // Single mousemove event listener for cursor
    document.addEventListener('mousemove', (e) => {
        cursor.targetX = e.clientX;
        cursor.targetY = e.clientY;
    });

    function updateCursor() {
        const easeFactor = 0.15;
        
        cursor.x += (cursor.targetX - cursor.x) * easeFactor;
        cursor.y += (cursor.targetY - cursor.y) * easeFactor;
        
        // Add slight lag effect to trail
        const trailLag = 0.08;
        const trailX = cursor.x + Math.sin(Date.now() * 0.01) * 2;
        const trailY = cursor.y + Math.cos(Date.now() * 0.01) * 2;
        
        cursor.element.style.transform = `translate(${cursor.x - 2}px, ${cursor.y - 2}px)`;
        cursor.trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px) rotate(45deg)`;
        
        requestAnimationFrame(updateCursor);
    }

    // Improved hover effects for clickable elements
    document.querySelectorAll('a, button, .project-card').forEach(elem => {
        elem.classList.add('clickable');
        elem.addEventListener('mouseenter', () => {
            cursor.element.style.transform = `translate(${cursor.x - 4}px, ${cursor.y - 4}px) scale(2)`;
            cursor.trail.style.transform = `translate(${cursor.x - 16}px, ${cursor.y - 16}px) scale(1.5)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            cursor.element.style.transform = `translate(${cursor.x - 4}px, ${cursor.y - 4}px) scale(1)`;
            cursor.trail.style.transform = `translate(${cursor.x - 16}px, ${cursor.y - 16}px) scale(1)`;
        });
    });
    
    updateCursor();

    // Loading screen
    window.addEventListener('load', () => {
      const loadingScreen = document.querySelector('.loading-screen');
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    });

    // Improved reveal animations
    const revealOnScroll = () => {
      const sections = document.querySelectorAll('.slide-in-left, .slide-in-right');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Fix cursor for clickable elements
    const makeElementsClickable = () => {
      const clickableElements = document.querySelectorAll('a, button, .project-card');
      clickableElements.forEach(elem => {
        elem.classList.add('clickable');
      });
    };

    makeElementsClickable();

    // 3D Flip card hover effect
    const initProjectCards = () => {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.03)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1)';
        });
        
        // Add floating animation
        card.style.animation = 'float 6s ease-in-out infinite';
      });
    };
    
    initProjectCards();
    
    // Add perspective effect on mouse move
    document.addEventListener('mousemove', (e) => {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const multiplier = 20;
        const rotateX = (y - rect.height / 2) / multiplier;
        const rotateY = (x - rect.width / 2) / multiplier;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    // Reset card position when mouse leaves
    document.addEventListener('mouseleave', () => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });

    initTiltAnimation();
    observeProjects();

    // Add click animation for navbar links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove animation class from all links
            document.querySelectorAll('.nav-links a').forEach(l => {
                l.classList.remove('nav-click');
            });
            
            // Add animation class to clicked link
            this.classList.add('nav-click');
            
            // Remove animation class after animation ends
            setTimeout(() => {
                this.classList.remove('nav-click');
            }, 400);
        });
    });
});

function initTiltAnimation() {
  const cards = document.querySelectorAll('.project-card, .image-wrapper');
  
  cards.forEach(card => {
    let bounds;
    let mouseLeaveDelay;

    const mouseEnter = (e) => {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', mouseMove);
      mouseMove(e);
    };

    const mouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
      
      card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;
    };

    const mouseLeave = () => {
      document.removeEventListener('mousemove', mouseMove);
      clearTimeout(mouseLeaveDelay);
      
      mouseLeaveDelay = setTimeout(() => {
        card.style.transform = 'scale3d(1, 1, 1)';
      }, 100);
    };

    card.addEventListener('mouseenter', mouseEnter);
    card.addEventListener('mouseleave', mouseLeave);
  });
}

// Add smooth reveal animation for projects
const observeProjects = () => {
  const options = {
    threshold: 0.2,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(100px) scale(0.95)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(card);
  });
};