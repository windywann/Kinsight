const currentUser = '朱贺';
    let nextId = 60;
    let currentPage = 1;
    const pageSize = 8;
    let pendingDeleteId = null;
    let selectedStatus = '进行中';

    const projects = [
      { id: 59, favorite: false, name: '地平线-关注页loadmore耗时', owner: '朱贺', createdAt: '2026-03-05 14:07', status: '已完成', problem: '验证关注页 loadmore 优化是否显著降低等待耗时。', metric: 'loadmore 平均耗时', method: '双重差分 + 回归调整', timeline: ['创建项目', '数据抽取', '因果估计', '结果复核', '结论产出'] },
      { id: 55, favorite: false, name: '作者涨粉', owner: '王宁', createdAt: '2026-02-26 20:13', status: '失败', problem: '评估推荐位策略调整是否对作者涨粉造成增益。', metric: '作者日涨粉数', method: 'PSM 匹配', timeline: ['创建项目', '特征对齐', '匹配失败', '失败复盘'] },
      { id: 53, favorite: true, name: '回归测试因果推断', owner: '臧灵均', createdAt: '2026-02-10 14:31', status: '失败', problem: '分析回归测试改动是否对播放完成率产生副作用。', metric: '播放完成率', method: '合成控制法', timeline: ['创建项目', '样本构建', '模型失败', '失败复盘'] },
      { id: 29, favorite: false, name: '测试项目', owner: '汤婷', createdAt: '2025-12-20 22:58', status: '失败', problem: '验证测试项目中的实验策略对互动指标的影响。', metric: '互动率', method: '断点回归', timeline: ['创建项目', '配置校验', '执行失败'] },
      { id: 28, favorite: false, name: 'bundle 智能预下载特征因果发现_3', owner: '王天昊', createdAt: '2025-12-19 17:55', status: '已完成', problem: '验证智能预下载策略是否带来留存提升。', metric: '次日留存率', method: '双重机器学习', timeline: ['创建项目', '特征抽取', '因果估计', '结果复核', '结论产出'] },
      { id: 27, favorite: false, name: 'bundle 智能预下载特征因果发现_2', owner: '王天昊', createdAt: '2025-12-19 17:52', status: '已完成', problem: '分析预下载策略第二轮实验的真实因果影响。', metric: '7日留存率', method: '倾向得分分层', timeline: ['创建项目', '样本校验', '因果估计', '结论产出'] },
      { id: 26, favorite: false, name: 'bundle 智能预下载特征因果发现', owner: '王天昊', createdAt: '2025-12-19 17:19', status: '失败', problem: '识别预下载策略在不同用户群上的增益差异。', metric: '下载成功率', method: '工具变量法', timeline: ['创建项目', '特征抽取', '工具变量失效', '失败复盘'] },
      { id: 11, favorite: true, name: '公共-测试【新用户请进】', owner: '朱贺', createdAt: '2025-11-05 14:54', status: '已完成', problem: '验证新用户引导策略是否导致核心行为指标提升。', metric: '首日关键行为率', method: '回归不连续', timeline: ['创建项目', '分层分析', '因果估计', '结论产出'] },
      { id: 10, favorite: false, name: 'test', owner: '朱贺', createdAt: '2025-11-05 14:14', status: '失败', problem: '测试环境中的因果推断流程验证。', metric: '流程成功率', method: '流程校验', timeline: ['创建项目', '任务调度', '执行失败'] },
      { id: 8, favorite: false, name: '留存提升专项', owner: '王宁', createdAt: '2025-10-28 19:20', status: '进行中', problem: '分析留存专项中的干预策略是否有效。', metric: '7日留存率', method: '双重差分', timeline: ['创建项目', '数据抽取', '因果估计进行中'] },
      { id: 6, favorite: true, name: '活动补贴效果评估', owner: '朱贺', createdAt: '2025-10-20 16:38', status: '进行中', problem: '评估补贴活动是否真正提升用户支付转化。', metric: '支付转化率', method: 'PSM + 回归调整', timeline: ['创建项目', '样本匹配', '因果估计进行中'] },
      { id: 3, favorite: false, name: '推荐位曝光优化', owner: '汤婷', createdAt: '2025-10-11 11:05', status: '进行中', problem: '识别曝光优化是否提高人均消费时长。', metric: '人均消费时长', method: '断点回归', timeline: ['创建项目', '曝光样本准备', '因果估计进行中'] }
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

    function getStatusMeta(status) {
      if (status === '已完成') return { cls: 'done', icon: '✓' };
      if (status === '失败') return { cls: 'failed', icon: '×' };
      return { cls: 'running', icon: '•' };
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
      const running = projects.filter(item => item.status === '进行中').length;
      const done = projects.filter(item => item.status === '已完成').length;
      const failed = projects.filter(item => item.status === '失败').length;
      const mine = projects.filter(item => item.owner === currentUser).length;

      document.getElementById('statRunning').textContent = running;
      document.getElementById('statDone').textContent = done;
      document.getElementById('statFailed').textContent = failed;
      document.getElementById('statMine').textContent = mine;
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
        tbody.innerHTML = pageRows.map(item => {
          const meta = getStatusMeta(item.status);
          return `
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
                  <span class="project-desc">${item.problem}</span>
                </div>
              </td>
              <td><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${item.owner}</span></td>
              <td>${item.createdAt}</td>
              <td><span class="status-chip ${meta.cls}"><span class="status-icon">${meta.icon}</span>${item.status}</span></td>
              <td>
                <a class="action" href="../../pages/causal/causal-project-detail-demo.html?projectId=${item.id}&tab=taskResult">详情</a>
                <a class="action delete" href="javascript:void(0)" onclick="openDeleteModal(${item.id})">删除</a>
              </td>
            </tr>
          `;
        }).join('');
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

    function openDetail(id) {
      window.location.href = `../../pages/causal/causal-project-detail-demo.html?projectId=${id}&tab=taskResult`;
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
      const tableNameInput = document.getElementById('createTableName');
      const partitionInput = document.getElementById('createPartition');
      const name = nameInput.value.trim();
      const owner = ownerInput.value.trim();
      const tableName = tableNameInput.value.trim();
      const partition = partitionInput.value;
      const selectedSource = document.querySelector('input[name="dataSource"]:checked')?.value || 'hive';

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
      if (!tableName) {
        tableNameInput.focus();
        tableNameInput.style.borderColor = '#F5222D';
        showToast(selectedSource === 'csv' ? '请先填写CSV文件路径' : '请先填写Hive表名');
        return;
      }

      nameInput.style.borderColor = '';
      ownerInput.style.borderColor = '';
      tableNameInput.style.borderColor = '';
      partitionInput.style.borderColor = '';

      projects.unshift({
        id: nextId++,
        favorite: false,
        name,
        owner,
        createdAt: formatNow(),
        status: '进行中',
        problem: `${selectedSource === 'csv' ? 'CSV文件' : 'Hive表'}：${tableName}${partition ? `｜分区：${partition}` : ''}`,
        metric: '待补充结果指标',
        method: '双重差分',
        timeline: ['创建项目', '数据抽取', '因果估计进行中']
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
      document.getElementById('createTableName').value = '';
      document.getElementById('createKnowledge').value = '';
      document.getElementById('createPartition').value = '';
      document.querySelector('input[name="dataSource"][value="hive"]').checked = true;
      document.getElementById('tableNameLabel').innerHTML = 'Hive表名';
      document.getElementById('createTableName').placeholder = '请输入【Hive表名】';
      const preview = document.getElementById('graphPreview');
      preview.classList.remove('ready');
      preview.innerHTML = `
        <div class="graph-preview-main">请先验证Hive表名以生成因果图</div>
        <div class="graph-preview-sub">验证表名后将自动解析数据并生成初步因果图</div>
      `;
      const nameCounter = document.getElementById('nameCounter');
      if (nameCounter) {
        nameCounter.textContent = '0/20';
        nameCounter.style.color = '#BFBFBF';
      }
      document.getElementById('createName').style.borderColor = '';
      document.getElementById('createOwner').style.borderColor = '';
      document.getElementById('createTableName').style.borderColor = '';
      document.getElementById('createPartition').style.borderColor = '';
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

    function parseKnowledgeGraph() {
      const tableName = document.getElementById('createTableName').value.trim();
      const preview = document.getElementById('graphPreview');
      if (!tableName) {
        document.getElementById('createTableName').focus();
        document.getElementById('createTableName').style.borderColor = '#F5222D';
        showToast('请先填写并验证表名');
        return;
      }
      document.getElementById('createTableName').style.borderColor = '';
      preview.classList.add('ready');
      preview.innerHTML = `
        <div class="graph-preview-main">已解析表：${tableName}</div>
        <div class="graph-preview-sub">初步因果图已生成，可继续创建项目</div>
      `;
      showToast('解析成功，已生成初步因果图');
    }

    function syncDataSource() {
      const selectedSource = document.querySelector('input[name="dataSource"]:checked')?.value || 'hive';
      const tableNameLabel = document.getElementById('tableNameLabel');
      const tableNameInput = document.getElementById('createTableName');
      const preview = document.getElementById('graphPreview');
      if (selectedSource === 'csv') {
        tableNameLabel.innerHTML = 'CSV文件';
        tableNameInput.placeholder = '请输入CSV文件路径';
        preview.classList.remove('ready');
        preview.innerHTML = `
          <div class="graph-preview-main">请先配置CSV文件路径以生成因果图</div>
          <div class="graph-preview-sub">解析文件后将自动生成初步因果图</div>
        `;
      } else {
        tableNameLabel.innerHTML = 'Hive表名';
        tableNameInput.placeholder = '请输入【Hive表名】';
        preview.classList.remove('ready');
        preview.innerHTML = `
          <div class="graph-preview-main">请先验证Hive表名以生成因果图</div>
          <div class="graph-preview-sub">验证表名后将自动解析数据并生成初步因果图</div>
        `;
      }
    }

    const createNameInput = document.getElementById('createName');
    document.querySelectorAll('input[name="dataSource"]').forEach(radio => {
      radio.addEventListener('change', syncDataSource);
    });
    const nameCounter = document.getElementById('nameCounter');
    if (createNameInput && nameCounter) {
      createNameInput.addEventListener('input', (event) => {
        const len = event.target.value.length;
        nameCounter.textContent = `${len}/20`;
        nameCounter.style.color = len > 20 ? '#F5222D' : '#BFBFBF';
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
        closeCreateModal();
        closeConfirmModal();
      }
      if (event.key === 'Enter' && document.activeElement && ['filterName', 'filterOwner'].includes(document.activeElement.id)) {
        applyFilters();
      }
    });

    renderAll();
