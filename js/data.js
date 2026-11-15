// =========================================================================
// Bilingual Research Datasets (Thai & English) for Modules 1–6
// =========================================================================

const bottlenecksThai = [
  {
    id: 'tonic',
    pillar: 'เสาหลักที่ 1 · การประมวลผลสัญญาณ',
    title: 'การสูญเสียค่าพื้นฐาน Tonic จากการหักพื้นหลัง',
    subtitle: 'Background Subtraction Tonic Loss',
    problem: 'เทคนิค FSCV มาตรฐานต้องหักลบโวลแทมโมแกรมก่อนการกระตุ้นเพื่อแยกกระแสฟาราเดอิก (<10 nA) ออกจากกระแสประจุพื้นหลังขนาดใหญ่ (300–400 nA) ทำให้ข้อมูลความเข้มข้นพื้นฐานต่อเนื่อง (Tonic Baseline) สูญหายไปทั้งหมดและเกิดความคลาดเคลื่อนเมื่อพื้นหลังเลื่อน',
    solution: 'ใช้เทคนิค M-CSWV (ความละเอียด 10 วินาที วัดค่าฐานใน rat NAcc ได้ 134 ± 32 nM), FSCAV, RPV-PLSR, Steered FSCV (LoD 0.17 nM) และอนุพันธ์อันดับสอง SDBR เพื่อกู้คืนค่าฐาน Tonic โดยยังคงความไวระดับสูง'
  },
  {
    id: 'etching',
    pillar: 'เสาหลักที่ 2 · เคมีไฟฟ้าของพื้นผิว',
    title: 'การกัดกร่อนคาร์บอนที่ศักย์สูงกว่า +1.3 V vs. Ag/AgCl',
    subtitle: 'Carbon Etching > +1.3 V',
    problem: 'การกวาดศักย์ไฟฟ้าสูงเกิน +1.3 V vs. Ag/AgCl แม้จะช่วยกระตุ้นหมู่ฟังก์ชันออกซิเจนและทำความสะอาดผิวขั้วไฟฟ้า แต่จะออกซิไดซ์และกัดกร่อนเนื้อคาร์บอนอย่างต่อเนื่อง ส่งผลให้ขั้วไฟฟ้าบางลงและจำกัดอายุการใช้งานในการฝังระยะยาว',
    solution: 'การเคลือบเพชรนาโนคริสตัลไลน์เจือโบรอน B-NCD (หนา 1 µm เกรน 50 nm), หัวตรวจรุกรานต่ำพิเศษ µIP-CFM (พิสูจน์เสถียรภาพในสมองมากกว่า 1 ปี) และอินเทอร์เฟซดักจับอนุมูลอิสระ ROS'
  },
  {
    id: 'reference',
    pillar: 'เสาหลักที่ 3 · เสถียรภาพขั้วอ้างอิง',
    title: 'การเลื่อนของศักย์ขั้วอ้างอิง Ag/AgCl ในร่างกาย',
    subtitle: 'In Vivo Ag/AgCl Potential Drift',
    problem: 'ขั้วไฟฟ้าอ้างอิง Ag/AgCl ที่สัมผัสกับน้ำหล่อเลี้ยงสมองและโปรตีนเป็นเวลานานจะเกิดการละลายของชั้น AgCl และเกิด Biofouling ทำให้ศักย์ไฟฟ้าอ้างอิงเลื่อนไปตามเวลา ส่งผลให้ตำแหน่งพีคออกซิเดชันคลาดเคลื่อน',
    solution: 'ใช้ขั้วอ้างอิงฟิล์มบางสถานะของแข็งและเคลือบพอลิเมอร์ป้องกัน PSB (Poly(sulfobetaine)) บนทั้ง Polyimide PEDOT/CNT MEA และขั้วอ้างอิง Ag/AgCl (งานวิจัยปี 2026) ร่วมกับอัลกอริทึม Elastic Net'
  },
  {
    id: 'mechanics',
    pillar: 'เสาหลักที่ 4 · ชีวกลศาสตร์และเนื้อเยื่อ',
    title: 'ความไม่เข้ากันทางกลและการเกิดแผลเป็นเกลีย',
    subtitle: 'Mechanical Mismatch & Glial Encapsulation',
    problem: 'โพรบซิลิคอนและโลหะแข็ง (>100 GPa) มีความแข็งสูงกว่าเนื้อเยื่อสมอง (<30 kPa) กว่าหนึ่งล้านเท่า แรงสั่นสะเทือนระดับไมโครจากการหายใจและชีพจรทำให้เกิดแรงเฉือน ทำลายเซลล์ประสาท และเกิดแผลเป็นเกลียห่อหุ้มปลายขั้วไฟฟ้า',
    solution: 'ใช้ฐานโพลีเมอร์ยืดหยุ่น (Polyimide, Parylene-C, SU-8, PDMS 1.9 MPa, SEBS NeuroString) ร่วมกับสารช่วยสอดใส่ที่ละลายน้ำได้ชั่วคราว (Pullulan) หรือเส้นใยคาร์บอนคล้ายแก้วแบบยืดหยุ่น fGCFs'
  }
];

const bottlenecksEn = [
  {
    id: 'tonic',
    pillar: 'Pillar 1 · Signal Processing',
    title: 'Tonic Baseline Loss from Background Subtraction',
    subtitle: 'Background Subtraction Tonic Loss',
    problem: 'Standard FSCV subtracts a pre-stimulus voltammogram to isolate small Faradaic currents (<10 nA) from huge charging backgrounds (300–400 nA), erasing continuous tonic concentration levels and introducing drift errors.',
    solution: 'M-CSWV (10 s resolution, measuring 134 ± 32 nM basal DA in rat NAcc), FSCAV, RPV-PLSR, Steered FSCV (LoD 0.17 nM), and second-derivative SDBR recover tonic baselines while preserving high sensitivity.'
  },
  {
    id: 'etching',
    pillar: 'Pillar 2 · Surface Electrochemistry',
    title: 'Carbon Etching Above +1.3 V vs. Ag/AgCl',
    subtitle: 'Carbon Etching > +1.3 V',
    problem: 'Sweeping above +1.3 V vs. Ag/AgCl activates oxygen functional groups and self-cleans the surface, but continuously oxidizes and etches carbon, thinning the fiber and limiting chronic implant longevity.',
    solution: 'Boron-doped nanocrystalline diamond B-NCD coatings (1 µm thick, 50 nm grains), ultra-low-invasive µIP-CFM probes (>1 year in vivo stability), and ROS-scavenging interfaces.'
  },
  {
    id: 'reference',
    pillar: 'Pillar 3 · Reference Stability',
    title: 'In Vivo Ag/AgCl Reference Potential Drift',
    subtitle: 'In Vivo Ag/AgCl Potential Drift',
    problem: 'Prolonged exposure of Ag/AgCl references to cerebrospinal fluid and proteins causes AgCl dissolution and biofouling, shifting the reference potential over time and distorting oxidation peak positions.',
    solution: 'Solid-state thin-film references and zwitterionic PSB (Poly(sulfobetaine)) antifouling coatings on both Polyimide PEDOT/CNT MEAs and Ag/AgCl references (2026), paired with Elastic Net.'
  },
  {
    id: 'mechanics',
    pillar: 'Pillar 4 · Biomechanics & Tissue',
    title: 'Mechanical Mismatch & Glial Encapsulation',
    subtitle: 'Mechanical Mismatch & Glial Encapsulation',
    problem: 'Rigid silicon and metal shanks (>100 GPa) are >1,000,000× stiffer than brain tissue (<30 kPa). Respiration and cardiac micromotion induce shear stress, neuronal loss, and glial scar encapsulation.',
    solution: 'Compliant polymer substrates (Polyimide, Parylene-C, SU-8, PDMS 1.9 MPa, SEBS NeuroString) with transient water-soluble insertion shuttles (Pullulan) or flexible glassy carbon fibers (fGCFs).'
  }
];

