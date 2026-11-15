// =========================================================================
// Main Application Logic: Modules 1–7, Chart.js, Scroll-Spy & UX Controls
// =========================================================================

function applyChartTheme(chart, c) {
  if (!chart) return;
  if (chart.options.plugins?.legend?.labels) {
    chart.options.plugins.legend.labels.color = c.legend;
  }
  if (chart.options.plugins?.tooltip) {
    chart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
    chart.options.plugins.tooltip.titleColor = c.tooltipTitle;
    chart.options.plugins.tooltip.bodyColor = c.tooltipBody;
    chart.options.plugins.tooltip.borderColor = c.tooltipBorder;
  }
  ['x', 'y'].forEach(axis => {
    const sc = chart.options.scales?.[axis];
    if (!sc) return;
    if (sc.ticks) sc.ticks.color = c.tick;
    if (sc.grid) sc.grid.color = c.grid;
    if (sc.title) sc.title.color = c.title;
  });
  chart.update();
}

// =========================================================================
// Module 1: 4-Pillar Translational Bottleneck Explorer
// =========================================================================
function initBottlenecksModule() {
  const tabsEl = document.getElementById('bottleneck-tabs');
  const detailEl = document.getElementById('bottleneck-detail');
  let selectedId = bottlenecksThai[0].id;

  function render() {
    const list = currentLang === 'en' ? bottlenecksEn : bottlenecksThai;
    tabsEl.innerHTML = list.map(item => {
      const isActive = item.id === selectedId;
      return `<button data-id="${item.id}" class="text-left p-4 rounded-xl border transition ${
        isActive
          ? 'bg-teal-50 border-[#0d9488] text-[#0f172a] shadow-xs'
          : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50'
      }">
        <div class="text-xs font-medium ${isActive ? 'text-[#0f766e]' : 'text-[#64748b]'}">${item.pillar}</div>
        <div class="text-sm font-medium mt-1 leading-snug text-[#0f172a]">${item.title}</div>
      </button>`;
    }).join('');

    const activeItem = list.find(b => b.id === selectedId);
    detailEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-200">
          <h4 class="text-base font-medium text-[#0f172a]">${activeItem.title}</h4>
          <span class="formula-pill self-start">${activeItem.subtitle}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div class="bg-white border border-amber-200 rounded-xl p-5">
            <div class="inline-block px-2.5 py-0.5 rounded bg-[#fef3c7] text-[#d97706] text-xs font-medium mb-2.5">${t('⚠️ กลไกข้อจำกัดทางวิศวกรรม', '⚠️ Engineering Bottleneck Mechanism')}</div>
            <p class="read-card-text text-[#334155]">${activeItem.problem}</p>
          </div>
          <div class="bg-white border border-teal-200 rounded-xl p-5">
            <div class="inline-block px-2.5 py-0.5 rounded bg-teal-50 text-[#0f766e] text-xs font-medium mb-2.5">${t('✅ แนวทางแก้ไขและนวัตกรรม', '✅ Proven Solutions & Innovations')}</div>
            <p class="read-card-text text-[#334155]">${activeItem.solution}</p>
          </div>
        </div>
      </div>
    `;

    tabsEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedId = btn.getAttribute('data-id');
        render();
      });
    });
  }
  render();
  i18nRefreshHooks.push(render);
}

// =========================================================================
// Module 2: FSCV Physics Simulator & 7 Electrochemical Modalities
// =========================================================================
let fscvRawChart = null;
let fscvSubChart = null;

function computeFscvWaveforms(scanRate, cdl, conc) {
  const steps = 120;
  const sweepLabels = [];
  const bgSeries = [];
  const totalSeries = [];
  const cvLoopPoints = [];

  const peakOx = 13.0 * (conc / 1000.0) * Math.sqrt(scanRate / 400.0);
  const peakRed = -0.62 * peakOx;
  const ibgNominal = cdl * scanRate;

  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    let potential, direction;
    if (frac <= 0.5) {
      potential = -0.4 + (frac / 0.5) * 1.7;
      direction = 1;
    } else {
      potential = 1.3 - ((frac - 0.5) / 0.5) * 1.7;
      direction = -1;
    }

    sweepLabels.push(potential.toFixed(2) + ' V');

    let iFaradaic = 0;
    if (direction === 1) {
      iFaradaic = peakOx * Math.exp(-Math.pow((potential - 0.60) / 0.16, 2));
    } else {
      iFaradaic = peakRed * Math.exp(-Math.pow((potential - (-0.20)) / 0.18, 2));
    }

    const rcTurn = direction === 1
      ? (1 - Math.exp(-(potential - (-0.4)) / 0.07))
      : -(1 - Math.exp(-(1.3 - potential) / 0.07));
    const iCap = ibgNominal * rcTurn * (1 + 0.12 * (potential + 0.4));

    bgSeries.push(Number(iCap.toFixed(2)));
    totalSeries.push(Number((iCap + iFaradaic).toFixed(2)));
    cvLoopPoints.push({
      x: Number(potential.toFixed(3)),
      y: Number(iFaradaic.toFixed(3))
    });
  }

  return { sweepLabels, bgSeries, totalSeries, cvLoopPoints, peakOx, ibgNominal };
}

function initFscvSimulatorModule() {
  const sliderRate = document.getElementById('input-scan-rate');
  const sliderCdl = document.getElementById('input-cdl');
  const sliderConc = document.getElementById('input-conc');
  const c = getChartThemeColors();

  const ctxRaw = document.getElementById('fscvRawChart').getContext('2d');
  fscvRawChart = new Chart(ctxRaw, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.10)',
          borderWidth: 2.2,
          pointRadius: 0,
          fill: true,
          tension: 0.25
        },
        {
          label: '',
          data: [],
          borderColor: '#d97706',
          borderDash: [5, 4],
          borderWidth: 1.8,
          pointRadius: 0,
          fill: false,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { font: { size: 11 }, boxWidth: 12, color: c.legend } },
        tooltip: {
          backgroundColor: c.tooltipBg,
          titleColor: c.tooltipTitle,
          bodyColor: c.tooltipBody,
          borderColor: c.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            title: (items) => t(`ศักย์ไฟฟ้ากวาด: ${items[0].label}`, `Sweep Potential: ${items[0].label}`),
            label: (item) => `${item.dataset.label}: ${item.parsed.y} nA`
          }
        }
      },
      scales: {
        x: {
          ticks: { maxTicksLimit: 7, font: { size: 10 }, color: c.tick },
          grid: { color: c.grid },
          title: { display: true, text: '', font: { size: 10 }, color: c.title }
        },
        y: {
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid },
          title: { display: true, text: '', font: { size: 10 }, color: c.title }
        }
      }
    }
  });

  const ctxSub = document.getElementById('fscvSubChart').getContext('2d');
  fscvSubChart = new Chart(ctxSub, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '',
        data: [],
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.14)',
        borderWidth: 2.5,
        showLine: true,
        pointRadius: 0,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { size: 11 }, boxWidth: 12, color: c.legend } },
        tooltip: {
          backgroundColor: c.tooltipBg,
          titleColor: c.tooltipTitle,
          bodyColor: c.tooltipBody,
          borderColor: c.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (ctx) => t(
              `ศักย์ไฟฟ้า: ${ctx.parsed.x.toFixed(2)} V | กระแสสุทธิ: ${ctx.parsed.y.toFixed(2)} nA`,
              `Potential: ${ctx.parsed.x.toFixed(2)} V | Net Current: ${ctx.parsed.y.toFixed(2)} nA`
            )
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          min: -0.45,
          max: 1.35,
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid },
          title: { display: true, text: '', font: { size: 10 }, color: c.title }
        },
        y: {
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid },
          title: { display: true, text: '', font: { size: 10 }, color: c.title }
        }
      }
    }
  });

  function updateSimulator() {
    const rate = Number(sliderRate.value);
    const cdl = Number(sliderCdl.value);
    const conc = Number(sliderConc.value);

    document.getElementById('label-scan-rate').textContent = `${rate} V/s`;
    document.getElementById('label-cdl').textContent = `${cdl.toFixed(1)} nF`;
    document.getElementById('label-conc').textContent = `${conc} nM`;

    const res = computeFscvWaveforms(rate, cdl, conc);
    const sbr = res.ibgNominal > 0 ? (res.peakOx / res.ibgNominal) * 100 : 0;
    const activeSweepMs = (3.4 / rate) * 1000;
    const dutyCyclePct = (activeSweepMs / 100.0) * 100;

    document.getElementById('metric-sweep-time').textContent = `${activeSweepMs.toFixed(2)} ms`;
    document.getElementById('metric-duty-cycle').textContent = `${dutyCyclePct.toFixed(1)}%`;
    document.getElementById('metric-ibg').textContent = `${res.ibgNominal.toFixed(1)} nA`;
    document.getElementById('metric-ip').textContent = `${res.peakOx.toFixed(2)} nA`;
    document.getElementById('metric-sbr').textContent = `${sbr.toFixed(2)}%`;

    fscvRawChart.data.labels = res.sweepLabels;
    fscvRawChart.data.datasets[0].data = res.totalSeries;
    fscvRawChart.data.datasets[0].label = t('กระแสรวม (I_total = I_BG + I_redox)', 'Total Current (I_total = I_BG + I_redox)');
    fscvRawChart.data.datasets[1].data = res.bgSeries;
    fscvRawChart.data.datasets[1].label = t('กระแสพื้นหลัง (I_BG = C_dl · v)', 'Background Current (I_BG = C_dl · v)');
    fscvRawChart.options.scales.x.title.text = t('ศักย์ไฟฟ้าตลอดคาบการกวาด (-0.4 V → +1.3 V → -0.4 V)', 'Sweep Potential (-0.4 V → +1.3 V → -0.4 V)');
    fscvRawChart.options.scales.y.title.text = t('กระแสไฟฟ้า (nA)', 'Current (nA)');
    fscvRawChart.update();

    fscvSubChart.data.datasets[0].data = res.cvLoopPoints;
    fscvSubChart.data.datasets[0].label = t('CV หลังหักพื้นหลัง (Dopamine Redox Loop)', 'Background-Subtracted CV (Dopamine Redox Loop)');
    fscvSubChart.options.scales.x.title.text = t('ศักย์ไฟฟ้าเทียบกับ Ag/AgCl (V)', 'Potential vs. Ag/AgCl (V)');
    fscvSubChart.options.scales.y.title.text = t('กระแสฟาราเดอิกสุทธิ I_redox (nA)', 'Net Faradaic Current I_redox (nA)');
    fscvSubChart.update();
  }

  sliderRate.addEventListener('input', updateSimulator);
  sliderCdl.addEventListener('input', updateSimulator);
  sliderConc.addEventListener('input', updateSimulator);
  updateSimulator();
  i18nRefreshHooks.push(updateSimulator);
  themeRefreshHooks.push(tc => {
    applyChartTheme(fscvRawChart, tc);
    applyChartTheme(fscvSubChart, tc);
  });
}

function initModalitiesTable() {
  const tbody = document.getElementById('modality-table-body');
  const buttons = document.querySelectorAll('.mod-btn');
  let currentFilter = 'all';

  function renderTable() {
    const source = currentLang === 'en' ? modalitiesEn : modalitiesThai;
    const list = currentFilter === 'all'
      ? source
      : source.filter(m => m.mode === currentFilter);

    tbody.innerHTML = list.map(m => {
      const badgeClass = m.mode === 'Phasic + Tonic'
        ? 'bg-teal-50 text-[#0f766e] border-teal-200'
        : m.mode === 'Tonic'
          ? 'bg-[#fef3c7] text-[#d97706] border-amber-200'
          : 'bg-sky-50 text-[#0284c7] border-sky-200';
      return `<tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4 font-medium text-[#0f172a]">${m.name}</td>
        <td class="py-3.5 px-4"><span class="px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}">${m.mode}</span></td>
        <td class="py-3.5 px-4 text-[#334155]">${m.waveform}</td>
        <td class="py-3.5 px-4 font-mono-tech text-[#0f766e] font-medium">${m.resolution}</td>
        <td class="py-3.5 px-4 text-[#334155]">${m.selectivity}</td>
        <td class="py-3.5 px-4 text-[#64748b]">${m.limitation}</td>
      </tr>`;
    }).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter');
      buttons.forEach(b => {
        b.className = b === btn
          ? 'mod-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0d9488] text-white transition'
          : 'mod-btn px-3 py-1.5 rounded-lg text-xs font-normal bg-[#f1f5f9] text-[#334155] hover:bg-teal-50 border border-slate-200 transition';
      });
      renderTable();
    });
  });
  renderTable();
  i18nRefreshHooks.push(renderTable);
}

// =========================================================================
// Module 3: Electrode Materials Benchmark & 7-Class Inspector
// =========================================================================
function initMaterialsModule() {
  const ctx = document.getElementById('materialBenchmarkChart').getContext('2d');
  const btnLod = document.getElementById('btn-toggle-lod');
  const btnSens = document.getElementById('btn-toggle-sens');
  const captionEl = document.getElementById('material-benchmark-caption');
  const c = getChartThemeColors();
  let matMode = 'lod';

  const lodData = {
    labels: [
      'PEDOT-CNT (SWV)',
      'PEI-CNT Fiber',
      'µIP-CFM Probe',
      'CNT Yarn (CNTYM)',
      'GR-FeTSPc (DPV)',
      'AuNP (CA)',
      'W/BDD (DPV)',
      'Solid BDD (FSCV)'
    ],
    values: [2.03, 5.0, 5.7, 13.0, 20.0, 50.0, 50.0, 200.0],
    color: '#0d9488'
  };

  const sensData = {
    values: [46.0, 14.2, 13.0, 1.7],
    color: '#0284c7'
  };

  const matChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lodData.labels,
      datasets: [{
        label: '',
        data: lodData.values,
        backgroundColor: lodData.color,
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { size: 11 }, color: c.legend } },
        tooltip: {
          backgroundColor: c.tooltipBg,
          titleColor: c.tooltipTitle,
          bodyColor: c.tooltipBody,
          borderColor: c.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (item) => `${item.parsed.x} ${matMode === 'lod' ? 'nM' : 'nA/µM'}`
          }
        }
      },
      scales: {
        x: { beginAtZero: true, ticks: { font: { size: 10 }, color: c.tick }, grid: { color: c.grid } },
        y: { ticks: { font: { size: 10 }, color: c.legend }, grid: { display: false } }
      }
    }
  });

  function renderMaterialBenchmark() {
    if (matMode === 'lod') {
      btnLod.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0d9488] text-white transition';
      btnSens.className = 'px-3 py-1.5 rounded-lg text-xs font-normal text-[#334155] hover:text-[#0f172a] transition';
      matChart.data.labels = lodData.labels;
      matChart.data.datasets[0].label = t('ขีดจำกัดการตรวจวัดต่ำสุด LoD (nM — ยิ่งต่ำยิ่งดี)', 'Limit of Detection LoD (nM — Lower is Better)');
      matChart.data.datasets[0].data = lodData.values;
      matChart.data.datasets[0].backgroundColor = lodData.color;
      captionEl.innerHTML = t(
        `<span class="text-[#0f766e] font-medium">ข้อค้นพบสำคัญ:</span> การเคลือบ <span class="formula-pill">PEDOT-CNT</span> ร่วมกับ SWV ให้ค่า <span class="font-mono-tech font-medium">LoD = 2.03 nM</span> รองลงมาคือ <span class="formula-pill">PEI-CNT (5 nM)</span> และหัวตรวจ <span class="formula-pill">µIP-CFM (5.7 nM)</span>`,
        `<span class="text-[#0f766e] font-medium">Key Finding:</span> <span class="formula-pill">PEDOT-CNT</span> with SWV achieves <span class="font-mono-tech font-medium">LoD = 2.03 nM</span>, followed by <span class="formula-pill">PEI-CNT (5 nM)</span> and <span class="formula-pill">µIP-CFM (5.7 nM)</span>.`
      );
    } else {
      btnSens.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0284c7] text-white transition';
      btnLod.className = 'px-3 py-1.5 rounded-lg text-xs font-normal text-[#334155] hover:text-[#0f172a] transition';
      matChart.data.labels = [
        'PEDOT:Nafion',
        'Tyrosinase/CeO₂/TiO₂',
        t('Bare CFME (มาตรฐาน)', 'Bare CFME (Standard)'),
        t('Bare CFME (ภาวะพาร์กินสัน)', 'Bare CFME (Parkinsonian)')
      ];
      matChart.data.datasets[0].label = t('ความไวในการตรวจวัด Sensitivity (nA/µM — ยิ่งสูงยิ่งดี)', 'Sensitivity (nA/µM — Higher is Better)');
      matChart.data.datasets[0].data = sensData.values;
      matChart.data.datasets[0].backgroundColor = sensData.color;
      captionEl.innerHTML = t(
        `<span class="text-[#0284c7] font-medium">การเพิ่มความไวสัญญาณ:</span> การเคลือบ <span class="formula-pill">PEDOT:Nafion</span> เพิ่มความไวเป็น <span class="font-mono-tech font-medium">46 nA/µM</span> เทียบกับ <span class="font-mono-tech">13 nA/µM</span> ของ Bare CFME ส่วนเอนไซม์ <span class="formula-pill">Tyrosinase/CeO₂/TiO₂</span> เพิ่มความไวจาก <span class="font-mono-tech">1.7</span> เป็น <span class="font-mono-tech">14.2 nA/µM</span>`,
        `<span class="text-[#0284c7] font-medium">Sensitivity Boost:</span> <span class="formula-pill">PEDOT:Nafion</span> increases sensitivity to <span class="font-mono-tech font-medium">46 nA/µM</span> vs. <span class="font-mono-tech">13 nA/µM</span> for Bare CFME, while <span class="formula-pill">Tyrosinase/CeO₂/TiO₂</span> lifts Parkinsonian sensitivity from <span class="font-mono-tech">1.7</span> to <span class="font-mono-tech">14.2 nA/µM</span>.`
      );
    }
    matChart.update();
  }

  btnLod.addEventListener('click', () => { matMode = 'lod'; renderMaterialBenchmark(); });
  btnSens.addEventListener('click', () => { matMode = 'sens'; renderMaterialBenchmark(); });

  const gridEl = document.getElementById('material-cards-grid');
  const boxEl = document.getElementById('material-inspector-box');
  let activeMatId = materialsCardsData[0].id;

  function renderCards() {
    const list = currentLang === 'en' ? materialsCardsDataEn : materialsCardsData;
    gridEl.innerHTML = list.map(m => {
      const active = m.id === activeMatId;
      return `<button data-id="${m.id}" class="text-left p-3.5 rounded-xl border transition ${
        active
          ? 'bg-teal-50 border-[#0d9488] text-[#0f172a] shadow-xs'
          : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50'
      }">
        <div class="text-[11px] font-normal ${active ? 'text-[#0f766e]' : 'text-[#64748b]'}">${m.tag}</div>
        <div class="text-sm font-medium mt-0.5 text-[#0f172a]">${m.name}</div>
      </button>`;
    }).join('');

    const item = list.find(m => m.id === activeMatId);
    boxEl.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 read-card-text">
        <div class="space-y-2">
          <div class="text-base font-medium text-[#0f172a]">${item.name}</div>
          <p class="text-[#334155]"><strong class="text-[#0f766e]">${t('ขีดจำกัดการตรวจวัด (LoD):', 'Limit of Detection (LoD):')}</strong> <span class="font-mono-tech">${item.lod}</span></p>
          <p class="text-[#334155]"><strong class="text-[#0284c7]">${t('ความไว (Sensitivity):', 'Sensitivity:')}</strong> ${item.sensitivity}</p>
        </div>
        <div class="space-y-2">
          <p class="text-[#334155]"><strong class="text-[#4f46e5]">${t('ความจำเพาะเจาะจง (Selectivity):', 'Selectivity:')}</strong> ${item.selectivity}</p>
          <p class="text-[#334155]"><strong class="text-[#0f172a]">${t('เสถียรภาพและข้อพิจารณา:', 'Stability & Considerations:')}</strong> ${item.stability}</p>
        </div>
      </div>
    `;

    gridEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeMatId = btn.getAttribute('data-id');
        renderCards();
      });
    });
  }

  renderMaterialBenchmark();
  renderCards();
  i18nRefreshHooks.push(() => {
    renderMaterialBenchmark();
    renderCards();
  });
  themeRefreshHooks.push(tc => applyChartTheme(matChart, tc));
}

