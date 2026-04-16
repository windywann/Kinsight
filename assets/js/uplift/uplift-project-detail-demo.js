const currentUser = '朱贺';
    let nextId = 61;
    let pendingDeleteId = null;

    const taskStatusStages = ['预处理', '训练', '评估', '预测'];
    const tasks = [
      { id: 60, favorite: false, name: '万赞-极速-外部与内置目标-TLearner模型训练-2025-11-13重试-2025-11-18 16:26:05', owner: '阚燕佳', createdAt: '2025-11-18 16:26', running: '训练', failed: null, canStart: true },
      { id: 53, favorite: false, name: '万赞-极速-外部与内置目标-TLearner模型训练-2025-11-13重试', owner: '宋嘉瑞', createdAt: '2025-11-13 16:53', running: '评估', failed: null, canStart: false },
      { id: 52, favorite: false, name: '万赞-极速-外部与内置目标-TLearner模型训练-2025-11-13', owner: '宋嘉瑞', createdAt: '2025-11-13 15:41', running: '评估', failed: null, canStart: false },
      { id: 51, favorite: false, name: '万赞-主站-外部与内置目标-TLearner模型训练-2025-11-13', owner: '宋嘉瑞', createdAt: '2025-11-13 15:36', running: '评估', failed: null, canStart: false },
      { id: 50, favorite: false, name: '万赞-两个外部目标-主站-内置目标-2025-11-13 11:01:54-2025-11-13 11:10:00', owner: '胡耀鑫', createdAt: '2025-11-13 11:10', running: null, failed: '训练', canStart: false },
      { id: 49, favorite: false, name: '万赞-两个外部目标-主站-内置目标-2025-11-13 11:01:54', owner: '胡耀鑫', createdAt: '2025-11-13 11:02', running: null, failed: '训练', canStart: false },
      { id: 48, favorite: false, name: '万赞-两个外部目标-主站-外部目标-多个模型训练', owner: '宋嘉瑞', createdAt: '2025-11-12 21:38', running: '评估', failed: null, canStart: false },
      { id: 47, favorite: false, name: '万赞-两个外部目标-主站-内置目标-多个模型训练', owner: '宋嘉瑞', createdAt: '2025-11-12 21:34', running: null, failed: '训练', canStart: false },
      { id: 46, favorite: false, name: '万赞-两个外部目标-主站-内置目标', owner: '朱贺', createdAt: '2025-11-12 20:22', running: null, failed: '训练', canStart: false }
    ];

    const projectMetaMap = {
      'mcard uplift拉新': { owner: '向悦', ownerCount: 3 },
      '增长-组件弹窗促活': { owner: '崔朝宇', ownerCount: 2 },
      '电商-treatment权益分发': { owner: '王道鹏', ownerCount: 4 },
      '复购复购-vip召回': { owner: '张志浩', ownerCount: 2 },
      '直播-回访召回分析': { owner: '王铂凯', ownerCount: 3 },
      'duration-vv-time': { owner: '李成霞', ownerCount: 4 },
      '娱乐内容激励券实验': { owner: '张昊忞', ownerCount: 2 },
      '短剧付费首购促进': { owner: '孙锐', ownerCount: 3 },
      '商城限时补贴 uplift': { owner: '胡睿', ownerCount: 5 },
      '会员续费提醒策略': { owner: '杨锐', ownerCount: 2 },
      '冷启作者扶持计划': { owner: '崔朝宇', ownerCount: 4 },
      '高价值流失用户召回': { owner: '向悦', ownerCount: 4 },
      '社区互动-万赞': { owner: '朱贺', ownerCount: 4 }
    };

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

    function getProjectNameFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('projectName');
      return name ? decodeURIComponent(name) : '社区互动-万赞';
    }

    function applyProjectHeader() {
      const projectName = getProjectNameFromUrl();
      const meta = projectMetaMap[projectName] || { owner: '朱贺', ownerCount: 4 };
      document.getElementById('projectTitle').textContent = projectName;
      document.title = `Kinsight - ${projectName}`;
      document.getElementById('headerOwnerName').textContent = meta.owner;
      document.getElementById('headerOwnerCount').textContent = meta.ownerCount;
      document.querySelector('.back-link').href = `../../pages/uplift/uplift-task-list-demo.html?projectName=${encodeURIComponent(projectName)}`;
    }

    function getFilteredTasks() {
      const name = document.getElementById('filterName').value.trim().toLowerCase();
      const owner = document.getElementById('filterOwner').value.trim().toLowerCase();
      const onlyFavorite = document.getElementById('filterFavorite').checked;
      const onlyMine = document.getElementById('filterMine').checked;
      return tasks.filter(item => {
        const hitName = !name || item.name.toLowerCase().includes(name);
        const hitOwner = !owner || item.owner.toLowerCase().includes(owner);
        const hitFavorite = !onlyFavorite || item.favorite;
        const hitMine = !onlyMine || item.owner === currentUser;
        return hitName && hitOwner && hitFavorite && hitMine;
      }).sort((a, b) => b.id - a.id);
    }

    function renderStatusFlow(task) {
      return taskStatusStages.map((stage, index) => {
        let cls = 'todo';
        let dot = '○';
        if (task.failed === stage) {
          cls = 'failed';
          dot = '×';
        } else if (task.running) {
          const runningIndex = taskStatusStages.indexOf(task.running);
          const stageIndex = taskStatusStages.indexOf(stage);
          if (stageIndex <= runningIndex) {
            cls = 'running';
            dot = '✓';
          }
        }
        const arrow = index < taskStatusStages.length - 1 ? '<span class="status-arrow">→</span>' : '';
        return `<span class="status-step ${cls}"><span class="dot">${dot}</span>${stage}</span>${arrow}`;
      }).join('');
    }

    function renderRows() {
      const filtered = getFilteredTasks();
      const tbody = document.getElementById('tbody');
      const empty = document.getElementById('emptyState');
      document.getElementById('totalText').textContent = `共 ${filtered.length} 条`;
      if (!filtered.length) {
        tbody.innerHTML = '';
        empty.classList.add('show');
        return;
      }
      empty.classList.remove('show');
      tbody.innerHTML = filtered.map(task => `
        <tr>
          <td>
            <span class="id-col">
              <span>${task.id}</span>
              <span class="star ${task.favorite ? 'active' : ''}" onclick="toggleFavorite(${task.id})">★</span>
            </span>
          </td>
          <td><div class="task-name">${task.name}</div></td>
          <td><span class="owner-inline"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${task.owner}</span></td>
          <td>${task.createdAt}</td>
          <td><span class="status-flow">${renderStatusFlow(task)}</span></td>
          <td>
            <a class="action ${task.canStart ? '' : 'disabled'}" href="javascript:void(0)">启动</a>
            <a class="action" href="../../pages/uplift/uplift-task-detail-demo.html?projectName=${encodeURIComponent(getProjectNameFromUrl())}&taskName=${encodeURIComponent(task.name)}">报告</a>
            <button class="more-trigger" type="button" onclick="showToast('更多操作待补充')">⋮</button>
          </td>
        </tr>
      `).join('');
    }

    function toggleFavorite(id) {
      const target = tasks.find(item => item.id === id);
      if (!target) return;
      target.favorite = !target.favorite;
      renderRows();
      showToast(target.favorite ? '已加入收藏' : '已取消收藏');
    }

    function applyFilters() {
      renderRows();
      showToast('筛选条件已更新');
    }

    function resetFilters() {
      document.getElementById('filterName').value = '';
      document.getElementById('filterOwner').value = '';
      document.getElementById('filterFavorite').checked = false;
      document.getElementById('filterMine').checked = false;
      renderRows();
      showToast('已清除筛选');
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
      const target = tasks.find(item => item.id === id);
      if (!target) return;
      pendingDeleteId = id;
      document.getElementById('confirmName').textContent = target.name;
      document.getElementById('modalMask').classList.add('show');
      document.getElementById('confirmModal').classList.add('show');
    }

    function closeConfirmModal() {
      pendingDeleteId = null;
      document.getElementById('modalMask').classList.remove('show');
      document.getElementById('confirmModal').classList.remove('show');
    }

    function confirmDelete() {
      if (pendingDeleteId == null) return;
      const index = tasks.findIndex(item => item.id === pendingDeleteId);
      if (index > -1) {
        const removed = tasks.splice(index, 1)[0];
        renderRows();
        showToast(`已删除任务：${removed.name}`);
      }
      closeConfirmModal();
    }

    function createTask() {
      const nameInput = document.getElementById('createName');
      const ownerInput = document.getElementById('createOwner');
      const descInput = document.getElementById('createDesc');
      const name = nameInput.value.trim();
      const owner = ownerInput.value.trim();
      const desc = descInput.value.trim();
      if (!name) {
        nameInput.focus();
        nameInput.style.borderColor = '#F5222D';
        return;
      }
      if (!owner) {
        ownerInput.focus();
        ownerInput.style.borderColor = '#F5222D';
        return;
      }
      nameInput.style.borderColor = '';
      ownerInput.style.borderColor = '';
      tasks.unshift({
        id: nextId++,
        favorite: false,
        name: desc ? `${name} - ${desc}` : name,
        owner,
        createdAt: formatNow(),
        running: '预处理',
        failed: null,
        canStart: true
      });
      closeCreateModal();
      document.getElementById('createName').value = '';
      document.getElementById('createOwner').value = '';
      document.getElementById('createDesc').value = '';
      renderRows();
      showToast('任务创建成功');
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeCreateModal();
        closeConfirmModal();
      }
      if (event.key === 'Enter' && document.activeElement && ['filterName', 'filterOwner'].includes(document.activeElement.id)) {
        applyFilters();
      }
    });

    applyProjectHeader();
    renderRows();
