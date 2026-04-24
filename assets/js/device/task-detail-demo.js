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
    
    function toggleSection(id, titleEl) {
      const el = document.getElementById(id);
      const icon = titleEl.querySelector('.collapse-icon');
      if (el.style.display === 'none') {
        el.style.display = id === 'base-info' ? 'flex' : 'flex';
        icon.textContent = '⌃';
      } else {
        el.style.display = 'none';
        icon.textContent = '⌄';
      }
    }

    function initFeatureReport() {
      const wrap = document.getElementById('featureSelectWrap');
      const input = document.getElementById('featureSearchInput');
      const panel = document.getElementById('featureSelectPanel');
      if (!wrap || !input || !panel) return;

      const options = Array.from(panel.querySelectorAll('.feature-option'));
      const discreteChart = document.getElementById('discreteChart');
      const continuousChart = document.getElementById('continuousChart');
      const title = document.getElementById('featureChartTitle');
      const continuousPath = document.getElementById('continuousPath');

      const discreteMockMap = {
        device_active_degree: [34, 28, 18, 13, 6, 3, 5, 2],
        is_lowactive_period: [62, 38],
        gender: [47, 53],
        age_range: [12, 19, 26, 21, 14, 8],
        fre_country_region: [41, 24, 15, 10, 6, 4]
      };

      const continuousMockPathMap = {
        score_prob: 'M0,230 L25,220 L50,214 L75,205 L100,194 L125,182 L150,171 L175,160 L200,150 L225,141 L250,133 L275,126 L300,120 L325,116 L350,112 L375,108 L400,104 L425,101 L450,98 L475,95 L500,92 L525,90 L550,88 L575,86 L600,85 L625,86 L650,88 L675,93 L700,100 L725,110 L750,123 L775,138 L800,155 L825,173 L850,190 L875,205 L900,217 L925,225 L950,230 L975,233 L1000,235',
        play_duration: 'M0,210 L25,198 L50,188 L75,176 L100,165 L125,154 L150,146 L175,140 L200,136 L225,132 L250,128 L275,124 L300,120 L325,117 L350,113 L375,109 L400,104 L425,98 L450,92 L475,87 L500,83 L525,80 L550,78 L575,78 L600,81 L625,87 L650,96 L675,108 L700,123 L725,140 L750,157 L775,174 L800,190 L825,203 L850,214 L875,222 L900,228 L925,232 L950,235 L975,237 L1000,238',
        consume_depth: 'M0,238 L25,236 L50,233 L75,229 L100,223 L125,214 L150,203 L175,190 L200,176 L225,161 L250,147 L275,134 L300,123 L325,114 L350,108 L375,104 L400,102 L425,102 L450,104 L475,108 L500,114 L525,122 L550,132 L575,144 L600,157 L625,171 L650,185 L675,198 L700,210 L725,220 L750,227 L775,232 L800,236 L825,238 L850,239 L875,238 L900,236 L925,233 L950,230 L975,226 L1000,222'
      };

      const discreteBarColors = [
        'linear-gradient(180deg,#FF7A8B,#F5222D)',
        'linear-gradient(180deg,#FFD666,#FAAD14)',
        'linear-gradient(180deg,#95DE64,#52C41A)',
        'linear-gradient(180deg,#36FC8B,#13C2C2)',
        'linear-gradient(180deg,#69C0FF,#1677FF)',
        'linear-gradient(180deg,#85A5FF,#2F54EB)',
        'linear-gradient(180deg,#B37FEB,#722ED1)',
        'linear-gradient(180deg,#FF85C0,#EB2F96)'
      ];

      function renderDiscreteBars(key) {
        const values = discreteMockMap[key] || [24, 20, 16, 13, 10, 7, 5, 3];
        const maxVal = Math.max(...values);

        const html = values.map((val, idx) => {
          const h = Math.max(6, Math.round((val / maxVal) * 100));
          const label = idx;
          const color = discreteBarColors[idx % discreteBarColors.length];
          return `<div class="bar-col"><div class="bar" style="height:${h}%; background:${color};"></div><span class="bar-label">${label}</span></div>`;
        }).join('');

        discreteChart.innerHTML = html;
      }

      function renderContinuousCurve(key) {
        const path = continuousMockPathMap[key] || continuousMockPathMap.score_prob;
        continuousPath.setAttribute('d', path);
      }

      function applyFeature(option) {
        const key = option.getAttribute('data-key');
        const type = option.getAttribute('data-type');

        input.value = key;
        options.forEach((opt) => opt.classList.remove('active'));
        option.classList.add('active');

        title.textContent = `[${key}] 特征分布`;

        if (type === 'continuous') {
          renderContinuousCurve(key);
          discreteChart.style.display = 'none';
          continuousChart.style.display = 'block';
        } else {
          renderDiscreteBars(key);
          discreteChart.style.display = 'flex';
          continuousChart.style.display = 'none';
        }
      }

      input.addEventListener('focus', () => {
        wrap.classList.add('open');
      });

      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        wrap.classList.add('open');
        options.forEach((opt) => {
          const txt = opt.textContent.toLowerCase();
          opt.style.display = txt.includes(q) ? 'block' : 'none';
        });
      });

      options.forEach((option) => {
        option.addEventListener('click', () => {
          applyFeature(option);
          wrap.classList.remove('open');
        });
      });

      document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove('open');
          options.forEach((opt) => (opt.style.display = 'block'));
        }
      });

      const activeOpt = panel.querySelector('.feature-option.active');
      if (activeOpt) applyFeature(activeOpt);
    }

    function initEvaluationReport() {
      const switchRoot = document.getElementById('evalProblemSwitch');
      const switchBtns = switchRoot ? Array.from(switchRoot.querySelectorAll('.eval-switch-btn')) : [];
      const tableBlocks = Array.from(document.querySelectorAll('[data-problem-table]'));
      const modelTabs = Array.from(document.querySelectorAll('#evalModelTabs .eval-model-tab'));
      const rowMap = Array.from(document.querySelectorAll('[data-model-row]'));
      const lossSection = document.getElementById('evalLossSection');
      const lossChartWrap = document.getElementById('evalLossChartWrap');
      const lossEmpty = document.getElementById('evalLossEmpty');
      const legendRoot = document.getElementById('evalLossLegend');
      const importanceBars = document.getElementById('importanceBars');

      const lossLegendMap = {
        NN_small: [
          { lineId: 'line-nn-small-train', label: 'NN_small-训练集', color: '#1677FF' },
          { lineId: 'line-nn-small-val', label: 'NN_small-验证集', color: '#13C2C2' }
        ],
        NN_large: [
          { lineId: 'line-nn-large-train', label: 'NN_large-训练集', color: '#722ED1' },
          { lineId: 'line-nn-large-val', label: 'NN_large-验证集', color: '#FA8C16' }
        ]
      };

      const importanceDataMap = {
        Dragonnet: [
          ['photo_forward_play_cnt_...', 86.7],
          ['live_play_cnt_perd_7d', 46.0],
          ['photo_play_duration_sum...', 4.3],
          ['is_install_meituan', 3.8],
          ['live_play_duration_sum_p...', 3.6],
          ['max_live_timeslot_prefer', 3.4],
          ['live_play_duration_sum_7d', 3.1],
          ['play_4g_rate_7d', 2.8],
          ['photo_valid_play_cnt_per...', 2.4],
          ['fans_user_num_range', 2.1]
        ],
        TLearner_xgboost: [
          ['photo_forward_play_cnt_...', 74.2],
          ['user_ctr_level_7d', 41.6],
          ['comment_play_ratio_3d', 18.5],
          ['is_install_meituan', 14.2],
          ['live_play_duration_sum_7d', 12.8],
          ['user_pay_score', 11.6],
          ['play_4g_rate_7d', 9.4],
          ['cold_start_tag', 7.8],
          ['fans_user_num_range', 6.1],
          ['author_affinity_score', 5.2]
        ],
        XLearner: [
          ['consume_depth', 61.5],
          ['follow_cnt_10m', 38.4],
          ['user_active_days', 29.7],
          ['like_cnt_10m', 21.9],
          ['live_play_cnt_perd_7d', 18.8],
          ['comment_cnt_10m', 16.2],
          ['network_type', 13.4],
          ['device_type', 10.6],
          ['age_range', 8.3],
          ['city_level', 7.5]
        ],
        CausalForest: [
          ['uplift_bucket_score', 58.9],
          ['play_duration', 42.6],
          ['finish_rate_1d', 33.1],
          ['author_affinity_score', 24.4],
          ['follow_cnt_10m', 18.9],
          ['user_value_tier', 15.6],
          ['network_type', 12.7],
          ['device_active_degree', 10.9],
          ['city_level', 8.6],
          ['fans_user_num_range', 6.8]
        ],
        NN_small: [
          ['photo_forward_play_cnt_...', 79.8],
          ['live_play_duration_sum_7d', 44.2],
          ['comment_play_ratio_3d', 25.5],
          ['photo_valid_play_cnt_per...', 20.8],
          ['user_ctr_level_7d', 16.4],
          ['play_4g_rate_7d', 13.6],
          ['device_active_degree', 11.2],
          ['is_install_meituan', 9.5],
          ['age_range', 7.4],
          ['fans_user_num_range', 5.9]
        ],
        NN_large: [
          ['photo_forward_play_cnt_...', 82.4],
          ['live_play_duration_sum_7d', 47.8],
          ['comment_play_ratio_3d', 28.1],
          ['photo_valid_play_cnt_per...', 23.6],
          ['user_ctr_level_7d', 18.2],
          ['play_4g_rate_7d', 15.1],
          ['device_active_degree', 13.3],
          ['is_install_meituan', 10.8],
          ['author_affinity_score', 8.9],
          ['fans_user_num_range', 6.7]
        ]
      };

      if (switchBtns.length) {
        switchBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const problem = btn.getAttribute('data-problem');
            switchBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            tableBlocks.forEach((block) => {
              const key = block.getAttribute('data-problem-table');
              block.classList.toggle('active', key === problem);
            });
          });
        });
      }

      function renderImportance(model) {
        if (!importanceBars) return;
        const rows = importanceDataMap[model] || importanceDataMap.NN_small;
        importanceBars.innerHTML = rows.map(([name, width]) => `
          <div class="importance-row"><span class="importance-name">${name}</span><span class="importance-bar-area"><span class="importance-bar" style="width:${width}%;"></span></span></div>
        `).join('');
      }

      function renderLegend(model) {
        if (!legendRoot) return;
        const items = lossLegendMap[model] || [];
        legendRoot.innerHTML = items.map((item) => `
          <span class="eval-legend-item" data-line="${item.lineId}"><span class="eval-legend-dot" style="background:${item.color};"></span>${item.label}</span>
        `).join('');

        legendRoot.querySelectorAll('.eval-legend-item').forEach((item) => {
          item.addEventListener('click', () => {
            const lineId = item.getAttribute('data-line');
            const line = document.getElementById(lineId);
            if (!line) return;
            line.classList.toggle('is-hidden');
            item.classList.toggle('off', line.classList.contains('is-hidden'));
          });
        });
      }

      function setLineVisibility(model) {
        document.querySelectorAll('.eval-line').forEach((line) => line.classList.add('is-hidden'));
        const items = lossLegendMap[model] || [];
        items.forEach((item) => {
          const line = document.getElementById(item.lineId);
          if (line) line.classList.remove('is-hidden');
        });
      }

      function setCurrentModel(model, hasLoss) {
        rowMap.forEach((tr) => {
          const rowModel = tr.getAttribute('data-model-row');
          tr.classList.toggle('eval-current-row', rowModel === model);
        });

        modelTabs.forEach((tab) => {
          tab.classList.toggle('active', tab.getAttribute('data-model') === model);
        });

        renderImportance(model);

        if (hasLoss) {
          lossChartWrap.style.display = 'block';
          lossEmpty.style.display = 'none';
          renderLegend(model);
          setLineVisibility(model);
        } else {
          lossChartWrap.style.display = 'none';
          lossEmpty.style.display = 'block';
          if (legendRoot) legendRoot.innerHTML = '';
          setLineVisibility('__none__');
        }
      }

      modelTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const model = tab.getAttribute('data-model');
          const hasLoss = tab.getAttribute('data-has-loss') === 'true';
          setCurrentModel(model, hasLoss);
        });
      });

      const defaultTab = modelTabs.find((t) => t.classList.contains('active'));
      if (defaultTab) {
        setCurrentModel(defaultTab.getAttribute('data-model'), defaultTab.getAttribute('data-has-loss') === 'true');
      }

      if (lossSection && !modelTabs.length) {
        lossSection.style.display = 'none';
      }
    }

    function initPackageProducts() {
      const rows = Array.from(document.querySelectorAll('#packageTableBody tr'));
      if (!rows.length) return;

      const KEEP_BASE = 'https://keep.kuaishou.com';

      rows.forEach((row) => {
        const publishBtn = row.querySelector('.pkg-publish-btn');
        if (!publishBtn) return;

        publishBtn.addEventListener('click', () => {
          const keepMode = row.getAttribute('data-keep-mode');
          const model = row.getAttribute('data-model');
          const branch = row.getAttribute('data-branch');
          const status = row.querySelector('.pkg-status');

          if (keepMode === 'api') {
            if (status) {
              status.innerHTML = '<span class="pkg-tag published">已发布</span>';
            }

            const detailLink = document.createElement('a');
            detailLink.className = 'pkg-op-link';
            detailLink.target = '_blank';
            detailLink.href = `${KEEP_BASE}/publish/detail?project=1024&task=8899&model=${encodeURIComponent(model)}`;
            detailLink.textContent = '发布';
            publishBtn.replaceWith(detailLink);
            return;
          }

          if (keepMode === 'param') {
            const url = `${KEEP_BASE}/publish/create?project=1024&task=8899&model=${encodeURIComponent(model)}&branch=${encodeURIComponent(branch)}`;
            window.open(url, '_blank');
            return;
          }

          window.open(`${KEEP_BASE}`, '_blank');
        });
      });
    }

    function initLogsPanel() {
      const groupTitles = Array.from(document.querySelectorAll('.log-group-title'));
      const logItems = Array.from(document.querySelectorAll('.log-item'));
      const logStream = document.getElementById('logStream');
      const logTaskTitle = document.getElementById('logTaskTitle');
      if (!groupTitles.length || !logItems.length || !logStream || !logTaskTitle) return;

      const logsData = {
        'big-card-feedback': `https://kml.corp.kuaishou.com/v2/#/project/517/training/tasks/631771?tab=records&selectedRecordId=15009679\n2026-04-02T04:16:49.165E078Z stdout Looking in indexes: https://pypi.corp.kuaishou.com/kuaishou/prod/+simple/\n2026-04-02T04:20:16.502E5456Z stdout Collecting git+https://oauth2:***@git.corp.kuaishou.com/intelligent-technology-algorithm/cluster-utils.git\n2026-04-02T04:20:16.508E6614Z stderr Running command git clone --filter=blob:none --quiet https://oauth2:***@git.corp.kuaishou.com/intelligent-technology-algorithm/cluster-utils.git\n2026-04-02T04:20:18.151E1653Z stdout Resolved https://oauth2:***@git.corp.kuaishou.com/intelligent-technology-algorithm/cluster-utils.git\n2026-04-02T04:20:18.527E5271Z stdout Preparing metadata (setup.py): finished with status 'done'\n2026-04-02T04:20:22.842E5061Z stderr [2026-04-02 10:40:22,842] __main__ INFO: 运行环境: prod`,
        'dragonnet-active': `2026-04-02T05:02:41.118Z stdout [Dragonnet] train start ...\n2026-04-02T05:03:12.221Z stdout feature_count=163 sample_count=9960625\n2026-04-02T05:08:53.017Z stdout epoch=1 auc=0.802 loss=1.384\n2026-04-02T05:14:21.522Z stdout epoch=2 auc=0.835 loss=1.276\n2026-04-02T05:22:10.217Z stdout train finished, export artifact to proj_1024/task_8899/model_dragonnet`,
        'dragonnet-app': `2026-04-02T05:20:10.123Z stdout [Dragonnet-APP使用时长] start\n2026-04-02T05:21:42.443Z stdout load dataset success\n2026-04-02T05:24:11.992Z stdout metric snapshot auc=0.874 f1=0.432\n2026-04-02T05:27:08.884Z stdout done`,
        'dragonnet-consume': `2026-04-02T05:30:11.123Z stdout [Dragonnet-总消费vv数] start\n2026-04-02T05:31:39.318Z stdout process feature pipeline\n2026-04-02T05:34:02.506Z stdout evaluate done, auc=0.869\n2026-04-02T05:35:10.004Z stdout done`,
        'tlearner-active': `2026-04-02T05:40:10.123Z stdout [TLearner_xgboost-LT] start\n2026-04-02T05:44:31.220Z stdout booster round 120\n2026-04-02T05:49:02.109Z stdout evaluate auc=0.854`,
        'tlearner-app': `2026-04-02T05:52:10.223Z stdout [TLearner_xgboost-APP使用时长] start\n2026-04-02T05:58:03.551Z stdout evaluate auc=0.848`,
        'tlearner-consume': `2026-04-02T06:02:14.112Z stdout [TLearner_xgboost-总消费vv数] start\n2026-04-02T06:06:51.882Z stdout evaluate auc=0.845`,
        'xlearner-active': `2026-04-02T06:10:07.223Z stdout [XLearner-LT] start\n2026-04-02T06:15:03.128Z stdout evaluate auc=0.839`,
        'xlearner-app': `2026-04-02T06:18:34.771Z stdout [XLearner-APP使用时长] start\n2026-04-02T06:23:46.192Z stdout evaluate auc=0.833`,
        'xlearner-consume': `2026-04-02T06:27:54.993Z stdout [XLearner-总消费vv数] start\n2026-04-02T06:34:06.003Z stdout evaluate auc=0.831`,
        'causalforest-active': `2026-04-02T06:38:41.003Z stdout [CausalForest-LT] start\n2026-04-02T06:45:02.884Z stdout evaluate auc=0.822`,
        'causalforest-app': `2026-04-02T06:48:16.110Z stdout [CausalForest-APP使用时长] start\n2026-04-02T06:52:28.990Z stdout evaluate auc=0.817`,
        'causalforest-consume': `2026-04-02T06:55:39.881Z stdout [CausalForest-总消费vv数] start\n2026-04-02T07:01:20.134Z stdout evaluate auc=0.814`,
        'eval-dragonnet': `2026-04-02T07:12:28.339Z stdout [评估-Dragonnet] load model done\n2026-04-02T07:14:29.777Z stdout auc=0.872 cross_entropy=1.24\n2026-04-02T07:15:18.892Z stdout confusion_matrix=[[50312,1432],[7901,18651]]`,
        'eval-app': `2026-04-02T07:22:18.101Z stdout [评估-APP使用时长-Dragonnet] start\n2026-04-02T07:24:41.341Z stdout auc=0.869 f1=0.431\n2026-04-02T07:25:08.208Z stdout report saved`
      };

      groupTitles.forEach((title) => {
        title.addEventListener('click', () => {
          const group = title.getAttribute('data-log-group');
          const list = document.querySelector(`[data-group-list="${group}"]`);
          if (!list) return;

          const isHidden = list.style.display === 'none';
          list.style.display = isHidden ? 'block' : 'none';
          title.querySelector('.arrow').textContent = isHidden ? '⌃' : '⌄';
          title.classList.toggle('active', isHidden);
        });
      });

      logItems.forEach((item) => {
        item.addEventListener('click', () => {
          logItems.forEach((x) => x.classList.remove('active'));
          item.classList.add('active');

          const key = item.getAttribute('data-log-key');
          const groupNode = item.closest('.log-item-list')?.previousElementSibling;
          const groupName = groupNode ? groupNode.textContent.replace('⌃', '').replace('⌄', '').trim() : '日志';
          logTaskTitle.textContent = `${groupName} / ${item.textContent.trim()}`;
          logStream.textContent = logsData[key] || `暂无日志：${item.textContent.trim()}`;
          logStream.scrollTop = 0;
        });
      });
    }

    function initDetailTabs() {
      const tabsRoot = document.getElementById('detail-tabs');
      if (!tabsRoot) return;

      const tabItems = tabsRoot.querySelectorAll('.tab-item');
      const tabContents = document.querySelectorAll('[data-tab-content]');

      tabItems.forEach((tab) => {
        tab.addEventListener('click', () => {
          const tabKey = tab.getAttribute('data-tab');

          tabItems.forEach((item) => item.classList.remove('active'));
          tab.classList.add('active');

          tabContents.forEach((content) => {
            const contentKey = content.getAttribute('data-tab-content');
            if (contentKey === tabKey) {
              content.classList.add('active');
            } else {
              content.classList.remove('active');
            }
          });
        });
      });
    }

    initDetailTabs();
    initFeatureReport();
    initEvaluationReport();
    initPackageProducts();
    initLogsPanel();
