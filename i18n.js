// =========================================================================
// Bilingual i18n Engine (Thai / English) & Theme Switcher (Light / Dark)
// =========================================================================

const urlLang = new URLSearchParams(window.location.search).get('lang');
let currentLang = (urlLang === 'en' || urlLang === 'th')
  ? urlLang
  : (localStorage.getItem('neuro_lang') || 'th');

let currentTheme = localStorage.getItem('neuro_theme') || 'light';

const TH_CACHE = {};
const i18nRefreshHooks = [];
const themeRefreshHooks = [];

const I18N_EN = {
  'doc.title': 'Electrochemical Biosensors & CMOS Potentiostats for Neurotransmitter Monitoring',
  'header.badge': 'Biomedical & Electrical Engineering Synthesis',
  'header.title': 'Implantable Neurochemical Biosensors & Microelectrode Arrays (MEAs)',
  'header.subtitle': 'Co-design of micro/nano-scale electrodes, picoampere-noise (<span class="font-mono-tech text-[#0f766e] font-medium">10⁻¹² A</span>) CMOS Analog Front-End circuits, and real-time electrochemical signal decoding',
  'nav.m1': '1. Overview & Bottlenecks',
  'nav.m2': '2. FSCV Physics',
  'nav.m3': '3. Electrode Materials',
  'nav.m4': '4. CMOS AFE',
  'nav.m5': '5. Clinical & DBS',
  'nav.m6': '6. Real-World (IRL)',
  'nav.m7': '7. Research Report',

  'm1.badge': '🧠 Module 1 · System Overview & Translational Bottlenecks',
  'm1.title': 'Co-Design Across Materials Science, Analog Integrated Circuits, and Computational Neuroscience',
  'm1.intro': 'Real-time in vivo monitoring of brain neurotransmitter dynamics requires tightly co-designing three subsystems: <strong class="text-[#0f172a]">1) Implantable micro/nano-scale electrodes</strong> (carbon-fiber microelectrodes CFMEs at <span class="formula-pill">7 µm</span>, CNTs, graphene, boron-doped diamond BDD, PEDOT conducting polymers, and AuNPs), <strong class="text-[#0f172a]">2) Low-noise CMOS Potentiostats</strong> capable of fast potential sweeps while resolving picoampere redox currents (<span class="formula-pill-indigo">10⁻¹² A</span>) atop massive <span class="px-2 py-0.5 rounded bg-[#fef3c7] text-[#d97706] font-mono-tech text-xs font-semibold">300–400 nA</span> charging backgrounds, and <strong class="text-[#0f172a]">3) Chemometric & AI decoders</strong> to resolve dopamine and serotonin in Parkinson’s disease, addiction, and depression.',
  'm1.kpi1.label': 'Standard Electrode Footprint',
  'm1.kpi1.sub': 'Exposed tip ~100 µm',
  'm1.kpi1.desc': 'Standard carbon-fiber microelectrode diameter, minimizing tissue and vascular damage compared with ~200–300 µm microdialysis probes and 4 mm BOLD fMRI voxels.',
  'm1.kpi2.label': 'Signal vs. Background Current',
  'm1.kpi2.desc': 'Faradaic neurotransmitter current (<span class="font-mono-tech">I_redox</span>) is buried beneath a non-Faradaic background (<span class="font-mono-tech">I_BG</span>) 30–40× larger.',
  'm1.kpi3.label': 'CMOS AFE Input-Referred Noise',
  'm1.kpi3.desc': 'Input-referred noise of the CMOS AFE (Hall et al. 2022) across a 5 kHz bandwidth at just <span class="font-mono-tech">3.74 µW</span> average power.',
  'm1.kpi4.label': 'Mechanical Stiffness Mismatch (Young’s Modulus)',
  'm1.kpi4.sub': 'Brain Tissue vs. Rigid Silicon/Metal',
  'm1.kpi4.desc': 'A <span class="font-mono-tech">10⁵–10⁶×</span> modulus mismatch between brain tissue and rigid silicon/metal shanks drives micromotion shear and glial scarring.',
  'm1.bn.title': '🔍 Interactive 4-Pillar Translational Bottleneck Explorer',
  'm1.bn.sub': 'Select each pillar below to inspect the underlying engineering bottleneck and proven translational solutions.',

  'm2.tag': 'Module 2 · Electrochemical Modalities & Signal Physics',
  'm2.title': 'Electrochemical Techniques, Phasic–Tonic Challenges & FSCV Physics Simulator',
  'm2.intro': 'In <span class="formula-pill">Fast-Scan Cyclic Voltammetry (FSCV)</span>, a triangular potential waveform (<span class="font-mono-tech text-[#0f172a]">-0.4 V → +1.3 V → -0.4 V vs. Ag/AgCl</span>) at <span class="font-mono-tech">10 Hz</span> oxidizes dopamine to dopamine-o-quinone (~<span class="font-mono-tech">+0.60 V</span>) and reduces it back (~<span class="font-mono-tech">-0.20 V</span>). Faradaic peak current scales as <span class="formula-pill">i_p ∝ √v</span> (Randles–Ševčík), whereas background charging current scales linearly as <span class="px-2 py-0.5 rounded bg-[#fef3c7] text-[#d97706] font-mono-tech text-xs font-semibold">I_BG = C_dl · v</span>.',
  'm2.sim.title': '🎛️ FSCV Parameter Controls',
  'm2.sim.rate': 'Scan Rate <span class="font-mono-tech">(v)</span>',
  'm2.sim.rateStd': '400 V/s (Standard)',
  'm2.sim.cdl': 'Double-Layer Capacitance <span class="font-mono-tech">C<sub>dl</sub></span>',
  'm2.sim.conc': 'Dopamine Concentration <span class="font-mono-tech">[DA]</span>',
  'm2.sim.m1': 'Active Sweep Window',
  'm2.sim.m2': 'Duty Cycle (100 ms period)',
  'm2.sim.m3': 'Background <span class="font-mono-tech">I<sub>BG</sub></span>',
  'm2.sim.m4': 'Peak Redox <span class="font-mono-tech">I<sub>redox</sub></span>',
  'm2.sim.sbr': 'Signal-to-Background Ratio (<span class="font-mono-tech">I<sub>redox</sub> / I<sub>BG</sub></span>):',
  'm2.c1.tag': 'Chart 1 · Total vs. Background Current',
  'm2.c1.title': 'Total Current <span class="font-mono-tech">I<sub>total</sub></span> vs. Background <span class="font-mono-tech">I<sub>BG</sub></span>',
  'm2.c1.desc': 'Illustrates how the large capacitive charging background dominates the redox current across the triangular sweep.',
  'm2.c2.tag': 'Chart 2 · Background-Subtracted CV',
  'm2.c2.title': 'Background-Subtracted Cyclic Voltammogram (CV)',
  'm2.c2.desc': 'Reveals the dopamine oxidation peak (~<span class="font-mono-tech">+0.60 V</span>) and quinone reduction peak (~<span class="font-mono-tech">-0.20 V</span>).',
  'm2.tbl.title': '📊 Comparison of 7 Electrochemical Modalities for Phasic & Tonic Sensing',
  'm2.tbl.sub': 'Filter by timescale on the right to isolate <span class="font-mono-tech">Phasic</span>, <span class="font-mono-tech">Tonic</span>, or dual-timescale modalities.',
  'm2.tbl.all': 'All (7)',
  'm2.tbl.h1': 'Modality',
  'm2.tbl.h2': 'Timescale',
  'm2.tbl.h3': 'Potential Waveform',
  'm2.tbl.h4': 'Temporal Resolution',
  'm2.tbl.h5': 'Selectivity Mechanism',
  'm2.tbl.h6': 'Key Engineering Limitation',

  'm3.tag': 'Module 3 · Nanomaterials & Electrode Mechanics',
  'm3.title': 'Advanced Electrode Materials & Mechanical Compatibility with Brain Tissue',
  'm3.intro': 'Surface modification with nanomaterials (<span class="formula-pill">PEDOT-CNT</span>, <span class="formula-pill">PEI-CNT</span>, <span class="formula-pill">B-NCD</span>, <span class="formula-pill">Graphene/AuNPs</span>) pushes limits of detection (<span class="font-mono-tech">LoD</span>) into the low nanomolar regime and resists protein/<span class="font-mono-tech">5-HT</span> fouling, while compliant polymer substrates mitigate shear stress in brain tissue.',
  'm3.chart.title': '📈 Electrode Material Performance Benchmark',
  'm3.chart.sub': 'Toggle between <span class="font-mono-tech">LoD (nM)</span> and <span class="font-mono-tech">Sensitivity (nA/µM)</span>',
  'm3.chart.btnLod': 'LoD (nM — Lower is Better)',
  'm3.ym.title': '🛡️ Mechanical Stiffness Comparison (Young’s Modulus — Log Scale)',
  'm3.ym.sub': 'The modulus gap between rigid silicon (<span class="font-mono-tech">&gt;100 GPa</span>) and brain tissue (<span class="font-mono-tech">&lt;30 kPa</span>) drives pulsation-induced shear and glial scarring.',
  'm3.ym.b1': '1. Brain Tissue',
  'm3.ym.b4': '4. Rigid Silicon / Metal Shanks',
  'm3.ab.title': 'Anti-Buckling Insertion Strategies for Compliant Probes',
  'm3.ab.li1': '<strong class="text-[#0f766e]">Transient Pullulan Shuttle:</strong> Coating flexible probes in water-soluble <span class="font-mono-tech">Pullulan</span> polysaccharide provides temporary stiffness for pial penetration and dissolves immediately post-implant.',
  'm3.ab.li2': '<strong class="text-[#0284c7]">16-Channel fGCFs Array:</strong> Flexible glassy carbon fibers can be inserted into deep brain targets without rigid guide needles.',
  'm3.ins.title': '🔬 Selectivity & Chronic Stability Inspector (7 Material Classes)',
  'm3.ins.sub': 'Click any material group to inspect interferent selectivity ratios (<span class="font-mono-tech">DA/AA</span>, <span class="font-mono-tech">DA/DOPAC</span>) and in vivo longevity.',

  'm4.tag': 'Module 4 · Low-Noise Analog Integrated Circuit Design',
  'm4.title': 'Low-Noise CMOS Potentiostats & AFE Design Trade-Offs',
  'm4.intro': 'Implantable CMOS Analog Front-End (<span class="formula-pill-indigo">AFE</span>) circuits must generate <span class="font-mono-tech">1.4–1.7 V<sub>pp</sub></span> sweep waveforms while resolving picoampere redox currents superimposed on <span class="font-mono-tech">300–400 nA</span> charging backgrounds within a microwatt power budget.',
  'm4.sc.title': '📉 Trade-Off Map: Input-Referred Noise (pA<sub>rms</sub>) vs. Silicon Area (mm²)',
  'm4.sc.sub': 'Log-scale comparison of 6 CMOS architectures (amperometric pixel arrays achieve femtoampere noise and tiny area, but saturate under a 400 nA FSCV background).',
  'm4.sc.note': '<span class="text-[#4f46e5] font-bold">Architectural Takeaway:</span> <span class="font-mono-tech font-semibold">Hall et al. (2022)</span> achieves <span class="font-mono-tech font-semibold text-[#0f766e]">26.5 pA<sub>rms</sub></span> (Open) and <span class="font-mono-tech font-semibold text-[#0f766e]">39.2 pA<sub>rms</sub></span> (<span class="font-mono-tech">1 nF</span> load @ <span class="font-mono-tech">5 kHz</span>), while the <span class="font-mono-tech">128-Ch R-TIA</span> packs 128 channels into <span class="font-mono-tech">2.25 mm²</span>.',
  'm4.calc.title': '🧮 AFE Noise Calculator (Hall et al.)',
  'm4.calc.desc': 'Based on the analytical <span class="font-mono-tech text-[#0f172a]">i²<sub>n,rms</sub></span> model of Hall et al. (2022), combining current-mirror shot noise (<span class="font-mono-tech">2q(I<sub>CMR</sub> + I<sub>CC</sub>)</span>) with opamp voltage noise (<span class="font-mono-tech">v²<sub>n,op</sub></span>) coupled through <span class="font-mono-tech">C<sub>dl</sub></span>.',
  'm4.calc.cdl': 'Working-Electrode Capacitance (<span class="font-mono-tech">C<sub>dl</sub></span>)',
  'm4.calc.ibias': 'Bias Current (<span class="font-mono-tech">I<sub>CMR</sub> + I<sub>CC</sub></span>)',
  'm4.calc.vnop': 'Opamp Voltage Noise (<span class="font-mono-tech">v<sub>n,op</sub></span>)',
  'm4.calc.dr': 'Effective Dynamic Range (vs. 290 nA<sub>pp</sub> CMR):',
  'm4.topo.title': '🔀 Potentiostat Architecture Analyzer (Topology Selector)',
  'm4.topo.sub': 'Compare the strengths and limitations of the 3 primary CMOS AFE topologies.',
  'm4.tbl.title': '🔌 Benchmark Table: 6 CMOS Potentiostat & AFE Chips',
  'm4.tbl.h1': 'Architecture / Study',
  'm4.tbl.h2': 'CMOS Process',
  'm4.tbl.h3': 'Circuit Topology',
  'm4.tbl.h4': 'Input-Referred Noise',
  'm4.tbl.h5': 'Dynamic Range / Current Span',
  'm4.tbl.h6': 'Power & Silicon Area',

  'm5.tag': 'Module 5 · Clinical Applications & Closed-Loop Control',
  'm5.title': 'Chemometrics, Clinical Applications & Closed-Loop DBS Systems',
  'm5.intro': 'Combining multivariate statistics and deep neural networks with real-time voltammetry uncovers neuropsychiatric mechanisms and drives adaptive <span class="formula-pill">Closed-Loop DBS</span>.',
  'm5.tab1': '1. Chemometrics & AI',
  'm5.tab2': '2. Parkinson’s Disease',
  'm5.tab3': '3. Substance Addiction',
  'm5.tab4': '4. Depression & Human Surgery',
  'm5.dbs.title': '⚙️ 5-Stage Closed-Loop Deep Brain Stimulation Control Pipeline',
  'm5.dbs.sub': 'Click each pipeline stage and adjust <span class="font-mono-tech">Frequency (20–200 Hz)</span> and <span class="font-mono-tech">Pulse Width (0.1–2.0 ms)</span> to simulate evoked dopamine response under the ANN model (150 Hidden Neurons, Levenberg–Marquardt).',
  'm5.exp.title': '🎯 DBS Stimulus Parameter Explorer',
  'm5.exp.sub': 'Adjust pulse frequency and pulse width to observe evoked dopamine response and energy efficiency.',
  'm5.exp.freq': 'Stimulation Frequency',
  'm5.exp.freqMid': '100 Hz (Physiological Optimum)',
  'm5.exp.pw': 'Stimulation Pulse Width',
  'm5.exp.o1': 'Evoked Dopamine (<span class="font-mono-tech">Δ[DA]<sub>evoked</sub></span>)',
  'm5.exp.o1s': 'Physiological peak at ~100 Hz',
  'm5.exp.o2': 'Striatal Tonic Restoration',
  'm5.exp.o2s': 'Relative to healthy baseline',
  'm5.exp.o3': 'Charge Density Index',
  'm5.exp.o3s': 'Proportional to pulse width',
  'm5.exp.o4': 'Energy Efficiency Status',
  'm5.exp.o4s': 'Avoids over-stimulation',

  'm6.tag': 'Module 6 · Real-World (IRL) Applications & Translational Systems',
  'm6.title': 'From Benchtop to Operating Room, Pharma R&D, and Next-Gen Neuroprosthetics',
  'm6.intro': 'Co-designed microelectrodes and picoampere-noise <span class="formula-pill-indigo">CMOS Potentiostats</span> are moving into <span class="font-mono-tech text-[#0f766e] font-semibold">IRL Deployment</span> across awake neurosurgery, adaptive brain stimulators, psychiatric drug discovery, soft gut–brain bioelectronics, and next-generation BCIs.',
  'm6.exp.title': '🌍 Interactive 6-Scenario IRL Deployment Explorer',
  'm6.exp.sub': 'Select any real-world scenario below to inspect the clinical/industrial problem, deployed hardware/algorithm stack, and advantages over legacy tools.',
  'm6.tbl.title': '⚖️ Real-World Readiness Comparison: Legacy Tech vs. Modern Electrochemical + CMOS Systems',
  'm6.tbl.sub': 'Comparing clinical and industrial performance between legacy tools and high-resolution electrochemical architectures.',
  'm6.tbl.h1': 'Evaluation Dimension',
  'm6.tbl.h2': 'Legacy Technology (Microdialysis / Open-Loop DBS / Spike-Only BCI)',
  'm6.tbl.h3': 'Modern Electrochemical Biosensor + CMOS System',
  'm6.tbl.h4': 'Real-World (IRL) Impact',
  'm6.tbl.r1c1': '1. Temporal Resolution<br><span class="font-mono-tech text-[11px] font-normal text-[#64748b]">Timescale Precision</span>',
  'm6.tbl.r1c2': '<strong class="text-[#334155]">Microdialysis:</strong> 5–20 min per sample (misses sub-second release dynamics)<br><strong class="text-[#334155]">Open-Loop DBS:</strong> Constant 24/7 stimulation regardless of state',
  'm6.tbl.r1c3': '<strong class="text-[#0f766e]">FSCV / RPV-PLSR:</strong> <span class="font-mono-tech font-semibold">100 ms (10 Hz)</span> for Phasic and <span class="font-mono-tech font-semibold">10 s</span> (M-CSWV) for Tonic',
  'm6.tbl.r1c4': 'Captures human Reward Prediction Errors intraoperatively and adapts DBS pulses the moment dopamine drops.',
  'm6.tbl.r2c1': '2. Spatial Footprint<br><span class="font-mono-tech text-[11px] font-normal text-[#64748b]">Physical Scale</span>',
  'm6.tbl.r2c2': '<strong class="text-[#334155]">Microdialysis Probe:</strong> ~200–300 µm diameter, damaging capillaries and local tissue<br><strong class="text-[#334155]">BOLD fMRI:</strong> ~3–4 mm voxel resolution',
  'm6.tbl.r2c3': '<strong class="text-[#0284c7]">CFME / µIP-CFM:</strong> Only <span class="font-mono-tech font-semibold">7 µm</span> diameter (~30–40× smaller than microdialysis) and CMOS chips at <span class="font-mono-tech font-semibold">0.0176–0.256 mm²/ch</span>',
  'm6.tbl.r2c4': 'Targets micro-domains in Nucleus Accumbens / Striatum without disrupting local neural circuits.',
  'm6.tbl.r3c1': '3. Chronic Biocompatibility<br><span class="font-mono-tech text-[11px] font-normal text-[#64748b]">Long-Term Stability</span>',
  'm6.tbl.r3c2': '<strong class="text-[#334155]">Rigid Silicon/Metal Shanks (&gt;100 GPa):</strong> Pulsation shear causes glial scarring and biofouling within weeks',
  'm6.tbl.r3c3': '<strong class="text-[#4f46e5]">NeuroString (SEBS / Polyimide &lt;30 kPa) + PEDOT/CNT + PSB:</strong> Complies with brain and gut tissue while resisting protein fouling',
  'm6.tbl.r3c4': 'Maintains chronic brain recordings for <span class="font-mono-tech font-semibold text-[#0f766e]">&gt;1 year</span> and operates safely inside the peristaltic GI tract (Gut–Brain Axis).',
  'm6.tbl.r4c1': '4. Closed-Loop Readiness<br><span class="font-mono-tech text-[11px] font-normal text-[#64748b]">Autonomous Control</span>',
  'm6.tbl.r4c2': '<strong class="text-[#334155]">Spike-Only BCI / Open-Loop DBS:</strong> Reads only electrical spikes, blind to mood/motivation, and relies on bulky benchtop power',
  'm6.tbl.r4c3': '<strong class="text-[#d97706]">Neurochemostat / WINCS Harmoni / Hall et al. SoC:</strong> Ultra-low <span class="font-mono-tech font-semibold">3.74 µW</span> power, <span class="font-mono-tech font-semibold">39.2 pA<sub>rms</sub></span> noise, with on-chip AI/ANN decoding',
  'm6.tbl.r4c4': 'Acts as a wireless neurochemical thermostat, extending implant battery life and reducing speech/motor side effects.',

  'm7.tag': 'Module 7 · Complete Technical Synthesis',
  'm7.title': '📄 Full Research Synthesis Report (English & Thai + IRL Synthesis)',
  'm7.sub': 'Covering system co-design, electrochemistry, nanomaterials, CMOS circuits, clinical neuroscience, and real-world deployment.',
  'm7.copyBtn': '📋 Copy Research Report',
  'm7.copyToast': '✅ Full research report copied to clipboard.',
  'm7.s1.h': '1. Introduction & System Co-Design',
  'm7.s1.p': 'Real-time in vivo neurotransmitter monitoring requires tight co-design across three disciplines: (1) micro/nano-scale electrode engineering with minimal tissue perturbation—such as 7 µm T-650 carbon-fiber microelectrodes (~100 µm exposed tip), carbon nanotubes (CNTs), graphene, boron-doped diamond (BDD), PEDOT conducting polymers, and gold nanoparticles (AuNPs); (2) low-noise CMOS potentiostat integrated circuits at the picoampere floor (10⁻¹² A) that drive fast potential sweeps while resolving small redox currents (<10 nA) from massive charging backgrounds (300–400 nA); and (3) chemometric signal processing to separate structurally similar neurochemicals in Parkinson’s disease, addiction, and depression.',
  'm7.s2.h': '2. Electrochemical Modalities & Phasic–Tonic Challenges',
  'm7.s2.p': 'Fast-Scan Cyclic Voltammetry (FSCV) sweeps a triangular waveform from -0.4 V to +1.3 V vs. Ag/AgCl at 400 V/s (8.5 ms active sweep at 10 Hz, 8.5% duty cycle), oxidizing dopamine to dopamine-o-quinone at ~+0.60 V and reducing it back at ~-0.20 V following the Randles–Ševčík equation (i_p = (2.69×10⁵) n^(3/2) A D^(1/2) C v^(1/2)). However, double-layer capacitance (C_dl ≈ 1 nF) produces a capacitive background I_BG = C_dl·v up to 400 nA, requiring background subtraction that erases tonic baseline levels. To recover both phasic and tonic dynamics, researchers developed M-CSWV (10 s resolution, measuring 134 ± 32 nM basal dopamine in rat NAcc), FSCAV, Rapid-Pulse Voltammetry with PLSR (RPV-PLSR), Steered FSCV (39× lower LoD to 0.17 nM), and second-derivative SDBR.',
  'm7.s3.h': '3. Advanced Electrode Materials & Flexible Mechanics',
  'm7.s3.p': 'Bare carbon fibers are brittle, foul rapidly in serotonin (5-HT) and proteins, and etch above +1.3 V. Nanomaterial coatings dramatically improve performance: PEDOT-CNT with SWV achieves a dopamine LoD of 2.03 ± 0.09 nM, PEI-CNT fibers reach 5.0 nM, and µIP-CFM probes achieve 5.7 nM with >1 year in vivo stability. PEDOT:Nafion boosts sensitivity to 46 ± 13 nA/µM with a DA/AA selectivity ratio of 1540 ± 150, while 1 µm B-NCD coatings (50 nm grains) prevent carbon etching. Mechanically, replacing rigid silicon (>100 GPa) with compliant polymers (PDMS 1.9 MPa, SEBS NeuroString, Polyimide, Parylene-C), water-soluble Pullulan insertion shuttles, or flexible glassy carbon fibers (fGCFs) eliminates the stiffness mismatch with brain tissue (<30 kPa) and suppresses glial scarring.',
  'm7.s4.h': '4. Low-Noise CMOS Potentiostat & AFE Architectures',
  'm7.s4.p': 'CMOS potentiostats balance noise, dynamic range, power, and silicon area. Hall et al. (IEEE TBioCAS 2022) in 0.18 µm CMOS uses a 2-electrode pseudo-differential Class-AB common-mode rejection (CMR) stage with a regulated current conveyor and 1st-order I-ΔΣ ADC (with DEM and chopping), canceling up to 290 nA_pp background while achieving 26.5 pArms (open) and 39.2 pArms (1 nF load) input-referred noise over 5 kHz—yielding 83 dB effective dynamic range at just 3.74 µW duty-cycled power. Meanwhile, the 128-Ch Programmable R-TIA array uses high-density n-well resistors to pack 128 channels into 2.25 mm² (0.0176 mm²/ch, 220 pArms noise).',
  'm7.s5.h': '5. Chemometrics, Clinical Applications & Closed-Loop DBS',
  'm7.s5.p': 'Principal component regression (PCR with Malinowski’s F-test), PLSR, Elastic Net, and deep learning (1D-CNN, LSTM, Physics-Informed Neural Networks: PINNs) accurately deconvolve dopamine and serotonin from pH shifts and reference drift. Clinically, STN-DBS elevates striatal tonic dopamine in Parkinson’s models; in addiction, cocaine increases both phasic DA (2.4×) and tonic DA (1.9×), whereas fentanyl and oxycodone primarily shift tonic baselines. In awake human DBS surgery (Kishida, Montague & Lee), sub-second striatal dopamine encodes both actual and counterfactual reward prediction errors. Closed-loop DBS links 10 Hz FSCV sensing through a 100 Hz Butterworth filter and an ANN (150 hidden neurons, Levenberg–Marquardt) to automatically tune stimulation frequency (~100 Hz) and pulse width (0.1–2.0 ms).',
  'm7.s6.h': '6. Real-World (IRL) Clinical & Industrial Translation',
  'm7.s6.p': 'Microscale electrodes and picoampere-noise CMOS potentiostats are actively deployed across six real-world domains: (1) Awake human DBS surgery for real-time striatal dopamine mapping within 15–60 min IRB windows; (2) Adaptive closed-loop DBS (Neurochemostat / WINCS Harmoni / MAVEN) acting as a neurochemical thermostat to extend battery life and reduce dyskinesia and speech side effects; (3) Psychiatric & addiction drug R&D using 128-channel arrays and MAVEN to quantify Escitalopram (+42% 5-HT), cocaine, fentanyl, and oxycodone responses within minutes; (4) Soft NeuroString bioelectronics (SEBS/Polyimide <30 kPa) measuring real-time serotonin in the peristaltic gut–brain axis for IBS and depression; (5) MRI-compatible WINCS + BOLD fMRI linking nanomolar dopamine release to whole-brain network connectivity; and (6) Next-gen dual-mode neurochemical BCIs (PEDOT/CNT + PSB) recording motor spikes alongside emotional/motivational neurochemistry.',

  'footer.title': 'Electrochemical Biosensors & CMOS Potentiostats for Neurotransmitter Monitoring'
};