const modalitiesThai = [
  {
    name: 'Standard FSCV',
    mode: 'Phasic',
    waveform: 'รูปคลื่นสามเหลี่ยม -0.4 ถึง +1.3 V vs. Ag/AgCl ที่ 300–1200 V/s (มาตรฐาน 400 V/s) ความถี่ 10 Hz',
    resolution: '100 ms (ช่วงกวาด 8.5 ms ที่ 400 V/s)',
    selectivity: 'อาศัยตำแหน่งพีคออกซิเดชัน/รีดักชันเฉพาะตัวและการหักลบพื้นหลังก่อนการกระตุ้น',
    limitation: 'กระแสพื้นหลัง 300–400 nA ต้องการวงจร Dynamic Range สูง และสูญเสียค่าฐาน Tonic'
  },
  {
    name: 'Fixed-Potential Amperometry / Chronoamperometry',
    mode: 'Tonic',
    waveform: 'ป้อนศักย์ไฟฟ้าคงที่ (Constant Bias) หรือขั้นบันไดศักย์เดี่ยว (Potential Step)',
    resolution: 'ต่อเนื่อง (ระดับต่ำกว่ามิลลิวินาที)',
    selectivity: 'ใช้เยื่อเลือกผ่าน (oPD, mPD, Nafion) และเอนไซม์ออกซิเดสสำหรับวัด Glutamate / GABA / ACh',
    limitation: 'ขาดความจำเพาะทางเคมีในตัวเองหากมีสารรบกวนที่ออกซิไดซ์ที่ศักย์ใกล้เคียงกัน'
  },
  {
    name: 'FSCAV',
    mode: 'Tonic',
    waveform: 'ลำดับรูปคลื่นควบคุมการดูดซับ (Controlled Adsorption Waveform) บนขั้ว CFME',
    resolution: 'ระดับวินาที (Tonic Timescale)',
    selectivity: 'อาศัยสมดุลการดูดซับของโมเลกุลโดปามีนบนพื้นผิวเส้นใยคาร์บอนในเวลาที่กำหนด',
    limitation: 'ความเร็วเชิงเวลาช้ากว่า FSCV และไวต่อการเปลี่ยนแปลงจลนพลศาสตร์การดูดซับ'
  },
  {
    name: 'M-CSWV / N-MCSWV',
    mode: 'Tonic',
    waveform: 'ชุดพัลส์สี่เหลี่ยมแบบขั้นบันไดหลายรอบ (Multi-Cyclic Square Wave)',
    resolution: '10 วินาที (วัดค่าฐานโดปามีนใน rat NAcc ได้ 134 ± 32 nM)',
    selectivity: 'การหักลบพื้นหลังแบบไดนามิกร่วมกับการจำลองกระแสประจุพื้นหลัง',
    limitation: 'ความละเอียด 10 วินาทีไม่สามารถจับการหลั่งแบบ Phasic ระดับเสี้ยววินาทีได้'
  },
  {
    name: 'RPV + PLSR',
    mode: 'Phasic + Tonic',
    waveform: 'ลำดับพัลส์ศักย์ไฟฟ้าแบบขั้นบันไดเร็ว (Rapid-Pulse Voltammetry)',
    resolution: 'หลายช่วงเวลาพร้อมกัน (ทั้ง Phasic และ Tonic)',
    selectivity: 'ใช้การถดถอยกำลังสองน้อยที่สุดบางส่วน (PLSR) แยกโดปามีนและเซโรโทนินออกจากกระแสทรานเซียนต์',
    limitation: 'ต้องอาศัยชุดข้อมูลฝึกสอนหลายตัวแปร (Training Set) ที่ครอบคลุมสารรบกวนในเนื้อเยื่อ'
  },
  {
    name: 'Steered FSCV',
    mode: 'Phasic',
    waveform: 'ปรับลดความชัน dV/dt บริเวณพีคออกซิเดชันของโดปามีน (~+0.60 V) แบบปรับตัวได้',
    resolution: '100 ms (ความถี่ซ้ำ 10 Hz)',
    selectivity: 'กดกระแสประจุ Non-Faradaic เฉพาะจุดพีค ลด LoD ลง 39 เท่าเหลือ 0.17 nM',
    limitation: 'ต้องอาศัยวงจรป้อนกลับแบบวนซ้ำ (Iterative Steering) เพื่อปรับรูปคลื่นให้ตรงยอดปฏิกิริยา'
  },
  {
    name: 'FSCV + SDBR',
    mode: 'Phasic + Tonic',
    waveform: 'รูปคลื่นสามเหลี่ยม FSCV มาตรฐาน ร่วมกับการประมวลผลอนุพันธ์อันดับสอง (2nd Derivative)',
    resolution: '100 ms (ระดับรายสแกน)',
    selectivity: 'คำนวณอนุพันธ์อันดับสองข้ามพีคออกซิเดชันเพื่อกำจัดการเลื่อนของพื้นหลังอย่างช้าๆ',
    limitation: 'รักษาความไว Phasic และใช้กับฮาร์ดแวร์ FSCV เดิมได้ทันทีโดยไม่ต้องดัดแปลงวงจร'
  }
];

const modalitiesEn = [
  {
    name: 'Standard FSCV',
    mode: 'Phasic',
    waveform: 'Triangular sweep -0.4 to +1.3 V vs. Ag/AgCl at 300–1200 V/s (400 V/s standard), 10 Hz',
    resolution: '100 ms (8.5 ms sweep at 400 V/s)',
    selectivity: 'Characteristic oxidation/reduction peak potentials with pre-stimulus background subtraction',
    limitation: '300–400 nA background requires high dynamic range AFE and erases tonic baseline'
  },
  {
    name: 'Fixed-Potential Amperometry / Chronoamperometry',
    mode: 'Tonic',
    waveform: 'Constant bias potential or single potential step',
    resolution: 'Continuous (sub-millisecond)',
    selectivity: 'Permselective membranes (oPD, mPD, Nafion) and oxidase enzymes for Glutamate / GABA / ACh',
    limitation: 'Lacks intrinsic chemical specificity if interferents oxidize at similar potentials'
  },
  {
    name: 'FSCAV',
    mode: 'Tonic',
    waveform: 'Controlled adsorption waveform sequence on CFME',
    resolution: 'Seconds (Tonic timescale)',
    selectivity: 'Relies on dopamine adsorption equilibrium on carbon fiber over a fixed hold period',
    limitation: 'Slower temporal resolution than FSCV and sensitive to adsorption kinetics drift'
  },
  {
    name: 'M-CSWV / N-MCSWV',
    mode: 'Tonic',
    waveform: 'Multi-cyclic stepped square-wave pulse train',
    resolution: '10 s (134 ± 32 nM basal DA in rat NAcc)',
    selectivity: 'Dynamic background subtraction combined with capacitive background modeling',
    limitation: '10 s temporal resolution cannot capture sub-second phasic release transients'
  },
  {
    name: 'RPV + PLSR',
    mode: 'Phasic + Tonic',
    waveform: 'Rapid-Pulse Voltammetry stepped potential sequence',
    resolution: 'Multi-timescale simultaneous (Phasic & Tonic)',
    selectivity: 'Partial Least Squares Regression (PLSR) separates DA and 5-HT from transient currents',
    limitation: 'Requires a comprehensive multivariate training set covering tissue interferents'
  },
  {
    name: 'Steered FSCV',
    mode: 'Phasic',
    waveform: 'Adaptive dV/dt slope reduction near dopamine oxidation peak (~+0.60 V)',
    resolution: '100 ms (10 Hz repetition)',
    selectivity: 'Suppresses non-Faradaic charging current at the peak, lowering LoD 39× to 0.17 nM',
    limitation: 'Requires iterative feedback steering to align the waveform with peak kinetics'
  },
  {
    name: 'FSCV + SDBR',
    mode: 'Phasic + Tonic',
    waveform: 'Standard FSCV triangle with Second-Derivative Based Background Removal',
    resolution: '100 ms (per-scan)',
    selectivity: 'Second derivative across oxidation peak eliminates slow background drift',
    limitation: 'Preserves phasic sensitivity and works on existing FSCV hardware without modification'
  }
];

const materialsCardsData = [
  {
    id: 'bare-cfme',
    name: '1. Bare CFME (T-650)',
    tag: 'เส้นใยคาร์บอนมาตรฐานอ้างอิง',
    lod: '~15–50 nM (ขึ้นกับอัตราการกวาด)',
    sensitivity: '13.0 nA/µM (โดปามีนมาตรฐาน) · 1.7 nA/µM (ภาวะพาร์กินสัน)',
    selectivity: 'ค่าคงที่เวลา RC สั้นมาก (C_dl ≈ 1 nF) ตอบสนองได้ระดับมิลลิวินาที',
    stability: 'รุกรานเนื้อเยื่อต่ำกว่า Microdialysis แต่เปราะหักง่าย เกิด Biofouling เร็ว และถูกกัดกร่อนเมื่อกวาดเกิน +1.3 V'
  },
  {
    id: 'pei-cnt',
    name: '2. PEI-CNT / CNTYM',
    tag: 'เส้นใยท่อนาโนคาร์บอนปั่นเปียก',
    lod: '5.0 nM (PEI-CNT) · 13 ± 2 nM (CNTYM)',
    sensitivity: 'จลนพลศาสตร์ถ่ายโอนอิเล็กตรอนเร็ว (ลด ΔEp) รองรับการสแกนสูงสุด 90 Hz',
    selectivity: 'ต้านทานการอุดตันจาก Serotonin (5-HT) และ 5-HIAA ได้ดีเยี่ยม',
    stability: 'PEI-CNT คงความไวได้นาน >10 ชม. ในหลอดทดลอง และ CNTYM คงความไว 100% ตลอด 4 ชม. ในสมอง'
  },
  {
    id: 'nd-cooh',
    name: '3. ND-COOH (Carboxylated Nanodiamonds)',
    tag: 'อนุภาคนาโนเพชรหมู่ฟังก์ชันคาร์บอกซิล',
    lod: 'ระดับนาโนโมลาร์ต่ำบนพื้นผิวคาร์บอนดัดแปร',
    sensitivity: 'เพิ่มพื้นที่ผิวจำเพาะและหมู่ฟังก์ชันประจุลบดึงดูดไอออนบวกของโดปามีน',
    selectivity: 'ผลักประจุลบของสารรบกวน Ascorbic Acid (AA) และ DOPAC ได้อย่างมีประสิทธิภาพ',
    stability: 'ทนทานต่อการเกิดออกซิเดชันซ้ำๆ และลดการเกาะติดของโปรตีนในน้ำหล่อเลี้ยงสมอง'
  },
  {
    id: 'bdd-bncd',
    name: '4. BDD / B-NCD',
    tag: 'เพชรเจือโบรอนและเพชรนาโนคริสตัลไลน์',
    lod: '50 nM (W/BDD DPV) – 200 nM (Solid BDD FSCV)',
    sensitivity: 'หน้าต่างศักย์ไฟฟ้ากว้างมากและกระแสพื้นหลังต่ำเป็นพิเศษ',
    selectivity: 'ตรวจวัดได้ทั้ง Dopamine, Adenosine และสัญญาณไฟฟ้าเซลล์ประสาทเดี่ยว (Spikes)',
    stability: 'ชั้น B-NCD หนา 1 µm (เกรน 50 nm) บนเส้นใยคาร์บอน 7 µm คงความไวได้ 93.3% หลัง 3 วันและป้องกันการกัดกร่อน'
  },
  {
    id: 'pedot',
    name: '5. PEDOT:Nafion / PEDOT-CNT',
    tag: 'พอลิเมอร์นำไฟฟ้า + ท่อนาโนคาร์บอน',
    lod: '2.03 ± 0.09 nM (PEDOT-CNT SWV — ต่ำที่สุด)',
    sensitivity: '46 ± 13 nA/µM (PEDOT:Nafion — สูงกว่า Bare CFME ~3.5 เท่า)',
    selectivity: 'อัตราส่วนคัดแยก DA/AA = 1540 ± 150 และ DA/DOPAC = 52 ± 4',
    stability: 'ลด Impedance ทำให้บันทึกทั้งสารสื่อประสาทและ Spikes พร้อมกันได้บนฐาน Polyimide ยืดหยุ่น'
  },
  {
    id: 'graphene-aunp',
    name: '6. Graphene / AuNP / AuNS',
    tag: 'กราฟีนและอนุภาคนาโนทองคำเร่งปฏิกิริยา',
    lod: '20 nM (GR-FeTSPc) · 50 nM (AuNP CA)',
    sensitivity: 'เร่งปฏิกิริยาเชิงไฟฟ้า (Electrocatalysis) ลดศักย์เกินของการเกิดปฏิกิริยา',
    selectivity: 'แยกพีค DA และ 5-HT ได้ชัดเจน หรือติดฉลาก Aptamer บน Gold Nanostars (AuNS)',
    stability: 'เหมาะสำหรับการตรวจวัดหลายสารพร้อมกันในเทคนิค DPV, SWV และ Chronoamperometry'
  },
  {
    id: 'uip-cfm',
    name: '7. µIP-CFM',
    tag: 'หัวตรวจคาร์บอนไฟเบอร์รุกรานต่ำพิเศษ',
    lod: '5.7 nM (Dopamine FSCV)',
    sensitivity: 'ความไวระดับนาโนโมลาร์ตอนต้นสำหรับสัญญาณโดปามีนเรื้อรัง',
    selectivity: 'ลดการกระตุ้นเซลล์เกลีย (Microglia / Astrocytes) รอบปลายหัวตรวจอย่างมาก',
    stability: 'พิสูจน์เสถียรภาพในการตรวจวัดโดปามีนในสมองสิ่งมีชีวิตได้ยาวนานเกิน 1 ปี (> 1 Year)'
  }
];

