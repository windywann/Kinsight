const params = new URLSearchParams(window.location.search);
    const taskName = params.get('taskName') ? decodeURIComponent(params.get('taskName')) : 'exp6_1119';
    const projectName = params.get('projectName') ? decodeURIComponent(params.get('projectName')) : '社区互动-万赞';
    const username = 'lijiayun03';

    document.title = `Kinsight - ${taskName}`;
    document.getElementById('backLink').href = `../../pages/uplift/uplift-project-detail-demo.html?projectName=${encodeURIComponent(projectName)}`;
    document.getElementById('taskNameValue').textContent = taskName;
    document.getElementById('ownerName').textContent = username;

    function toggleSection(id, titleEl) {
      const el = document.getElementById(id);
      const icon = titleEl.querySelector('.collapse-icon');
      if (!el || !icon) return;
      const hidden = el.style.display === 'none';
      el.style.display = hidden ? (id === 'execInfo' ? 'flex' : 'flex') : 'none';
      icon.textContent = hidden ? '⌃' : '⌄';
    }

    function initTabs() {
      const tabs = Array.from(document.querySelectorAll('.tab-item'));
      const panes = Array.from(document.querySelectorAll('.tab-content'));
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const key = tab.getAttribute('data-tab');
          tabs.forEach((item) => item.classList.toggle('active', item === tab));
          panes.forEach((pane) => pane.classList.toggle('active', pane.getAttribute('data-tab-content') === key));
        });
      });
    }

    function bindSegmented(rootId) {
      const root = document.getElementById(rootId);
      if (!root) return [];
      const buttons = Array.from(root.querySelectorAll('.seg-btn'));
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((item) => item.classList.remove('active'));
          btn.classList.add('active');
        });
      });
      return buttons;
    }

    const importanceData = {
      dragonnet: {
        metrics: ['模型AUUC分数: 0.6038, 随机AUUC分数: 0.6064, 样本量: 4802925', '模型AUUC分数: 0.3665, 随机AUUC分数: 0.6130, 样本量: 4804520'],
        legend: 'APP使用时长-Dragonnet_v1',
        bars: [
          ['active_device_cnt', 0.92], ['app_usage_duration_min', 0.74], ['photo_play_duration_min', 0.58], ['comment_stay_duration_min', 0.46], ['play_duration_sum_min', 0.39], ['play_cnt_sum', 0.33], ['avg_photo_play_cnt', 0.27], ['avg_live_play_cnt', 0.22], ['user_value_score', 0.18], ['coupon_exposure_cnt', 0.14]
        ],
        curves: ['M50,236 L75,224 L100,210 L125,187 L150,182 L175,170 L200,150 L225,148 L250,160 L275,131 L300,118 L325,94 L350,112 L375,90 L400,104 L425,86 L450,162 L475,144 L500,110 L525,126 L550,96', 'M50,236 L75,230 L100,226 L125,220 L150,224 L175,210 L200,198 L225,182 L250,165 L275,176 L300,145 L325,132 L350,122 L375,138 L400,130 L425,210 L450,240 L475,166 L500,82 L525,58 L550,61']
      },
      xlearner: {
        metrics: ['模型AUUC分数: 0.5621, 随机AUUC分数: 0.6064, 样本量: 4802925', '模型AUUC分数: 0.3412, 随机AUUC分数: 0.6130, 样本量: 4804520'],
        legend: 'APP使用时长-XLearner_v2',
        bars: [
          ['play_duration_sum_min', 0.88], ['active_device_cnt', 0.71], ['app_usage_duration_min', 0.62], ['avg_photo_play_cnt', 0.45], ['comment_stay_duration_min', 0.37], ['play_cnt_sum', 0.29], ['coupon_exposure_cnt', 0.24], ['user_value_score', 0.19], ['is_live_user', 0.17], ['retention_score', 0.12]
        ],
        curves: ['M50,236 L75,231 L100,219 L125,202 L150,193 L175,183 L200,171 L225,163 L250,151 L275,139 L300,125 L325,117 L350,103 L375,96 L400,102 L425,92 L450,116 L475,106 L500,92 L525,98 L550,84', 'M50,236 L75,234 L100,230 L125,220 L150,210 L175,200 L200,191 L225,183 L250,170 L275,159 L300,143 L325,138 L350,126 L375,134 L400,121 L425,205 L450,216 L475,148 L500,110 L525,72 L550,68']
      }
    };

    function initModelSwitch() {
      const modelButtons = bindSegmented('modelSwitch');
      const trainMetrics = document.getElementById('trainMetrics');
      const testMetrics = document.getElementById('testMetrics');
      const trainLegendModel = document.getElementById('trainLegendModel');
      const testLegendModel = document.getElementById('testLegendModel');
      const trainCurvePrimary = document.getElementById('trainCurvePrimary');
      const testCurvePrimary = document.getElementById('testCurvePrimary');
      const importanceBars = document.getElementById('importanceBars');

      function renderImportance(modelKey) {
        const rows = importanceData[modelKey].bars.map(([name, score]) => `
          <div class="importance-row">
            <span class="importance-name">${name}</span>
            <span class="importance-bar-area"><span class="importance-bar" style="width:${Math.round(score * 100)}%;"></span></span>
            <span class="importance-score">${score.toFixed(2)}</span>
          </div>
        `).join('');
        importanceBars.innerHTML = rows;
      }

      function applyModel(modelKey) {
        const data = importanceData[modelKey];
        trainMetrics.textContent = data.metrics[0];
        testMetrics.textContent = data.metrics[1];
        trainLegendModel.textContent = data.legend;
        testLegendModel.textContent = data.legend;
        trainCurvePrimary.setAttribute('d', data.curves[0]);
        testCurvePrimary.setAttribute('d', data.curves[1]);
        renderImportance(modelKey);
      }

      modelButtons.forEach((btn) => {
        btn.addEventListener('click', () => applyModel(btn.getAttribute('data-model')));
      });

      applyModel('dragonnet');
    }

    function initLogs() {
      const groupTitles = Array.from(document.querySelectorAll('.log-group-title'));
      const logItems = Array.from(document.querySelectorAll('.log-item'));
      const logTitle = document.getElementById('logTitle');
      const logStream = document.getElementById('logStream');
      const logMap = {
        'preprocess-main': '2025-11-19T14:20:07.112Z stdout load ab data source: brightness_ad_2\n2025-11-19T14:20:12.941Z stdout sample_count=4802925 target=app_usage_duration_min\n2025-11-19T14:23:18.412Z stdout build uplift training dataset success\n2025-11-19T14:31:49.822Z stdout join external features success\n2025-11-19T14:43:56.113Z stdout write dataset to hive path /tmp/uplift/exp6_1119/trainset\n2025-11-19T14:44:01.008Z stdout preprocess finished',
        'train-dragonnet': '2025-11-19T14:48:09.223Z stdout start training DragonNet_large\n2025-11-19T14:53:10.339Z stdout epoch=5 train_loss=1.284 val_loss=1.339\n2025-11-19T15:06:42.881Z stdout uplift_auuc=0.6038\n2025-11-19T15:26:07.228Z stdout export model success',
        'train-xlearner': '2025-11-19T14:48:11.903Z stdout start training XLearner_small\n2025-11-19T14:58:03.118Z stdout feature pipeline finished\n2025-11-19T15:18:15.534Z stdout uplift_auuc=0.5621\n2025-11-19T15:26:01.004Z stdout export model success',
        'eval-dragonnet': '2025-11-19T15:24:13.661Z stdout evaluate DragonNet_large\n2025-11-19T15:30:45.115Z stdout train_auuc=0.6038 test_auuc=0.3665\n2025-11-19T15:44:07.004Z stdout evaluation report saved',
        'eval-xlearner': '2025-11-19T15:24:18.122Z stdout evaluate XLearner_small\n2025-11-19T15:33:45.991Z stdout train_auuc=0.5621 test_auuc=0.3412\n2025-11-19T15:42:12.884Z stdout evaluation report saved',
        'predict-main': '2025-11-20T19:11:20.661Z stdout start predict with DragonNet_large\n2025-11-20T19:18:44.009Z stdout selected_population=614978\n2025-11-20T19:27:14.100Z stdout upload package success\n2025-11-20T19:30:08.341Z stdout predict finished'
      };

      groupTitles.forEach((title) => {
        title.addEventListener('click', () => {
          const group = title.getAttribute('data-log-group');
          const list = document.querySelector(`[data-group-list="${group}"]`);
          if (!list) return;
          const hidden = list.style.display === 'none';
          list.style.display = hidden ? 'block' : 'none';
          title.querySelector('span').textContent = hidden ? '⌃' : '⌄';
        });
      });

      logItems.forEach((item) => {
        item.addEventListener('click', () => {
          logItems.forEach((node) => node.classList.remove('active'));
          item.classList.add('active');
          const key = item.getAttribute('data-log-key');
          const groupNode = item.closest('.log-item-list')?.previousElementSibling;
          const groupName = groupNode ? groupNode.textContent.replace('⌃', '').replace('⌄', '').trim() : '日志';
          logTitle.textContent = `${groupName} / ${item.textContent.trim()}`;
          logStream.textContent = logMap[key] || '暂无日志';
        });
      });
    }

    bindSegmented('targetSwitch');
    bindSegmented('directionSwitch');
    initTabs();
    initModelSwitch();
    initLogs();
