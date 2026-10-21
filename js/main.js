/**
 * RISHABH DEY — CORE AEC PORTFOLIO APPLICATION
 * Navigation, Lightbox Drawing Viewer, SPA Routing, and Animations
 */
(function() {
  'use strict';

  // --- 01. NAVIGATION & HEADER SCROLL EFFECT ---
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 02. ACTIVE SECTION SPY ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- 03. SPA ROUTING: HOME <-> INDIVIDUAL PROJECT VIEW ---
  const viewHome = document.getElementById('view-home');
  const viewDocs = document.getElementById('view-docs');
  const VALID_PROJECTS = ['A-101', 'A-102', 'A-103', 'A-104', 'A-105', 'A-106'];
  let currentActiveProjectId = 'A-101';

  function normalizeProjectId(rawId) {
    if (!rawId) return 'A-101';
    let id = String(rawId).trim().toUpperCase();
    id = id.replace('DOC-', '').replace('PROJECT-', '');
    if (id.startsWith('A') && !id.startsWith('A-')) {
      id = 'A-' + id.substring(1);
    }
    return VALID_PROJECTS.includes(id) ? id : 'A-101';
  }

  function showProjectView(projectId, updateHash = true) {
    const targetId = normalizeProjectId(projectId);
    currentActiveProjectId = targetId;

    if (viewHome) viewHome.style.display = 'none';
    if (viewDocs) {
      viewDocs.style.display = 'block';
      viewDocs.classList.add('active');
    }

    // Individual view: display ONLY the chosen project article!
    VALID_PROJECTS.forEach(pid => {
      const docItem = document.getElementById(`doc-${pid}`);
      if (docItem) {
        if (pid === targetId) {
          docItem.style.display = 'block';
          docItem.classList.add('active-project-doc');
        } else {
          docItem.style.display = 'none';
          docItem.classList.remove('active-project-doc');
        }
      }
    });

    // Update active project tabs in docs view
    document.querySelectorAll('.docs-nav-tab').forEach(tab => {
      const tabProj = tab.getAttribute('data-project');
      const isSelected = (tabProj === targetId);
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // If A-101, ensure sheet viewer is synchronized
    if (targetId === 'A-101' && window.updateA101Sheet) {
      window.updateA101Sheet(0);
    }

    if (updateHash) {
      const newHash = `#/project/${targetId}`;
      if (location.hash !== newHash) {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', newHash);
        } else {
          location.hash = newHash;
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Alias for backward compatibility
  function showDocumentationView(targetDocId) {
    showProjectView(targetDocId || currentActiveProjectId || 'A-101');
  }

  function showHomeView(targetSectionId = 'work', updateHash = true) {
    if (!viewHome) {
      window.location.href = `../index.html#${targetSectionId || 'work'}`;
      return;
    }
    if (viewDocs) {
      viewDocs.style.display = 'none';
      viewDocs.classList.remove('active');
    }
    viewHome.style.display = 'block';

    const secId = (targetSectionId && targetSectionId !== '__home__' && targetSectionId !== '/')
      ? targetSectionId.replace('#/', '').replace('#', '')
      : 'work';

    if (updateHash) {
      const newHash = `#${secId}`;
      if (location.hash !== newHash) {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', newHash);
        } else {
          location.hash = newHash;
        }
      }
    }

    requestAnimationFrame(() => {
      const targetEl = document.getElementById(secId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  function handleRoute() {
    const hash = location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    const queryProj = urlParams.get('project');

    if (queryProj) {
      showProjectView(queryProj, false);
      return;
    }

    if (hash.startsWith('#/project/')) {
      const pid = hash.replace('#/project/', '').split('?')[0].split('/')[0];
      showProjectView(pid, false);
    } else if (hash.indexOf('/documentation') !== -1) {
      const match = hash.match(/[?&]project=([A-Za-z0-9-]+)/);
      if (match && match[1]) {
        showProjectView(match[1], false);
      } else {
        showProjectView('A-101', false);
      }
    } else if (hash.startsWith('#doc-A-')) {
      showProjectView(hash.replace('#doc-', ''), false);
    } else if (hash.startsWith('#A-10')) {
      showProjectView(hash.replace('#', ''), false);
    } else if (hash.startsWith('#') && hash.length > 2 && hash !== '#/') {
      const secId = hash.replace('#/', '').replace('#', '');
      showHomeView(secId, false);
    } else {
      if (viewHome) {
        showHomeView('hero', false);
      } else {
        showProjectView('A-101', false);
      }
    }
  }

  window.addEventListener('hashchange', handleRoute);
  window.showProjectView = showProjectView;
  window.showDocumentationView = showDocumentationView;
  window.showHomeView = showHomeView;

  // --- 04. LIGHTBOX / TECHNICAL DRAWING VIEWER (Rule 14 & 37) ---
  const lightbox = document.getElementById('drawingLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCode = document.getElementById('lightboxCode');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSheetCount = document.getElementById('lightboxSheetCount');
  const lightboxCanvasWrapper = document.getElementById('lightboxCanvasWrapper');
  const lightboxEmptyPlaceholder = document.getElementById('lightboxEmptyPlaceholder');
  const lightboxSheetStrip = document.getElementById('lightboxSheetStrip');
  const lightboxFileInput = document.getElementById('lightboxFileInput');

  let currentZoom = 1;
  let activeLightboxProj = null;
  let activeLightboxSheetIdx = 0;

  function openLightbox(projectId, sheetIdx = 0) {
    const proj = window.getProjectData ? window.getProjectData(projectId) : null;
    if (!proj) return;

    activeLightboxProj = proj;
    activeLightboxSheetIdx = typeof sheetIdx === 'number' ? sheetIdx : 0;
    currentZoom = 1;

    updateLightboxContent();
    if (lightbox) {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function renderLightboxSheetStrip() {
    if (!activeLightboxProj) return;
    const strip = document.getElementById('lightboxSheetStrip');
    if (!strip) return;

    strip.innerHTML = '';
    activeLightboxProj.sheets.forEach((sheet, idx) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `lightbox-sheet-pill ${idx === activeLightboxSheetIdx ? 'active' : ''}`;
      const indicator = sheet.src ? '● ' : '';
      pill.textContent = `${indicator}${sheet.id}. ${sheet.name}`;
      pill.title = `Switch to Sheet ${sheet.id}: ${sheet.name}`;

      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        activeLightboxSheetIdx = idx;
        currentZoom = 1;
        updateLightboxContent();
        if (window.updateProjectSheet) {
          window.updateProjectSheet(activeLightboxProj.id, idx);
        }
      });

      strip.appendChild(pill);
    });

    // Add "+ Add Sheet" pill
    const addPill = document.createElement('button');
    addPill.type = 'button';
    addPill.className = 'lightbox-sheet-pill add-sheet';
    addPill.innerHTML = '+ Add Sheet';
    addPill.title = 'Add new drawing sheet to this project';

    addPill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.triggerAddSheetFlow) {
        window.triggerAddSheetFlow(activeLightboxProj.id);
      }
    });

    strip.appendChild(addPill);
  }

  function updateLightboxContent() {
    if (!activeLightboxProj) return;
    if (activeLightboxSheetIdx < 0) activeLightboxSheetIdx = 0;
    if (activeLightboxSheetIdx >= activeLightboxProj.sheets.length) {
      activeLightboxSheetIdx = activeLightboxProj.sheets.length - 1;
    }

    const sheet = activeLightboxProj.sheets[activeLightboxSheetIdx];
    if (lightboxCode) lightboxCode.textContent = activeLightboxProj.code;
    if (lightboxTitle) lightboxTitle.textContent = sheet ? sheet.name.toUpperCase() : activeLightboxProj.title;
    if (lightboxSheetCount) {
      const total = activeLightboxProj.sheets.length;
      lightboxSheetCount.textContent = `SHEET ${String(activeLightboxSheetIdx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }

    // Render Lightbox Sheet Strip
    renderLightboxSheetStrip();

    // Check placeholder vs drawing image
    const placeholderEl = document.getElementById('lightboxEmptyPlaceholder');
    if (sheet && sheet.src) {
      if (lightboxImg) {
        lightboxImg.src = window.resolveSheetSrc ? window.resolveSheetSrc(sheet.src) : sheet.src;
        lightboxImg.style.display = 'block';
      }
      if (placeholderEl) {
        placeholderEl.style.display = 'none';
      }
    } else {
      if (lightboxImg) {
        lightboxImg.removeAttribute('src');
        lightboxImg.style.display = 'none';
      }
      if (placeholderEl) {
        placeholderEl.style.display = 'flex';
        const titleEl = placeholderEl.querySelector('.lightbox-placeholder-title');
        const descEl = placeholderEl.querySelector('.lightbox-placeholder-sub');
        if (titleEl) titleEl.textContent = `SHEET ${sheet ? sheet.id : '01'} // ${sheet ? sheet.name.toUpperCase() : 'DRAWING VIEW'}`;
        if (descEl) descEl.textContent = `No drawing image uploaded yet for ${activeLightboxProj.code}. Click below or use '+ ADD IMAGE' to select a local AutoCAD drawing file.`;
      }
    }

    applyZoom();
  }

  function triggerLightboxFileUpload() {
    if (!activeLightboxProj) return;
    const input = document.getElementById('lightboxFileInput');
    if (input) {
      input.click();
    } else {
      const tempInput = document.createElement('input');
      tempInput.type = 'file';
      tempInput.accept = 'image/*';
      tempInput.multiple = true;
      tempInput.onchange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          if (window.handleDrawingUpload) {
            window.handleDrawingUpload(activeLightboxProj.id, activeLightboxSheetIdx, e.target.files);
          }
          updateLightboxContent();
        }
      };
      tempInput.click();
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyZoom() {
    if (lightboxCanvasWrapper) {
      lightboxCanvasWrapper.style.transform = `scale(${currentZoom})`;
    }
  }

  function zoomIn() {
    if (currentZoom < 3) {
      currentZoom += 0.25;
      applyZoom();
    }
  }

  function zoomOut() {
    if (currentZoom > 0.5) {
      currentZoom -= 0.25;
      applyZoom();
    }
  }

  function resetZoom() {
    currentZoom = 1;
    applyZoom();
  }

  function nextSheet() {
    if (!activeLightboxProj) return;
    activeLightboxSheetIdx = (activeLightboxSheetIdx + 1) % activeLightboxProj.sheets.length;
    currentZoom = 1;
    updateLightboxContent();
    if (window.updateProjectSheet) {
      window.updateProjectSheet(activeLightboxProj.id, activeLightboxSheetIdx);
    }
  }

  function prevSheet() {
    if (!activeLightboxProj) return;
    activeLightboxSheetIdx = (activeLightboxSheetIdx - 1 + activeLightboxProj.sheets.length) % activeLightboxProj.sheets.length;
    currentZoom = 1;
    updateLightboxContent();
    if (window.updateProjectSheet) {
      window.updateProjectSheet(activeLightboxProj.id, activeLightboxSheetIdx);
    }
  }

  window.openDrawingViewer = openLightbox;
  window.renderLightboxSheetStrip = renderLightboxSheetStrip;
  window.triggerLightboxFileUpload = triggerLightboxFileUpload;
  window.updateLightboxSheet = function(idx) {
    if (activeLightboxProj) {
      activeLightboxSheetIdx = idx;
      updateLightboxContent();
    }
  };
  window.onProjectSheetChanged = function(projectId, sheetIdx) {
    if (activeLightboxProj && activeLightboxProj.id === projectId) {
      activeLightboxSheetIdx = sheetIdx;
      updateLightboxContent();
    }
  };

  // Keyboard navigation & Shortcuts for Lightbox
  window.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSheet();
      if (e.key === 'ArrowLeft') prevSheet();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    }
  });

  // Touch Swipe for Mobile Drawing Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextSheet();
      if (touchEndX > touchStartX + 50) prevSheet();
    }, { passive: true });
  }

  // --- 05. RESUME VIEW HANDLER ---
  function handleResumeView(e) {
    const resumePath = 'assets/resume/Rishabh_Dey_Resume.pdf';
    // If clicked element is an <a> tag with direct PDF href, allow native browser navigation
    if (e && e.currentTarget && e.currentTarget.tagName === 'A') {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.indexOf('.pdf') !== -1) {
        return;
      }
    }
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    window.open(resumePath, '_blank');
  }
  const handleResumeDownload = handleResumeView;

  // --- 06. PROFILE PHOTO HANDLER ---
  function initProfilePhoto() {
    const heroProfileImg = document.getElementById('heroProfileImg');
    const heroPortraitPlaceholder = document.getElementById('heroPortraitPlaceholder');

    if (heroProfileImg) {
      const testImg = new Image();
      testImg.onload = () => {
        heroProfileImg.src = testImg.src;
        heroProfileImg.classList.add('visible');
        if (heroPortraitPlaceholder) heroPortraitPlaceholder.style.display = 'none';
      };
      testImg.onerror = () => {
        heroProfileImg.classList.remove('visible');
        if (heroPortraitPlaceholder) heroPortraitPlaceholder.style.display = 'flex';
      };
      testImg.src = 'assets/images/profile.jpg';
    }
  }

  // --- 07. PROJECTS SLIDING WINDOW CONTROLLER ---
  function initProjectsSlider() {
    const track = document.getElementById('projectsSliderTrack');
    if (!track) return;

    const prevBtns = [document.getElementById('sliderPrevBtn'), document.getElementById('sliderSidePrev')].filter(Boolean);
    const nextBtns = [document.getElementById('sliderNextBtn'), document.getElementById('sliderSideNext')].filter(Boolean);
    const activeNumEl = document.getElementById('slideActiveNum');
    const totalNumEl = document.getElementById('slideTotalNum');
    const dotsContainer = document.getElementById('sliderDots');
    const cards = Array.from(track.querySelectorAll('.project-card'));
    const totalCards = cards.length;

    if (totalNumEl) {
      totalNumEl.textContent = String(totalCards).padStart(2, '0');
    }

    // Build interactive dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((card, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
        dot.addEventListener('click', () => {
          scrollToCard(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function scrollToCard(index) {
      const clampedIndex = Math.max(0, Math.min(index, totalCards - 1));
      const card = cards[clampedIndex];
      if (card) {
        track.scrollTo({
          left: card.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    function getVisibleCardsCount() {
      const trackWidth = track.clientWidth;
      const cardWidth = cards[0] ? cards[0].offsetWidth : 360;
      return Math.max(1, Math.round(trackWidth / cardWidth));
    }

    function slideNext() {
      const step = getVisibleCardsCount();
      const currentIdx = getCurrentCardIndex();
      scrollToCard(currentIdx + step);
    }

    function slidePrev() {
      const step = getVisibleCardsCount();
      const currentIdx = getCurrentCardIndex();
      scrollToCard(currentIdx - step);
    }

    prevBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      slidePrev();
    }));

    nextBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      slideNext();
    }));

    function getCurrentCardIndex() {
      const scrollLeft = track.scrollLeft;
      const trackLeft = track.offsetLeft;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardPos = card.offsetLeft - trackLeft;
        const distance = Math.abs(cardPos - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      return closestIdx;
    }

    function updateSliderState() {
      const idx = getCurrentCardIndex();
      if (activeNumEl) {
        activeNumEl.textContent = String(idx + 1).padStart(2, '0');
      }

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }

      // Update button disabled state
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 10;
      const isAtStart = track.scrollLeft <= 8;
      const isAtEnd = track.scrollLeft >= maxScrollLeft;

      prevBtns.forEach(btn => {
        btn.disabled = isAtStart;
      });
      nextBtns.forEach(btn => {
        btn.disabled = isAtEnd;
      });
    }

    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateSliderState);
    }, { passive: true });

    setTimeout(updateSliderState, 150);
    window.addEventListener('resize', updateSliderState);

    // Mouse drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input')) return;
      isDown = true;
      track.classList.add('grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
    });

    // Keyboard navigation when track is focused
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Project drawings sliding window');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        slideNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        slidePrev();
      }
    });
  }

  // --- 08. CAPABILITIES SLIDING WINDOW CONTROLLER ---
  function initCapabilitiesSlider() {
    const track = document.getElementById('capabilitiesSliderTrack');
    if (!track) return;

    const prevBtns = [document.getElementById('capabilitiesPrevBtn'), document.getElementById('capabilitiesSidePrev')].filter(Boolean);
    const nextBtns = [document.getElementById('capabilitiesNextBtn'), document.getElementById('capabilitiesSideNext')].filter(Boolean);
    const activeNumEl = document.getElementById('capabilitiesActiveNum');
    const totalNumEl = document.getElementById('capabilitiesTotalNum');
    const dotsContainer = document.getElementById('capabilitiesDots');
    const cards = Array.from(track.querySelectorAll('.capability-block'));
    const totalCards = cards.length;

    if (totalNumEl) {
      totalNumEl.textContent = String(totalCards).padStart(2, '0');
    }

    // Build interactive dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((card, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to capability ${idx + 1}`);
        dot.addEventListener('click', () => {
          scrollToCard(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function scrollToCard(index) {
      const clampedIndex = Math.max(0, Math.min(index, totalCards - 1));
      const card = cards[clampedIndex];
      if (card) {
        track.scrollTo({
          left: card.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    function getVisibleCardsCount() {
      const trackWidth = track.clientWidth;
      const cardWidth = cards[0] ? cards[0].offsetWidth : 340;
      return Math.max(1, Math.round(trackWidth / cardWidth));
    }

    function slideNext() {
      const step = getVisibleCardsCount();
      const currentIdx = getCurrentCardIndex();
      scrollToCard(currentIdx + step);
    }

    function slidePrev() {
      const step = getVisibleCardsCount();
      const currentIdx = getCurrentCardIndex();
      scrollToCard(currentIdx - step);
    }

    prevBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      slidePrev();
    }));

    nextBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      slideNext();
    }));

    function getCurrentCardIndex() {
      const scrollLeft = track.scrollLeft;
      const trackLeft = track.offsetLeft;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardPos = card.offsetLeft - trackLeft;
        const distance = Math.abs(cardPos - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      return closestIdx;
    }

    function updateSliderState() {
      const idx = getCurrentCardIndex();
      if (activeNumEl) {
        activeNumEl.textContent = String(idx + 1).padStart(2, '0');
      }

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }

      // Update button disabled state
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 10;
      const isAtStart = track.scrollLeft <= 8;
      const isAtEnd = track.scrollLeft >= maxScrollLeft;

      prevBtns.forEach(btn => {
        btn.disabled = isAtStart;
      });
      nextBtns.forEach(btn => {
        btn.disabled = isAtEnd;
      });
    }

    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateSliderState);
    }, { passive: true });

    setTimeout(updateSliderState, 150);
    window.addEventListener('resize', updateSliderState);

    // Mouse drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input')) return;
      isDown = true;
      track.classList.add('grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
    });

    // Keyboard navigation when track is focused
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Capabilities sliding window');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        slideNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        slidePrev();
      }
    });
  }

  // --- 09. HOVERDEV SHIFT HIGHLIGHT TABS CONTROLLER ---
  function initShiftHighlightTabs() {
    const tabBtns = document.querySelectorAll('.shift-tab-btn');
    const panels = document.querySelectorAll('.shift-tab-panel');
    const backers = document.querySelectorAll('.shift-tab-backer');
    if (!tabBtns.length) return;

    function activateTab(index) {
      tabBtns.forEach((btn, idx) => {
        const isActive = idx === index;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });

      backers.forEach((backer, idx) => {
        backer.classList.toggle('active-backer', idx === index);
      });

      panels.forEach((panel, idx) => {
        panel.classList.toggle('active', idx === index);
      });
    }

    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activateTab(idx);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIdx = (idx + 1) % tabBtns.length;
          tabBtns[nextIdx].focus();
          activateTab(nextIdx);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIdx = (idx - 1 + tabBtns.length) % tabBtns.length;
          tabBtns[prevIdx].focus();
          activateTab(prevIdx);
        }
      });
    });
  }

  // --- 10. WORKFLOW CONNECTED PIPELINE ANIMATION CONTROLLER ---
  function initWorkflowConnectionPipeline() {
    const track = document.getElementById('workflowTrack');
    const steps = document.querySelectorAll('.workflow-step');
    const activeBeam = document.getElementById('workflowActiveBeam');
    if (!steps.length) return;

    function highlightStep(stepNum) {
      const pct = (stepNum / steps.length) * 100;
      if (activeBeam) {
        activeBeam.style.width = `${pct}%`;
      }

      steps.forEach((st, idx) => {
        const stepVal = idx + 1;
        st.classList.toggle('active', stepVal <= stepNum);
      });
    }

    steps.forEach((step, idx) => {
      const stepVal = idx + 1;
      step.addEventListener('mouseenter', () => {
        highlightStep(stepVal);
      });
      step.addEventListener('click', () => {
        highlightStep(stepVal);
      });
    });

    if (track) {
      track.addEventListener('mouseleave', () => {
        highlightStep(1);
      });
    }
  }

  // --- 11. CONTACT CHANNELS CONTROLLER ---
  function initClipPathLinks() {
    // Contact channel plates remain clean with no directional hover wipe overlay
  }

  // --- 12. HERO DYNAMIC TYPING EFFECT CONTROLLER ---
  function initHeroTyping() {
    const textEl = document.getElementById('heroTypedText');
    if (!textEl) return;

    const phrases = [
      "AutoCAD 2D Architectural Drafting",
      "BIM Fundamentals & Revit 3D Modeling",
      "Structural Drawing Interpretation",
      "Quantity Surveying & Cost Estimation",
      "Floor-Wise Work Planning & Archiving"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        textEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        textEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // --- 13. DRAW OUTLINE BUTTONS CONTROLLER ---
  function initDrawOutlineButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
      if (!btn.querySelector('.btn-draw-top')) {
        const top = document.createElement('span');
        top.className = 'btn-draw-line btn-draw-top';
        const right = document.createElement('span');
        right.className = 'btn-draw-line btn-draw-right';
        const bottom = document.createElement('span');
        bottom.className = 'btn-draw-line btn-draw-bottom';
        const left = document.createElement('span');
        left.className = 'btn-draw-line btn-draw-left';
        btn.appendChild(top);
        btn.appendChild(right);
        btn.appendChild(bottom);
        btn.appendChild(left);
      }
    });
  }

  // --- 14. SIDE STAGGER NAVIGATION DRAWER CONTROLLER ---
  function initSideStaggerNavigation() {
    const toggleBtn = document.getElementById('sideNavToggleBtn');
    const drawer = document.getElementById('sideStaggerDrawer');
    const closeBtn = document.getElementById('drawerCloseBtn');

    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --- 15. INITIALIZATION ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    handleRoute();
    updateActiveNav();
    initProfilePhoto();
    initProjectsSlider();
    initShiftHighlightTabs();
    initWorkflowConnectionPipeline();
    initClipPathLinks();
    initHeroTyping();
    initDrawOutlineButtons();
    initSideStaggerNavigation();

    // Attach lightbox controls
    document.getElementById('lightboxCloseBtn')?.addEventListener('click', closeLightbox);
    document.getElementById('lightboxZoomInBtn')?.addEventListener('click', zoomIn);
    document.getElementById('lightboxZoomOutBtn')?.addEventListener('click', zoomOut);
    document.getElementById('lightboxResetBtn')?.addEventListener('click', resetZoom);
    document.getElementById('lightboxNextBtn')?.addEventListener('click', nextSheet);
    document.getElementById('lightboxPrevBtn')?.addEventListener('click', prevSheet);
    document.getElementById('lightboxSideNextBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSheet();
    });
    document.getElementById('lightboxSidePrevBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSheet();
    });

    // Clicking drawing image advances to the next sheet (Main Model -> Model 1 -> Model 2 -> Model 3)
    document.getElementById('lightboxImg')?.addEventListener('click', (e) => {
      if (currentZoom === 1 && activeLightboxProj && activeLightboxProj.sheets && activeLightboxProj.sheets.length > 1) {
        e.stopPropagation();
        nextSheet();
      }
    });

    // In-lightbox add image & new sheet buttons
    document.getElementById('lightboxAddImgBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      triggerLightboxFileUpload();
    });

    document.getElementById('lightboxNewSheetBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (activeLightboxProj && window.triggerAddSheetFlow) {
        window.triggerAddSheetFlow(activeLightboxProj.id);
      }
    });

    document.getElementById('lightboxFileInput')?.addEventListener('change', (e) => {
      if (activeLightboxProj && e.target.files && e.target.files.length > 0) {
        if (window.handleDrawingUpload) {
          window.handleDrawingUpload(activeLightboxProj.id, activeLightboxSheetIdx, e.target.files);
        }
        updateLightboxContent();
      }
    });

    // Lightbox placeholder upload button delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('#lightboxPlaceholderUploadBtn')) {
        e.preventDefault();
        triggerLightboxFileUpload();
      }
    });

    // Fullscreen viewer trigger buttons
    document.querySelectorAll('[data-action="view-fullscreen"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project') || 'A-101';
        openLightbox(projId, 0);
      });
    });

    // Resume buttons
    document.querySelectorAll('[data-action="view-resume"], [data-action="download-resume"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        handleResumeView(e);
      });
    });

    // IntersectionObserver for staggered reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('in'));
    }
  });

})();