const materialsCardsDataEn = [
  {
    id: 'bare-cfme',
    name: '1. Bare CFME (T-650)',
    tag: 'Standard Reference Carbon Fiber',
    lod: '~15–50 nM (scan-rate dependent)',
    sensitivity: '13.0 nA/µM (Healthy DA) · 1.7 nA/µM (Parkinsonian)',
    selectivity: 'Ultra-short RC time constant (C_dl ≈ 1 nF) enabling millisecond response',
    stability: 'Less invasive than microdialysis, but brittle, fouls rapidly, and etches above +1.3 V'
  },
  {
    id: 'pei-cnt',
    name: '2. PEI-CNT / CNTYM',
    tag: 'Wet-Spun Carbon Nanotube Fibers',
    lod: '5.0 nM (PEI-CNT) · 13 ± 2 nM (CNTYM)',
    sensitivity: 'Fast electron-transfer kinetics (reduced ΔEp), supporting up to 90 Hz scan rates',
    selectivity: 'Superior resistance to Serotonin (5-HT) and 5-HIAA surface fouling',
    stability: 'PEI-CNT retains sensitivity >10 h in vitro; CNTYM maintains 100% sensitivity over 4 h in vivo'
  },
  {
    id: 'nd-cooh',
    name: '3. ND-COOH (Carboxylated Nanodiamonds)',
    tag: 'Carboxyl-Functionalized Nanodiamonds',
    lod: 'Low nanomolar on modified carbon surfaces',
    sensitivity: 'Increases specific surface area and negatively charged groups that attract cationic dopamine',
    selectivity: 'Effectively repels anionic interferents Ascorbic Acid (AA) and DOPAC',
    stability: 'Resistant to repeated oxidation cycles and reduces protein adsorption in CSF'
  },
  {
    id: 'bdd-bncd',
    name: '4. BDD / B-NCD',
    tag: 'Boron-Doped & Nanocrystalline Diamond',
    lod: '50 nM (W/BDD DPV) – 200 nM (Solid BDD FSCV)',
    sensitivity: 'Ultra-wide electrochemical potential window and exceptionally low background current',
    selectivity: 'Detects Dopamine, Adenosine, and single-unit neuronal spikes',
    stability: '1 µm B-NCD (50 nm grains) on 7 µm CFME retains 93.3% sensitivity after 3 days and prevents etching'
  },
  {
    id: 'pedot',
    name: '5. PEDOT:Nafion / PEDOT-CNT',
    tag: 'Conducting Polymer + Carbon Nanotubes',
    lod: '2.03 ± 0.09 nM (PEDOT-CNT SWV — Lowest)',
    sensitivity: '46 ± 13 nA/µM (PEDOT:Nafion — ~3.5× higher than Bare CFME)',
    selectivity: 'Selectivity ratios: DA/AA = 1540 ± 150 and DA/DOPAC = 52 ± 4',
    stability: 'Lowers impedance for simultaneous neurochemical and spike recording on flexible Polyimide'
  },
  {
    id: 'graphene-aunp',
    name: '6. Graphene / AuNP / AuNS',
    tag: 'Electrocatalytic Graphene & Gold Nanostructures',
    lod: '20 nM (GR-FeTSPc) · 50 nM (AuNP CA)',
    sensitivity: 'Electrocatalysis lowers reaction overpotential and boosts peak definition',
    selectivity: 'Cleanly resolves DA and 5-HT peaks, or enables aptamer functionalization on Gold Nanostars (AuNS)',
    stability: 'Ideal for multiplexed detection in DPV, SWV, and Chronoamperometry'
  },
  {
    id: 'uip-cfm',
    name: '7. µIP-CFM',
    tag: 'Ultra-Low-Invasive Carbon Fiber Microprobe',
    lod: '5.7 nM (Dopamine FSCV)',
    sensitivity: 'Low-nanomolar sensitivity for chronic dopamine tracking',
    selectivity: 'Dramatically reduces microglia and astrocyte activation around the probe tip',
    stability: 'Demonstrated >1 year (> 1 Year) chronic dopamine recording stability in vivo'
  }
];

const cmosArchitecturesThai = [
  {
    name: 'Hall et al. (2022) I-ΔΣ',
    process: '0.18 µm CMOS (3.3 V AFE / 1.8 V Core)',
    topology: '2-Electrode Pseudo-Differential Class-AB CMR + Regulated Current Conveyor + 1st-Order I-ΔΣ ADC',
    noise: '26.5 pArms (Open) / 39.2 pArms (1 nF Load) @ 5 kHz',
    dr: '83 dB Effective DR (หักล้างพื้นหลังได้ 290 nApp)',
    powerArea: '3.74 µW เฉลี่ย (Duty-Cycled) | 0.256 mm²/ch',
    xArea: 0.256,
    yNoise: 39.2,
    rBubble: 13
  },
  {
    name: '128-Ch R-TIA Array',
    process: '0.35 µm CMOS (n-well ~1,000 Ω/sq)',
    topology: '128-Ch Programmable Resistive-Feedback TIA (ปรับเกน 23 ระดับ) + Digital Background Subtraction',
    noise: '220 pArms (Gain 1, 40 kHz) ถึง 1,990 pArms (Gain 4)',
    dr: '±650 nA (Gain 1) ถึง ±5 µA (Gain 4) @ 400 V/s',
    powerArea: '0.0176 mm²/ch (รวม 2.25 mm² สำหรับ 128 ช่อง)',
    xArea: 0.0176,
    yNoise: 220,
    rBubble: 16
  },
  {
    name: 'Dual-Slope ROI Integrator',
    process: '1.8 V CMOS (Recycling Folded Cascode OTA)',
    topology: '3-Electrode Control OTA + หักล้างกระแสคงที่ช่วง ROI + Dual-Slope Current-to-Time ADC',
    noise: '~30 pA ขีดจำกัดการตรวจวัด (5.1 µVrms OTA Noise)',
    dr: '70.7 dB Max SNR | 62.4 dB SNDR (10 ENOB) @ 165 nA',
    powerArea: '18 µW เฉพาะภาค OTA | ~0.045 mm²/ch',
    xArea: 0.045,
    yNoise: 30,
    rBubble: 11
  },
  {
    name: 'SC-TIA + SAR ADC (2026)',
    process: '0.18 µm TSMC CMOS (1.8 V)',
    topology: 'Switched-Capacitor TIA + 3-Bit PGA + SAR ADC + NMOS-Only Multiplexer',
    noise: 'Sub-100 pA (<0.1 nA) Input Leakage Floor',
    dr: '±4 µA @ fCLK = 180 kHz (ความเป็นเชิงเส้น R² = 0.998)',
    powerArea: '210 µW (0.21 mW) | 2.89 mm² (ทั้งชิป 1.7 × 1.7 mm)',
    xArea: 2.89,
    yNoise: 100,
    rBubble: 14
  },
  {
    name: 'Compact SC Pixel Arrays',
    process: '0.18 µm CMOS (สูงสุด 1,024 ช่องขนาน)',
    topology: '8–14 Transistor Switched-Capacitor Integrator (ตัวเก็บประจุ 50 fF)',
    noise: '0.11 pArms (110 fArms @ 2 kHz) ถึง 2.28 pArms',
    dr: '±1.5 nA ถึง ±60 nA (อิ่มตัวหากใช้กับพื้นหลัง FSCV 400 nA)',
    powerArea: '2.2 µW/ch | 0.00012 mm²/ch (10 × 12 µm)',
    xArea: 0.00012,
    yNoise: 0.11,
    rBubble: 8
  },
  {
    name: 'Neurochemostat SoC',
    process: '0.35 µm AMS 2P/4M CMOS',
    topology: 'SoC วงปิดรวมภาควัดโดปามีน FSCV + ภาคกระตุ้นไฟฟ้าขนาดไมโครบนชิปเดียว',
    noise: 'ความละเอียดระดับโดปามีนทางสรีรวิทยา (~150 pArms)',
    dr: 'รองรับการตรวจวัดและกระตุ้นแบบวงปิดครบวงจร',
    powerArea: '10.56 mm² (พื้นที่ทั้ง SoC 3.3 × 3.2 mm)',
    xArea: 10.56,
    yNoise: 150,
    rBubble: 15
  }
];