// =========================================================================
// Module 4: CMOS Potentiostat, Noise Calculator & Topology Selector
// =========================================================================
function initCmosModule() {
  const ctxScatter = document.getElementById('cmosTradeoffChart').getContext('2d');
  const colors = ['#0d9488', '#d97706', '#0284c7', '#4f46e5', '#0f766e', '#6366f1'];
  const c = getChartThemeColors();

  const cmosScatterChart = new Chart(ctxScatter, {
    type: 'bubble',
    data: {
      datasets: cmosArchitecturesThai.map((arch, i) => ({
        label: arch.name,
        data: [{ x: arch.xArea, y: arch.yNoise, r: arch.rBubble }],
        backgroundColor: colors[i] + 'bf',
        borderColor: colors[i],
        borderWidth: 1.5
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10, color: c.legend } },
        tooltip: {
          backgroundColor: c.tooltipBg,
          titleColor: c.tooltipTitle,
          bodyColor: c.tooltipBody,
          borderColor: c.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (ctx) => t(
              `${ctx.dataset.label}: พื้นที่ ${ctx.raw.x} mm² | สัญญาณรบกวน ${ctx.raw.y} pArms`,
              `${ctx.dataset.label}: Area ${ctx.raw.x} mm² | Noise ${ctx.raw.y} pArms`
            )
          }
        }
      },
      scales: {
        x: {
          type: 'logarithmic',
          title: { display: true, text: '', font: { size: 10 }, color: c.title },
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid }
        },
        y: {
          type: 'logarithmic',
          title: { display: true, text: '', font: { size: 10 }, color: c.title },
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid }
        }
      }
    }
  });

  const sCdl = document.getElementById('calc-slider-cdl');
  const sIbias = document.getElementById('calc-slider-ibias');
  const sVnop = document.getElementById('calc-slider-vnop');

  const ctxBreakdown = document.getElementById('noiseBreakdownChart').getContext('2d');
  const breakdownChart = new Chart(ctxBreakdown, {
    type: 'bar',
    data: {
      labels: [''],
      datasets: [
        {
          label: 'Shot Noise 2q(I_CMR + I_CC)',
          data: [26.5],
          backgroundColor: '#0284c7',
          borderRadius: 4
        },
        {
          label: 'C_dl-Coupled Opamp Noise (v_n,op)',
          data: [28.9],
          backgroundColor: '#d97706',
          borderRadius: 4
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10, color: c.legend } },
        tooltip: {
          backgroundColor: c.tooltipBg,
          titleColor: c.tooltipTitle,
          bodyColor: c.tooltipBody,
          borderColor: c.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)} pArms`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          max: 160,
          title: { display: true, text: '', font: { size: 10 }, color: c.title },
          ticks: { font: { size: 10 }, color: c.tick },
          grid: { color: c.grid }
        },
        y: {
          stacked: true,
          ticks: { font: { size: 10 }, color: c.legend },
          grid: { display: false }
        }
      }
    }
  });

  function updateNoiseCalculator() {
    const cdl = Number(sCdl.value);
    const ibias = Number(sIbias.value);
    const vnop = Number(sVnop.value);

    document.getElementById('calc-label-cdl').textContent = `${cdl.toFixed(1)} nF`;
    document.getElementById('calc-label-ibias').textContent = `${ibias} nA`;
    document.getElementById('calc-label-vnop').textContent = `${vnop} nV/√Hz`;

    const shotNoise = 26.5 * Math.sqrt(ibias / 200.0);
    const capNoise = 28.9 * (cdl / 1.0) * (vnop / 40.0);
    const totalNoise = Math.sqrt(shotNoise * shotNoise + capNoise * capNoise);
    const drDb = 83.0 - 20.0 * Math.log10(totalNoise / 39.21);

    document.getElementById('calc-out-shot').textContent = `${shotNoise.toFixed(1)} pA`;
    document.getElementById('calc-out-cap').textContent = `${capNoise.toFixed(1)} pA`;
    document.getElementById('calc-out-total').innerHTML = `${totalNoise.toFixed(1)} pA<sub>rms</sub>`;
    document.getElementById('calc-out-dr').textContent = `${drDb.toFixed(1)} dB`;

    breakdownChart.data.labels = [t('องค์ประกอบสัญญาณรบกวน (pArms)', 'Noise Components (pArms)')];
    breakdownChart.options.scales.x.title.text = t('ขนาดองค์ประกอบสัญญาณรบกวน (pArms)', 'Noise Component Magnitude (pArms)');
    breakdownChart.data.datasets[0].data = [Number(shotNoise.toFixed(2))];
    breakdownChart.data.datasets[1].data = [Number(capNoise.toFixed(2))];
    breakdownChart.update();

    cmosScatterChart.options.scales.x.title.text = t(
      'พื้นที่ซิลิคอนต่อช่องสัญญาณ / ชิป (mm², สเกลลอการิทึม)',
      'Silicon Area per Channel / Die (mm², Log Scale)'
    );
    cmosScatterChart.options.scales.y.title.text = t(
      'สัญญาณรบกวนขาเข้า Input-Referred Noise (pArms, สเกลลอการิทึม)',
      'Input-Referred Noise (pArms, Log Scale)'
    );
    cmosScatterChart.update();
  }

  sCdl.addEventListener('input', updateNoiseCalculator);
  sIbias.addEventListener('input', updateNoiseCalculator);
  sVnop.addEventListener('input', updateNoiseCalculator);
  updateNoiseCalculator();

  const topoTabs = document.getElementById('topology-tabs');
  const topoDetail = document.getElementById('topology-detail');
  let activeTopo = topologiesThai[0].id;

  function renderTopology() {
    const list = currentLang === 'en' ? topologiesEn : topologiesThai;
    topoTabs.innerHTML = list.map(tItem => {
      const active = tItem.id === activeTopo;
      return `<button data-id="${tItem.id}" class="text-left p-3.5 rounded-xl border transition ${
        active
          ? 'bg-indigo-50 border-[#4f46e5] text-[#0f172a] shadow-xs'
          : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50'
      }">
        <div class="text-sm font-medium text-[#0f172a]">${tItem.name}</div>
        <div class="text-xs mt-0.5 ${active ? 'text-[#4f46e5]' : 'text-[#64748b]'}">${tItem.badge}</div>
      </button>`;
    }).join('');

    const item = list.find(tItem => tItem.id === activeTopo);
    topoDetail.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 read-card-text">
        <div class="bg-white border border-teal-200 rounded-xl p-4">
          <div class="font-medium text-[#0f766e] mb-1.5">${t('✅ จุดเด่นทางสถาปัตยกรรม', '✅ Architectural Strengths')}</div>
          <p>${item.pros}</p>
        </div>
        <div class="bg-white border border-amber-200 rounded-xl p-4">
          <div class="font-medium text-[#d97706] mb-1.5">${t('⚠️ ข้อจำกัดและความท้าทาย', '⚠️ Limitations & Challenges')}</div>
          <p>${item.cons}</p>
        </div>
      </div>
    `;

    topoTabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTopo = btn.getAttribute('data-id');
        renderTopology();
      });
    });
  }
  renderTopology();

  const tbody = document.getElementById('cmos-table-body');
  function renderCmosTable() {
    const list = currentLang === 'en' ? cmosArchitecturesEn : cmosArchitecturesThai;
    tbody.innerHTML = list.map(ch => `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4 font-medium text-[#0f172a]">${ch.name}</td>
        <td class="py-3.5 px-4 font-mono-tech text-[#4f46e5]">${ch.process}</td>
        <td class="py-3.5 px-4 text-[#334155]">${ch.topology}</td>
        <td class="py-3.5 px-4 font-mono-tech text-[#0f766e]">${ch.noise}</td>
        <td class="py-3.5 px-4 text-[#334155]">${ch.dr}</td>
        <td class="py-3.5 px-4 font-mono-tech text-[#0284c7]">${ch.powerArea}</td>
      </tr>
    `).join('');
  }
  renderCmosTable();

  i18nRefreshHooks.push(() => {
    updateNoiseCalculator();
    renderTopology();
    renderCmosTable();
  });
  themeRefreshHooks.push(tc => {
    applyChartTheme(cmosScatterChart, tc);
    applyChartTheme(breakdownChart, tc);
  });
}

