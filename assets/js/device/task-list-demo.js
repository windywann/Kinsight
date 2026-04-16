const rows = [
      { id: 73, name: "exp8_1125-2025-11-25 20:20:49", owner: "胡耀鑫", time: "2025-11-25 20:21", active: true, current: "训练", includeExtra: false, canStart: true },
      { id: 71, name: "exp8_1125", owner: "胡耀鑫", time: "2025-11-25 10:46", active: false, current: "评估", includeExtra: false, canStart: false },
      { id: 70, name: "时长nebula-2025-11-25 10:41:52", owner: "胡耀鑫", time: "2025-11-25 10:42", active: false, current: "样本采集", includeExtra: false, canStart: true },
      { id: 66, name: "时长nebula", owner: "陈子轩", time: "2025-11-18 21:18", active: false, current: "打包", includeExtra: false, canStart: false },
      { id: 65, name: "时长ks", owner: "陈子轩", time: "2025-11-18 21:17", active: true, current: "发布", includeExtra: true, canStart: false },
      { id: 64, name: "-700nebula", owner: "陈子轩", time: "2025-11-18 20:37", active: false, current: "监控", includeExtra: true, canStart: false },
      { id: 63, name: "-700ks", owner: "陈子轩", time: "2025-11-18 20:37", active: false, current: "预处理", includeExtra: false, canStart: true },
      { id: 62, name: "-700 ks-2025-11-18 14:17:11-2025-11-18 16:34:52", owner: "陈子轩", time: "2025-11-18 16:35", active: false, current: "训练", includeExtra: false, canStart: true },
      { id: 61, name: "-700 ks-2025-11-18 16:33:39", owner: "陈子轩", time: "2025-11-18 16:34", active: false, current: "评估", includeExtra: false, canStart: true }
    ];

    function buildStages(current, includeExtra) {
      const base = ["样本采集", "预处理", "训练", "评估", "打包"];
      return includeExtra ? [...base, "发布", "监控"] : base;
    }

    function stageStatus(stage, stages, current) {
      const sIndex = stages.indexOf(stage);
      const cIndex = stages.indexOf(current);
      if (sIndex < cIndex) return "done";
      if (sIndex === cIndex) return "current";
      return "todo";
    }

    function chip(stage, status) {
      const cls = status === "done" ? "status-chip done" : status === "current" ? "status-chip current" : "status-chip";
      const dot = status === "todo" ? "○" : status === "current" ? "●" : "✓";
      return `<span class="${cls}"><span class="chip-dot">${dot}</span>${stage}</span>`;
    }

    function tooltip(stages, current) {
      const html = stages.map((s, i) => {
        const st = stageStatus(s, stages, current);
        const cls = st === "done" ? "tt-chip done" : st === "current" ? "tt-chip current" : "tt-chip";
        const arr = i < stages.length - 1 ? `<span class="tt-arrow">→</span>` : "";
        return `<span class="${cls}">${s}</span>${arr}`;
      }).join("");
      return `<div class="tooltip"><div class="tooltip-line">${html}</div></div>`;
    }

    function renderStatus(current, includeExtra) {
      const stages = buildStages(current, includeExtra);
      const showCount = includeExtra ? 4 : 5;
      const visible = stages.slice(0, showCount);
      const hiddenCount = stages.length - visible.length;

      let html = '<span class="status-chain">';
      visible.forEach((s, i) => {
        html += chip(s, stageStatus(s, stages, current));
        if (i < visible.length - 1) html += '<span class="arrow">→</span>';
      });
      if (hiddenCount > 0) {
        html += '<span class="arrow">→</span>';
        html += `<span class="more-chip">+${hiddenCount}</span>`;
      }
      html += tooltip(stages, current);
      html += "</span>";
      return html;
    }

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

    function toggleMore(event, btn) {
      event.stopPropagation();
      const cell = btn.closest(".action-cell");
      document.querySelectorAll(".action-cell.open").forEach(el => {
        if (el !== cell) el.classList.remove("open");
      });
      cell.classList.toggle("open");
    }

    document.addEventListener("click", () => {
      document.querySelectorAll(".action-cell.open").forEach(el => el.classList.remove("open"));
    });

    function renderRows() {
      const tbody = document.getElementById("tbody");
      tbody.innerHTML = rows.map(r => `
        <tr>
          <td>
            <span class="id-col">
              <span>${r.id}</span>
              <span class="star ${r.active ? "active" : ""}">★</span>
            </span>
          </td>
          <td>${r.name}</td>
          <td><span class="owner-cell"><img class="owner-logo" src="https://w2.kskwai.com/kos/nlav12127/svg-icons/kim.svg" alt="kim" />${r.owner}</span></td>
          <td>${r.time}</td>
          <td>${renderStatus(r.current, r.includeExtra)}</td>
          <td>
            <div class="action-cell">
              <a class="action ${r.canStart ? "" : "disabled"}" href="javascript:void(0)">启动</a>
              <a class="action" href="javascript:void(0)">报告</a>
              <button class="more-trigger" type="button" onclick="toggleMore(event,this)">⋮</button>
              <div class="action-menu">
                <a class="menu-item" href="../../pages/device/task-detail-demo.html">详情</a>
                <a class="menu-item" href="javascript:void(0)">复制</a>
                <a class="menu-item delete" href="javascript:void(0)">删除</a>
              </div>
            </div>
          </td>
        </tr>
      `).join("");
    }

    renderRows();
  
// Handle feature tag selection
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('ftag')) {
    e.target.classList.toggle('selected');
  }
});

function moveFeatures(panelId, dir) {
  const container = document.getElementById(panelId + '-detail');
  if (!container) return;
  const panels = container.querySelectorAll('.tp-body');
  const leftPanel = panels[0];
  const rightPanel = panels[1];
  
  if (dir === 'right') {
    const selected = leftPanel.querySelectorAll('.ftag.selected');
    selected.forEach(el => {
      el.classList.remove('selected');
      rightPanel.appendChild(el);
    });
  } else {
    const selected = rightPanel.querySelectorAll('.ftag.selected');
    selected.forEach(el => {
      el.classList.remove('selected');
      leftPanel.appendChild(el);
    });
  }
  
  // update placeholders
  [leftPanel, rightPanel].forEach(panel => {
    let placeholder = panel.querySelector('.tp-placeholder');
    const tags = panel.querySelectorAll('.ftag');
    if (tags.length > 0) {
      if (placeholder) placeholder.style.display = 'none';
    } else {
      if (!placeholder) {
        placeholder = document.createElement('span');
        placeholder.className = 'tp-placeholder';
        placeholder.textContent = panel === leftPanel ? '暂无特征' : '请从左侧选择特征';
        panel.appendChild(placeholder);
      }
      placeholder.style.display = 'block';
    }
  });
}
