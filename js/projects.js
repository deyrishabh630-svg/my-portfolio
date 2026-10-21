/**
 * RISHABH DEY — PROJECT DATA SYSTEM & DRAWING CONTROLLER
 * Complies with Rules 10, 11, 12, 13, 14, 15, 34, 35
 */
(function() {
  'use strict';

  // Master Project Data System (Rule 34)
  // Every project is equipped with multi-sheet sets (5 initial sheets each)
  const PROJECTS_DATA = [
    {
      id: "A-101",
      code: "A-101",
      title: "2-Storey Residential Building: Full CAD Package",
      subtitle: "Floor Plans · Work Planning · Drawing Documentation",
      category: "Residential",
      software: ["AutoCAD 2D"],
      featured: true,
      description: "Architectural floor plans, structural column layouts and electrical wiring plans for a compact family home, ready for construction reference and design study.",
      specs: [
        { label: "Plot", value: "40' × 63'" },
        { label: "Bedrooms", value: "2 (12'3\"×16', 13'×16')" },
        { label: "Kitchen", value: "8' × 10'" },
        { label: "Living/Hall", value: "22'2\" × 21'9\"" },
        { label: "Bathrooms", value: "2" },
        { label: "Plinth", value: "+2'6\"" },
        { label: "Staircase", value: "W 3'6\" · R 7–7.5\" · T 10\"" }
      ],
      sheets: [
        { id: "01", name: "Ground-Floor Working Plan & Architectural Layout", filename: "a101-sheet-01-working-plan.png", src: "assets/images/a101-sheet-01-working-plan.png" },
        { id: "02", name: "Architectural Floor Plans Series (Ground, 1st, Terrace, Mumty)", filename: "a101-sheet-02-floor-plans.png", src: "assets/images/a101-sheet-02-floor-plans.png" },
        { id: "03", name: "Structural Framing — Column Grid & Beam Layout (Level +14')", filename: "a101-sheet-03-structural.png", src: "assets/images/a101-sheet-03-structural.png" },
        { id: "04", name: "Electrical Services Coordination — Ceiling, Wiring & Wall Layouts", filename: "a101-sheet-04-electrical.png", src: "assets/images/a101-sheet-04-electrical.png" },
        { id: "05", name: "Master CAD Package — Composite Architectural & Structural Compilation", filename: "a101-sheet-05-composite.png", src: "assets/images/a101-sheet-05-composite.png" },
        { id: "06", name: "Ground Floor Working Plan (Dimensioned Construction Detail)", filename: "a101-ground-floor-working-detail.png", src: "assets/images/a101-ground-floor-working-detail.png" },
        { id: "07", name: "Ground Floor Architectural & Furniture Plan", filename: "a101-ground-floor-arch-layout.png", src: "assets/images/a101-ground-floor-arch-layout.png" },
        { id: "08", name: "Structural Column Schedule & Grid Alignment Detail (C1–C12)", filename: "a101-column-layout-detail.png", src: "assets/images/a101-column-layout-detail.png" },
        { id: "09", name: "First Floor Architectural Plan (+14'6\" Level)", filename: "a101-first-floor-plan.png", src: "assets/images/a101-first-floor-plan.png" },
        { id: "10", name: "Electrical Wiring & Conduit Circuit Detail", filename: "a101-electrical-wiring-detail.png", src: "assets/images/a101-electrical-wiring-detail.png" }
      ],
      pdf: "assets/projects/A-101/A-101_2_Storey_Residential_Building_Documentation.pdf",
      pdfFilename: "A-101_2_Storey_Residential_Building_Documentation.pdf"
    },
    {
      id: "A-102",
      code: "A-102",
      title: "Central-Core Multi-Dwelling Unit (MDU) Floor Plan",
      subtitle: "Architectural Layout & Openings Schedule",
      category: "Residential",
      software: ["AutoCAD 2D"],
      featured: false,
      description: "Typical multi-family floor plan featuring four 2BHK units, complete space layout, vertical core access, and balcony placements.",
      specs: [
        { label: "Unit Layout", value: "4 × 2BHK Units" },
        { label: "Core Circulation", value: "6'0\" Central Stair & Lift" },
        { label: "Balconies", value: "4 Cantilever Balconies" },
        { label: "Ventilation Shafts", value: "4 Dedicated OTS Ducts" },
        { label: "Plinth Level", value: "+2'6\" Above GL" },
        { label: "Drafting Standard", value: "IS 962: 1989 Code" },
        { label: "Wall Thickness", value: "10\" Ext / 5\" Partition" },
        { label: "Software", value: "AutoCAD 2026 (2D)" }
      ],
      sheets: [
        { id: "01", name: "Central-Core Multi-Dwelling Unit Floor Plan", filename: "a102-floor-plan.png", src: "assets/images/a102-floor-plan.png" }
      ],
      pdf: "assets/projects/A-102/A-102_Central_Core_MDU_Documentation.pdf",
      pdfFilename: "A-102_Central_Core_MDU_Documentation.pdf"
    },
    {
      id: "A-103",
      code: "A-103",
      title: "Compact 2BHK Residential Unit: Architectural Plan, Elevation & Sectional Details",
      subtitle: "Plan · Elevation · Section AB Detailing",
      category: "Residential",
      software: ["AutoCAD 2D"],
      featured: false,
      description: "Compact 2BHK AutoCAD 2D drafting comprising ground plan, front elevation, and Section AB with dimensioned room layouts, staircase, parking, and structural foundation details.",
      specs: [
        { label: "Dwelling Type", value: "Compact 2BHK Residential Unit" },
        { label: "Deliverables", value: "Floor Plan, Elevation & Section AB" },
        { label: "Key Elements", value: "Room Layouts, Staircase, Parking" },
        { label: "Projections", value: "Chajja & Plinth Projections" },
        { label: "Foundation Details", value: "PCC, Footings & Plinth Beam" },
        { label: "Superstructure", value: "Slab & Parapet Detailing" },
        { label: "Drafting Standard", value: "IS 962 & Dimensioned Annotation" },
        { label: "Software", value: "AutoCAD 2026 (2D)" }
      ],
      sheets: [
        { id: "01", name: "Main Model — Architectural Plan, Elevation & Section AB", filename: "a103-main-model.png", src: "assets/images/a103-main-model.png" },
        { id: "02", name: "Model 1 — Ground Floor Plan", filename: "a103-model-1-floor-plan.png", src: "assets/images/a103-model-1-floor-plan.png" },
        { id: "03", name: "Model 2 — Section AB & Foundation Details", filename: "a103-model-2-section-ab.png", src: "assets/images/a103-model-2-section-ab.png" },
        { id: "04", name: "Model 3 — Front Elevation", filename: "a103-model-3-elevation.png", src: "assets/images/a103-model-3-elevation.png" }
      ],
      pdf: "assets/projects/A-103/A-103_Residential_Unit_Documentation.pdf",
      pdfFilename: "A-103_Residential_Unit_Documentation.pdf"
    },
    {
      id: "A-104",
      code: "A-104",
      title: "3-BHK Residential Floor Plan: Open-Concept Living & Spatial Circulation Design",
      subtitle: "Open-Concept Living · Spatial Circulation Design",
      category: "Residential",
      software: ["AutoCAD 2D"],
      featured: false,
      description: "Architectural floor plan for a spacious 3-BHK residence featuring an expansive 30' × 15' open-concept living hall, ergonomic spatial circulation, integrated internal staircase, open kitchen, and dedicated bedroom wings with attached and common sanitary facilities.",
      specs: [
        { label: "Living Room / Hall", value: "30'0\" × 15'0\" (Open Plan)" },
        { label: "Bedrooms 1 & 2", value: "12'0\" × 12'0\" Each" },
        { label: "Bedroom 3", value: "11'0\" × 12'0\"" },
        { label: "Bathrooms", value: "7'0\" × 5'0\" & 8'0\" × 7'0\"" },
        { label: "Kitchen", value: "Open-Concept Kitchen" },
        { label: "Vertical Access", value: "Internal Masonry Staircase" },
        { label: "Spatial Layout", value: "Ergonomic Circulation & Privacy" },
        { label: "Software", value: "AutoCAD 2026 Architectural" }
      ],
      sheets: [
        { id: "01", name: "3-BHK Residential Floor Plan", filename: "furnished-plan.png", src: "assets/images/a104-furnished-plan.png" }
      ],
      pdf: "assets/projects/A-104/A-104_Floor_Plan_Documentation.pdf",
      pdfFilename: "A-104_Floor_Plan_Documentation.pdf"
    },
    {
      id: "A-105",
      code: "A-105",
      title: "Section Views of Residential Buildings",
      subtitle: "Structural & Vertical Dimensions",
      category: "Sections",
      software: ["AutoCAD 2D"],
      featured: false,
      description: "Sectional drawings with proper vertical dimensioning, showing floor-to-floor heights, plinth levels, and construction detail.",
      specs: [
        { label: "Floor Height", value: "10'0\" Clear Height" },
        { label: "Foundation", value: "Isolated RCC Footings (-5'0\")" },
        { label: "Plinth Level", value: "+2'6\" with DPC" },
        { label: "Slab Thickness", value: "5\" (125 mm) Two-Way RCC" },
        { label: "Lintel Level", value: "7'0\" (2.1 m) Above FFL" },
        { label: "Sill Level", value: "3'0\" (0.9 m) Above FFL" },
        { label: "Parapet Wall", value: "3'0\" with RCC Coping" },
        { label: "Staircase Waist", value: "6\" Slab · R 7\" · T 10\"" }
      ],
      sheets: [
        { id: "01", name: "Longitudinal Building Section AA'", filename: "section-aa.webp", src: null }
      ],
      pdf: null,
      pdfFilename: "project-documentation.pdf"
    },
    {
      id: "A-106",
      code: "A-106",
      title: "Elevation of an Apartment",
      subtitle: "Exterior Facade & Vertical Levels",
      category: "Elevation",
      software: ["AutoCAD 2D"],
      featured: false,
      description: "Elevation drawings of an apartment building displaying the exterior architectural facade, floor levels, sill/lintel heights, and wall openings.",
      specs: [
        { label: "Building Height", value: "G+3 (42'6\" to Parapet)" },
        { label: "Facade Finish", value: "Plaster & Texture Grooves" },
        { label: "Fenestration", value: "Powder-Coated Aluminum" },
        { label: "Weather Projections", value: "1'6\" RCC Cantilever Chajja" },
        { label: "Balcony Railing", value: "3'6\" Toughened Glass & MS" },
        { label: "Plinth Cladding", value: "Stone Clad Base Protection" },
        { label: "Datum Marks", value: "GL ±0.00, Plinth +0.75m" },
        { label: "Software", value: "AutoCAD 2026 (2D)" }
      ],
      sheets: [
        { id: "01", name: "Front Exterior Facade Elevation", filename: "elevation-front.webp", src: null }
      ],
      pdf: null,
      pdfFilename: "project-documentation.pdf"
    }
  ];

  // Expose data globally
  window.PORTFOLIO_PROJECTS = PROJECTS_DATA;

  // Show Toast Message Helper
  function showToast(msg) {
    let toast = document.getElementById('aecToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aecToast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }
  window.showAECToast = showToast;

  // Active sheet tracker for each project
  const activeSheetByProject = {
    'A-101': 0,
    'A-102': 0,
    'A-103': 0,
    'A-104': 0,
    'A-105': 0,
    'A-106': 0
  };

  // Get active sheet index for any project
  function getActiveSheetIndex(projectId) {
    return activeSheetByProject[projectId] || 0;
  }

  // Resolve image source relative to current page location
  function resolveSheetSrc(src) {
    if (!src) return '';
    if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    const isInProjectsDir = window.location.pathname.includes('/projects/') || window.location.pathname.endsWith('/projects');
    if (isInProjectsDir) {
      return src.startsWith('../') ? src : '../' + src;
    } else {
      return src.replace(/^\.\.\//, '');
    }
  }
  window.resolveSheetSrc = resolveSheetSrc;

  // Update active sheet for any project
  function updateProjectSheet(projectId, index) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj || !proj.sheets) return;
    if (index < 0) index = 0;
    if (index >= proj.sheets.length) index = proj.sheets.length - 1;

    activeSheetByProject[projectId] = index;
    const sheet = proj.sheets[index];
    const totalSheets = proj.sheets.length;
    const totalStr = String(totalSheets).padStart(2, '0');
    const sheetIdStr = sheet.id || String(index + 1).padStart(2, '0');

    // 1. Update tab buttons across the page for this project
    const tabs = document.querySelectorAll(
      `.sheet-tab-btn[data-project="${projectId}"], .a101-tab`
    );
    tabs.forEach(tab => {
      const tabProj = tab.getAttribute('data-project') || (tab.classList.contains('a101-tab') ? 'A-101' : null);
      if (tabProj === projectId) {
        const sheetIdx = parseInt(tab.getAttribute('data-sheet'), 10);
        tab.classList.toggle('active', sheetIdx === index);
      }
    });

    // 2. Update home card labels
    const pLower = projectId.toLowerCase();
    const sheetNumEl = document.getElementById(`${pLower}-sheet-num`);
    const sheetTitleEl = document.getElementById(`${pLower}-sheet-title`);
    const previewImg = document.getElementById(`preview-${projectId}`) || document.getElementById(`${pLower}-preview-img`);
    const placeholderContent = document.getElementById(`placeholder-${projectId}`) || document.getElementById(`${pLower}-placeholder-content`);

    if (sheetNumEl) sheetNumEl.textContent = `SHEET ${sheetIdStr} / ${totalStr}`;
    if (sheetTitleEl) sheetTitleEl.textContent = sheet.name.toUpperCase();

    // 3. Update documentation view labels
    const pIdClean = projectId.toLowerCase().replace(/[^a-z0-9]/g, '');
    const docSheetNumEl = document.getElementById(`doc-${pIdClean}-sheet-num`) || document.getElementById(`doc-${pLower}-sheet-num`);
    const docSheetTitleEl = document.getElementById(`doc-${pIdClean}-sheet-title`) || document.getElementById(`doc-${pLower}-sheet-title`);
    const docPreviewImg = document.getElementById(`doc-preview-${projectId}`);
    const docPlaceholderContent = document.getElementById(`doc-placeholder-${projectId}`);

    if (docSheetNumEl) docSheetNumEl.textContent = `SHEET ${sheetIdStr} / ${totalStr}`;
    if (docSheetTitleEl) docSheetTitleEl.textContent = sheet.name.toUpperCase();

    // 4. Update preview images and placeholders
    if (sheet.src) {
      const resolvedSrc = resolveSheetSrc(sheet.src);
      if (previewImg) {
        previewImg.src = resolvedSrc;
        previewImg.alt = `${projectId} - ${sheet.name}`;
        previewImg.classList.add('visible');
      }
      if (placeholderContent) placeholderContent.style.display = 'none';

      if (docPreviewImg) {
        docPreviewImg.src = resolvedSrc;
        docPreviewImg.alt = `${projectId} - ${sheet.name}`;
        docPreviewImg.classList.add('visible');
      }
      if (docPlaceholderContent) docPlaceholderContent.style.display = 'none';
    } else {
      if (previewImg) {
        previewImg.removeAttribute('src');
        previewImg.classList.remove('visible');
      }
      if (placeholderContent) placeholderContent.style.display = 'flex';

      if (docPreviewImg) {
        docPreviewImg.removeAttribute('src');
        docPreviewImg.classList.remove('visible');
      }
      if (docPlaceholderContent) docPlaceholderContent.style.display = 'flex';
    }

    // 5. Update individual project drawing pills & active sheet name
    document.querySelectorAll(`.doc-sheet-pill[data-project="${projectId}"]`).forEach(pill => {
      const pIdx = parseInt(pill.getAttribute('data-sheet'), 10);
      pill.classList.toggle('active', pIdx === index);
    });

    document.querySelectorAll(`.drawing-sheet-tabs[data-project="${projectId}"] .doc-sheet-active-name`).forEach(el => {
      el.textContent = `${sheetIdStr} · ${sheet.name}`;
    });

    // 6. If lightbox is open and displaying this project, sync it
    if (window.onProjectSheetChanged) {
      window.onProjectSheetChanged(projectId, index);
    }
  }

  // Backwards compatibility alias for A-101
  function updateA101Sheet(index) {
    updateProjectSheet('A-101', index);
  }

  // Delete a drawing sheet from a project
  function deleteProjectSheet(projectId, index) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj || proj.sheets.length <= 1) return;

    proj.sheets.splice(index, 1);
    // Re-index remaining sheets to keep consecutive 01, 02, ...
    proj.sheets.forEach((s, i) => {
      s.id = String(i + 1).padStart(2, '0');
    });

    let activeIdx = getActiveSheetIndex(projectId);
    if (activeIdx >= proj.sheets.length) {
      activeIdx = proj.sheets.length - 1;
    }

    renderProjectSheetTabs(projectId);
    updateProjectSheet(projectId, activeIdx);

    if (window.renderLightboxSheetStrip) {
      window.renderLightboxSheetStrip();
    }
    showToast(`✓ Removed drawing from ${proj.code}. Total drawings: ${proj.sheets.length}`);
  }

  // Dynamically add a new sheet to a project
  function addNewProjectSheet(projectId, sheetName, imageSrc) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return -1;

    const newIdx = proj.sheets.length;
    const newIdStr = String(newIdx + 1).padStart(2, '0');
    const name = sheetName && sheetName.trim() ? sheetName.trim() : `Drawing ${newIdStr} Detail`;

    const newSheet = {
      id: newIdStr,
      name: name,
      filename: `sheet-${newIdStr}.webp`,
      src: imageSrc || null
    };

    proj.sheets.push(newSheet);

    // Refresh UI tabs for this project everywhere
    renderProjectSheetTabs(projectId);

    // Switch to the newly created sheet
    updateProjectSheet(projectId, newIdx);

    // If lightbox is currently open, re-render its strip
    if (window.renderLightboxSheetStrip) {
      window.renderLightboxSheetStrip();
    }

    showToast(`✓ Added Sheet ${newIdStr}: "${name}" to ${proj.code}`);
    return newIdx;
  }

  // Render sheet tabs in DOM for a given project inside individual project view
  function renderProjectSheetTabs(projectId) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    const tabBars = document.querySelectorAll(`.drawing-sheet-tabs[data-project="${projectId}"]`);
    tabBars.forEach(bar => {
      bar.innerHTML = '';
      const activeIdx = getActiveSheetIndex(projectId);

      const selectorBar = document.createElement('div');
      selectorBar.className = 'doc-sheet-selector-bar';

      const label = document.createElement('span');
      label.className = 'doc-sheet-selector-label';
      label.textContent = 'Drawings:';
      selectorBar.appendChild(label);

      const pillsList = document.createElement('div');
      pillsList.className = 'doc-sheet-pills-list';

      proj.sheets.forEach((sheet, idx) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `doc-sheet-pill ${idx === activeIdx ? 'active' : ''}`;
        pill.setAttribute('data-project', projectId);
        pill.setAttribute('data-sheet', String(idx));
        pill.title = `Drawing ${sheet.id}: ${sheet.name}`;

        const numSpan = document.createElement('span');
        numSpan.textContent = sheet.id;
        pill.appendChild(numSpan);

        // Delete button if more than 1 drawing exists
        if (proj.sheets.length > 1) {
          const delBtn = document.createElement('span');
          delBtn.className = 'doc-sheet-pill-del';
          delBtn.innerHTML = '&times;';
          delBtn.title = `Delete drawing ${sheet.id}`;
          delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm(`Remove drawing ${sheet.id} (${sheet.name})?`)) {
              deleteProjectSheet(projectId, idx);
            }
          });
          pill.appendChild(delBtn);
        }

        pill.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateProjectSheet(projectId, idx);
        });

        pillsList.appendChild(pill);
      });

      // Add "+" pill to add another drawing
      const addPill = document.createElement('button');
      addPill.type = 'button';
      addPill.className = 'doc-sheet-pill add-sheet-pill';
      addPill.setAttribute('data-project', projectId);
      addPill.title = 'Add more drawings to this project';
      addPill.textContent = '+';

      addPill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        triggerAddSheetFlow(projectId);
      });
      pillsList.appendChild(addPill);

      selectorBar.appendChild(pillsList);

      // Active drawing title label
      const activeSheet = proj.sheets[activeIdx] || proj.sheets[0];
      if (activeSheet) {
        const nameDisplay = document.createElement('div');
        nameDisplay.className = 'doc-sheet-active-name';
        nameDisplay.textContent = `${activeSheet.id} · ${activeSheet.name}`;
        selectorBar.appendChild(nameDisplay);
      }

      bar.appendChild(selectorBar);
    });
  }

  // Interactive flow to prompt for sheet name & trigger file picker
  function triggerAddSheetFlow(projectId) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    const nextId = String(proj.sheets.length + 1).padStart(2, '0');
    const defaultName = `Sheet ${nextId} - Technical Detail`;
    const userPrompt = window.prompt(`Enter drawing sheet name for ${proj.code} Sheet ${nextId}:`, defaultName);

    if (userPrompt === null) return; // User cancelled
    const sheetName = userPrompt.trim() || defaultName;

    // Trigger file selection for this new sheet
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'file';
    hiddenInput.accept = 'image/*';
    hiddenInput.multiple = true;
    hiddenInput.style.display = 'none';
    document.body.appendChild(hiddenInput);

    hiddenInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        // First file creates the named sheet
        const firstUrl = URL.createObjectURL(files[0]);
        const createdIdx = addNewProjectSheet(projectId, sheetName, firstUrl);

        // Any extra files become additional sheets!
        if (files.length > 1) {
          for (let i = 1; i < files.length; i++) {
            const extraFile = files[i];
            const cleanName = extraFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
            const extraUrl = URL.createObjectURL(extraFile);
            addNewProjectSheet(projectId, cleanName, extraUrl);
          }
        }
        updateProjectSheet(projectId, createdIdx);
      }
      document.body.removeChild(hiddenInput);
    });

    hiddenInput.click();
  }

  // Handle local drawing file upload preview (single or multiple files)
  function handleDrawingUpload(projectId, startSheetIndex, files) {
    if (!files) return;
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    const fileList = files instanceof FileList || Array.isArray(files) ? Array.from(files) : [files];
    if (fileList.length === 0) return;

    let targetIdx = typeof startSheetIndex === 'number' ? startSheetIndex : getActiveSheetIndex(projectId);

    // If active sheet already has an image and 1 file is selected, append as a new sheet
    if (fileList.length === 1 && proj.sheets[targetIdx] && proj.sheets[targetIdx].src) {
      const cleanName = fileList[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      const objUrl = URL.createObjectURL(fileList[0]);
      const createdIdx = addNewProjectSheet(projectId, cleanName, objUrl);
      showToast(`✓ Added drawing ${String(createdIdx + 1).padStart(2, '0')} to ${proj.code}. Total drawings: ${proj.sheets.length}`);
      return;
    }

    fileList.forEach((file, offset) => {
      const curIdx = targetIdx + offset;
      const objUrl = URL.createObjectURL(file);

      if (curIdx < proj.sheets.length) {
        proj.sheets[curIdx].src = objUrl;
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        if (cleanName && cleanName.length > 2) {
          proj.sheets[curIdx].name = cleanName;
        }
      } else {
        // Add new sheet dynamically if more files than predefined sheets
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        addNewProjectSheet(projectId, cleanName, objUrl);
      }
    });

    // Re-render tabs to reflect loaded status
    renderProjectSheetTabs(projectId);

    // Update active sheet display to the first uploaded file
    updateProjectSheet(projectId, targetIdx);

    showToast(`✓ Loaded ${fileList.length} drawing image(s) into ${proj.code}. Total drawings: ${proj.sheets.length}`);
  }

  // Setup DOM Interactions on Load
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial render of sheet tabs for all projects
    PROJECTS_DATA.forEach(proj => {
      renderProjectSheetTabs(proj.id);
      updateProjectSheet(proj.id, 0);
    });

    // 2. Setup ADD DRAWING & ADD SHEET buttons delegation
    document.addEventListener('click', (e) => {
      // "+ Add Sheet" buttons
      const addSheetBtn = e.target.closest('[data-action="add-new-sheet"]');
      if (addSheetBtn) {
        e.preventDefault();
        e.stopPropagation();
        const pid = addSheetBtn.getAttribute('data-project') || 'A-101';
        triggerAddSheetFlow(pid);
        return;
      }

      // "ADD DRAWING +" buttons
      const addDrawingBtn = e.target.closest('[data-action="add-drawing"]');
      if (addDrawingBtn) {
        e.preventDefault();
        e.stopPropagation();
        const targetProj = addDrawingBtn.getAttribute('data-project') || 'A-101';
        const fileInput = document.getElementById(`doc-file-input-${targetProj}`) || 
                          document.getElementById(`file-input-${targetProj}`);
        if (fileInput) {
          fileInput.click();
        } else {
          // Dynamic fallback
          const tempInput = document.createElement('input');
          tempInput.type = 'file';
          tempInput.accept = 'image/*';
          tempInput.multiple = true;
          tempInput.onchange = (ev) => {
            if (ev.target.files && ev.target.files.length > 0) {
              handleDrawingUpload(targetProj, getActiveSheetIndex(targetProj), ev.target.files);
            }
          };
          tempInput.click();
        }
        return;
      }

      // "VIEW FULLSCREEN ↗" buttons
      const fsBtn = e.target.closest('[data-action="view-fullscreen"]');
      if (fsBtn) {
        e.preventDefault();
        e.stopPropagation();
        const targetProj = fsBtn.getAttribute('data-project') || 'A-101';
        const activeIdx = getActiveSheetIndex(targetProj);
        if (window.openDrawingViewer) {
          window.openDrawingViewer(targetProj, activeIdx);
        }
        return;
      }

      // PDF Download buttons
      const pdfBtn = e.target.closest('[data-action="download-pdf"]');
      if (pdfBtn) {
        const href = pdfBtn.getAttribute('href');
        if (href && href !== '#' && href.indexOf('.pdf') !== -1) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const projId = pdfBtn.getAttribute('data-project') || 'A-101';
        const proj = PROJECTS_DATA.find(p => p.id === projId);
        if (proj && proj.pdf) {
          window.open(resolveSheetSrc(proj.pdf), '_blank');
        } else {
          showToast(`Documentation PDF not added yet. Place file in assets/projects/${projId}/${proj ? proj.pdfFilename : 'project-documentation.pdf'}`);
        }
        return;
      }

      // "VIEW FULL DOCUMENTATION →" buttons
      const viewProjBtn = e.target.closest('[data-action="view-project-docs"]');
      if (viewProjBtn) {
        const href = viewProjBtn.getAttribute('href');
        if (href && href.indexOf('.pdf') !== -1) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const targetProj = viewProjBtn.getAttribute('data-project');
        if (window.showProjectView) {
          window.showProjectView(targetProj);
        }
        return;
      }

      // Docs navigation tabs (Project Switcher)
      const navTab = e.target.closest('.docs-nav-tab');
      if (navTab) {
        e.preventDefault();
        e.stopPropagation();
        const targetProj = navTab.getAttribute('data-project');
        if (window.showProjectView) {
          window.showProjectView(targetProj);
        }
        return;
      }
    });

    // 3. File inputs change listeners
    document.querySelectorAll('.hidden-file-input').forEach(input => {
      input.setAttribute('multiple', 'multiple');
      input.addEventListener('change', (e) => {
        const files = e.target.files;
        const projId = input.getAttribute('data-project');
        const sheetIdx = getActiveSheetIndex(projId);
        if (files && files.length > 0) {
          handleDrawingUpload(projId, sheetIdx, files);
        }
      });
    });
  });

  // Export functions to global scope
  window.updateProjectSheet = updateProjectSheet;
  window.updateA101Sheet = updateA101Sheet;
  window.addNewProjectSheet = addNewProjectSheet;
  window.renderProjectSheetTabs = renderProjectSheetTabs;
  window.handleDrawingUpload = handleDrawingUpload;
  window.triggerAddSheetFlow = triggerAddSheetFlow;
  window.getActiveSheetIndex = getActiveSheetIndex;
  window.getProjectData = function(id) {
    return PROJECTS_DATA.find(p => p.id === id);
  };
})();