const cmosArchitecturesEn = [
  {
    name: 'Hall et al. (2022) I-ΔΣ',
    process: '0.18 µm CMOS (3.3 V AFE / 1.8 V Core)',
    topology: '2-Electrode Pseudo-Differential Class-AB CMR + Regulated Current Conveyor + 1st-Order I-ΔΣ ADC',
    noise: '26.5 pArms (Open) / 39.2 pArms (1 nF Load) @ 5 kHz',
    dr: '83 dB Effective DR (290 nApp background cancellation)',
    powerArea: '3.74 µW avg (Duty-Cycled) | 0.256 mm²/ch'
  },
  {
    name: '128-Ch R-TIA Array',
    process: '0.35 µm CMOS (n-well ~1,000 Ω/sq)',
    topology: '128-Ch Programmable Resistive-Feedback TIA (23 gain steps) + Digital Background Subtraction',
    noise: '220 pArms (Gain 1, 40 kHz) to 1,990 pArms (Gain 4)',
    dr: '±650 nA (Gain 1) to ±5 µA (Gain 4) @ 400 V/s',
    powerArea: '0.0176 mm²/ch (2.25 mm² total for 128 ch)'
  },
  {
    name: 'Dual-Slope ROI Integrator',
    process: '1.8 V CMOS (Recycling Folded Cascode OTA)',
    topology: '3-Electrode Control OTA + Constant ROI Current Subtraction + Dual-Slope Current-to-Time ADC',
    noise: '~30 pA detection limit (5.1 µVrms OTA Noise)',
    dr: '70.7 dB Max SNR | 62.4 dB SNDR (10 ENOB) @ 165 nA',
    powerArea: '18 µW (OTA only) | ~0.045 mm²/ch'
  },
  {
    name: 'SC-TIA + SAR ADC (2026)',
    process: '0.18 µm TSMC CMOS (1.8 V)',
    topology: 'Switched-Capacitor TIA + 3-Bit PGA + SAR ADC + NMOS-Only Multiplexer',
    noise: 'Sub-100 pA (<0.1 nA) Input Leakage Floor',
    dr: '±4 µA @ fCLK = 180 kHz (Linearity R² = 0.998)',
    powerArea: '210 µW (0.21 mW) | 2.89 mm² (1.7 × 1.7 mm die)'
  },
  {
    name: 'Compact SC Pixel Arrays',
    process: '0.18 µm CMOS (up to 1,024 parallel channels)',
    topology: '8–14 Transistor Switched-Capacitor Integrator (50 fF capacitor)',
    noise: '0.11 pArms (110 fArms @ 2 kHz) to 2.28 pArms',
    dr: '±1.5 nA to ±60 nA (saturates under 400 nA FSCV background)',
    powerArea: '2.2 µW/ch | 0.00012 mm²/ch (10 × 12 µm)'
  },
  {
    name: 'Neurochemostat SoC',
    process: '0.35 µm AMS 2P/4M CMOS',
    topology: 'Closed-loop SoC integrating FSCV dopamine sensing + micro-stimulator on one chip',
    noise: 'Physiological dopamine resolution (~150 pArms)',
    dr: 'Supports full closed-loop sensing and stimulation',
    powerArea: '10.56 mm² (3.3 × 3.2 mm total SoC area)'
  }
];

const topologiesThai = [
  {
    id: 'pseudo-diff',
    name: '1. 2-Electrode Pseudo-Differential CMR',
    badge: 'สัญญาณรบกวนต่ำสุดสำหรับ FSCV (39.2 pArms)',
    pros: 'ใช้ขั้วไฟฟ้าอ้างอิงจำลอง (Dummy Electrode) คู่กับวงจร Class-AB Common-Mode Rejection หักล้างกระแสพื้นหลัง 290 nApp ในภาคแอนะล็อกก่อนเข้า I-ΔΣ ADC ทำให้ลดความต้องการ Dynamic Range ของ ADC และลดกำลังงานเหลือ 3.74 µW',
    cons: 'ต้องจับคู่ความจุไฟฟ้า C_dl ระหว่างขั้วทำงานและขั้วอ้างอิงจำลองให้ใกล้เคียงกัน และความต้านทานสารละลายที่สูงอาจทำให้เกิดแรงดันตกคร่อมเล็กน้อย'
  },
  {
    id: 'three-elec-ota',
    name: '2. 3-Electrode Control OTA',
    badge: 'ควบคุมศักย์เซลล์เคมีไฟฟ้าแม่นยำสูงสุด',
    pros: 'แยกกระแสไหลผ่าน Counter Electrode (CE) ออกจาก Reference Electrode (RE) ทำให้ไม่มีกระแสไหลผ่านขั้วอ้างอิง ป้องกันการโพลาไรซ์ของ RE และรักษาศักย์ไฟฟ้าที่ขั้วทำงานอย่างแม่นยำแม้ในเนื้อเยื่อที่มีความต้านทานสูง',
    cons: 'ต้องใช้วงจร Control Amplifier เพิ่มเติมซึ่งกินกำลังงานและพื้นที่ชิปมากขึ้น และต้องออกแบบการชดเชยเฟส (Frequency Compensation) เพื่อป้องกันการสั่นค้างเมื่อต่อโหลด C_dl ขนาดใหญ่'
  },
  {
    id: 'rtia-array',
    name: '3. Resistive-Feedback R-TIA Array',
    badge: 'ขยายจำนวนช่องสัญญาณได้สูงสุด (128 Channels)',
    pros: 'โครงสร้างเรียบง่าย ใช้ตัวต้านทาน n-well ความหนาแน่นสูงร่วมกับสวิตช์ปรับเกน 23 ระดับ ทำให้สามารถรวมวงจรขยายสัญญาณได้ถึง 128 ช่องในพื้นที่เพียง 2.25 mm² (0.0176 mm²/ช่อง) เหมาะสำหรับการทำแผนที่สารสื่อประสาทหลายจุดพร้อมกัน',
    cons: 'ตัวต้านทานป้อนกลับสร้าง Thermal Noise สูงกว่าแบบ Capacitive (220–1,990 pArms) และต้องใช้ ADC ความละเอียดสูงเพื่อรองรับกระแสพื้นหลังเต็มพิสัยก่อนหักลบในภาคดิจิทัล'
  }
];

const topologiesEn = [
  {
    id: 'pseudo-diff',
    name: '1. 2-Electrode Pseudo-Differential CMR',
    badge: 'Lowest FSCV Noise Floor (39.2 pArms)',
    pros: 'Uses a dummy reference electrode with a Class-AB Common-Mode Rejection stage to cancel 290 nApp background current in the analog domain before the I-ΔΣ ADC, relaxing ADC dynamic range and cutting average power to 3.74 µW.',
    cons: 'Requires close C_dl matching between working and dummy electrodes, and high solution resistance can introduce slight IR voltage drop.'
  },
  {
    id: 'three-elec-ota',
    name: '2. 3-Electrode Control OTA',
    badge: 'Highest Electrochemical Potential Accuracy',
    pros: 'Separates Counter Electrode (CE) current from the Reference Electrode (RE), ensuring zero current flows through RE, preventing RE polarization, and maintaining accurate working-electrode potential even in high-impedance tissue.',
    cons: 'Requires an extra control amplifier that consumes additional power and silicon area, plus careful frequency compensation to avoid oscillation under large C_dl loads.'
  },
  {
    id: 'rtia-array',
    name: '3. Resistive-Feedback R-TIA Array',
    badge: 'Highest Channel Scalability (128 Channels)',
    pros: 'Simple architecture using high-density n-well resistors with 23-step gain switching, packing 128 channels into just 2.25 mm² (0.0176 mm²/ch) for simultaneous multi-site neurotransmitter mapping.',
    cons: 'Feedback resistors generate higher thermal noise than capacitive topologies (220–1,990 pArms) and require a high-resolution ADC to digitize the full background before digital subtraction.'
  }
];