// =========================================================================
// Module 5: Clinical Applications, Closed-Loop DBS & Research Report Copy
// =========================================================================
function initClinicalAndDbsModule() {
  const clinBtns = document.querySelectorAll('.clin-btn');
  const clinPanel = document.getElementById('clinical-domain-panel');
  let activeDomain = 'chemometrics';

  function renderClinicalDomain() {
    const d = (currentLang === 'en' ? clinicalDomainsEn : clinicalDomainsThai)[activeDomain];
    clinPanel.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <h3 class="text-base sm:text-lg font-medium text-[#0f172a]">${d.title}</h3>
          <span class="formula-pill self-start">${d.badge}</span>
        </div>
        <p class="read-body text-[#334155]">${d.summary}</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          ${d.points.map(pt => `
            <div class="bg-white border border-slate-200 rounded-xl p-5 read-card-text text-[#334155]">
              ${pt}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  clinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeDomain = btn.getAttribute('data-domain');
      clinBtns.forEach(b => {
        b.className = b === btn
          ? 'clin-btn px-3.5 py-2 rounded-xl text-xs font-medium bg-[#0d9488] text-white transition'
          : 'clin-btn px-3.5 py-2 rounded-xl text-xs font-normal bg-[#f1f5f9] text-[#334155] hover:bg-teal-50 border border-slate-200 transition';
      });
      renderClinicalDomain();
    });
  });
  renderClinicalDomain();

  const stepsContainer = document.getElementById('dbs-pipeline-steps');
  const stepDetailEl = document.getElementById('dbs-step-detail');
  let activeStepIdx = 0;

  function renderDbsSteps() {
    const list = currentLang === 'en' ? dbsPipelineDataEn : dbsPipelineData;
    stepsContainer.innerHTML = list.map((s, idx) => {
      const active = idx === activeStepIdx;
      return `<button data-idx="${idx}" class="text-left p-4 rounded-xl border transition flex flex-col justify-between ${
        active
          ? 'bg-indigo-50 border-[#4f46e5] text-[#0f172a] shadow-xs'
          : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50'
      }">
        <div class="font-mono-tech text-xs ${active ? 'text-[#4f46e5]' : 'text-[#64748b]'}">${s.step}</div>
        <div class="text-sm font-medium mt-1 text-[#0f172a]">${s.title}</div>
      </button>`;
    }).join('');

    const st = list[activeStepIdx];
    stepDetailEl.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div class="text-base font-medium text-[#0f172a]">${st.step}: ${st.title}</div>
        <span class="formula-pill-indigo self-start">${st.spec}</span>
      </div>
      <p class="read-body text-[#334155] mt-3">${st.detail}</p>
    `;

    stepsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeStepIdx = Number(btn.getAttribute('data-idx'));
        renderDbsSteps();
      });
    });
  }
  renderDbsSteps();

  const freqSlider = document.getElementById('dbs-freq-slider');
  const pwSlider = document.getElementById('dbs-pw-slider');

  function updateDbsExplorer() {
    const freq = Number(freqSlider.value);
    const pw = Number(pwSlider.value);

    document.getElementById('dbs-freq-label').textContent = `${freq} Hz`;
    document.getElementById('dbs-pw-label').textContent = `${pw.toFixed(2)} ms`;

    const freqFactor = Math.exp(-Math.pow((freq - 100) / 65, 2));
    const pwFactor = Math.min(1.25, 0.35 + 0.65 * Math.sqrt(pw / 1.0));
    const evokedDa = Math.round(245 * freqFactor * pwFactor);
    const tonicRestore = Math.min(99.5, Math.max(42.0, 97.2 * freqFactor * Math.min(1.03, pwFactor))).toFixed(1);
    const chargeIndex = (pw / 1.0).toFixed(2);

    document.getElementById('dbs-out-da').textContent = `${evokedDa} nM`;
    document.getElementById('dbs-out-tonic').textContent = `${tonicRestore}%`;
    document.getElementById('dbs-out-charge').textContent = `${chargeIndex}×`;

    const effEl = document.getElementById('dbs-out-eff');
    if (freq >= 85 && freq <= 120 && pw >= 0.6 && pw <= 1.3) {
      effEl.textContent = t('เหมาะสมสูงสุด (Optimal)', 'Optimal Efficiency');
      effEl.className = 'font-mono-tech text-sm font-medium text-[#0f766e] mt-1';
    } else if (freq > 145 || pw > 1.5) {
      effEl.textContent = t('ใช้พลังงานสูง (Over-Stimulation)', 'High Power (Over-Stimulation)');
      effEl.className = 'font-mono-tech text-sm font-medium text-[#d97706] mt-1';
    } else {
      effEl.textContent = t('กระตุ้นระดับต่ำ (Sub-Threshold)', 'Sub-Threshold Stimulation');
      effEl.className = 'font-mono-tech text-sm font-medium text-[#0284c7] mt-1';
    }
  }

  freqSlider.addEventListener('input', updateDbsExplorer);
  pwSlider.addEventListener('input', updateDbsExplorer);
  updateDbsExplorer();

  i18nRefreshHooks.push(() => {
    renderClinicalDomain();
    renderDbsSteps();
    updateDbsExplorer();
  });

  const copyBtn = document.getElementById('btn-copy-research');
  const copyToast = document.getElementById('copy-toast');
  copyBtn.addEventListener('click', () => {
    const text = document.getElementById('thai-research-text').innerText;
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    tempArea.style.position = 'fixed';
    tempArea.style.opacity = '0';
    document.body.appendChild(tempArea);
    tempArea.select();
    try {
      document.execCommand('copy');
      copyToast.classList.remove('hidden');
      setTimeout(() => copyToast.classList.add('hidden'), 3500);
    } catch (err) {
      copyToast.textContent = t(
        '⚠️ ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาเลือกข้อความด้านล่างเพื่อคัดลอก',
        '⚠️ Auto-copy failed. Please select the text below manually.'
      );
      copyToast.classList.remove('hidden');
    }
    document.body.removeChild(tempArea);
  });
}

