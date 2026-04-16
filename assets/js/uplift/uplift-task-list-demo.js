const currentUser = '向悦';
    let nextId = 79;
    let currentPage = 1;
    const pageSize = 8;
    let pendingDeleteId = null;
    let selectedPhase = '运行中';

    const projects = [
      { id: 78, favorite: true, name: 'mcard uplift拉新', owner: '向悦', status: '运行中', score: 91, audience: '128.4万', createdAt: '2026-04-08 16:40', scene: '结合渠道曝光与补贴策略，识别高响应拉新人群。', target: '注册转化率提升 6.5%', steps: ['数据准备', '样本构建', '模型训练', '人群圈选', '投放验证'] },
      { id: 77, favorite: false, name: '增长-组件弹窗促活', owner: '崔朝宇', status: '已上线', score: 84, audience: '96.2万', createdAt: '2026-04-07 20:18', scene: '针对沉默用户弹窗激励策略建模。', target: '7日活跃提升 4.2%', steps: ['数据准备', '样本构建', '模型训练', '策略审核', '上线监控'] },
      { id: 76, favorite: true, name: '电商-treatment权益分发', owner: '王道鹏', status: '运行中', score: 88, audience: '210.8万', createdAt: '2026-04-07 11:25', scene: '识别优惠券对高价值用户的增量拉动。', target: '支付转化率提升 3.8%', steps: ['数据准备', '特征工程', '模型训练', '人群圈选', 'AB验证'] },
      { id: 75, favorite: false, name: '复购复购-vip召回', owner: '张志浩', status: '草稿', score: 67, audience: '45.7万', createdAt: '2026-04-06 19:36', scene: '围绕高客单复购场景预测最优触达对象。', target: '复购率提升 2.3%', steps: ['数据准备', '方案设计', '待训练'] },
      { id: 74, favorite: false, name: '直播-回访召回分析', owner: '王铂凯', status: '运行中', score: 79, audience: '83.1万', createdAt: '2026-04-06 14:08', scene: '优化直播看播用户回访提醒策略。', target: '回访率提升 5.1%', steps: ['数据准备', '样本构建', '模型训练', '策略联调', '灰度测试'] },
      { id: 73, favorite: true, name: 'duration-vv-time', owner: '李成霞', status: '已上线', score: 86, audience: '174.6万', createdAt: '2026-04-05 21:11', scene: '时长目标下的 uplift 人群评估和投放。', target: '单用户观看时长提升 8.0%', steps: ['数据准备', '模型训练', '评估复核', '上线监控'] },
      { id: 72, favorite: false, name: '娱乐内容激励券实验', owner: '张昊忞', status: '运行中', score: 82, audience: '58.3万', createdAt: '2026-04-05 10:41', scene: '激励券对付费转化带来的增益分层分析。', target: 'ARPU 提升 2.1%', steps: ['数据准备', '特征工程', '模型训练', '人群圈选', '投放验证'] },
      { id: 71, favorite: false, name: '短剧付费首购促进', owner: '孙锐', status: '已上线', score: 90, audience: '133.5万', createdAt: '2026-04-04 18:30', scene: '识别对首购券最敏感的短剧用户。', target: '首购转化提升 7.2%', steps: ['数据准备', '样本构建', '模型训练', '策略审核', '上线监控'] },
      { id: 70, favorite: true, name: '商城限时补贴 uplift', owner: '胡睿', status: '运行中', score: 95, audience: '302.1万', createdAt: '2026-04-04 09:52', scene: '为大促补贴找到高增量收益人群。', target: 'GMV 提升 9.4%', steps: ['数据准备', '特征工程', '模型训练', '人群圈选', '大促验证'] },
      { id: 69, favorite: false, name: '会员续费提醒策略', owner: '杨锐', status: '草稿', score: 61, audience: '39.4万', createdAt: '2026-04-03 22:14', scene: '识别对会员续费提醒最敏感的人群。', target: '续费率提升 1.9%', steps: ['需求梳理', '方案设计', '待训练'] },
      { id: 68, favorite: false, name: '冷启作者扶持计划', owner: '崔朝宇', status: '已上线', score: 80, audience: '88.9万', createdAt: '2026-04-03 14:40', scene: '评估扶持资源对新作者留存的增量影响。', target: '7日留存提升 3.0%', steps: ['数据准备', '模型训练', '策略审核', '上线监控'] },
      { id: 67, favorite: true, name: '高价值流失用户召回', owner: '向悦', status: '运行中', score: 87, audience: '77.0万', createdAt: '2026-04-02 20:06', scene: '预测优惠触达对流失高价值用户的召回增益。', target: '召回率提升 6.8%', steps: ['数据准备', '样本构建', '模型训练', '人群圈选', '投放验证'] }
    ];

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

    function getStatusClass(status) {
      if (status === '运行中') return 'running';
      if (status === '已上线') return 'ready';
      return 'draft';
    }

    function getFilteredProjects() {
      const name = document.getElementById('filterName').value.trim().toLowerCase();
      const owner = document.getElementById('filterOwner').value.trim().toLowerCase();
      const onlyFavorite = document.getElementById('filterFavorite').checked;
      const onlyMine = document.getElementById('filterMine').checked;

      return projects.filter(item => {
        const hitName = !name || item.name.toLowerCase().includes(name);
        const hitOwner = !owner || item.owner.toLowerCase().includes(owner);
        const hitFavorite = !onlyFavorite || item.favorite;
        const hitMine = !onlyMine || item.owner === currentUser;
        return hitName && hitOwner && hitFavorite && hitMine;
      }).sort((a, b) => b.id - a.id);
    }

    function renderStats() {
      const running = projects.filter(item => item.status === '运行中').length;
      const ready = projects.filter(item => item.status === '已上线').length;
      const mine = projects.filter(item => item.owner === currentUser).length;
      const highScore = projects.filter(item => item.score >= 80).length;

      document.getElementById('statRunning').textContent = running;
      document.getElementById('statReady').textContent = ready;
      document.getElementById('statMine').textContent = mine;
      document.getElementById('statHighScore').textContent = highScore;
    }

    function renderPagination(total, page) {
      const pageCount = Math.max(1, Math.ceil(total / pageSize));
      const container = document.getElementById('pagination');
      const items = [];
      items.push(`<span class="page-btn ${page === 1 ? 'disabled' : ''}" onclick="changePage(${page - 1})">‹</span>`);
      for (let i = 1; i <= pageCount; i++) {
        items.push(`<span class="page-btn ${i === page ? 'active' : ''}" onclick="changePage(${i})">${i}</span>`);
      }
      items.push(`<span class="page-btn ${page === pageCount ? 'disabled' : ''}" onclick="changePage(${page + 1})">›</span>`);
      container.innerHTML = items.join('');
    }

    function buildStepHtml(steps, status) {
      return steps.map((step, index) => {
        const cls = index < steps.length - 1 ? 'done' : (status === '草稿' ? '' : 'current');
        const chip = `<span class="step-chip ${cls}">${step}</span>`;
        const arrow = index < steps.length - 1 ? '<span class="step-arrow">→</span>' : '';
        return chip + arrow;
      }).join('');
    }

    function renderRows() {
      const filtered = getFilteredProjects();
      const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (currentPage > pageCount) currentPage = pageCount;
      const start = (currentPage - 1) * pageSize;
      const pageRows = filtered.slice(start, start + pageSize);
      const tbody = document.getElementById('tbody');
      const empty = document.getElementById('emptyState');

      if (!pageRows.length) {
        tbody.innerHTML = '';
        empty.classList.add('show');
      } else {
        empty.classList.remove('show');
        tbody.innerHTML = pageRows.map(item => `
          <tr>
            <td>
              <span class="id-col">
                <span>${item.id}</span>
                <span class="star ${item.favorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})">★</span>
              </span>
            </td>
            <td>
              <div class="project-name">
                <span class="project-title">${item.name}</span>
                <span class="project-desc">${item.scene}</span>
              </div>
            </td>
            <td><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${item.owner}</span></td>
            <td><span class="tag ${getStatusClass(item.status)}">${item.status}</span></td>
            <td>
              <div class="score-block">
                <span class="score-value">${item.score}</span>
                <span class="score-bar"><span class="score-fill" style="width:${item.score}%;"></span></span>
              </div>
            </td>
            <td>${item.audience}</td>
            <td>${item.createdAt}</td>
            <td>
              <div class="action-cell">
                <a class="action" href="../../pages/uplift/uplift-project-detail-demo.html?projectName=${encodeURIComponent(item.name)}">详情</a>
                <button class="more-trigger" type="button" onclick="toggleMore(event,this)">⋮</button>
                <div class="action-menu">
                  <a class="menu-item" href="javascript:void(0)" onclick="copyProject(${item.id})">复制</a>
                  <a class="menu-item" href="javascript:void(0)" onclick="markFavorite(${item.id})">${item.favorite ? '取消收藏' : '加入收藏'}</a>
                  <a class="menu-item delete" href="javascript:void(0)" onclick="openDeleteModal(${item.id})">删除</a>
                </div>
              </div>
            </td>
          </tr>
        `).join('');
      }

      document.getElementById('totalText').textContent = `共 ${filtered.length} 条`;
      renderPagination(filtered.length, currentPage);
    }

    function renderAll() {
      renderStats();
      renderRows();
    }

    function applyFilters() {
      currentPage = 1;
      renderRows();
      showToast('筛选条件已更新');
    }

    function resetFilters() {
      document.getElementById('filterName').value = '';
      document.getElementById('filterOwner').value = '';
      document.getElementById('filterFavorite').checked = false;
      document.getElementById('filterMine').checked = false;
      currentPage = 1;
      renderRows();
      showToast('已清除筛选');
    }

    function changePage(page) {
      const total = Math.max(1, Math.ceil(getFilteredProjects().length / pageSize));
      if (page < 1 || page > total || page === currentPage) return;
      currentPage = page;
      renderRows();
    }

    function toggleFavorite(id) {
      const target = projects.find(item => item.id === id);
      if (!target) return;
      target.favorite = !target.favorite;
      renderAll();
      showToast(target.favorite ? '已加入收藏' : '已取消收藏');
    }

    function markFavorite(id) {
      toggleFavorite(id);
      closeMenus();
    }

    function toggleMore(event, btn) {
      event.stopPropagation();
      const cell = btn.closest('.action-cell');
      document.querySelectorAll('.action-cell.open').forEach(el => {
        if (el !== cell) el.classList.remove('open');
      });
      cell.classList.toggle('open');
    }

    function closeMenus() {
      document.querySelectorAll('.action-cell.open').forEach(el => el.classList.remove('open'));
    }

    function openDetail(id) {
      const target = projects.find(item => item.id === id);
      if (!target) return;
      const body = document.getElementById('drawerBody');
      body.innerHTML = `
        <div class="mini-card">
          <div class="mini-card-title">基础信息</div>
          <div class="kv-grid">
            <div class="kv-label">项目名称</div><div class="kv-value">${target.name}</div>
            <div class="kv-label">负责人</div><div class="kv-value"><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${target.owner}</span></div>
            <div class="kv-label">项目状态</div><div class="kv-value"><span class="tag ${getStatusClass(target.status)}">${target.status}</span></div>
            <div class="kv-label">uplift评分</div><div class="kv-value">${target.score}</div>
            <div class="kv-label">人群规模</div><div class="kv-value">${target.audience}</div>
            <div class="kv-label">创建时间</div><div class="kv-value">${target.createdAt}</div>
            <div class="kv-label">实验目标</div><div class="kv-value">${target.target}</div>
          </div>
        </div>
        <div class="mini-card">
          <div class="mini-card-title">业务场景</div>
          <div class="kv-value">${target.scene}</div>
        </div>
        <div class="mini-card">
          <div class="mini-card-title">执行阶段</div>
          <div class="step-row">${buildStepHtml(target.steps, target.status)}</div>
        </div>
      `;
      document.getElementById('drawerMask').classList.add('show');
      document.getElementById('detailDrawer').classList.add('show');
    }

    function closeDrawer() {
      document.getElementById('drawerMask').classList.remove('show');
      document.getElementById('detailDrawer').classList.remove('show');
    }

    function openCreateModal() {
      document.getElementById('modalMask').classList.add('show');
      document.getElementById('createModal').classList.add('show');
      document.getElementById('createName').focus();
    }

    function closeCreateModal() {
      document.getElementById('modalMask').classList.remove('show');
      document.getElementById('createModal').classList.remove('show');
    }

    function openDeleteModal(id) {
      const target = projects.find(item => item.id === id);
      if (!target) return;
      pendingDeleteId = id;
      document.getElementById('confirmName').textContent = target.name;
      document.getElementById('modalMask').classList.add('show');
      document.getElementById('confirmModal').classList.add('show');
      closeMenus();
    }

    function closeConfirmModal() {
      pendingDeleteId = null;
      document.getElementById('modalMask').classList.remove('show');
      document.getElementById('confirmModal').classList.remove('show');
    }

    function confirmDelete() {
      if (pendingDeleteId == null) return;
      const index = projects.findIndex(item => item.id === pendingDeleteId);
      if (index > -1) {
        const removed = projects.splice(index, 1)[0];
        renderAll();
        showToast(`已删除项目：${removed.name}`);
      }
      closeConfirmModal();
    }

    function createProject() {
      const nameInput = document.getElementById('createName');
      const ownerInput = document.getElementById('createOwner');
      const name = nameInput.value.trim();
      const owner = ownerInput.value.trim();

      if (!name) {
        nameInput.focus();
        nameInput.style.borderColor = '#F5222D';
        return;
      }
      if (name.length > 20) {
        nameInput.focus();
        nameInput.style.borderColor = '#F5222D';
        showToast('项目名称不能超过20个字符');
        return;
      }
      if (!owner) {
        ownerInput.focus();
        ownerInput.style.borderColor = '#F5222D';
        return;
      }

      nameInput.style.borderColor = '';
      ownerInput.style.borderColor = '';

      projects.unshift({
        id: nextId++,
        favorite: false,
        name,
        owner,
        status: '草稿',
        score: '-',
        audience: '-',
        createdAt: formatNow(),
        scene: '待补充业务场景',
        target: '待设定实验目标',
        steps: ['数据准备', '方案设计', '待训练']
      });

      closeCreateModal();
      currentPage = 1;
      resetCreateForm();
      renderAll();
      showToast('项目创建成功');
    }

    function resetCreateForm() {
      document.getElementById('createName').value = '';
      document.getElementById('createOwner').value = '';
      const nameCounter = document.getElementById('nameCounter');
      if (nameCounter) {
        nameCounter.textContent = '0/20';
        nameCounter.style.color = '#BFBFBF';
      }
      document.getElementById('createName').style.borderColor = '';
      document.getElementById('createOwner').style.borderColor = '';
    }

    function copyProject(id) {
      const target = projects.find(item => item.id === id);
      if (!target) return;
      projects.unshift({
        ...target,
        id: nextId++,
        favorite: false,
        name: `${target.name}-副本`,
        createdAt: formatNow(),
        status: '草稿',
        score: Math.max(55, target.score - 8),
        steps: ['需求梳理', '方案设计', '待训练']
      });
      currentPage = 1;
      renderAll();
      closeMenus();
      showToast('已复制项目');
    }

    function formatNow() {
      const d = new Date();
      const pad = value => String(value).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    const createNameInput = document.getElementById('createName');
    const createNameCounter = document.getElementById('nameCounter');
    if (createNameInput && createNameCounter) {
      createNameInput.addEventListener('input', (event) => {
        const len = event.target.value.length;
        createNameCounter.textContent = `${len}/20`;
        createNameCounter.style.color = len > 20 ? '#F5222D' : '#BFBFBF';
      });
    }

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.action-cell')) closeMenus();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenus();
        closeDrawer();
        closeCreateModal();
        closeConfirmModal();
      }
      if (event.key === 'Enter' && document.activeElement && ['filterName', 'filterOwner'].includes(document.activeElement.id)) {
        applyFilters();
      }
    });

    renderAll();