const clinicalDomainsThai = {
  chemometrics: {
    title: 'Chemometrics & AI: การถอดรหัสสัญญาณหลายสารสื่อประสาทแบบเรียลไทม์',
    badge: 'PCR · PLSR · Elastic Net · 1D-CNN · LSTM · PINNs',
    summary: 'โวลแทมโมแกรมในสมองมีชีวิตประกอบด้วยสัญญาณซ้อนทับของ Dopamine, Serotonin, Adenosine, H₂O₂, การเปลี่ยนแปลง pH และการเลื่อนของขั้วไฟฟ้า การวิเคราะห์หลายตัวแปรและปัญญาประดิษฐ์ช่วยแยกองค์ประกอบแต่ละชนิดได้อย่างแม่นยำ',
    points: [
      '<strong>PCR ร่วมกับ Malinowski’s F-test &amp; PLSR:</strong> คัดเลือกองค์ประกอบหลักที่มีนัยสำคัญทางสถิติและกำจัดสัญญาณรบกวน ทำให้แยกความเข้มข้นโดปามีนออกจากความผันผวนของ pH ในเนื้อเยื่อสมองได้อย่างแม่นยำ',
      '<strong>Elastic Net Regression:</strong> ผสาน L1 และ L2 Regularization เพื่อเลือกจุดศักย์ไฟฟ้าที่มีความจำเพาะสูงและทนทานต่อการเลื่อนของตำแหน่งพีค (Peak Shift) เมื่อขั้วอ้างอิงเกิดการเปลี่ยนแปลง',
      '<strong>โครงข่ายประสาทเทียมเชิงลึกและ PINNs:</strong> โมเดล 1D-CNN, LSTM และ Physics-Informed Neural Networks (PINNs) เรียนรู้พลวัตไม่เชิงเส้นของปฏิกิริยารีดอกซ์และการแพร่ของโมเลกุล ทำให้ทำนายความเข้มข้นได้แม่นยำแม้ในสภาวะที่มีสิ่งรบกวนสูง'
    ]
  },
  parkinsons: {
    title: "โรคพาร์กินสัน (Parkinson's Disease): ภาวะพร่องโดปามีนและกลไกของ STN-DBS",
    badge: 'Nigrostriatal Dopamine Depletion & Neuromodulation',
    summary: 'การเสื่อมสลายของเซลล์ประสาทสร้างโดปามีนใน Substantia Nigra ทำให้ระดับโดปามีนพื้นฐาน (Tonic Dopamine) ใน Striatum ลดลงอย่างรุนแรง การตรวจวัดทางเคมีไฟฟ้าช่วยยืนยันกลไกการรักษาด้วย DBS',
    points: [
      '<strong>STN-DBS ยกระดับ Tonic Dopamine:</strong> การวัดด้วยโวลแทมเมทรีในแบบจำลองโรคพาร์กินสันพบว่าการกระตุ้น Subthalamic Nucleus (STN-DBS) ช่วยเพิ่มความเข้มข้นพื้นฐานของโดปามีนใน Striatum อย่างมีนัยสำคัญ',
      '<strong>เซนเซอร์เอนไซม์ความไวสูงพิเศษ:</strong> การเคลือบ Tyrosinase/CeO₂/TiO₂-Chitosan บนเส้นใยคาร์บอนเพิ่มความไวในการตรวจวัดโดปามีนขึ้นกว่า 8 เท่า (จาก 1.7 เป็น 14.2 nA/µM) เพื่อตรวจจับระดับโดปามีนที่ต่ำมากในภาวะโรค',
      '<strong>ระบบไร้สาย WINCS ร่วมกับ fMRI:</strong> เชื่อมโยงการหลั่งโดปามีนเฉพาะจุดเข้ากับการตอบสนองของเครือข่ายสมองทั้งระบบแบบเรียลไทม์'
    ]
  },
  addiction: {
    title: 'การเสพติดสารเสพติด (Substance Addiction): พลวัตที่แตกต่างระหว่าง Phasic และ Tonic',
    badge: 'Nucleus Accumbens Core (NAcc) Reward Circuitry',
    summary: 'การใช้เทคนิค FSCV ร่วมกับ M-CSWV และแพลตฟอร์ม MAVEN เผยให้เห็นความแตกต่างเชิงกลไกระหว่างสารกระตุ้นประสาทกลุ่มโคเคนและกลุ่มโอปิออยด์',
    points: [
      '<strong>โคเคน (Cocaine):</strong> เพิ่มทั้งการหลั่งโดปามีนฉับพลัน (Phasic DA เพิ่มขึ้น 2.4 เท่า) และยกระดับโดปามีนพื้นฐานในไซแนปส์ (Tonic DA เพิ่มขึ้น 1.9 เท่า) โดยสารยับยั้ง DAT/Sigma สามารถลดการพุ่งสูงนี้ได้',
      '<strong>เฟนทานิล (Fentanyl) และพฤติกรรมเสพติดเรื้อรัง:</strong> พฤติกรรมการแสวงหายากลุ่มโอปิออยด์ถูกขับเคลื่อนโดยการเปลี่ยนแปลงของระดับ Tonic มากกว่า Phasic โดยเฟนทานิลยกระดับ Tonic DA ใน NAcc ภายใน 5 นาที',
      '<strong>ออกซิโคโดน (Oxycodone 2.5 mg/kg IV):</strong> เพิ่มระดับ Tonic 5-HT ขึ้น +23.37 ± 3.19 nM ที่เวลา 1 ชั่วโมง ขณะที่กดการหลั่ง Phasic 5-HT ให้ลดลงเหลือ 62% ของกลุ่มควบคุม'
    ]
  },
  depression_human: {
    title: 'โรคซึมเศร้าและการผ่าตัดในมนุษย์ (Depression & Human Intraoperative Surgery)',
    badge: 'Serotonin Dynamics & Striatal Reward Prediction Errors',
    summary: 'การตรวจวัดเซโรโทนินช่วยติดตามการออกฤทธิ์ของยาต้านเศร้า ขณะที่การบันทึกสัญญาณในสมองมนุษย์ขณะผ่าตัด DBS เปิดเผยกลไกการประมวลผลรางวัลระดับสูงของมนุษย์',
    points: [
      '<strong>โรคซึมเศร้าและยา Escitalopram (SSRI):</strong> เทคนิค N-FSCV (1000 V/s, LoD < 5 nM) และรูปคลื่น ESW 5-HT แยกเซโรโทนินออกจากโดปามีนได้สมบูรณ์ และพบว่า Escitalopram เพิ่มการหลั่ง 5-HT ที่ถูกกระตุ้นขึ้น +42% ภายใน 35 นาที',
      '<strong>การผ่าตัดในมนุษย์ขณะตื่น (Kishida, Montague &amp; Lee):</strong> การวัด FSCV ใน Striatum ของผู้ป่วยขณะผ่าตัด DBS พบว่าโดปามีนระดับต่ำกว่าวินาทีเข้ารหัสทั้ง Actual และ Counterfactual Reward Prediction Errors ("สิ่งที่เกิดขึ้นจริง" เทียบกับ "สิ่งที่อาจเกิดขึ้นได้")',
      '<strong>กรอบความปลอดภัยและ IRB Window:</strong> การทดลองในมนุษย์ขณะผ่าตัดจำกัดเวลาไว้ไม่เกิน 15–60 นาทีต่อจากการผ่าตัดมาตรฐาน 4 ชั่วโมง และต้องมีระบบคัดแยกสิ่งรบกวนจากการขยับตัวของสมองอย่างเข้มงวด'
    ]
  }
};

const clinicalDomainsEn = {
  chemometrics: {
    title: 'Chemometrics & AI: Real-Time Multi-Analyte Neurochemical Decoding',
    badge: 'PCR · PLSR · Elastic Net · 1D-CNN · LSTM · PINNs',
    summary: 'In vivo voltammograms contain overlapping signals from Dopamine, Serotonin, Adenosine, H₂O₂, pH shifts, and electrode drift. Multivariate chemometrics and deep learning cleanly deconvolve each analyte.',
    points: [
      '<strong>PCR with Malinowski’s F-test &amp; PLSR:</strong> Selects statistically significant principal components and rejects noise, accurately separating dopamine concentration from pH fluctuations in brain tissue.',
      '<strong>Elastic Net Regression:</strong> Combines L1 and L2 regularization to select specific potential features that remain robust against peak shifts caused by reference electrode drift.',
      '<strong>Deep Neural Networks &amp; PINNs:</strong> 1D-CNN, LSTM, and Physics-Informed Neural Networks (PINNs) learn nonlinear redox and diffusion kinetics for accurate prediction under heavy interference.'
    ]
  },
  parkinsons: {
    title: "Parkinson's Disease: Dopamine Depletion & STN-DBS Mechanisms",
    badge: 'Nigrostriatal Dopamine Depletion & Neuromodulation',
    summary: 'Degeneration of dopaminergic neurons in the Substantia Nigra severely depletes striatal tonic dopamine. Electrochemical sensing directly validates DBS therapeutic mechanisms.',
    points: [
      '<strong>STN-DBS Elevates Tonic Dopamine:</strong> Voltammetric measurements in Parkinsonian models show Subthalamic Nucleus stimulation (STN-DBS) significantly restores striatal tonic dopamine levels.',
      '<strong>Ultra-Sensitive Enzymatic Sensors:</strong> Tyrosinase/CeO₂/TiO₂-Chitosan coatings on carbon fibers boost dopamine sensitivity >8× (from 1.7 to 14.2 nA/µM) to resolve severely depleted disease states.',
      '<strong>Wireless WINCS + fMRI:</strong> Links localized dopamine release directly to whole-brain functional network responses in real time.'
    ]
  },
  addiction: {
    title: 'Substance Addiction: Distinct Phasic vs. Tonic Dopamine & Serotonin Dynamics',
    badge: 'Nucleus Accumbens Core (NAcc) Reward Circuitry',
    summary: 'Combining FSCV with M-CSWV and the MAVEN platform reveals mechanistic differences between psychostimulants (cocaine) and opioids (fentanyl, oxycodone).',
    points: [
      '<strong>Cocaine:</strong> Elevates both phasic dopamine release (2.4× increase) and extracellular tonic dopamine (1.9× increase), both attenuated by DAT/Sigma inhibitors.',
      '<strong>Fentanyl &amp; Chronic Drug Seeking:</strong> Opioid-seeking behavior is driven primarily by tonic rather than phasic shifts, with fentanyl elevating NAcc tonic DA within 5 minutes.',
      '<strong>Oxycodone (2.5 mg/kg IV):</strong> Increases tonic 5-HT by +23.37 ± 3.19 nM at 1 hour while suppressing phasic 5-HT release to 62% of control.'
    ]
  },
  depression_human: {
    title: 'Depression & Awake Human Intraoperative Surgery',
    badge: 'Serotonin Dynamics & Striatal Reward Prediction Errors',
    summary: 'Serotonin voltammetry tracks antidepressant pharmacology in real time, while intraoperative human DBS recordings reveal sub-second reward prediction coding.',
    points: [
      '<strong>Depression &amp; Escitalopram (SSRI):</strong> N-FSCV (1000 V/s, LoD < 5 nM) and the 5-HT ESW waveform cleanly isolate serotonin from dopamine, showing Escitalopram boosts evoked 5-HT by +42% within 35 min.',
      '<strong>Awake Human Surgery (Kishida, Montague &amp; Lee):</strong> Striatal FSCV in awake DBS patients revealed that sub-second dopamine encodes both Actual and Counterfactual Reward Prediction Errors ("what happened" vs. "what could have happened").',
      '<strong>Safety &amp; IRB Window:</strong> Intraoperative human recordings are strictly bounded to 15–60 min alongside standard 4-hour surgery with rigorous motion-artifact rejection.'
    ]
  }
};

