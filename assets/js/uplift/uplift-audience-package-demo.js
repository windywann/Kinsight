const currentUser = '朱贺';
    let currentPage = 1;
    const pageSize = 8;
    let pendingDeleteId = null;

    const packages = [
      { id: 16, favorite: false, name: '增长-组件弹窗-408-APP使用时长-top60', owner: '崔朝宇', status: '审批中', taskName: 'exp2_0401', taskLink: 'exp2_0401', createdAt: '2026-04-01 19:57', scope: '周活', ratio: 'Top60%' },
      { id: 15, favorite: false, name: '生产-拍摄页低端机降级-393-shoot_to_edit_rate-top70', owner: '汪宁', status: '审批中', taskName: 'exp2_0330_shoot_to_edit', taskLink: 'exp2_0330_shoot_to_edit', createdAt: '2026-03-30 18:15', scope: '周活', ratio: 'Top70%' },
      { id: 14, favorite: false, name: '生产-拍摄页低端机降级-393-shoot_to_edit_rate-top60', owner: '汪宁', status: '审批中', taskName: 'exp2_0330_shoot_to_edit', taskLink: 'exp2_0330_shoot_to_edit', createdAt: '2026-03-30 18:14', scope: '周活', ratio: 'Top60%' },
      { id: 13, favorite: false, name: '生产-拍摄页低端机降级-394-first_frame_time_avg-top60', owner: '汪宁', status: '审批中', taskName: 'exp2_0330_first_frame_1', taskLink: 'exp2_0330_first_frame_1', createdAt: '2026-03-30 18:13', scope: '周活', ratio: 'Top60%' },
      { id: 12, favorite: false, name: '生产-拍摄页低端机降级-266-render_stutter1-top70', owner: '朱贺', status: '导入数据', taskName: 'exp8_0302_帧率卡顿率等', taskLink: 'exp8_0302_帧率卡顿率等', createdAt: '2026-03-03 15:12', scope: '周活', ratio: 'Top70%' },
      { id: 11, favorite: false, name: '生产-拍摄页低端机降级-249-first_frame_time_avg-top70', owner: '朱贺', status: '导入数据', taskName: 'exp8_0225-外部特征', taskLink: 'exp8_0225-外部特征', createdAt: '2026-03-02 17:36', scope: '周活', ratio: 'Top70%' },
      { id: 10, favorite: false, name: '存储-ecdn-136-APP使用时长-top70', owner: '胡耀鑫', status: '导入数据', taskName: 'exp21_0119_极速版_p2p上行_综合成本_时长目标_增加wifi_rate等特征', taskLink: 'exp21_0119_极速版_p2p上行_综合成本_时长目标_增加wifi_rate等特征', createdAt: '2026-02-27 20:54', scope: '周活', ratio: 'Top70%' },
      { id: 9, favorite: true, name: '增长-双列曝光激励-APP使用时长-top50', owner: '陈子轩', status: '审批中', taskName: 'exp6_1119', taskLink: 'exp6_1119', createdAt: '2026-02-26 11:18', scope: '日活', ratio: 'Top50%' },
      { id: 8, favorite: true, name: '直播-激励券召回-APP使用时长-top40', owner: '陈子轩', status: '导入数据', taskName: 'exp6_1119_训练重试', taskLink: 'exp6_1119_训练重试', createdAt: '2026-02-24 18:42', scope: '月活', ratio: 'Top40%' },
      { id: 7, favorite: false, name: '商业化-拉新弹窗-APP使用时长-top30', owner: '朱贺', status: '审批中', taskName: 'exp6_1119_新增样本', taskLink: 'exp6_1119_新增样本', createdAt: '2026-02-21 16:05', scope: '日活', ratio: 'Top30%' }
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
      return status === '导入数据' ? 'data' : 'approval';
    }

    function getFilteredPackages() {
      const name = document.getElementById('filterName').value.trim().toLowerCase();
      const owner = document.getElementById('filterOwner').value.trim().toLowerCase();
      const status = document.getElementById('filterStatus').value;
      const onlyFavorite = document.getElementById('filterFavorite').checked;
      const onlyMine = document.getElementById('filterMine').checked;

      return packages.filter(item => {
        const hitName = !name || item.name.toLowerCase().includes(name);
        const hitOwner = !owner || item.owner.toLowerCase().includes(owner);
        const hitStatus = !status || item.status === status;
        const hitFavorite = !onlyFavorite || item.favorite;
        const hitMine = !onlyMine || item.owner === currentUser;
        return hitName && hitOwner && hitStatus && hitFavorite && hitMine;
      }).sort((a, b) => b.id - a.id);
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
      const filtered = getFilteredPackages();
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
            <td><div class="package-name">${item.name}</div></td>
            <td><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${item.owner}</span></td>
            <td><span class="status-tag ${getStatusClass(item.status)}">${item.status}</span></td>
            <td><a class="task-link" href="../../pages/uplift/uplift-task-detail-demo.html?projectName=${encodeURIComponent('社区互动-万赞')}&taskName=${encodeURIComponent(item.taskLink)}">${item.taskName}</a></td>
            <td>${item.createdAt}</td>
            <td>${item.scope}</td>
            <td>${item.ratio}</td>
            <td>
              <a class="action-link" href="../../pages/uplift/uplift-audience-package-detail-demo.html?packageName=${encodeURIComponent(item.name)}">详情</a>
              <a class="action-link download" href="javascript:void(0)" onclick="downloadPackage(${item.id})">下载</a>
              <a class="action-link delete" href="javascript:void(0)" onclick="openDeleteModal(${item.id})">删除</a>
            </td>
          </tr>
        `).join('');
      }

      document.getElementById('totalText').textContent = `共 ${filtered.length} 条`;
      renderPagination(filtered.length, currentPage);
    }

    function toggleFavorite(id) {
      const target = packages.find(item => item.id === id);
      if (!target) return;
      target.favorite = !target.favorite;
      renderRows();
      showToast(target.favorite ? '已加入收藏' : '已取消收藏');
    }

    function applyFilters() {
      currentPage = 1;
      renderRows();
      showToast('筛选条件已更新');
    }

    function resetFilters() {
      document.getElementById('filterName').value = '';
      document.getElementById('filterOwner').value = '';
      document.getElementById('filterStatus').value = '';
      document.getElementById('filterFavorite').checked = false;
      document.getElementById('filterMine').checked = false;
      currentPage = 1;
      renderRows();
      showToast('已清除筛选');
    }

    function changePage(page) {
      const total = Math.max(1, Math.ceil(getFilteredPackages().length / pageSize));
      if (page < 1 || page > total || page === currentPage) return;
      currentPage = page;
      renderRows();
    }

    function downloadPackage(id) {
      const target = packages.find(item => item.id === id);
      if (!target) return;
      showToast(`开始下载：${target.name}`);
    }

    function openDeleteModal(id) {
      const target = packages.find(item => item.id === id);
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
      const index = packages.findIndex(item => item.id === pendingDeleteId);
      if (index > -1) {
        const removed = packages.splice(index, 1)[0];
        renderRows();
        showToast(`已删除人群包：${removed.name}`);
      }
      closeConfirmModal();
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
        closeConfirmModal();
      }
      if (event.key === 'Enter' && document.activeElement && ['filterName', 'filterOwner'].includes(document.activeElement.id)) {
        applyFilters();
      }
    });

    renderRows();