function t(thText, enText) {
  return currentLang === 'en' ? enText : thText;
}

function getChartThemeColors() {
  const isDark = currentTheme === 'dark';
  return {
    grid: isDark ? '#1e293b' : '#e2e8f0',
    tick: isDark ? '#94a3b8' : '#475569',
    title: isDark ? '#94a3b8' : '#64748b',
    legend: isDark ? '#cbd5e1' : '#334155',
    tooltipBg: isDark ? '#0f172a' : '#ffffff',
    tooltipTitle: isDark ? '#f1f5f9' : '#0f172a',
    tooltipBody: isDark ? '#cbd5e1' : '#334155',
    tooltipBorder: isDark ? '#334155' : '#cbd5e1'
  };
}

function setLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'th';
  localStorage.setItem('neuro_lang', currentLang);
  document.documentElement.lang = currentLang;
  document.title = currentLang === 'en'
    ? I18N_EN['doc.title']
    : (TH_CACHE['doc.title'] || document.title);

  Chart.defaults.font.family = '"Prompt", "Inter", sans-serif';

  const btnTh = document.getElementById('lang-btn-th');
  const btnEn = document.getElementById('lang-btn-en');
  if (btnTh && btnEn) {
    btnTh.className = currentLang === 'th'
      ? 'px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0d9488] text-white shadow-xs transition'
      : 'px-2.5 py-1 rounded-lg text-xs font-normal text-[#334155] hover:text-[#0f172a] transition';
    btnEn.className = currentLang === 'en'
      ? 'px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0d9488] text-white shadow-xs transition'
      : 'px-2.5 py-1 rounded-lg text-xs font-normal text-[#334155] hover:text-[#0f172a] transition';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!(key in TH_CACHE)) TH_CACHE[key] = el.textContent;
    el.textContent = currentLang === 'en' ? (I18N_EN[key] || TH_CACHE[key]) : TH_CACHE[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!(key in TH_CACHE)) TH_CACHE[key] = el.innerHTML;
    el.innerHTML = currentLang === 'en' ? (I18N_EN[key] || TH_CACHE[key]) : TH_CACHE[key];
  });

  i18nRefreshHooks.forEach(fn => fn());
}

function setTheme(theme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem('neuro_theme', currentTheme);
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');

  const btnTheme = document.getElementById('theme-toggle-btn');
  if (btnTheme) {
    btnTheme.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    btnTheme.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  const c = getChartThemeColors();
  Chart.defaults.color = c.tick;
  Chart.defaults.borderColor = c.grid;

  themeRefreshHooks.forEach(fn => fn(c));
}

function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

window.setLanguage = setLanguage;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;