const dbsPipelineData = [
  {
    step: 'ขั้นตอนที่ 1',
    title: '10 Hz FSCV Sensing',
    spec: '7 µm CFME / Flexible PEDOT-CNT MEA',
    detail: 'ขั้วไฟฟ้าที่ฝังในสมองส่วน Striatum กวาดศักย์ไฟฟ้ารูปสามเหลี่ยมที่ความถี่ 10 Hz เพื่อตรวจจับกระแสรีดอกซ์ระดับพิโคแอมแปร์ของการหลั่งโดปามีนแบบเรียลไทม์'
  },
  {
    step: 'ขั้นตอนที่ 2',
    title: '5th-Order Butterworth 100 Hz',
    spec: 'Low-Pass Digital Filtering (fc = 100 Hz)',
    detail: 'สัญญาณกระแสดิบจากวงจร CMOS AFE และตัวแปลง I-ΔΣ ADC ผ่านตัวกรองความถี่ต่ำผ่าน Butterworth อันดับ 5 ที่จุดตัด 100 Hz เพื่อกำจัดสัญญาณรบกวนความถี่สูงและสิ่งรบกวนจากการกระตุ้น'
  },
  {
    step: 'ขั้นตอนที่ 3',
    title: '7th-Deg Poly & 2nd-Order Exp Fit',
    spec: 'Kinetic Release & Reuptake Modeling',
    detail: 'ถอดรหัสความเข้มข้นโดปามีนและฟิตเส้นโค้งจลนพลศาสตร์การหลั่งและการดูดกลับด้วยสมการพหุนามดีกรี 7 ร่วมกับฟังก์ชันเอกซ์โพเนนเชียลอันดับ 2 เพื่อสกัดพารามิเตอร์ทางสรีรวิทยา'
  },
  {
    step: 'ขั้นตอนที่ 4',
    title: 'Double-Layer Feedforward ANN',
    spec: '150 Hidden Neurons · Levenberg–Marquardt',
    detail: 'โครงข่ายประสาทเทียมแบบป้อนไปข้างหน้า 2 ชั้น (150 Hidden Neurons ฝึกสอนด้วยอัลกอริทึม Levenberg–Marquardt) คำนวณความถี่และความกว้างพัลส์กระตุ้นที่เหมาะสมที่สุดเพื่อคืนสมดุลโดปามีน'
  },
  {
    step: 'ขั้นตอนที่ 5',
    title: 'Stimulation Output',
    spec: '20–200 Hz · Pulse Width 0.1–2.0 ms',
    detail: 'ส่งพัลส์กระตุ้นไฟฟ้าแบบสมดุลประจุ (Charge-Balanced Biphasic Pulses) ในช่วงความถี่ 20–200 Hz (จุดเหมาะสมทางสรีรวิทยา ~100 Hz) และความกว้างพัลส์ 0.1–2.0 ms เพื่อควบคุมระดับโดปามีนแบบวงปิด'
  }
];

const dbsPipelineDataEn = [
  {
    step: 'Stage 1',
    title: '10 Hz FSCV Sensing',
    spec: '7 µm CFME / Flexible PEDOT-CNT MEA',
    detail: 'Implanted striatal microelectrodes sweep a 10 Hz triangular potential waveform to capture picoampere-level dopamine redox currents in real time.'
  },
  {
    step: 'Stage 2',
    title: '5th-Order Butterworth 100 Hz',
    spec: 'Low-Pass Digital Filtering (fc = 100 Hz)',
    detail: 'Raw current from the CMOS AFE and I-ΔΣ ADC passes through a 5th-order 100 Hz low-pass Butterworth filter to reject high-frequency noise and stimulation artifacts.'
  },
  {
    step: 'Stage 3',
    title: '7th-Deg Poly & 2nd-Order Exp Fit',
    spec: 'Kinetic Release & Reuptake Modeling',
    detail: 'Decodes dopamine concentration and fits release/reuptake kinetics using a 7th-degree polynomial paired with a 2nd-order exponential model to extract physiological parameters.'
  },
  {
    step: 'Stage 4',
    title: 'Double-Layer Feedforward ANN',
    spec: '150 Hidden Neurons · Levenberg–Marquardt',
    detail: 'A double-layer feedforward neural network (150 hidden neurons trained with Levenberg–Marquardt) computes the optimal stimulation frequency and pulse width to restore dopamine homeostasis.'
  },
  {
    step: 'Stage 5',
    title: 'Stimulation Output',
    spec: '20–200 Hz · Pulse Width 0.1–2.0 ms',
    detail: 'Delivers charge-balanced biphasic stimulation pulses across 20–200 Hz (physiological optimum ~100 Hz) and 0.1–2.0 ms pulse width for closed-loop dopamine control.'
  }
];

