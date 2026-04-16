document.addEventListener('DOMContentLoaded', () => {
  initCounterAnimation();
  initCaseSwitcher();
  initRevenueFilter();
  initBarChart();
  initLineChart();
  initProgressBars();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initBarChart();
      initLineChart();
    }, 200);
  });
});

function toggleNav(el) {
  const subNav = el.nextElementSibling;
  const arrow = el.querySelector('.nav-arrow');
  if (subNav && subNav.classList.contains('sub-nav')) {
    const isHidden = subNav.style.display === 'none';
    subNav.style.display = isHidden ? 'flex' : 'none';
    arrow.textContent = isHidden ? '⌃' : '⌄';
    if (isHidden) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-value[data-target]');

  const animateCounter = (element) => {
    const target = parseInt(element.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * easeOutQuart);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

function initCaseSwitcher() {
  const cases = [
    {
      title: '这是案例名称',
      desc: '这是案例简介这是案例简介，这是案例简介这是案例简介这是案例简介这是案例简介',
      data: [30, 45, 35, 55, 40, 60, 50, 70, 55, 75, 65, 80]
    },
    {
      title: '金融风控案例',
      desc: '利用联邦学习提升风控模型效果，降低坏账率 15%，提升审批效率 30%。',
      data: [40, 30, 50, 40, 60, 50, 70, 60, 80, 70, 90, 85]
    },
    {
      title: '电商推荐优化',
      desc: '基于深度学习的推荐系统，提升点击率 20%，GMV 增长 12%。',
      data: [20, 35, 30, 45, 50, 45, 60, 70, 65, 80, 75, 90]
    }
  ];

  let currentIndex = 0;
  const caseNameEl = document.querySelector('.case-name');
  const caseDescEl = document.querySelector('.case-desc');
  const arrowBtn = document.querySelector('.case-arrow');
  const canvas = document.getElementById('caseChart');
  if (!canvas || !caseNameEl || !caseDescEl || !arrowBtn) return;

  let currentChartData = [...cases[0].data];
  let animationId = null;

  const drawChart = (targetData, animate = true) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const duration = 800;
    const startTime = performance.now();
    const startData = [...currentChartData];

    const render = (currentTime) => {
      const elapsed = currentTime - startTime;
      const p = animate ? Math.min(elapsed / duration, 1) : 1;
      const ease = 1 - Math.pow(1 - p, 3);

      ctx.clearRect(0, 0, width, height);

      const frameData = targetData.map((val, i) => {
        const startVal = startData[i] !== undefined ? startData[i] : 0;
        return startVal + (val - startVal) * ease;
      });

      const stepX = width / (frameData.length - 1);
      const maxVal = 100;

      ctx.beginPath();
      ctx.moveTo(0, height);
      frameData.forEach((val, i) => {
        const x = i * stepX;
        const y = height - (val / maxVal) * (height - 20);
        ctx.lineTo(x, y);
      });
      ctx.lineTo(width, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(74, 125, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(74, 125, 255, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      frameData.forEach((val, i) => {
        const x = i * stepX;
        const y = height - (val / maxVal) * (height - 20);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#4A7DFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (p < 1) {
        animationId = requestAnimationFrame(render);
      } else {
        currentChartData = targetData;
      }
    };

    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(render);
  };

  drawChart(cases[0].data);

  arrowBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[currentIndex];

    caseNameEl.style.opacity = 0;
    caseDescEl.style.opacity = 0;

    setTimeout(() => {
      caseNameEl.textContent = nextCase.title;
      caseDescEl.textContent = nextCase.desc;
      caseNameEl.style.opacity = 1;
      caseDescEl.style.opacity = 1;
    }, 200);

    drawChart(nextCase.data);
  });
}

function initRevenueFilter() {
  const canvas = document.getElementById('donutChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 70;
  const lineWidth = 20;

  let currentSegments = [
    { value: 65, color: '#4A7DFF' },
    { value: 20, color: '#FFB800' },
    { value: 15, color: '#E8ECF0' }
  ];

  const dataSets = {
    '全部': [
      { value: 65, color: '#4A7DFF' },
      { value: 20, color: '#FFB800' },
      { value: 15, color: '#E8ECF0' }
    ],
    '本月': [
      { value: 75, color: '#4A7DFF' },
      { value: 15, color: '#FFB800' },
      { value: 10, color: '#E8ECF0' }
    ],
    '本季度': [
      { value: 55, color: '#4A7DFF' },
      { value: 30, color: '#FFB800' },
      { value: 15, color: '#E8ECF0' }
    ]
  };

  const valueEl = document.querySelector('.donut-value');
  const select = document.querySelector('.filter-select');
  let animationId = null;

  const drawDonut = (targetSegments, animate = true) => {
    const startTime = performance.now();
    const duration = 800;
    const startSegments = JSON.parse(JSON.stringify(currentSegments));

    const render = (currentTime) => {
      const elapsed = currentTime - startTime;
      const p = animate ? Math.min(elapsed / duration, 1) : 1;
      const ease = 1 - Math.pow(1 - p, 3);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let startAngle = -Math.PI / 2;

      const renderingSegments = targetSegments.map((seg, i) => {
        const sVal = startSegments[i] ? startSegments[i].value : 0;
        return {
          value: sVal + (seg.value - sVal) * ease,
          color: seg.color
        };
      });

      const total = renderingSegments.reduce((sum, s) => sum + s.value, 0);

      renderingSegments.forEach((segment) => {
        const segmentAngle = (segment.value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
        ctx.strokeStyle = segment.color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        startAngle += segmentAngle;
      });

      if (valueEl) {
        valueEl.textContent = `${Math.round(renderingSegments[0].value)}%`;
      }

      if (p < 1) {
        animationId = requestAnimationFrame(render);
      } else {
        currentSegments = targetSegments;
      }
    };

    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(render);
  };

  drawDonut(currentSegments, true);

  if (select) {
    select.addEventListener('change', (e) => {
      const val = e.target.value;
      if (dataSets[val]) drawDonut(dataSets[val]);
      else drawDonut(dataSets['全部']);
    });
  }
}

function initBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  canvas.width = container.clientWidth;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 20, right: 30, bottom: 40, left: 30 };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'];
  const dataBlue = [60, 45, 70, 55, 80, 65, 50, 75, 60, 85];
  const dataYellow = [40, 55, 50, 65, 55, 70, 60, 45, 80, 55];

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barGroupWidth = chartWidth / months.length;
  const barWidth = Math.min(barGroupWidth * 0.35, 20);
  const gap = 6;

  let animationProgress = 0;
  let hoveredIndex = -1;

  if (canvas.dataset.animId) cancelAnimationFrame(parseInt(canvas.dataset.animId, 10));

  const drawBars = () => {
    ctx.clearRect(0, 0, width, height);
    const maxVal = 100;

    months.forEach((month, i) => {
      const groupX = padding.left + i * barGroupWidth + barGroupWidth / 2;
      const blueHeight = (dataBlue[i] / maxVal) * chartHeight * animationProgress;
      const blueX = groupX - barWidth - gap / 2;
      const blueY = padding.top + chartHeight - blueHeight;

      if (blueHeight > 0) {
        ctx.beginPath();
        ctx.roundRect(blueX, blueY, barWidth, blueHeight, 4);
        if (i === hoveredIndex) {
          ctx.fillStyle = '#6B9AFF';
          ctx.shadowColor = 'rgba(74, 125, 255, 0.4)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#4A7DFF';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      const yellowHeight = (dataYellow[i] / maxVal) * chartHeight * animationProgress;
      const yellowX = groupX + gap / 2;
      const yellowY = padding.top + chartHeight - yellowHeight;

      if (yellowHeight > 0) {
        ctx.beginPath();
        ctx.roundRect(yellowX, yellowY, barWidth, yellowHeight, 4);
        if (i === hoveredIndex) {
          ctx.fillStyle = '#FFD666';
          ctx.shadowColor = 'rgba(255, 184, 0, 0.4)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#FFB800';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = i === hoveredIndex ? '#4A7DFF' : '#999';
      ctx.font = i === hoveredIndex ? '600 12px Inter' : '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(month, groupX, height - 10);
    });

    if (animationProgress < 1) {
      animationProgress += 0.03;
      canvas.dataset.animId = requestAnimationFrame(drawBars);
    }
  };

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newHover = -1;
    if (x >= padding.left && x <= width - padding.right) {
      const relativeX = x - padding.left;
      const index = Math.floor(relativeX / barGroupWidth);
      if (index >= 0 && index < months.length) newHover = index;
    }

    if (newHover !== hoveredIndex) {
      hoveredIndex = newHover;
      canvas.style.cursor = hoveredIndex >= 0 ? 'pointer' : 'default';
      drawBars();
    }
  };

  canvas.onmouseleave = () => {
    if (hoveredIndex !== -1) {
      hoveredIndex = -1;
      canvas.style.cursor = 'default';
      drawBars();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      drawBars();
      observer.disconnect();
    }
  });
  observer.observe(canvas);
}

function initLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = Math.max(container.clientHeight || 150, 120);

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 10, right: 10, bottom: 10, left: 10 };

  const dataPoints = 50;
  const data = [];
  for (let i = 0; i < dataPoints; i += 1) {
    const value = 40 + Math.sin(i * 0.3) * 20 + Math.sin(i * 0.7) * 10 + Math.random() * 5;
    data.push(value);
  }

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  let animationProgress = 0;
  let hoveredPoint = -1;

  if (canvas.dataset.animId) cancelAnimationFrame(parseInt(canvas.dataset.animId, 10));

  const drawLine = () => {
    ctx.clearRect(0, 0, width, height);

    const pointsToShow = Math.floor(data.length * animationProgress);
    const stepX = chartWidth / (data.length - 1);
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal;

    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    for (let i = 0; i <= pointsToShow; i += 1) {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((data[i] - minVal) / range) * (chartHeight - 20);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(padding.left + pointsToShow * stepX, height - padding.bottom);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(74, 125, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(74, 125, 255, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i <= pointsToShow; i += 1) {
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((data[i] - minVal) / range) * (chartHeight - 20);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = padding.left + (i - 1) * stepX;
        const prevY = padding.top + chartHeight - ((data[i - 1] - minVal) / range) * (chartHeight - 20);
        ctx.quadraticCurveTo(prevX + stepX / 2, prevY, x, y);
      }
    }
    ctx.strokeStyle = '#4A7DFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (hoveredPoint !== -1 && hoveredPoint <= pointsToShow) {
      const i = hoveredPoint;
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((data[i] - minVal) / range) * (chartHeight - 20);

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(74, 125, 255, 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4A7DFF';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#333';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(data[i]), x, y - 12);
    } else if (pointsToShow > 0) {
      const i = pointsToShow;
      const x = padding.left + i * stepX;
      const y = padding.top + chartHeight - ((data[i] - minVal) / range) * (chartHeight - 20);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4A7DFF';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (animationProgress < 1) {
      animationProgress += 0.015;
      canvas.dataset.animId = requestAnimationFrame(drawLine);
    }
  };

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newHover = -1;
    const stepX = chartWidth / (data.length - 1);

    if (x >= padding.left && x <= width - padding.right) {
      const relativeX = x - padding.left;
      const index = Math.round(relativeX / stepX);
      if (index >= 0 && index < data.length) newHover = index;
    }

    if (newHover !== hoveredPoint) {
      hoveredPoint = newHover;
      canvas.style.cursor = hoveredPoint !== -1 ? 'pointer' : 'default';
      drawLine();
    }
  };

  canvas.onmouseleave = () => {
    if (hoveredPoint !== -1) {
      hoveredPoint = -1;
      drawLine();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      drawLine();
      observer.disconnect();
    }
  });
  observer.observe(canvas);
}

function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach((bar) => observer.observe(bar));
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };
}