// =========================================================================
// Module 6: Interactive 6-Scenario IRL Deployment Explorer
// =========================================================================
function initIrlApplicationsModule() {
  const gridEl = document.getElementById('irl-scenario-grid');
  const panelEl = document.getElementById('irl-detail-panel');
  if (!gridEl || !panelEl) return;

  let activeScenarioId = irlScenariosThai[0].id;

  function renderIrl() {
    const list = currentLang === 'en' ? irlScenariosEn : irlScenariosThai;
    gridEl.innerHTML = list.map(item => {
      const isActive = item.id === activeScenarioId;
      return `<button data-id="${item.id}" class="text-left p-4 rounded-xl border transition flex flex-col justify-between ${
        isActive
          ? 'bg-teal-50 border-[#0d9488] text-[#0f172a] shadow-xs'
          : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50'
      }">
        <div>
          <div class="font-mono-tech text-xs ${isActive ? 'text-[#0f766e]' : 'text-[#64748b]'}">${item.code}</div>
          <div class="text-sm font-medium mt-1 leading-snug text-[#0f172a]">${item.title}</div>
        </div>
        <p class="text-xs text-[#64748b] mt-2 line-clamp-2 leading-relaxed">${item.summary}</p>
      </button>`;
    }).join('');

    const sc = list.find(s => s.id === activeScenarioId);
    panelEl.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span class="font-mono-tech text-xs text-[#0f766e]">${sc.code}</span>
            <h4 class="text-base sm:text-lg font-medium text-[#0f172a] mt-0.5">${sc.title}</h4>
          </div>
          <span class="formula-pill self-start">Real-World Architecture</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div class="lg:col-span-6 bg-white border border-amber-200 rounded-xl p-5 space-y-2">
            <div class="inline-block px-2.5 py-0.5 rounded bg-[#fef3c7] text-[#d97706] text-xs font-medium">
              ${t('⚠️ ปัญหาในโลกจริง (Real-World Problem)', '⚠️ Real-World Problem')}
            </div>
            <p class="read-card-text text-[#334155] pt-1">${sc.problem}</p>
          </div>

          <div class="lg:col-span-6 bg-white border border-teal-200 rounded-xl p-5 space-y-2">
            <div class="inline-block px-2.5 py-0.5 rounded bg-teal-50 text-[#0f766e] text-xs font-medium">
              ${t('✅ ข้อได้เปรียบเหนือวิธีดั้งเดิม (IRL Advantage vs. Legacy Tech)', '✅ IRL Advantage vs. Legacy Tech')}
            </div>
            <p class="read-card-text text-[#334155] pt-1">${sc.advantage}</p>
          </div>
        </div>

        <div class="bg-white border border-indigo-200 rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-[#4f46e5]">
              ${t('🛠️ ชุดฮาร์ดแวร์และอัลกอริทึมที่ใช้งานจริง (Deployed Hardware & Algorithm Stack)', '🛠️ Deployed Hardware & Algorithm Stack')}
            </span>
            <span class="formula-pill-indigo hidden sm:inline-block">Co-Designed Stack</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 read-card-text">
            <div class="bg-[#f8fafc] border border-slate-200 rounded-lg p-3.5">
              <div class="font-mono-tech text-xs font-medium text-[#0f766e] mb-1">${t('1. Electrode (ขั้วไฟฟ้า)', '1. Electrode')}</div>
              <p class="text-[#334155]">${sc.stack.electrode}</p>
            </div>
            <div class="bg-[#f8fafc] border border-slate-200 rounded-lg p-3.5">
              <div class="font-mono-tech text-xs font-medium text-[#0284c7] mb-1">${t('2. Waveform (รูปคลื่นวัด)', '2. Waveform')}</div>
              <p class="text-[#334155]">${sc.stack.waveform}</p>
            </div>
            <div class="bg-[#f8fafc] border border-slate-200 rounded-lg p-3.5">
              <div class="font-mono-tech text-xs font-medium text-[#4f46e5] mb-1">${t('3. CMOS AFE (วงจรส่วนหน้า)', '3. CMOS AFE')}</div>
              <p class="text-[#334155]">${sc.stack.afe}</p>
            </div>
            <div class="bg-[#f8fafc] border border-slate-200 rounded-lg p-3.5">
              <div class="font-mono-tech text-xs font-medium text-[#d97706] mb-1">${t('4. Decoder (ตัวถอดรหัส AI)', '4. Decoder (AI)')}</div>
              <p class="text-[#334155]">${sc.stack.decoder}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    gridEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeScenarioId = btn.getAttribute('data-id');
        renderIrl();
      });
    });
  }
  renderIrl();
  i18nRefreshHooks.push(renderIrl);
}