const irlScenariosThai = [
  {
    id: 'awake-dbs',
    code: 'IRL-01 · ประสาทศัลยศาสตร์คลินิก',
    title: 'ห้องผ่าตัดสมองขณะผู้ป่วยรู้สึกตัว (Awake Human DBS Surgery)',
    summary: 'ทำแผนที่การหลั่งโดปามีนใน Striatum แบบเรียลไทม์ระหว่างการผ่าตัดฝังขั้วกระตุ้น DBS เพื่อนำทางตำแหน่งขั้วไฟฟ้าอย่างแม่นยำ',
    problem: 'ระหว่างการผ่าตัดฝังขั้วไฟฟ้า DBS ในผู้ป่วยโรคพาร์กินสันหรือโรคย้ำคิดย้ำทำ ศัลยแพทย์อาศัยเพียงภาพถ่ายรังสีและสัญญาณไฟฟ้าเซลล์ประสาท (Microelectrode Recording) ซึ่งไม่สามารถยืนยันได้โดยตรงว่าปลายขั้วไฟฟ้าอยู่ในตำแหน่งที่กระตุ้นวงจรสารสื่อประสาทโดปามีนได้เหมาะสมที่สุดหรือไม่',
    stack: {
      electrode: 'ขั้วไฟฟ้าเส้นใยคาร์บอน CFME ขนาด 7 µm (ปลายเปิด ~100 µm) ออกแบบให้สอดผ่านท่อนำร่องผ่าตัดสมองมาตรฐานได้',
      waveform: 'Standard FSCV (-0.4 V ถึง +1.3 V vs. Ag/AgCl ที่ 400 V/s, ความถี่ 10 Hz) บันทึกในกรอบเวลา IRB 15–60 นาทีระหว่างผู้ป่วยทำภารกิจตัดสินใจ',
      afe: 'ระบบวัดโวลแทมเมทรีสัญญาณรบกวนต่ำระดับพิโคแอมแปร์ที่แยกสัญญาณขณะผู้ป่วยตื่นและขยับตัวเล็กน้อยได้',
      decoder: 'PCR / Elastic Net Regression ถอดรหัส Reward Prediction Errors (ทั้ง Actual และ Counterfactual RPEs ตามงานวิจัยของ Kishida, Montague & Lee / Carilion Clinic / Mayo Clinic)'
    },
    advantage: 'ยืนยันการตอบสนองทางเคมีประสาทในสมองมนุษย์แบบเรียลไทม์ (ความละเอียด 100 ms) แทนการคาดเดาจากตำแหน่งกายวิภาคเพียงอย่างเดียว ช่วยเพิ่มความแม่นยำในการวางตำแหน่งขั้วกระตุ้น DBS'
  },
  {
    id: 'closed-loop-dbs',
    code: 'IRL-02 · อุปกรณ์ฝังในร่างกายอัจฉริยะ',
    title: 'เครื่องกระตุ้นสมองแบบวงปิดอัตโนมัติ (Adaptive Closed-Loop DBS / Neurochemostat)',
    summary: 'ชิป SoC ไร้สายทำหน้าที่เป็นเทอร์โมสตัททางเคมีประสาท ส่งพัลส์กระตุ้น ~100 Hz เฉพาะเมื่อระดับโดปามีนในสมองลดต่ำลง',
    problem: 'เครื่องกระตุ้นสมองส่วนลึกแบบวงเปิด (Open-Loop DBS) ในปัจจุบันปล่อยกระแสไฟฟ้าความถี่สูงคงที่ตลอด 24 ชั่วโมง ทำให้สิ้นเปลืองแบตเตอรี่อย่างรวดเร็ว (ต้องผ่าตัดเปลี่ยนแบตเตอรี่ซ้ำ) และก่อให้เกิดผลข้างเคียง เช่น อาการเคลื่อนไหวผิดปกติ (Dyskinesia) พูดไม่ชัด หรืออารมณ์แปรปรวนเมื่อกระตุ้นเกินความจำเป็น',
    stack: {
      electrode: 'หัวตรวจคาร์บอนไฟเบอร์อายุการใช้งานยาวนาน µIP-CFM (เสถียรเกิน 1 ปี) หรืออาร์เรย์ยืดหยุ่นเคลือบ PEDOT:Nafion',
      waveform: 'FSCV 10 Hz สลับจังหวะกับพัลส์กระตุ้น (Time-Multiplexed Sensing & Stimulation) เพื่อป้องกันสิ่งรบกวนจากการกระตุ้น',
      afe: 'ชิปไร้สายฝังในร่างกาย WINCS Harmoni / MAVEN / Neurochemostat (0.35 µm CMOS) หรือวงจร Hall et al. (กินไฟเพียง 3.74 µW, สัญญาณรบกวน 39.2 pArms)',
      decoder: 'ตัวกรอง Butterworth 100 Hz ร่วมกับโครงข่ายประสาทเทียม ANN (150 Hidden Neurons, Levenberg–Marquardt) ปรับความถี่ (~100 Hz) และความกว้างพัลส์ (0.1–2.0 ms) อัตโนมัติ'
    },
    advantage: 'ทำหน้าที่เป็น “เทอร์โมสตัททางเคมีประสาท” จ่ายพลังงานกระตุ้นเฉพาะช่วงเวลาที่โดปามีนพร่อง ช่วยยืดอายุการใช้งานแบตเตอรี่ของอุปกรณ์ฝังในร่างกายและลดผลข้างเคียงทางระบบประสาทอย่างมีนัยสำคัญ'
  },
  {
    id: 'psychopharmacology',
    code: 'IRL-03 · อุตสาหกรรมยาและจิตเวชศาสตร์แม่นยำ',
    title: 'การพัฒนายาทางจิตเวชและรักษาการเสพติด (Precision Psychopharmacology & Addiction R&D)',
    summary: 'คัดกรองประสิทธิภาพและกลไกการออกฤทธิ์ของยาต้านเศร้าและยารักษาการเสพติดต่อโดปามีนและเซโรโทนินได้ภายในไม่กี่นาที',
    problem: 'การทดสอบยาทางจิตเวชและยาบำบัดการเสพติดด้วยเทคนิค Microdialysis แบบดั้งเดิมต้องใช้เวลารอเก็บตัวอย่าง 10–20 นาทีต่อจุด ทำให้มองไม่เห็นการเปลี่ยนแปลงฉับพลันของวงจรรางวัล (Reward Circuitry) และทำให้การคัดกรองตัวยาใหม่ในสัตว์ทดลองล่าช้าและมีต้นทุนสูง',
    stack: {
      electrode: 'อาร์เรย์หลายช่องสัญญาณ PEI-CNT / CNTYM (LoD 5 nM) และอาร์เรย์ 128 ช่องสำหรับวัดพร้อมกันหลายบริเวณสมอง (NAcc, PFC, Dorsal Striatum)',
      waveform: 'N-FSCV (1000 V/s สำหรับเซโรโทนิน), M-CSWV (ความละเอียด 10 วินาที สำหรับ Tonic) และ RPV-PLSR วัด Phasic + Tonic พร้อมกัน',
      afe: 'ชิปอาร์เรย์ความหนาแน่นสูง 128-Ch Programmable R-TIA (พื้นที่ 2.25 mm²) และแพลตฟอร์มไร้สาย MAVEN สำหรับสัตว์ทดลองที่เคลื่อนไหวอย่างอิสระ',
      decoder: 'PLSR และ Deep Learning (1D-CNN / LSTM) แยกผลของยาต่อ Phasic และ Tonic DA/5-HT ออกจากกันแบบเรียลไทม์'
    },
    advantage: 'วัดผลของยาได้ภายในไม่กี่นาที (เช่น ยา Escitalopram เพิ่ม 5-HT +42% ภายใน 35 นาที หรือแยกกลไกโคเคน vs. เฟนทานิล/ออกซิโคโดนได้ทันที) ช่วยเร่งความเร็วในการค้นพบยาใหม่'
  },
  {
    id: 'neurostring-gut-brain',
    code: 'IRL-04 · อิเล็กทรอนิกส์ชีวภาพแบบยืดหยุ่น',
    title: 'อิเล็กทรอนิกส์ชีวภาพแบบยืดหยุ่นสำหรับสมองและลำไส้ (Soft Bioelectronics & Gut-Brain Axis — NeuroString)',
    summary: 'โพรบยางยืดหยุ่นเนื้อนิ่ม (<30 kPa) ฝังได้ทั้งในสมองเรื้อรังและลำไส้ที่บีบตัวตลอดเวลา เพื่อวัดเซโรโทนินในโรค IBS และภาวะซึมเศร้า',
    problem: 'กว่า 90% ของเซโรโทนินในร่างกายถูกสร้างขึ้นในทางเดินอาหาร (Enterochromaffin Cells) เพื่อสื่อสารกับสมองผ่านเส้นประสาทวากัส (Gut-Brain Axis) แต่โพรบซิลิคอนหรือโลหะแข็ง (>100 GPa) ไม่สามารถฝังในลำไส้ที่มีการบีบตัว (Peristalsis) ตลอดเวลาได้โดยไม่ทำลายเนื้อเยื่อหรือแตกหัก',
    stack: {
      electrode: 'NeuroString: โครงข่ายกราฟีนและอนุภาคนาโนเหล็กออกไซด์ฝังในอีลาสโตเมอร์เนื้อนิ่ม SEBS / PDMS (ความแข็ง ~1.9 MPa ถึง <30 kPa ยืดได้ >100%)',
      waveform: 'FSCV และ Differential Pulse Voltammetry (DPV) ที่ปรับแต่งให้ทนทานต่อการยืดหดและโค้งงอของผนังลำไส้และเนื้อเยื่อสมอง',
      afe: 'วงจร CMOS Potentiostat แบบยืดหยุ่นและใช้พลังงานต่ำ เชื่อมต่อผ่านสายนำสัญญาณโพลีเมอร์บางเฉียบ',
      decoder: 'อัลกอริทึมชดเชยความแปรปรวนของพื้นที่ผิวขณะยืดตัว เพื่อสกัดความเข้มข้นของ Serotonin และ Dopamine อย่างต่อเนื่อง'
    },
    advantage: 'เป็นเทคโนโลยีแรกที่วัดสารสื่อประสาทแบบเรียลไทม์พร้อมกันได้ทั้งในสมองและลำไส้ที่กำลังเคลื่อนไหว เปิดทางสู่การรักษาโรคลำไส้แปรปรวน (IBS) โรคซึมเศร้า และโรคพาร์กินสันที่มีจุดเริ่มต้นจากลำไส้'
  },
  {
    id: 'multimodal-fmri',
    code: 'IRL-05 · การถ่ายภาพสมองหลายมิติ',
    title: 'การถ่ายภาพสมองร่วมกับเครื่อง MRI (Multimodal WINCS + BOLD fMRI)',
    summary: 'ผสานระบบ FSCV ไร้สายที่เข้ากันได้กับสนามแม่เหล็กสูงเข้ากับเครื่อง fMRI เพื่อเชื่อมโยงโดปามีนเฉพาะจุดเข้ากับเครือข่ายสมองทั้งระบบ',
    problem: 'เครื่องสแกนสมอง fMRI (BOLD Signal) มองเห็นการทำงานของเครือข่ายสมองทั่วทั้งศีรษะแต่บอกไม่ได้ว่าเกิดจากสารสื่อประสาทชนิดใด ขณะที่ขั้วไฟฟ้าทั่วไปมีส่วนประกอบโลหะแม่เหล็กที่ก่อให้เกิดภาพบิดเบือน (Artifacts) หรือเกิดความร้อนอันตรายภายในอุโมงค์แม่เหล็ก MRI',
    stack: {
      electrode: 'ขั้วไฟฟ้าคาร์บอนไฟเบอร์ปลอดสารแม่เหล็ก (Non-Ferromagnetic CFME) และสายนำสัญญาณต้านทานสูงป้องกันการเหนี่ยวนำ RF',
      waveform: 'FSCV 10 Hz ที่ซิงโครไนซ์สัญญาณนาฬิกากับรอบการสแกนภาพ (TR) ของเครื่อง MRI เพื่อไม่ให้คลื่นแม่เหล็กไฟฟ้ารบกวนกัน',
      afe: 'ระบบไร้สาย WINCS ที่ออกแบบให้เข้ากันได้กับสภาพแวดล้อม MRI (MRI-Compatible Telemetry)',
      decoder: 'การวิเคราะห์สหสัมพันธ์เชิงเวลา (Cross-Correlation) ระหว่างความเข้มข้นโดปามีนระดับนาโนโมลาร์ใน Nucleus Accumbens กับสัญญาณ BOLD ทั้งสมอง'
    },
    advantage: 'เชื่อมโยงเหตุและผลระหว่างการหลั่งโดปามีนเฉพาะจุดระดับนาโนโมลาร์กับการเปลี่ยนแปลงของเครือข่ายสมองทั้งระบบ ช่วยยกระดับการวินิจฉัยโรคทางจิตเวชด้วยภาพถ่ายสมอง'
  },
  {
    id: 'neurochemical-bci',
    code: 'IRL-06 · อินเทอร์เฟซสมองกับคอมพิวเตอร์รุ่นถัดไป',
    title: 'อินเทอร์เฟซสมองกับคอมพิวเตอร์รุ่นถัดไป (Next-Gen Neurochemical BCIs)',
    summary: 'ขั้วไฟฟ้าสองโหมดบันทึกทั้งสัญญาณสั่งการเคลื่อนไหว (Spikes/LFPs) และสภาวะอารมณ์/แรงจูงใจทางเคมีพร้อมกัน',
    problem: 'อินเทอร์เฟซสมองกับคอมพิวเตอร์ (BCI) ในปัจจุบันอ่านได้เพียงสัญญาณไฟฟ้าของการสั่งการเคลื่อนไหว (Motor Spikes) แต่ไม่รับรู้สภาวะทางอารมณ์ ความเหนื่อยล้า ความเครียด หรือแรงจูงใจของผู้ป่วย ทำให้ระบบแขนกลหรืออุปกรณ์ช่วยเหลือไม่สามารถปรับตัวเข้ากับสภาวะจิตใจของผู้ใช้งานได้',
    stack: {
      electrode: 'ไมโครอิเล็กโทรดอาร์เรย์แบบยืดหยุ่น Polyimide เคลือบ PEDOT/CNT และพอลิเมอร์ป้องกัน PSB (Poly(sulfobetaine)) ลด Impedance และป้องกัน Biofouling',
      waveform: 'การบันทึกแบบสองโหมดสลับเวลาความเร็วสูง (Dual-Mode Electrophysiology + FSCV) บนขั้วไฟฟ้าชุดเดียวกัน',
      afe: 'ชิป CMOS Hybrid AFE ที่รวมวงจรขยายสัญญาณประสาท (Neural Amplifier) เข้ากับวงจร I-ΔΣ Potentiostat สัญญาณรบกวนต่ำ',
      decoder: 'โมเดล Multimodal AI (PINNs + LSTM) ผสานข้อมูลความถี่ Spikes เข้ากับระดับโดปามีนและเซโรโทนินเพื่อถอดรหัสทั้งเจตนาและสภาวะอารมณ์'
    },
    advantage: 'สร้าง BCI รุ่นใหม่ที่ “เข้าใจทั้งเจตนาการเคลื่อนไหวและสภาวะอารมณ์” ของผู้ป่วย ทำให้แขนกลประสาทเทียมและระบบฟื้นฟูผู้ป่วยอัมพาตตอบสนองได้อย่างเป็นธรรมชาติและปลอดภัยยิ่งขึ้น'
  }
];

