// top
document.addEventListener('DOMContentLoaded', function() {
    let topButton = document.querySelector('.up-arrow');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            topButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
        }
    });

    topButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const animationElement = document.querySelector('.opening-animation');

    animationElement.addEventListener('animationend', () => {
        animationElement.classList.add('hidden');
    });
});

// scrollbar
const scrollLine = document.querySelector('.scroll-line');
const scrollIndicator = document.getElementById('scrollIndicator');
let isDragging = false;
let startY, startTop;
let scrollLineTop, scrollLineHeight, scrollIndicatorHeight;

// 獲取滾動條的位置和尺寸
function updateScrollInfo() {
    scrollLineTop = scrollLine.getBoundingClientRect().top + window.scrollY;
    scrollLineHeight = scrollLine.offsetHeight;
    scrollIndicatorHeight = scrollIndicator.offsetHeight;
}

window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / docHeight) * 100;
    const maxHeight = 100 * 100;
    const newPercentage = Math.min(scrollPercentage, maxHeight);

    scrollIndicator.style.top = newPercentage + '%';
});

scrollIndicator.addEventListener('mousedown', (event) => {
    isDragging = true;
    startY = event.clientY;
    startTop = scrollIndicator.offsetTop;
    event.preventDefault();
});

window.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaY = event.clientY - startY;
        let newTop = startTop + deltaY;

        // 確保新位置不超出滾動條的範圍
        const maxTop = scrollLineHeight;
        newTop = Math.max(0, Math.min(newTop, maxTop));

        // 更新滾動指示器位置
        scrollIndicator.style.top = newTop + 'px';

        // 計算並更新頁面滾動位置
        const scrollPercentage = newTop / maxTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const newScrollY = scrollPercentage * docHeight;
        window.scrollTo({
            top: newScrollY,
            behavior: 'smooth'
        });
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// 視窗大小改變時更新滾動條和指示器
window.addEventListener('resize', updateScrollInfo);

// 初始設置
updateScrollInfo();

// mouse
const cursor = document.querySelector('#cursor'),
stalker = document.querySelector('#stalker');

document.addEventListener('mousemove', (event) => {
  
  const x = event.clientX,
  y = event.clientY;
    
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  stalker.style.transform = `translate(${x}px, ${y}px)`;
  
  console.log('X :' , event.clientX , 'Y :' , event.clientY);
});

const skillSection = document.getElementById('skill');
const skillContent = document.querySelector('.skill');

window.addEventListener('scroll', function() {
    let contentBottom = skillSection.getBoundingClientRect().bottom;
    let windowHeight = window.innerHeight;

    // 判斷是否滾動到技能區塊，若是則顯示
    if (contentBottom < windowHeight) {
        skillContent.classList.add('visible');
    } else {
        skillContent.classList.remove('visible');
    }
});