// =========================================================================
// UX Enhancements: Reading Progress Bar, Scroll-Spy & Back-to-Top
// =========================================================================
function initNavigationAndScrollUX() {
  const navPills = document.querySelectorAll('.nav-pill');
  const progressBar = document.getElementById('reading-progress');
  const backToTop = document.getElementById('back-to-top');
  const sections = Array.from(document.querySelectorAll('main > section[id^="module-"]'));

  function setActivePill(id) {
    navPills.forEach(p => {
      const isMatch = p.getAttribute('href') === `#${id}`;
      p.className = isMatch
        ? 'nav-pill px-3 py-1 rounded-lg bg-[#0d9488] text-white shadow-xs transition font-medium'
        : 'nav-pill px-3 py-1 rounded-lg bg-[#f1f5f9] hover:bg-teal-50 text-[#334155] hover:text-[#0f766e] border border-slate-200 transition font-normal';
    });
  }

  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('href').slice(1);
      setActivePill(targetId);
    });
  });

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${Math.min(100, (scrollTop / docHeight) * 100)}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollTop > 420);
    }

    // Scroll-Spy: highlight the section closest to top offset
    const offset = 180;
    let currentId = sections[0]?.id;
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top <= offset) {
        currentId = sec.id;
      }
    }
    if (currentId) setActivePill(currentId);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  onScroll();
}

// =========================================================================
// Initialize Everything on DOMContentLoaded
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  initBottlenecksModule();
  initFscvSimulatorModule();
  initModalitiesTable();
  initMaterialsModule();
  initCmosModule();
  initClinicalAndDbsModule();
  initIrlApplicationsModule();
  initNavigationAndScrollUX();
  setLanguage(currentLang);
});