const irlScenariosEn = [
  {
    id: 'awake-dbs',
    code: 'IRL-01 · Clinical Neurosurgery',
    title: 'Awake Human DBS Surgery',
    summary: 'Real-time striatal dopamine mapping during DBS lead implantation to guide electrode placement accurately.',
    problem: 'During DBS implantation for Parkinson’s disease or OCD, surgeons rely mainly on imaging and microelectrode spike recordings, which cannot directly verify whether the lead tip sits in a neurochemically optimal dopamine-releasing site.',
    stack: {
      electrode: '7 µm CFME (~100 µm exposed tip) engineered to pass through standard stereotactic surgical guide cannulae.',
      waveform: 'Standard FSCV (-0.4 V to +1.3 V vs. Ag/AgCl at 400 V/s, 10 Hz) recorded within a 15–60 min IRB window during decision-making tasks.',
      afe: 'Picoampere-floor voltammetry system isolating neurochemical transients while the patient is awake.',
      decoder: 'PCR / Elastic Net regression decoding Actual and Counterfactual Reward Prediction Errors (Kishida, Montague & Lee / Carilion Clinic / Mayo Clinic).'
    },
    advantage: 'Confirms real-time human neurochemical responses (100 ms resolution) rather than relying solely on anatomical coordinates, improving DBS target precision.'
  },
  {
    id: 'closed-loop-dbs',
    code: 'IRL-02 · Smart Implantables',
    title: 'Adaptive Closed-Loop DBS / Neurochemostat',
    summary: 'Wireless SoC acting as a neurochemical thermostat, delivering ~100 Hz pulses only when striatal dopamine drops.',
    problem: 'Conventional open-loop DBS delivers continuous high-frequency stimulation 24/7, rapidly draining batteries (requiring repeat surgeries) and causing dyskinesia, dysarthria, or mood side effects from over-stimulation.',
    stack: {
      electrode: 'Chronic µIP-CFM carbon-fiber probe (>1 year stability) or flexible Polyimide array coated with PEDOT:Nafion.',
      waveform: '10 Hz FSCV time-multiplexed with stimulation pulses to prevent stimulation artifact saturation.',
      afe: 'Wireless implantable WINCS Harmoni / MAVEN / Neurochemostat (0.35 µm CMOS) or Hall et al. AFE (3.74 µW power, 39.2 pArms noise).',
      decoder: '100 Hz Butterworth filter paired with a double-layer ANN (150 hidden neurons, Levenberg–Marquardt) tuning frequency (~100 Hz) and pulse width (0.1–2.0 ms).'
    },
    advantage: 'Operates as a neurochemical thermostat—delivering stimulation only when dopamine is depleted, extending battery life and cutting neurological side effects.'
  },
  {
    id: 'psychopharmacology',
    code: 'IRL-03 · Pharma & Precision Psychiatry',
    title: 'Precision Psychopharmacology & Addiction R&D',
    summary: 'Screens antidepressant and anti-addiction drug effects on dopamine and serotonin within minutes.',
    problem: 'Traditional microdialysis requires 10–20 min per sample, missing rapid reward-circuitry dynamics and making preclinical psychiatric drug screening slow and costly.',
    stack: {
      electrode: 'Multi-channel PEI-CNT / CNTYM (5 nM LoD) and 128-channel arrays monitoring NAcc, PFC, and Dorsal Striatum simultaneously.',
      waveform: 'N-FSCV (1000 V/s for 5-HT), M-CSWV (10 s resolution for tonic), and RPV-PLSR for simultaneous phasic + tonic tracking.',
      afe: 'High-density 128-Ch Programmable R-TIA array (2.25 mm² die) and wireless MAVEN platform for freely moving subjects.',
      decoder: 'PLSR and Deep Learning (1D-CNN / LSTM) separating drug effects on phasic vs. tonic DA and 5-HT in real time.'
    },
    advantage: 'Quantifies drug action within minutes (e.g., Escitalopram +42% 5-HT in 35 min; distinguishing cocaine vs. fentanyl/oxycodone), accelerating CNS drug discovery.'
  },
  {
    id: 'neurostring-gut-brain',
    code: 'IRL-04 · Soft Bioelectronics',
    title: 'Soft Bioelectronics & Gut–Brain Axis (NeuroString)',
    summary: 'Stretchable elastomer probe (<30 kPa) implantable in both brain and peristaltic GI tract for serotonin sensing in IBS & depression.',
    problem: 'Over 90% of the body’s serotonin is produced in the gut (enterochromaffin cells) to signal the brain via the vagus nerve, yet rigid silicon/metal probes (>100 GPa) cannot survive continuous gut peristalsis without tissue injury or fracture.',
    stack: {
      electrode: 'NeuroString: graphene network and iron oxide nanoparticles embedded in soft SEBS / PDMS elastomer (~1.9 MPa down to <30 kPa, >100% stretchable).',
      waveform: 'FSCV and Differential Pulse Voltammetry (DPV) tuned for mechanical stretching and bending along GI walls and brain tissue.',
      afe: 'Low-power flexible CMOS potentiostat connected via ultra-thin polymer interconnects.',
      decoder: 'Strain-compensation algorithm correcting surface-area variance during stretching to extract continuous 5-HT and DA concentrations.'
    },
    advantage: 'First technology to monitor real-time neurotransmitters simultaneously in the brain and moving GI tract, opening new therapies for IBS, depression, and gut-origin Parkinson’s.'
  },
  {
    id: 'multimodal-fmri',
    code: 'IRL-05 · Multimodal Neuroimaging',
    title: 'Multimodal WINCS + BOLD fMRI',
    summary: 'Integrates MRI-compatible wireless FSCV with fMRI to link local dopamine release to whole-brain network connectivity.',
    problem: 'fMRI (BOLD) maps whole-brain activity but lacks neurotransmitter specificity, while conventional metal electrodes distort MRI images with susceptibility artifacts or risk RF heating inside the bore.',
    stack: {
      electrode: 'Non-ferromagnetic carbon-fiber microelectrode (CFME) with high-resistance leads preventing RF-induced heating.',
      waveform: '10 Hz FSCV clock-synchronized to the MRI scanner’s repetition time (TR) to eliminate electromagnetic cross-talk.',
      afe: 'MRI-compatible wireless WINCS telemetry engineered for high-field magnetic environments.',
      decoder: 'Temporal cross-correlation between nanomolar NAcc dopamine release and whole-brain BOLD functional connectivity.'
    },
    advantage: 'Establishes causal links between nanomolar local dopamine transients and whole-brain network dynamics, advancing neuroimaging biomarkers.'
  },
  {
    id: 'neurochemical-bci',
    code: 'IRL-06 · Next-Gen Brain-Computer Interfaces',
    title: 'Next-Gen Dual-Mode Neurochemical BCIs',
    summary: 'Dual-mode electrodes recording motor spikes/LFPs alongside emotional and motivational neurochemistry.',
    problem: 'Current BCIs decode only electrical motor spikes and remain blind to patient mood, stress, fatigue, or motivation—preventing prosthetics from adapting to internal mental states.',
    stack: {
      electrode: 'Flexible Polyimide MEA coated with PEDOT/CNT and zwitterionic PSB (Poly(sulfobetaine)) to lower impedance and block biofouling.',
      waveform: 'High-speed time-multiplexed Dual-Mode Electrophysiology + FSCV on the exact same microelectrode site.',
      afe: 'Hybrid CMOS AFE integrating a low-noise neural spike amplifier with a picoampere I-ΔΣ potentiostat.',
      decoder: 'Multimodal AI (PINNs + LSTM) fusing spike firing rates with DA/5-HT levels to decode both motor intent and affective state.'
    },
    advantage: 'Creates next-gen BCIs that understand both movement intent and emotional state, making neuroprosthetics more natural and adaptive.'
  }
];
