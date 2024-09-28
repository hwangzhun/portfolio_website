// 获取悬浮球元素
const themeToggleBall = document.getElementById('theme-toggle-ball');
const ballIcon = document.querySelector('.ball-icon');
const navbar = document.querySelector('.navbar'); // 使用 .navbar 选择器

// 检查用户的主题偏好
let currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    ballIcon.textContent = '☀️'; // 切换为太阳图标
} else {
    ballIcon.textContent = '🌙'; // 默认月亮图标
}

// 监听悬浮球点击事件
themeToggleBall.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggleBall.classList.add('clicked'); // 添加点击时的动画类

    // 动态切换图标
    if (document.body.classList.contains('light-mode')) {
        ballIcon.textContent = '☀️'; // 切换到 Light 模式
        localStorage.setItem('theme', 'light');
    } else {
        ballIcon.textContent = '🌙'; // 切换到 light 模式
        localStorage.setItem('theme', 'light');
    }

    // 动画结束后移除 'clicked' 类
    setTimeout(() => {
        themeToggleBall.classList.remove('clicked');
    }, 600); // 动画持续时间为 0.6 秒
});

// 定义一个函数来调整悬浮球位置
function adjustFloatingBall() {
    // 获取导航栏的高度
    const navHeight = navbar.getBoundingClientRect().height;
  
    // 设置悬浮球距离底部的距离（保持一定的安全距离，例如 20px）
    themeToggleBall.style.bottom = `${navHeight + 20}px`;
  }
  
  // 初始化时调整悬浮球位置
  adjustFloatingBall();
  
  // 监听窗口大小变化，实时调整悬浮球位置
  window.addEventListener('resize', adjustFloatingBall);
  
  // 监听导航栏的高度变化
  new ResizeObserver(adjustFloatingBall).observe(navbar);



