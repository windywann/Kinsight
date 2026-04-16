const baseProjects = {
      59: {
        id: 59,
        name: '地平线-关注页loadmore耗时',
        owner: '朱贺',
        createdAt: '2026-03-05 14:07',
        status: '已完成'
      },
      11: {
        id: 11,
        name: '公共-测试【新用户请进】',
        owner: '朱贺',
        createdAt: '2025-11-05 14:54',
        status: '已完成'
      },
      55: {
        id: 55,
        name: '作者涨粉',
        owner: '王宁',
        createdAt: '2026-02-26 20:13',
        status: '失败'
      },
      8: {
        id: 8,
        name: '留存提升专项',
        owner: '王宁',
        createdAt: '2025-10-28 19:20',
        status: '进行中'
      }
    };

    const graphNodes = [
      { id: 'photo_play_duration_sum_7d', label: 'photo_play_duration_sum_7d' },
      { id: 'friend_user_num_range', label: 'friend_user_num_range' },
      { id: 'is_install_xiaohongshu', label: 'is_install_xiaohongshu' },
      { id: 'photo_like_cnt_7d', label: 'photo_like_cnt_7d' },
      { id: 'app_launch_cold_cnt_7d', label: 'app_launch_cold_cnt_7d' },
      { id: 'follow_load_more_cost_p50', label: 'follow_load_more_cost_p50' },
      { id: 'profile_page_stay_duration_sum_7d', label: 'profile_page_stay_duration_sum_7d' },
      { id: 'device_active_degree', label: 'device_active_degree' },
      { id: 'general_score', label: 'general_score' },
      { id: 'live_play_duration_sum_7d', label: 'live_play_duration_sum_7d' },
      { id: 'photo_like_pv_7d', label: 'photo_like_pv_7d' },
      { id: 'age_range', label: 'age_range' },
      { id: 'active_day_cnt_7d', label: 'active_day_cnt_7d' },
      { id: 'fre_city_level', label: 'fre_city_level' },
      { id: 'follow_user_num_range', label: 'follow_user_num_range' },
      { id: 'follow_load_more_cost_avg', label: 'follow_load_more_cost_avg' },
      { id: 'biz28', label: 'biz28' }
    ];

    const relations = [
      { cause: 'active_day_cnt_7d', effect: 'device_active_degree', weight: 0.0876 },
      { cause: 'device_active_degree', effect: 'live_play_duration_sum_7d', weight: 0.1570 },
      { cause: 'device_active_degree', effect: 'photo_like_cnt_7d', weight: 0.0807 },
      { cause: 'age_range', effect: 'active_day_cnt_7d', weight: 0.1074 },
      { cause: 'age_range', effect: 'app_launch_cold_cnt_7d', weight: 0.0688 },
      { cause: 'age_range', effect: 'device_active_degree', weight: 0.1356 },
      { cause: 'age_range', effect: 'follow_load_more_cost_avg', weight: 0.1075 },
      { cause: 'age_range', effect: 'follow_load_more_cost_p50', weight: 0.1245 },
      { cause: 'age_range', effect: 'follow_user_num_range', weight: 0.1313 },
      { cause: 'age_range', effect: 'fre_city_level', weight: 0.1558 },
      { cause: 'biz28', effect: 'general_score', weight: 0.0711 },
      { cause: 'device_active_degree', effect: 'general_score', weight: 0.0708 },
      { cause: 'friend_user_num_range', effect: 'general_score', weight: 0.1289 },
      { cause: 'friend_user_num_range', effect: 'is_install_xiaohongshu', weight: 0.0643 },
      { cause: 'general_score', effect: 'follow_load_more_cost_p50', weight: 0.0876 },
      { cause: 'photo_like_cnt_7d', effect: 'general_score', weight: 0.0719 },
      { cause: 'photo_play_duration_sum_7d', effect: 'friend_user_num_range', weight: 0.1013 },
      { cause: 'profile_page_stay_duration_sum_7d', effect: 'device_active_degree', weight: 0.0533 },
      { cause: 'photo_like_pv_7d', effect: 'general_score', weight: 0.0704 },
      { cause: 'fre_city_level', effect: 'device_active_degree', weight: 0.0640 },
      { cause: 'follow_user_num_range', effect: 'friend_user_num_range', weight: 0.0674 }
    ];

    const inferenceTasks = [
      { id: 295, favorite: false, name: '3', ate: '1组', createdAt: '2025-11-26 14:57', status: '已完成', owner: '胡耀鑫' },
      { id: 294, favorite: false, name: '3', ate: '暂无数据', createdAt: '2025-11-26 11:40', status: '失败', owner: '胡耀鑫' },
      { id: 293, favorite: false, name: '2', ate: '暂无数据', createdAt: '2025-11-25 20:45', status: '失败', owner: '胡耀鑫' },
      { id: 290, favorite: false, name: '1', ate: '1组', createdAt: '2025-11-25 20:06', status: '已完成', owner: '胡耀鑫' },
      { id: 289, favorite: false, name: '测试', ate: '1组', createdAt: '2025-11-25 19:27', status: '已完成', owner: '胡耀鑫' },
      { id: 117, favorite: false, name: '全量', ate: '26组', createdAt: '2025-11-05 19:49', status: '已完成', owner: '朱贺' },
      { id: 116, favorite: false, name: '全量', ate: '暂无数据', createdAt: '2025-11-05 19:23', status: '失败', owner: '朱贺' }
    ];

    const logGroups = {
      调度日志: [
        '[2026-03-05 14:07:21] INFO 任务已创建，开始拉取样本配置',
        '[2026-03-05 14:07:26] INFO 校验实验范围与目标指标',
        '[2026-03-05 14:07:42] SUCCESS 调度成功，进入因果骨架图绘制阶段'
      ],
      图谱构建日志: [
        '[2026-03-05 14:09:13] INFO 开始执行 PC Skeleton 学习',
        '[2026-03-05 14:09:58] INFO 识别候选节点数 17 个，候选边数 21 条',
        '[2026-03-05 14:10:12] SUCCESS 骨架图输出完成，已写入关系表'
      ],
      推断任务日志: [
        '[2026-03-05 14:12:04] INFO 创建 7 个因果推断子任务',
        '[2026-03-05 14:12:39] INFO 已完成 4/7，失败 2/7，待执行 1/7',
        '[2026-03-05 14:14:25] WARN 子任务 294 ATE 参数缺失，已标记失败'
      ],
      结果复核日志: [
        '[2026-03-05 14:16:18] INFO 正在校验权重阈值与路径稳定性',
        '[2026-03-05 14:17:04] SUCCESS 结果复核通过，支持导出关系表与图谱快照',
        '[2026-03-05 14:17:21] INFO 当前项目负责人：朱贺'
      ]
    };

    const layoutPositions = {
      cola: {
        photo_play_duration_sum_7d: [50, 9],
        friend_user_num_range: [48, 22],
        is_install_xiaohongshu: [58, 22],
        photo_like_cnt_7d: [42, 44],
        app_launch_cold_cnt_7d: [56, 44],
        follow_load_more_cost_p50: [67, 16],
        profile_page_stay_duration_sum_7d: [33, 18],
        device_active_degree: [41, 33],
        general_score: [57, 34],
        live_play_duration_sum_7d: [46, 55],
        photo_like_pv_7d: [54, 55],
        age_range: [38, 68],
        active_day_cnt_7d: [48, 68],
        fre_city_level: [31, 48],
        follow_user_num_range: [62, 50],
        follow_load_more_cost_avg: [67, 36],
        biz28: [51, 26]
      },
      radial: {
        photo_play_duration_sum_7d: [50, 10],
        friend_user_num_range: [63, 16],
        is_install_xiaohongshu: [74, 28],
        photo_like_cnt_7d: [79, 44],
        app_launch_cold_cnt_7d: [74, 61],
        follow_load_more_cost_p50: [63, 72],
        profile_page_stay_duration_sum_7d: [50, 76],
        device_active_degree: [37, 72],
        general_score: [26, 61],
        live_play_duration_sum_7d: [21, 44],
        photo_like_pv_7d: [26, 28],
        age_range: [37, 16],
        active_day_cnt_7d: [50, 28],
        fre_city_level: [31, 44],
        follow_user_num_range: [69, 44],
        follow_load_more_cost_avg: [58, 54],
        biz28: [50, 44]
      },
      grid: {
        photo_play_duration_sum_7d: [18, 18],
        friend_user_num_range: [38, 18],
        is_install_xiaohongshu: [58, 18],
        photo_like_cnt_7d: [78, 18],
        app_launch_cold_cnt_7d: [18, 38],
        follow_load_more_cost_p50: [38, 38],
        profile_page_stay_duration_sum_7d: [58, 38],
        device_active_degree: [78, 38],
        general_score: [18, 58],
        live_play_duration_sum_7d: [38, 58],
        photo_like_pv_7d: [58, 58],
        age_range: [78, 58],
        active_day_cnt_7d: [18, 78],
        fre_city_level: [38, 78],
        follow_user_num_range: [58, 78],
        follow_load_more_cost_avg: [78, 78],
        biz28: [48, 48]
      }
    };

    const params = new URLSearchParams(window.location.search);
    const projectId = Number(params.get('projectId')) || 59;
    const initialTab = params.get('tab') || 'taskResult';
    const focusInferenceId = Number(params.get('inferenceId')) || null;

    const project = baseProjects[projectId] || baseProjects[59];
    let relationPage = 1;
    let inferencePage = 1;
    const relationPageSize = 10;
    const inferencePageSize = 7;
    let activeLogGroup = Object.keys(logGroups)[0];

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

    function renderHeaderInfo() {
      document.getElementById('taskNameText').textContent = project.name;
      document.getElementById('taskOwner').textContent = project.owner;
      document.getElementById('taskCreatedAt').textContent = project.createdAt;
      document.title = `Kinsight - ${project.name}`;
      const statusMeta = getStatusMeta(project.status);
      document.getElementById('taskStatusBadge').innerHTML = `<span class="status-chip ${statusMeta.cls}"><span class="status-icon">${statusMeta.icon}</span>${project.status}</span>`;
      document.getElementById('retryBtn').style.display = project.status === '进行中' ? 'none' : 'inline-flex';
    }

    function toggleSection(key) {
      const section = document.querySelector(`[data-section="${key}"]`);
      if (!section) return;
      section.classList.toggle('collapsed');
    }

    function getThreshold() {
      return Number(document.getElementById('thresholdRange').value);
    }

    function getVisibleRelations() {
      return relations.filter(item => item.weight >= getThreshold());
    }

    function renderGraph() {
      const canvas = document.getElementById('graphCanvas');
      const svg = document.getElementById('graphSvg');
      const showNodeLabel = document.getElementById('toggleNodeLabel').checked;
      const showWeightLabel = document.getElementById('toggleWeightLabel').checked;
      const layout = document.getElementById('layoutSelect').value;
      const visibleRelations = getVisibleRelations();
      const relationSet = new Set();
      visibleRelations.forEach(item => {
        relationSet.add(item.cause);
        relationSet.add(item.effect);
      });

      canvas.querySelectorAll('.node, .node-label, .edge-label').forEach(el => el.remove());
      svg.innerHTML = '';

      visibleRelations.forEach(item => {
        const start = layoutPositions[layout][item.cause];
        const end = layoutPositions[layout][item.effect];
        if (!start || !end) return;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${start[0]}%`);
        line.setAttribute('y1', `${start[1]}%`);
        line.setAttribute('x2', `${end[0]}%`);
        line.setAttribute('y2', `${end[1]}%`);
        line.setAttribute('class', 'graph-edge active');
        svg.appendChild(line);

        if (showWeightLabel) {
          const label = document.createElement('div');
          label.className = 'edge-label';
          label.style.left = `${(start[0] + end[0]) / 2}%`;
          label.style.top = `${(start[1] + end[1]) / 2}%`;
          label.textContent = item.weight.toFixed(4);
          canvas.appendChild(label);
        }
      });

      graphNodes.forEach(node => {
        if (!relationSet.has(node.id)) return;
        const pos = layoutPositions[layout][node.id];
        if (!pos) return;
        const dot = document.createElement('div');
        dot.className = 'node';
        dot.style.left = `${pos[0]}%`;
        dot.style.top = `${pos[1]}%`;
        canvas.appendChild(dot);

        if (showNodeLabel) {
          const label = document.createElement('div');
          label.className = 'node-label';
          label.style.left = `${pos[0]}%`;
          label.style.top = `${pos[1]}%`;
          label.textContent = node.label;
          canvas.appendChild(label);
        }
      });

      renderRelationTable();
    }

    function renderThresholdText() {
      const threshold = Math.round(getThreshold() * 100);
      document.getElementById('thresholdText').textContent = `0 ~ ${threshold}`;
    }

    function renderRelationTable() {
      const visibleRelations = getVisibleRelations();
      const pageCount = Math.max(1, Math.ceil(visibleRelations.length / relationPageSize));
      if (relationPage > pageCount) relationPage = pageCount;
      const rows = visibleRelations.slice((relationPage - 1) * relationPageSize, relationPage * relationPageSize);
      document.getElementById('relationTableBody').innerHTML = rows.map(item => `
        <tr>
          <td>${item.cause}</td>
          <td>${item.effect}</td>
          <td>${item.weight.toFixed(4)}</td>
        </tr>
      `).join('');
      document.getElementById('relationTotalText').textContent = `共 ${visibleRelations.length} 条`;
      renderMiniPagination('relationPagination', relationPage, pageCount, 'changeRelationPage');
    }

    function renderMiniPagination(containerId, page, pageCount, callbackName) {
      const container = document.getElementById(containerId);
      const items = [];
      items.push(`<span class="page-btn ${page === 1 ? 'disabled' : ''}" onclick="${callbackName}(${page - 1})">‹</span>`);
      const visiblePages = [];
      for (let i = 1; i <= pageCount; i++) visiblePages.push(i);
      visiblePages.forEach(num => {
        items.push(`<span class="page-btn ${num === page ? 'active' : ''}" onclick="${callbackName}(${num})">${num}</span>`);
      });
      items.push(`<span class="page-btn ${page === pageCount ? 'disabled' : ''}" onclick="${callbackName}(${page + 1})">›</span>`);
      container.innerHTML = items.join('');
    }

    function changeRelationPage(page) {
      const pageCount = Math.max(1, Math.ceil(getVisibleRelations().length / relationPageSize));
      if (page < 1 || page > pageCount || page === relationPage) return;
      relationPage = page;
      renderRelationTable();
    }

    function exportRelations() {
      const rows = getVisibleRelations();
      const csv = ['原因,结果,权重', ...rows.map(item => `${item.cause},${item.effect},${item.weight.toFixed(4)}`)].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '因果关系表.csv';
      link.click();
      URL.revokeObjectURL(url);
      showToast('已导出因果关系表');
    }

    function resetGraph() {
      document.getElementById('thresholdRange').value = '0.05';
      document.getElementById('layoutSelect').value = 'cola';
      document.getElementById('toggleNodeLabel').checked = true;
      document.getElementById('toggleWeightLabel').checked = true;
      relationPage = 1;
      renderThresholdText();
      renderGraph();
      showToast('已重置图谱视图');
    }

    function toggleFullscreen() {
      const canvas = document.getElementById('graphCanvas');
      canvas.classList.toggle('fullscreen');
      renderGraph();
      showToast(canvas.classList.contains('fullscreen') ? '已进入全屏视图' : '已退出全屏视图');
    }

    function renderInferenceTable() {
      const pageCount = Math.max(1, Math.ceil(inferenceTasks.length / inferencePageSize));
      if (inferencePage > pageCount) inferencePage = pageCount;
      const rows = inferenceTasks.slice((inferencePage - 1) * inferencePageSize, inferencePage * inferencePageSize);
      document.getElementById('inferenceTableBody').innerHTML = rows.map(item => {
        const meta = getStatusMeta(item.status);
        const resultAction = item.status === '已完成'
          ? `<a class="table-action" href="javascript:void(0)" onclick="openInferenceResult(${item.id})">查看结果</a>`
          : `<a class="table-action disabled" href="javascript:void(0)">查看结果</a>`;
        return `
          <tr>
            <td><span class="owner-cell"><span>${item.id}</span><span style="color:#D9D9D9; font-size:15px;">★</span></span></td>
            <td>${item.name}</td>
            <td><a class="table-action" href="javascript:void(0)" onclick="showToast('已打开 ATE 曲线参数：${item.ate}')">${item.ate}</a></td>
            <td>${item.createdAt}</td>
            <td><span class="status-chip ${meta.cls}"><span class="status-icon">${meta.icon}</span>${item.status}</span></td>
            <td><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${item.owner}</span></td>
            <td>
              ${resultAction}
              <a class="table-action" href="javascript:void(0)" onclick="copyInference(${item.id})">复制</a>
              <a class="table-action dots" href="javascript:void(0)" onclick="showToast('更多操作待补充')">⋮</a>
            </td>
          </tr>
        `;
      }).join('');
      document.getElementById('inferenceTotalText').textContent = `共 ${inferenceTasks.length} 条`;
      renderMiniPagination('inferencePagination', inferencePage, pageCount, 'changeInferencePage');
    }

    function changeInferencePage(page) {
      const pageCount = Math.max(1, Math.ceil(inferenceTasks.length / inferencePageSize));
      if (page < 1 || page > pageCount || page === inferencePage) return;
      inferencePage = page;
      renderInferenceTable();
    }

    function copyInference(id) {
      const target = inferenceTasks.find(item => item.id === id);
      if (!target) return;
      showToast(`已复制因果推断任务 ${target.id}`);
    }

    function openInferenceResult(id) {
      const url = new URL(window.location.href);
      url.searchParams.set('projectId', String(project.id));
      url.searchParams.set('tab', 'taskResult');
      url.searchParams.set('inferenceId', String(id));
      window.location.href = url.toString();
    }

    function renderLogs() {
      const nav = document.getElementById('logNav');
      nav.innerHTML = Object.keys(logGroups).map(name => `
        <div class="log-nav-item ${name === activeLogGroup ? 'active' : ''}" onclick="switchLogGroup('${name}')">${name}</div>
      `).join('');
      document.getElementById('logTitle').textContent = activeLogGroup;
      document.getElementById('logContent').innerHTML = logGroups[activeLogGroup].map(line => {
        let cls = 'log-line-info';
        if (line.includes('SUCCESS')) cls = 'log-line-success';
        else if (line.includes('WARN')) cls = 'log-line-warn';
        const time = line.match(/^\[(.*?)\]/)?.[1] || '';
        const message = line.replace(/^\[(.*?)\]\s*/, '');
        return `<div><span class="log-line-time">[${time}]</span> <span class="${cls}">${message}</span></div>`;
      }).join('');
    }

    function switchLogGroup(name) {
      activeLogGroup = name;
      renderLogs();
    }

    function setActiveTab(tab) {
      document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tab);
      });
      document.querySelectorAll('.tab-content').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.tabContent === tab);
      });
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    document.getElementById('tabs').addEventListener('click', (event) => {
      const item = event.target.closest('.tab-item');
      if (!item) return;
      setActiveTab(item.dataset.tab);
    });

    document.getElementById('thresholdRange').addEventListener('input', () => {
      relationPage = 1;
      renderThresholdText();
      renderGraph();
    });
    document.getElementById('layoutSelect').addEventListener('change', renderGraph);
    document.getElementById('toggleNodeLabel').addEventListener('change', renderGraph);
    document.getElementById('toggleWeightLabel').addEventListener('change', renderGraph);

    renderHeaderInfo();
    renderThresholdText();
    renderGraph();
    renderInferenceTable();
    renderLogs();
    setActiveTab(['taskResult', 'causalInference', 'logs'].includes(initialTab) ? initialTab : 'taskResult');

    if (focusInferenceId) {
      setTimeout(() => {
        showToast(`已定位到推断任务 ${focusInferenceId} 的结果视图`);
      }, 120);
    }
