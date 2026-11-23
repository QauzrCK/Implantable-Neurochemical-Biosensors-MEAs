# Implantable Neurochemical Biosensors & CMOS AFE Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0d9488?style=for-the-badge&logo=github)](https://qauzrck.github.io/Implantable-Neurochemical-Biosensors-MEAs/)
[![Language](https://img.shields.io/badge/Bilingual-Thai_%2F_English-0284c7?style=for-the-badge)](https://qauzrck.github.io/Implantable-Neurochemical-Biosensors-MEAs/?lang=en)
[![Stack](https://img.shields.io/badge/Stack-HTML5_·_Tailwind_·_Chart.js-4f46e5?style=for-the-badge)](#project-structure)
[![License: MIT](https://img.shields.io/badge/License-MIT-d97706?style=for-the-badge)](LICENSE)

An interactive, bilingual (**Thai / English**) biomedical & electrical engineering synthesis dashboard exploring **implantable electrochemical biosensors**, **low-noise CMOS potentiostats**, **chemometric/AI decoders**, and **closed-loop Deep Brain Stimulation (DBS)** for real-time neurotransmitter monitoring.

<p align="center">
  <img src="assets/biochip-overview.jpg" alt="Implantable Neurochemical Biochip Overview" width="760" />
</p>

---

## Key Engineering Highlights

| Subsystem | Benchmark / Specification | Significance |
| :--- | :--- | :--- |
| **Electrode Footprint** | `7 µm` CFME (`~100 µm` tip) | ~30–40× smaller than microdialysis (`200–300 µm`), minimizing tissue & vascular damage |
| **Nanomaterial Sensitivity** | `2.03 nM` LoD (`PEDOT-CNT` SWV) · `46 nA/µM` (`PEDOT:Nafion`) | Resolves nanomolar dopamine & serotonin with `1540×` AA interferent rejection |
| **Mechanical Compliance** | `< 30 kPa` brain vs. `1.9 MPa` (`SEBS` / `PDMS`) | Eliminates `10⁵–10⁶×` silicon stiffness mismatch to suppress glial scarring |
| **CMOS Potentiostat AFE** | `26.5 / 39.2 pArms` noise (`5 kHz` BW) · `3.74 µW` power | `83 dB` effective dynamic range while rejecting `290 nApp` charging backgrounds |
| **Closed-Loop DBS Control** | `10 Hz` FSCV → `100 Hz` Butterworth → `150N` ANN | Tunes stimulation frequency (`~100 Hz`) & pulse width (`0.1–2.0 ms`) in real time |

---

## What's Inside (Modules 0–7)

| Module | Topic | Interactive Features |
| :--- | :--- | :--- |
| **0. Start Here (Intro)** | Plain-language guide with visual analogies | 4-question beginner overview & 4-step visual story (`assets/how-it-works-steps.jpg`) |
| **1. Overview & Bottlenecks** | System co-design & translational barriers | Interactive SVG signal-chain diagram & 4-pillar bottleneck explorer |
| **2. FSCV Physics** | Phasic vs. Tonic electrochemistry | Real-time **FSCV Physics Simulator** (`Scan Rate`, `C_dl`, `[DA]`), 1-click presets, & 7-modality filterable table |
| **3. Electrode Materials** | Nanomaterials & compliant mechanics | `LoD` vs. `Sensitivity` benchmark chart, Young's modulus log comparison, & 7-material inspector |
| **4. CMOS AFE** | Low-noise potentiostat architectures | Log-scale Noise vs. Area bubble plot, **Hall et al. Noise Calculator**, topology selector, & 6-chip table |
| **5. Clinical & DBS** | Chemometrics, disease models & closed-loop DBS | 4 clinical domain tabs, 5-stage DBS pipeline, & **Stimulus Parameter Explorer** |
| **6. Real-World (IRL)** | Clinical & industrial translation | 6-scenario IRL deployment explorer & legacy vs. modern readiness table |
| **7. Research Report** | Complete technical synthesis | Collapsible accordion report with **Expand/Collapse All**, **Copy**, and **Print / PDF** export |

---

## Features & UX

- **Bilingual Thai / English Switcher (`🇹🇭 ไทย` / `🇺🇸 EN`)** with `localStorage` persistence and `?lang=en` / `?lang=th` URL support.
- **Light / Dark Mode Toggle (`🌙` / `☀️`)** that dynamically updates card surfaces, typography, SVG diagrams, and all 5 Chart.js visualizations.
- **Comfort Reading & Navigation**: Slim `Prompt` + `Inter` + `JetBrains Mono` typography, reading progress bar, Scroll-Spy active navigation pills, and Back-to-Top button.

---

## Project Structure

```text
Implantable-Neurochemical-Biosensors-MEAs/
├── index.html                  # Semantic 8-module dashboard layout
├── css/
│   └── styles.css              # Light/Dark CSS variables, typography, accordions, print styles
├── js/
│   ├── data.js                 # Bilingual (TH/EN) datasets for Modules 1–6
│   ├── i18n.js                 # TH/EN translation engine, theme switcher, Chart.js theming
│   └── app.js                  # Interactive simulators, Chart.js charts, Scroll-Spy & UX controls
├── assets/
│   ├── biochip-overview.jpg    # Hair-scale biochip & microelectrode illustration
│   └── how-it-works-steps.jpg  # 4-step closed-loop neurochemical workflow illustration
├── .gitignore
├── LICENSE
└── README.md
```

---

## Quick Local Preview

No build step or package installation is required—everything runs with pure static HTML/CSS/JS (plus Tailwind & Chart.js CDNs).

**Option 1 — Open directly**
Double-click `index.html` in your file explorer.

**Option 2 — Run a local static server (Node.js)**
```powershell
npx serve .
```
Or using **VS Code Live Server** (`Right-click index.html` → `Open with Live Server`).

---

## References & Primary Literature

### CMOS Potentiostats, Analog Front-Ends & SoCs
- **Hall et al. (IEEE TBioCAS, 2022)** — [26.5 / 39.2 pArms Class-AB Background-Subtracting FSCV Front-End (PDF)](https://bioee.ucsd.edu/papers/A%2026.5%20pArms%20Neurotransmitter%20Front-End%20With%20Class-AB%20Background%20Subtraction%20-%20Hall%20(TBioCAS,%202022).pdf)
- **White, Darroudi, Park & Kim (bioRxiv 2023 / IEEE Sensors J. 2024)** — [128-Ch Resistive-Feedback TIA Array (220 pArms, 400 V/s)](https://www.biorxiv.org/content/10.1101/2023.06.20.545834v1)
- **Hybrid CMOS–Graphene Sensor Array** — [Dual-Slope ROI ADC (70.7 dB SNR) — PMC5936076](https://pmc.ncbi.nlm.nih.gov/articles/PMC5936076/)
- **180 nm SC-TIA + 3-Bit PGA + SAR ADC (2026)** — [0.21 mW from 1.8 V (Frontiers in Nanotechnology)](https://www.frontiersin.org/journals/nanotechnology/articles/10.3389/fnano.2026.1888883/full)
- **Bozorgzadeh, Mohseni et al. (2016)** — [Neurochemostat Closed-Loop Dopamine SoC — PMC4809062](https://pmc.ncbi.nlm.nih.gov/articles/PMC4809062/)
- **Bozorgzadeh et al. (IEEE JSSC, 2014)** — [Neurochemical Pattern Generator SoC (9.3 µW, 78 pArms)](https://www.semanticscholar.org/paper/A-Neurochemical-Pattern-Generator-SoC-With-for-and-Bozorgzadeh-Covey/83c52c33ec068356bd8f0f51be5c0526397a5a9f)
- **Alkhalifa, Eskandari, Sawan & Salama (IEEE Sensors Reviews, 2026)** — [CMOS Potentiostats for Electrochemical Biosensors](https://www.researchgate.net/figure/General-multimodal-potentiostat-architecture_fig4_408851646)

### Electrochemical Modalities, Waveforms & Chemometrics
- **Steered FSCV** — [0.17 nM Dopamine LoD & 39× Serotonin LoD Reduction (ACS Omega)](https://pubs.acs.org/doi/10.1021/acsomega.1c04475)
- **SDBR & Analog Background Subtraction** — [Dopamine Detection with FSCV Used with Analog Background Subtraction](https://www.researchgate.net/publication/5420055_Dopamine_Detection_with_Fast-Scan_Cyclic_Voltammetry_Used_with_Analog_Background_Subtraction)
- **RPV-PLSR** — [Rapid-Pulse Voltammetry with Partial Least Squares Regression (UC eScholarship)](https://escholarship.org/uc/item/3tb4231s)
- **Keithley, Heien & Wightman** — [PCR Rank Estimation & Malinowski's F-test for In Vivo FSCV (PubMed)](https://pubmed.ncbi.nlm.nih.gov/20527815/)
- **DPV, SWV & FSCV Review** — [Comparative Review on Carbon-Fiber Microelectrodes — PMC7922317](https://pmc.ncbi.nlm.nih.gov/articles/PMC7922317/)

### Implantable Electrode Materials, Coatings & Flexible Probes
- **Taylor, Cui et al. (Analytical Chemistry, 2019)** — [PEDOT-CNT SWV Resting Dopamine Detection (2.03 nM LoD)](https://doi.org/10.1021/acs.analchem.9b02904)
- **Vreeland, Heien et al. (Analytical Chemistry, 2015)** — [Biocompatible PEDOT:Nafion Coatings (46 nA/µM, 1540× AA Selectivity)](https://doi.org/10.1021/ac502165f)
- **Li, Bao et al. (Nature, 2022)** — [NeuroString: Tissue-Like Neurotransmitter Sensor for Brain & Gut](https://doi.org/10.1038/s41586-022-04615-2)
- **B-NCD on CFMEs** — [Boron-Doped Nanocrystalline Diamond Characterization (PubMed)](https://pubmed.ncbi.nlm.nih.gov/41409014/)
- **BDD Neurointerfaces** — [Boron-Doped Diamond Biotechnology — PMC9855027](https://pmc.ncbi.nlm.nih.gov/articles/PMC9855027/)
- **Puthongkham & Venton (2019)** — [Carboxylated Nanodiamond (ND-COOH) Coatings on CFMEs (ACS)](https://pubs.acs.org/ascefj/article/4/9/2403/504275/Nanodiamond-Coating-Improves-the-Sensitivity-and)
- **PSB Antifouling Coatings (2026)** — [PSB-Coated Ag/AgCl Reference & PEDOT/CNT Flexible MEAs — PMC12918813](https://pmc.ncbi.nlm.nih.gov/articles/PMC12918813/)
- **Antifouling Carbon Nanofibers** — [Porous Carbon-Nanofiber Electrodes & >+1.3 V Oxidation (ChemRxiv)](https://chemrxiv.org/doi/10.26434/chemrxiv.10002065)

### Translational Neuroscience, Human DBS, M-CSWV & Closed-Loop Systems
- **Kishida, Montague et al. (PNAS, 2016)** — [Subsecond Dopamine in Human Striatum Encodes Actual & Counterfactual RPEs](https://doi.org/10.1073/pnas.1513619112)
- **Lee et al. (Scientific Reports, 2017)** — [WINCS Harmoni: Closed-Loop Dynamic Neurochemical Control](https://doi.org/10.1038/srep46675)
- **Yuen et al. (2021)** — [M-CSWV for Tonic & Phasic NAcc Dopamine Under Cocaine — PMC8290896](https://pmc.ncbi.nlm.nih.gov/articles/PMC8290896/)
- **Yuen et al. (2023)** — [High-Frequency DBS & M-CSWV Tonic Dopamine in Rat NAcc (Frontiers in Neuroscience)](https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2023.1061578/full)
- **Oxycodone N-MCSWV & MAVEN** — [Tonic & Phasic Serotonin in Rat NAcc — PMC13110376](https://pmc.ncbi.nlm.nih.gov/articles/PMC13110376/)
- **Grahn et al. (2014)** — [Closed-Loop DBS via Dopamine FSCV & Levenberg–Marquardt ANN — PMC4070176](https://pmc.ncbi.nlm.nih.gov/articles/PMC4070176/)
- **Adaptive Neuromodulation Review** — [Neurochemical Closed-Loop Neuromodulation — PMC6710388](https://pmc.ncbi.nlm.nih.gov/articles/PMC6710388/)

---

## License

This project is licensed under the [MIT License](LICENSE).
