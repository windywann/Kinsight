const params = new URLSearchParams(window.location.search);
    const packageName = params.get('packageName') ? decodeURIComponent(params.get('packageName')) : '存储-ecdn-136-APP使用时长-top20';
    const sourceTaskName = 'exp21_0119_极速版_p2p上行_综合成本_时长目标_增加wifi_rate等特征';

    const relatedLabels = {
      abTests: '实验',
      kswitches: '开关',
      launchReviews: 'LR'
    };

    let relatedInfo = {
      abTests: [],
      kswitches: [],
      launchReviews: []
    };

    let editingRelatedInfo = {
      abTests: [],
      kswitches: [],
      launchReviews: []
    };

    let benefits = [];
    let editingBenefits = [];

    document.getElementById('pageTitle').textContent = '人群包详情';
    document.getElementById('baseTaskName').textContent = packageName;
    document.title = `Kinsight - ${packageName}`;
    document.getElementById('sourceTaskLink').textContent = sourceTaskName;
    document.getElementById('sourceTaskLink').href = `../../pages/uplift/uplift-task-detail-demo.html?projectName=${encodeURIComponent('社区互动-万赞')}&taskName=${encodeURIComponent(sourceTaskName)}`;

    function toggleSection(sectionKey) {
      const section = document.querySelector(`[data-section="${sectionKey}"]`);
      if (!section) return;
      section.classList.toggle('collapsed');
    }

    function cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }

    function openModal(id) {
      document.getElementById('modalMask').classList.add('show');
      document.getElementById(id).classList.add('show');
    }

    function closeAllModals() {
      document.getElementById('modalMask').classList.remove('show');
      document.getElementById('relatedModal').classList.remove('show');
      document.getElementById('benefitModal').classList.remove('show');
    }

    function openRelatedModal() {
      editingRelatedInfo = cloneData(relatedInfo);
      renderRelatedEditor();
      openModal('relatedModal');
    }

    function openBenefitModal() {
      editingBenefits = cloneData(benefits);
      if (!editingBenefits.length) {
        editingBenefits = Array.from({ length: 4 }, () => ({ name: '', trend: '优化', value: '0.00' }));
      }
      renderBenefitEditor();
      openModal('benefitModal');
    }

    function nextRelatedName(type) {
      const prefix = relatedLabels[type];
      const count = editingRelatedInfo[type].length + 1;
      return `${prefix}${count}`;
    }

    function addRelatedItem(type) {
      editingRelatedInfo[type].push({ name: nextRelatedName(type), url: '' });
      renderRelatedEditor();
    }

    function removeRelatedItem(type, index) {
      editingRelatedInfo[type].splice(index, 1);
      renderRelatedEditor();
    }

    function updateRelatedUrl(type, index, value) {
      if (!editingRelatedInfo[type][index]) return;
      editingRelatedInfo[type][index].url = value;
    }

    function renderRelatedGroup(type, containerId) {
      const container = document.getElementById(containerId);
      const list = editingRelatedInfo[type];
      container.innerHTML = list.map((item, index) => `
        <div class="related-row">
          <span class="row-name">${item.name}</span>
          <input class="input" placeholder="请输入链接" value="${escapeHtml(item.url)}" oninput="updateRelatedUrl('${type}', ${index}, this.value)" />
          <button class="delete-btn" type="button" onclick="removeRelatedItem('${type}', ${index})">🗑</button>
        </div>
      `).join('');
    }

    function renderRelatedEditor() {
      renderRelatedGroup('abTests', 'abTestsContainer');
      renderRelatedGroup('kswitches', 'kswitchesContainer');
      renderRelatedGroup('launchReviews', 'launchReviewsContainer');
    }

    function formatRelatedDisplay(list) {
      if (!list.length) return '<span class="kv-empty">-</span>';
      return `<div class="link-stack">${list.map(item => `<a class="inline-link" href="${escapeAttr(item.url || 'javascript:void(0)')}" target="_blank">${escapeHtml(item.name)}</a>`).join('')}</div>`;
    }

    function saveRelatedInfo() {
      relatedInfo = {
        abTests: editingRelatedInfo.abTests.filter(item => item.url.trim()),
        kswitches: editingRelatedInfo.kswitches.filter(item => item.url.trim()),
        launchReviews: editingRelatedInfo.launchReviews.filter(item => item.url.trim())
      };
      renderRelatedDisplay();
      closeAllModals();
      showToast('关联信息已更新');
    }

    function renderRelatedDisplay() {
      document.getElementById('abDisplay').innerHTML = formatRelatedDisplay(relatedInfo.abTests);
      document.getElementById('kswitchDisplay').innerHTML = formatRelatedDisplay(relatedInfo.kswitches);
      document.getElementById('lrDisplay').innerHTML = formatRelatedDisplay(relatedInfo.launchReviews);
    }

    function addBenefitItem() {
      editingBenefits.push({ name: '', trend: '优化', value: '0.00' });
      renderBenefitEditor();
    }

    function removeBenefitItem(index) {
      editingBenefits.splice(index, 1);
      renderBenefitEditor();
    }

    function updateBenefitField(index, field, value) {
      if (!editingBenefits[index]) return;
      editingBenefits[index][field] = value;
    }

    function stepBenefitValue(index, delta) {
      const current = Number(editingBenefits[index]?.value || 0);
      const next = (current + delta).toFixed(2);
      editingBenefits[index].value = next;
      renderBenefitEditor();
    }

    function renderBenefitEditor() {
      const container = document.getElementById('benefitsContainer');
      container.innerHTML = editingBenefits.map((item, index) => `
        <div class="metric-row">
          <input class="input" placeholder="请输入指标名称" value="${escapeHtml(item.name)}" oninput="updateBenefitField(${index}, 'name', this.value)" />
          <select class="metric-select" onchange="updateBenefitField(${index}, 'trend', this.value)">
            <option value="优化" ${item.trend === '优化' ? 'selected' : ''}>优化</option>
            <option value="劣化" ${item.trend === '劣化' ? 'selected' : ''}>劣化</option>
          </select>
          <div class="number-wrap">
            <input class="number-input" type="number" step="0.01" value="${escapeAttr(item.value)}" oninput="updateBenefitField(${index}, 'value', this.value)" />
            <div class="stepper">
              <button type="button" onclick="stepBenefitValue(${index}, 0.01)">⌃</button>
              <button type="button" onclick="stepBenefitValue(${index}, -0.01)">⌄</button>
            </div>
          </div>
          <button class="delete-btn" type="button" onclick="removeBenefitItem(${index})">🗑</button>
        </div>
      `).join('');
    }

    function saveBenefits() {
      benefits = editingBenefits.filter(item => item.name.trim()).map(item => ({
        name: item.name.trim(),
        trend: item.trend,
        value: Number(item.value || 0).toFixed(2)
      }));
      renderBenefitDisplay();
      closeAllModals();
      showToast('收益详情已更新');
    }

    function renderBenefitDisplay() {
      const container = document.getElementById('benefitDisplay');
      if (!benefits.length) {
        container.className = 'empty-benefit';
        container.innerHTML = `
          <div class="empty-illustration"></div>
          <div>暂无收益详情</div>
        `;
        return;
      }
      container.className = 'benefit-list';
      container.innerHTML = benefits.map(item => `
        <div class="benefit-item">
          <div class="benefit-main">
            <div class="benefit-name">${escapeHtml(item.name)}</div>
            <div class="benefit-meta">收益值：${escapeHtml(item.value)}</div>
          </div>
          <span class="benefit-trend ${item.trend === '优化' ? 'optimization' : 'degradation'}">${item.trend}</span>
        </div>
      `).join('');
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function escapeAttr(value) {
      return escapeHtml(value);
    }

    document.getElementById('modalMask').addEventListener('click', closeAllModals);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAllModals();
    });

    renderRelatedDisplay();
    renderBenefitDisplay();
