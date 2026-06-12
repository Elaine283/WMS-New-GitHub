// WMS 日系零售選物管理系統 - JavaScript 交互功能

// 頁面加載時的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeButtons();
    initializeSmoothScroll();
});

/**
 * 初始化導航欄功能
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * 初始化按鈕交互效果
 */
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            // 添加點擊動畫
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * 初始化平滑滾動
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 初始化滾動動畫
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 觀察所有卡片元素
    const cards = document.querySelectorAll('.feature-card, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

/**
 * 統計數據動畫
 */
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h4');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // 如果是數字，進行計數動畫
                if (!isNaN(finalValue)) {
                    animateCounter(target, parseInt(finalValue));
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statItems.forEach(item => observer.observe(item));
}

/**
 * 計數器動畫
 */
function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);
    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(interval);
        } else {
            element.textContent = currentValue;
        }
    }, 30);
}

/**
 * 監聽頁面滾動，更新導航欄樣式
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(244, 132, 95, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

/**
 * 頁面加載完成後執行統計動畫
 */
window.addEventListener('load', function() {
    animateStats();
});

/**
 * 添加 CSS 動畫定義
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 控制台信息
console.log('%c WMS 日系零售選物管理系統', 'font-size: 18px; font-weight: bold; color: #F4845F;');
console.log('%c 庫存最佳化解決方案', 'font-size: 14px; color: #E8956D;');
console.log('%c GitHub: https://github.com/Elaine283/WMS-New-GitHub', 'color: #8B6B5A;');
console.log('%c Live Demo: https://wms-retail-ft9ktzch.manus.space', 'color: #8B6B5A;');
