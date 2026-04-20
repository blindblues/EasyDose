/* ══════════════════════════════════════════════════════
   EasyDose – Application Logic
   Vanilla JS, localStorage-backed, zero dependencies
   ══════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Supabase Config ──
  // SOSTITUISCI CON I TUOI DATI
  const SUPABASE_URL = 'https://euvnmybostvtdtfxdwjq.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_yH8KTWg1Kia8tO8EjGx9Wg_pewFnin1';
  const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

  // ── State ──
  let user = null;
  let foods = [
    { id: "def_1", name: "Arance", carbsPer100g: 7.8, defaultGrams: 200, tag: "Frutta" },
    { id: "def_2", name: "Arachidi", carbsPer100g: 19.0, defaultGrams: 20, tag: "Snack" },
    { id: "def_3", name: "Big Mac", carbsPer100g: 18.0, defaultGrams: 233, tag: "Junk Food" },
    { id: "def_4", name: "Carote", carbsPer100g: 9.6, defaultGrams: 250, tag: "Verdura" },
    { id: "def_5", name: "Ceci", carbsPer100g: 17.0, defaultGrams: 120, tag: "Generale" },
    { id: "def_6", name: "Cetrioli", carbsPer100g: 3.6, defaultGrams: 250, tag: "Verdura" },
    { id: "def_7", name: "Choco Krave", carbsPer100g: 69.0, defaultGrams: 50, tag: "Pasta/Pane" },
    { id: "def_8", name: "Ciliegie", carbsPer100g: 16.1, defaultGrams: 100, tag: "Frutta" },
    { id: "def_9", name: "Cioccolato Fondente 70%", carbsPer100g: 32.0, defaultGrams: 16.6, tag: "Snack" },
    { id: "def_10", name: "Cornetto Algida", carbsPer100g: 32.0, defaultGrams: 75, tag: "Junk Food" },
    { id: "def_11", name: "Double Chicken BBQ", carbsPer100g: 27.0, defaultGrams: 218, tag: "Junk Food" },
    { id: "def_12", name: "Fagioli Borlotti", carbsPer100g: 9.8, defaultGrams: 46, tag: "Generale" },
    { id: "def_13", name: "Fagioli Cannellini", carbsPer100g: 13.0, defaultGrams: 46, tag: "Generale" },
    { id: "def_14", name: "Fette Biscottate Integrali", carbsPer100g: 67.0, defaultGrams: 14, tag: "Pasta/Pane" },
    { id: "def_15", name: "Fragole", carbsPer100g: 7.7, defaultGrams: 100, tag: "Frutta" },
    { id: "def_16", name: "Gallette Riso con Cioccolato", carbsPer100g: 62.0, defaultGrams: 100, tag: "Snack" },
    { id: "def_17", name: "Kiwi", carbsPer100g: 14.7, defaultGrams: 60, tag: "Frutta" },
    { id: "def_18", name: "Lamponi", carbsPer100g: 7.0, defaultGrams: 60, tag: "Frutta" },
    { id: "def_19", name: "Latte", carbsPer100g: 4.9, defaultGrams: 200, tag: "Snack" },
    { id: "def_20", name: "Lattughino", carbsPer100g: 2.2, defaultGrams: 125, tag: "Verdura" },
    { id: "def_21", name: "Marmellata Albicocca", carbsPer100g: 45.0, defaultGrams: 14, tag: "Generale" },
    { id: "def_22", name: "Maxibon", carbsPer100g: 38.0, defaultGrams: 96, tag: "Junk Food" },
    { id: "def_23", name: "Mc Flurry Smarties", carbsPer100g: 33.0, defaultGrams: 181, tag: "Junk Food" },
    { id: "def_24", name: "Mela", carbsPer100g: 13.0, defaultGrams: 240, tag: "Frutta" },
    { id: "def_25", name: "Muesli", carbsPer100g: 64.0, defaultGrams: 80, tag: "Pasta/Pane" },
    { id: "def_26", name: "Muffin", carbsPer100g: 53.0, defaultGrams: 300, tag: "Junk Food" },
    { id: "def_27", name: "Panbauletto Cereali", carbsPer100g: 45.0, defaultGrams: 120, tag: "Pasta/Pane" },
    { id: "def_28", name: "Pasta Integrale", carbsPer100g: 62.0, defaultGrams: 120, tag: "Pasta/Pane" },
    { id: "def_29", name: "Patatine Grandi Mc", carbsPer100g: 21.0, defaultGrams: 257, tag: "Junk Food" },
    { id: "def_30", name: "Patè di Tonno", carbsPer100g: 1.5, defaultGrams: 30, tag: "Secondi" },
    { id: "def_31", name: "Pere", carbsPer100g: 10.0, defaultGrams: 150, tag: "Frutta" },
    { id: "def_32", name: "Pesca Noce", carbsPer100g: 10.5, defaultGrams: 100, tag: "Frutta" },
    { id: "def_33", name: "Piselli", carbsPer100g: 8.9, defaultGrams: 120, tag: "Verdura" },
    { id: "def_34", name: "Pizza Capricciosa", carbsPer100g: 34.0, defaultGrams: 450, tag: "Pasta/Pane" },
    { id: "def_35", name: "Pomodori Datterini", carbsPer100g: 3.6, defaultGrams: 200, tag: "Verdura" },
    { id: "def_36", name: "Riso Integrale", carbsPer100g: 75.0, defaultGrams: 60, tag: "Pasta/Pane" },
    { id: "def_37", name: "Rotolo Cioccolato", carbsPer100g: 54.0, defaultGrams: 300, tag: "Junk Food" },
    { id: "def_38", name: "Semi di Lino", carbsPer100g: 13.0, defaultGrams: 10, tag: "Snack" },
    { id: "def_39", name: "Wurstel con formaggio", carbsPer100g: 2.0, defaultGrams: 150, tag: "Secondi" },
    { id: "def_40", name: "Yogurt Soia", carbsPer100g: 10.5, defaultGrams: 125, tag: "Snack" }
  ];
  let selectedFoods = {};       // id → boolean
  let carbsPerUnit = 10.0;
  let sensitivity = 50.0;

  // Editing state
  let editingFoodId = null;
  let deletingFoodId = null;
  let activeFilters = [];       // array di stringhe (tag selezionati)

  // ── DOM refs ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const insulinValueEl = $('#insulin-value');
  const totalCarbsEl = $('#total-carbs');
  const foodListEl = $('#food-list');
  const emptyState = $('#empty-state');
  const noResultsState = $('#no-results-state');
  const noResultsText = $('#no-results-text');
  const searchInput = $('#search-input');
  const searchClear = $('#search-clear');
  const filterBarEl = $('#filter-bar');
  const snackbarEl = $('#snackbar');

  // Modals
  const modalFood = $('#modal-food');
  const modalFoodTitle = $('#modal-food-title');
  const modalFoodSave = $('#modal-food-save');
  const foodNameInput = $('#food-name');
  const foodGramsInput = $('#food-grams');
  const foodCarbsInput = $('#food-carbs');
  const foodTagInput = $('#food-tag'); 
  const tagChecklistEl = $('#tag-checklist');
  const btnAddTagModalEl = $('#btn-add-tag-modal');
  const tagDropdownBtn = $('#tag-dropdown-btn');
  const tagDropdownContent = $('#tag-dropdown-content');
  const tagDropdownLabel = $('#tag-dropdown-label');

  const modalSettings = $('#modal-settings');
  const settingCarbsInput = $('#setting-carbs');
  const settingSensInput = $('#setting-sensitivity');

  const modalGlucose = $('#modal-glucose');
  const glucoseInput = $('#glucose-value');
  const glucoseResult = $('#glucose-result');
  const glucoseContent = $('#glucose-result-content');
  const glucoseOkBtn = $('#modal-glucose-ok');

  const modalDelete = $('#modal-delete');
  const deleteText = $('#modal-delete-text');

  const modalAuth = $('#modal-auth');
  const authEmail = $('#auth-email');
  const authPass = $('#auth-password');
  const btnLogin = $('#btn-login');
  const btnRegister = $('#btn-register');
  const btnGoogle = $('#btn-google');
  const btnAuthOpen = $('#btn-auth');
  const modalAuthTitle = $('#modal-auth-title');
  const modalAuthCancel = $('#modal-auth-cancel');
  
  const modalProfile = $('#modal-profile');
  const profileEmailEl = $('#profile-email');
  const btnLogout = $('#btn-logout');
  const modalProfileCancel = $('#modal-profile-cancel');
  
  const modalUsername = $('#modal-username');
  const usernameInput = $('#input-username');
  const btnSaveUsername = $('#btn-save-username');

  // ── Utilities ──

  function parseNum(text) {
    if (!text) return null;
    const n = parseFloat(String(text).replace(',', '.'));
    return isNaN(n) ? null : n;
  }

  function roundHalf(v) {
    return Math.round(v * 2) / 2;
  }

  function roundTenths(v) {
    return Math.round(v * 10) / 10;
  }

  // ── Persistence ──

  async function save() {
    // Sincronizza localmente per sicurezza
    localStorage.setItem('easydose_foods', JSON.stringify(foods));
    localStorage.setItem('easydose_selected', JSON.stringify(selectedFoods));
    localStorage.setItem('easydose_carbsPerUnit', carbsPerUnit);
    localStorage.setItem('easydose_sensitivity', sensitivity);

    // Se l'utente è loggato, salva su Supabase
    if (user && supabase) {
      try {
        // Salvataggio impostazioni
        await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            carbs_per_unit: carbsPerUnit,
            sensitivity: sensitivity,
            updated_at: new Date()
          });

        // NOTA: Per i cibi faremo un salvataggio granulare nelle funzioni ADD/EDIT/DELETE
        // ma per prudenza potremmo fare un sync massivo qui se necessario.
      } catch (err) {
        console.error('Errore salvataggio cloud:', err);
      }
    }
  }

  async function load() {
    // 1. Carica prima i dati locali
    try {
      const f = localStorage.getItem('easydose_foods');
      if (f) {
        const parsed = JSON.parse(f);
        // Forza la presenza del tag per i vecchi salvataggi
        foods = parsed.map(food => ({
          ...food,
          tag: food.tag || 'Generale'
        }));
      }
      
      const s = localStorage.getItem('easydose_selected');
      if (s) selectedFoods = JSON.parse(s);
      const c = parseNum(localStorage.getItem('easydose_carbsPerUnit'));
      if (c !== null && c > 0) carbsPerUnit = c;
      const se = parseNum(localStorage.getItem('easydose_sensitivity'));
      if (se !== null && se > 0) sensitivity = se;
    } catch { /* ignore */ }

    // 2. Se l'utente è loggato, sovrascrivi con i dati cloud
    if (user && supabase) {
      try {
        // Carica Impostazioni
        const { data: settings } = await supabase
          .from('user_settings')
          .select('*')
          .single();

        if (settings) {
          carbsPerUnit = settings.carbs_per_unit;
          sensitivity = settings.sensitivity;
        }

        // Carica Cibi
        const { data: cloudFoods } = await supabase
          .from('foods')
          .select('*')
          .order('name');

        if (cloudFoods) {
          foods = cloudFoods.map(f => ({
            id: f.id,
            name: f.name,
            carbsPer100g: f.carbs_per_100g,
            defaultGrams: f.default_grams,
            tags: Array.isArray(f.tags) ? f.tags : (f.tag ? [f.tag] : ['Generale']),
            tag: f.tag // per compatibilità
          }));
        }
      } catch (err) {
        console.error('Errore caricamento cloud:', err);
      }
    }
    renderFoods();
  }

  // ── Calculations ──

  function totalCarbsFromSelection() {
    let total = 0;
    for (const food of foods) {
      if (!selectedFoods[food.id]) continue;
      const gramsInput = document.querySelector(`[data-grams-id="${food.id}"]`);
      const grams = gramsInput ? (parseNum(gramsInput.value) || 0) : food.defaultGrams;
      total += (food.carbsPer100g * grams) / 100;
    }
    return total;
  }

  function insulinUnits() {
    if (carbsPerUnit === 0) return 0;
    return roundHalf(totalCarbsFromSelection() / carbsPerUnit);
  }

  function calculateSupplement(glucose) {
    if (glucose < 120) {
      if (carbsPerUnit === 0) return 0;
      return roundTenths((120 - glucose) / (sensitivity / carbsPerUnit));
    }
    return roundHalf((glucose - 120) / sensitivity);
  }

  // ── Rendering ──

  function updateDisplay() {
    const units = insulinUnits();
    const carbs = totalCarbsFromSelection();

    insulinValueEl.textContent = units.toFixed(2);
    totalCarbsEl.textContent = carbs.toFixed(1);

    // tiny bump animation
    insulinValueEl.classList.remove('bump');
    void insulinValueEl.offsetWidth; // reflow
    insulinValueEl.classList.add('bump');
  }

  function renderFoods() {
    foodListEl.innerHTML = '';
    const query = searchInput.value.toLowerCase();

    // 1. Calcola i tag attualmente ESISTENTI nei cibi
    const currentTags = new Set();
    foods.forEach(f => {
      const tags = Array.isArray(f.tags) ? f.tags : (f.tag ? [f.tag] : ['Generale']);
      tags.forEach(t => currentTags.add(t));
    });

    // 2. Pulizia FORZATA: se un filtro attivo non esiste più tra i tag correnti, eliminalo
    activeFilters = activeFilters.filter(tag => currentTags.has(tag));

    // 3. Renderizza la barra filtri (passando i tag ordinati)
    const sortedTags = Array.from(currentTags).sort();
    renderFilterBar(sortedTags);

    // 4. Filtriamo i cibi (usando i filtri appena puliti)
    let filtered = foods.filter(food => {
      const foodTags = Array.isArray(food.tags) ? food.tags : (food.tag ? [food.tag] : ['Generale']);
      const matchesSearch = food.name.toLowerCase().includes(query);
      
      // Se non ci sono filtri attivi, mostra tutto. Altrimenti, deve avere almeno uno dei tag selezionati.
      const matchesFilter = activeFilters.length === 0 || activeFilters.some(f => foodTags.includes(f));
      
      return matchesSearch && matchesFilter;
    });

    // 5. Ordinamento
    filtered.sort((a, b) => {
      const aSel = !!selectedFoods[a.id];
      const bSel = !!selectedFoods[b.id];
      if (aSel && !bSel) return -1;
      if (!aSel && bSel) return 1;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    // 6. Stati Vuoti
    if (foods.length === 0) {
      $('#empty-state').style.display = 'block';
      noResultsState.style.display = 'none';
      return;
    } else if (filtered.length === 0) {
      $('#empty-state').style.display = 'none';
      noResultsState.style.display = 'block';
      noResultsText.textContent = `Nessun risultato trovato`;
      return;
    }

    $('#empty-state').style.display = 'none';
    noResultsState.style.display = 'none';

    // 7. Lista Flat
    const flatList = document.createElement('div');
    flatList.className = 'food-list-flat';

    filtered.forEach(food => {
      const card = createFoodCard(food);
      flatList.appendChild(card);
    });

    foodListEl.appendChild(flatList);
    updateDisplay();
  }

  function renderFilterBar(sortedTags) {
    filterBarEl.innerHTML = '';

    sortedTags.forEach(tag => {
      const chip = document.createElement('div');
      // Usiamo una classe 'active' per indicare se il filtro è applicato
      const isActive = activeFilters.includes(tag);
      chip.className = `filter-chip ${isActive ? 'active' : ''}`;
      chip.textContent = tag;
      
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeFilters.includes(tag)) {
          activeFilters = activeFilters.filter(f => f !== tag);
        } else {
          activeFilters.push(tag);
        }
        renderFoods(); // Riesegue tutto inclusa la pulizia e il render della lista
      });
      filterBarEl.appendChild(chip);
    });
  }

  function createFoodCard(food) {
    const selected = !!selectedFoods[food.id];
    const foodTags = Array.isArray(food.tags) ? food.tags : (food.tag ? [food.tag] : ['Generale']);
    
    const card = document.createElement('div');
    card.className = 'food-card' + (selected ? ' selected' : '');
    card.dataset.id = food.id;

    card.innerHTML = `
      <div class="food-checkbox">
        <span class="material-icons-round">check</span>
      </div>
      <div class="food-info">
        <div class="food-name">${escHtml(food.name)}</div>
        <div class="food-carbs">${food.carbsPer100g.toFixed(1)} g/100g</div>
        <div class="food-card-tags">
          ${foodTags.map(t => `<span class="mini-tag">${escHtml(t)}</span>`).join('')}
        </div>
      </div>
      <input type="number" class="food-grams-input"
             data-grams-id="${food.id}"
             value="${getGramsValue(food)}"
             min="0" step="any" inputmode="decimal">
      <span class="food-grams-suffix">g</span>
      <div class="food-menu-wrap" data-menu-id="${food.id}">
        <button class="food-menu-btn" aria-label="Menu">
          <span class="material-icons-round">more_vert</span>
        </button>
        <div class="popup-menu" data-popup-id="${food.id}">
          <button data-action="edit" data-fid="${food.id}">Modifica</button>
          <button data-action="delete" data-fid="${food.id}">Elimina</button>
        </div>
      </div>
    `;
    return card;
  }

  function getGramsValue(food) {
    const existing = document.querySelector(`[data-grams-id="${food.id}"]`);
    if (existing && existing.value) return existing.value;
    return food.defaultGrams.toFixed(0);
  }

  function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ── Snackbar ──

  let snackTimer = null;
  function showSnackbar(msg) {
    snackbarEl.textContent = msg;
    snackbarEl.classList.add('show');
    clearTimeout(snackTimer);
    snackTimer = setTimeout(() => snackbarEl.classList.remove('show'), 2500);
  }

  // ── Modal helpers ──

  function openModal(el) {
    el.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('visible'));
    });
  }

  function closeModal(el, cb) {
    el.classList.remove('visible');
    setTimeout(() => {
      el.style.display = 'none';
      if (cb) cb();
    }, 280);
  }

  function closeAllPopups() {
    $$('.popup-menu.open').forEach(p => p.classList.remove('open'));
  }

  // ── Event wiring ──

  // --- Food card interactions (delegated) ---
  foodListEl.addEventListener('click', (e) => {
    const target = e.target;

    // Popup actions
    const actionBtn = target.closest('[data-action]');
    if (actionBtn) {
      e.stopPropagation();
      const fid = actionBtn.dataset.fid;
      closeAllPopups();
      if (actionBtn.dataset.action === 'edit') {
        openEditFood(fid);
      } else if (actionBtn.dataset.action === 'delete') {
        openDeleteConfirm(fid);
      }
      return;
    }

    // Menu button
    const menuBtn = target.closest('.food-menu-btn');
    if (menuBtn) {
      e.stopPropagation();
      const wrap = menuBtn.closest('.food-menu-wrap');
      const popup = wrap.querySelector('.popup-menu');
      const isOpen = popup.classList.contains('open');
      closeAllPopups();
      if (!isOpen) popup.classList.add('open');
      return;
    }

    // Don't toggle when clicking the grams input
    if (target.closest('.food-grams-input')) return;

    // Toggle selection
    const card = target.closest('.food-card');
    if (card) {
      const id = card.dataset.id;
      selectedFoods[id] = !selectedFoods[id];
      card.classList.toggle('selected', selectedFoods[id]);
      // Update checkbox visual immediately
      const chk = card.querySelector('.food-checkbox .material-icons-round');
      if (chk) {
        chk.style.opacity = selectedFoods[id] ? '1' : '0';
        chk.style.transform = selectedFoods[id] ? 'scale(1)' : 'scale(.5)';
      }
      const chkBox = card.querySelector('.food-checkbox');
      if (chkBox) {
        chkBox.style.background = selectedFoods[id] ? 'var(--blue-500)' : 'transparent';
        chkBox.style.borderColor = selectedFoods[id] ? 'var(--blue-500)' : 'var(--grey-400)';
      }
      updateDisplay();
      save();
      renderFoods(); // Forza il riordinamento istantaneo
    }
  });

  // Grams input changes
  foodListEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('food-grams-input')) {
      const id = e.target.dataset.gramsId;
      const newGrams = parseNum(e.target.value) || 0;
      
      // Aggiorna lo stato dell'alimento
      const food = foods.find(f => f.id === id);
      if (food) {
        food.defaultGrams = newGrams;
        
        // Salva nel cloud se loggato
        if (user && supabase) {
          supabase.from('foods').update({ default_grams: newGrams }).eq('id', id).then();
        }
      }

      updateDisplay();
      save(); // Salva in localStorage
    }
  });

  // Close popups on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.food-menu-wrap')) {
      closeAllPopups();
    }
  });

  // Search
  searchInput.addEventListener('input', () => {
    searchClear.style.display = searchInput.value ? 'flex' : 'none';
    renderFoods();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    searchInput.focus();
    renderFoods();
  });

  // ── FABs ──

  $('#fab-add').addEventListener('click', () => openAddFood());
  $('#fab-glucose').addEventListener('click', () => openGlucoseModal());
  $('#btn-settings').addEventListener('click', () => openSettingsModal());

  // ── Add / Edit food modal ──

  function renderTagChecklist(selectedTags = []) {
    // Raccogli tutti i tag esistenti dai cibi
    const allTags = new Set(['Pasta/Pane', 'Frutta', 'Verdura', 'Secondi', 'Snack', 'Junk Food', 'Generale']);
    foods.forEach(f => {
      const tags = Array.isArray(f.tags) ? f.tags : (f.tag ? [f.tag] : []);
      tags.forEach(t => allTags.add(t));
    });

    tagChecklistEl.innerHTML = '';
    
    Array.from(allTags).sort().forEach(tag => {
      const label = document.createElement('label');
      label.className = 'tag-check-item';
      const isChecked = selectedTags.includes(tag);
      label.innerHTML = `
        <input type="checkbox" value="${tag}" ${isChecked ? 'checked' : ''}>
        <span>${tag}</span>
      `;
      
      // Aggiorna il testo del pulsante quando clicchi
      label.querySelector('input').addEventListener('change', updateDropdownLabel);
      
      tagChecklistEl.appendChild(label);
    });

    updateDropdownLabel();
  }

  function updateDropdownLabel() {
    const checked = Array.from(tagChecklistEl.querySelectorAll('input:checked'));
    if (checked.length === 0) {
      tagDropdownLabel.textContent = 'Seleziona Tag...';
    } else if (checked.length <= 2) {
      tagDropdownLabel.textContent = checked.map(i => i.value).join(', ');
    } else {
      tagDropdownLabel.textContent = `${checked.length} Tag selezionati`;
    }
  }

  // Toggle Dropdown
  tagDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = tagDropdownContent.style.display === 'block';
    tagDropdownContent.style.display = isVisible ? 'none' : 'block';
  });

  // Chiudi dropdown se clicchi fuori
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-container')) {
      tagDropdownContent.style.display = 'none';
    }
  });

  function openAddFood() {
    editingFoodId = null;
    modalFoodTitle.textContent = 'Aggiungi Nuovo Cibo';
    modalFoodSave.textContent = 'Aggiungi';
    foodNameInput.value = '';
    foodGramsInput.value = '100';
    foodCarbsInput.value = '';
    renderTagChecklist(['Generale']); // Default check
    openModal(modalFood);
    setTimeout(() => foodNameInput.focus(), 300);
  }

  function openEditFood(id) {
    const food = foods.find(f => f.id === id);
    if (!food) return;
    editingFoodId = id;
    modalFoodTitle.textContent = 'Modifica Cibo';
    modalFoodSave.textContent = 'Salva';
    foodNameInput.value = food.name;
    foodGramsInput.value = food.defaultGrams.toFixed(0);
    foodCarbsInput.value = food.carbsPer100g.toFixed(1);
    const foodTags = Array.isArray(food.tags) ? food.tags : (food.tag ? [food.tag] : ['Generale']);
    renderTagChecklist(foodTags);
    openModal(modalFood);
    setTimeout(() => foodNameInput.focus(), 300);
  }

  btnAddTagModalEl.addEventListener('click', () => {
    const newTag = prompt('Inserisci il nome del nuovo Tag / Categoria:');
    if (newTag && newTag.trim()) {
      const tag = newTag.trim();
      // Aggiungilo alla checklist e selezionalo
      const label = document.createElement('label');
      label.className = 'tag-check-item';
      label.innerHTML = `
        <input type="checkbox" value="${tag}" checked>
        ${tag}
      `;
      tagChecklistEl.appendChild(label);
    }
  });

  $('#modal-food-cancel').addEventListener('click', () => closeModal(modalFood));

  modalFood.addEventListener('click', (e) => {
    if (e.target === modalFood) closeModal(modalFood);
  });

  modalFoodSave.addEventListener('click', () => {
    const name = foodNameInput.value.trim();
    const carbs = parseNum(foodCarbsInput.value);
    const grams = parseNum(foodGramsInput.value) || 100;
    
    // Legge i tag selezionati dalle checkbox
    const tags = Array.from(tagChecklistEl.querySelectorAll('input:checked')).map(i => i.value);
    if (tags.length === 0) tags.push('Generale');

    if (!name || carbs === null || carbs <= 0 || grams <= 0) return;

    if (editingFoodId) {
      // Update
      const idx = foods.findIndex(f => f.id === editingFoodId);
      if (idx !== -1) {
        foods[idx] = { ...foods[idx], name, carbsPer100g: carbs, defaultGrams: grams, tags };
        foods.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        // Sync Cloud
        if (user && supabase) {
          supabase.from('foods').upsert({
            id: editingFoodId,
            user_id: user.id,
            name,
            carbs_per_100g: carbs,
            default_grams: grams,
            tags // Salviamo l'array
          }).then(({ error }) => {
            if (error) {
              console.error('Errore Cloud:', error);
              showSnackbar('Errore sincronizzazione Cloud!');
            }
          });
        }

        save();
        renderFoods();
        showSnackbar(`"${name}" aggiornato`);
      }
    } else {
      // Add
      const id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 4);
      const newFood = { id, name, carbsPer100g: carbs, defaultGrams: grams, tags };

      foods.push(newFood);
      selectedFoods[id] = false;
      foods.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

      // Sync Cloud
      if (user && supabase) {
        supabase.from('foods').insert({
          id,
          user_id: user.id,
          name,
          carbs_per_100g: carbs,
          default_grams: grams,
          tags // Salviamo l'array
        }).then(({ error }) => {
          if (error) {
            console.error('Errore Cloud:', error);
            showSnackbar('Errore: non riesco a salvare nel Cloud.');
          }
        });
      }

      save();
      renderFoods();
      showSnackbar(`${name} aggiunto!`);
    }

    closeModal(modalFood);
  });

  // ── Delete confirmation ──

  function openDeleteConfirm(id) {
    const food = foods.find(f => f.id === id);
    if (!food) return;
    deletingFoodId = id;
    deleteText.textContent = `Eliminare "${food.name}"?`;
    openModal(modalDelete);
  }

  $('#modal-delete-cancel').addEventListener('click', () => closeModal(modalDelete));

  modalDelete.addEventListener('click', (e) => {
    if (e.target === modalDelete) closeModal(modalDelete);
  });

  $('#modal-delete-confirm').addEventListener('click', () => {
    if (deletingFoodId) {
      // Sync Cloud
      if (user && supabase) {
        supabase.from('foods').delete().eq('id', deletingFoodId).then();
      }

      foods = foods.filter(f => f.id !== deletingFoodId);
      delete selectedFoods[deletingFoodId];
      save();
      renderFoods();
      showSnackbar('Cibo eliminato');
      deletingFoodId = null;
    }
    closeModal(modalDelete);
  });

  // ── Settings modal ──

  function openSettingsModal() {
    settingCarbsInput.value = carbsPerUnit.toFixed(1);
    settingSensInput.value = sensitivity.toFixed(1);
    openModal(modalSettings);
    setTimeout(() => settingCarbsInput.focus(), 300);
  }

  $('#modal-settings-cancel').addEventListener('click', () => closeModal(modalSettings));

  modalSettings.addEventListener('click', (e) => {
    if (e.target === modalSettings) closeModal(modalSettings);
  });

  $('#modal-settings-save').addEventListener('click', () => {
    const c = parseNum(settingCarbsInput.value);
    const s = parseNum(settingSensInput.value);
    if (c !== null && c > 0 && s !== null && s > 0) {
      carbsPerUnit = c;
      sensitivity = s;
      save();
      updateDisplay();
      closeModal(modalSettings);
    }
  });

  // ── Glucose modal ──

  function openGlucoseModal() {
    glucoseInput.value = '';
    glucoseResult.style.display = 'none';
    glucoseOkBtn.style.display = 'none';
    glucoseContent.innerHTML = '';
    openModal(modalGlucose);
    setTimeout(() => glucoseInput.focus(), 300);
  }

  glucoseInput.addEventListener('input', () => {
    const glucose = parseNum(glucoseInput.value);
    if (glucose === null || glucose <= 0) {
      glucoseResult.style.display = 'none';
      glucoseOkBtn.style.display = 'none';
      return;
    }

    glucoseResult.style.display = '';
    glucoseOkBtn.style.display = '';

    const isLow = glucose < 120;
    const isNormal = glucose >= 120 && glucose <= 160;

    if (isNormal) {
      glucoseContent.innerHTML = `
        <div class="glucose-ok">
          <span class="material-icons-round">thumb_up</span>
        </div>`;
    } else {
      const value = calculateSupplement(glucose);
      const label = isLow ? 'Grammi da mangiare' : 'Supplemento';
      const unit = isLow ? 'g' : 'unità';
      const cls = isLow ? 'glucose-low' : 'glucose-high';
      glucoseContent.innerHTML = `
        <p class="glucose-text ${cls}">${label}: ${value.toFixed(2)} ${unit}</p>`;
    }
  });

  $('#modal-glucose-cancel').addEventListener('click', () => closeModal(modalGlucose));

  modalGlucose.addEventListener('click', (e) => {
    if (e.target === modalGlucose) closeModal(modalGlucose);
  });

  glucoseOkBtn.addEventListener('click', () => {
    const glucose = parseNum(glucoseInput.value);
    if (glucose !== null) {
      const isNormal = glucose >= 120 && glucose <= 160;
      if (isNormal) {
        showSnackbar('👍 Glicemia OK!');
      } else {
        const isLow = glucose < 120;
        const value = calculateSupplement(glucose);
        const label = isLow ? 'Grammi da mangiare' : 'Supplemento';
        const unit = isLow ? 'g' : 'unità';
        showSnackbar(`${label}: ${value.toFixed(2)} ${unit}`);
      }
    }
    closeModal(modalGlucose);
  });

  // ── Keyboard shortcuts for modals ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalDelete.style.display !== 'none') closeModal(modalDelete);
      else if (modalGlucose.style.display !== 'none') closeModal(modalGlucose);
      else if (modalFood.style.display !== 'none') closeModal(modalFood);
      else if (modalSettings.style.display !== 'none') closeModal(modalSettings);
    }
  });

  // ── Auth Logic ──

  function handleAuth() {
    if (user) {
      profileEmailEl.textContent = user.email;
      openModal(modalProfile);
    } else {
      openModal(modalAuth);
    }
  }

  async function register() {
    const email = authEmail.value;
    const password = authPass.value;
    if (!email || !password) return;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      showSnackbar('Errore: ' + error.message);
    } else {
      showSnackbar('Controlla la tua email per confermare!');
      closeModal(modalAuth);
    }
  }

  async function loginWithGoogle() {
    if (!supabase) return;
    
    // Forza il redirect verso il dominio di produzione se non siamo in localhost
    const redirectUrl = window.location.hostname === 'localhost' 
      ? window.location.origin 
      : 'https://easydose.blindblues.com';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      showSnackbar('Errore Google: ' + error.message);
    }
  }

  async function syncDefaultFoods() {
    showSnackbar('Sincronizzazione lista predefinita...');
    
    const defaultFoods = [
      { id: "def_1", name: "Arance", carbsPer100g: 7.8, defaultGrams: 200, tag: "Frutta" },
      { id: "def_2", name: "Arachidi", carbsPer100g: 19.0, defaultGrams: 20, tag: "Snack" },
      { id: "def_3", name: "Big Mac", carbsPer100g: 18.0, defaultGrams: 233, tag: "Junk Food" },
      { id: "def_4", name: "Carote", carbsPer100g: 9.6, defaultGrams: 250, tag: "Verdura" },
      { id: "def_5", name: "Ceci", carbsPer100g: 17.0, defaultGrams: 120, tag: "Generale" },
      { id: "def_6", name: "Cetrioli", carbsPer100g: 3.6, defaultGrams: 250, tag: "Verdura" },
      { id: "def_7", name: "Choco Krave", carbsPer100g: 69.0, defaultGrams: 50, tag: "Pasta/Pane" },
      { id: "def_8", name: "Ciliegie", carbsPer100g: 16.1, defaultGrams: 100, tag: "Frutta" },
      { id: "def_9", name: "Cioccolato Fondente 70%", carbsPer100g: 32.0, defaultGrams: 16.6, tag: "Snack" },
      { id: "def_10", name: "Cornetto Algida", carbsPer100g: 32.0, defaultGrams: 75, tag: "Junk Food" },
      { id: "def_11", name: "Double Chicken BBQ", carbsPer100g: 27.0, defaultGrams: 218, tag: "Junk Food" },
      { id: "def_12", name: "Fagioli Borlotti", carbsPer100g: 9.8, defaultGrams: 46, tag: "Generale" },
      { id: "def_13", name: "Fagioli Cannellini", carbsPer100g: 13.0, defaultGrams: 46, tag: "Generale" },
      { id: "def_14", name: "Fette Biscottate Integrali", carbsPer100g: 67.0, defaultGrams: 14, tag: "Pasta/Pane" },
      { id: "def_15", name: "Fragole", carbsPer100g: 7.7, defaultGrams: 100, tag: "Frutta" },
      { id: "def_16", name: "Gallette Riso con Cioccolato", carbsPer100g: 62.0, defaultGrams: 100, tag: "Snack" },
      { id: "def_17", name: "Kiwi", carbsPer100g: 14.7, defaultGrams: 60, tag: "Frutta" },
      { id: "def_18", name: "Lamponi", carbsPer100g: 7.0, defaultGrams: 60, tag: "Frutta" },
      { id: "def_19", name: "Latte", carbsPer100g: 4.9, defaultGrams: 200, tag: "Snack" },
      { id: "def_20", name: "Lattughino", carbsPer100g: 2.2, defaultGrams: 125, tag: "Verdura" },
      { id: "def_21", name: "Marmellata Albicocca", carbsPer100g: 45.0, defaultGrams: 14, tag: "Generale" },
      { id: "def_22", name: "Maxibon", carbsPer100g: 38.0, defaultGrams: 96, tag: "Junk Food" },
      { id: "def_23", name: "Mc Flurry Smarties", carbsPer100g: 33.0, defaultGrams: 181, tag: "Junk Food" },
      { id: "def_24", name: "Mela", carbsPer100g: 13.0, defaultGrams: 240, tag: "Frutta" },
      { id: "def_25", name: "Muesli", carbsPer100g: 64.0, defaultGrams: 80, tag: "Pasta/Pane" },
      { id: "def_26", name: "Muffin", carbsPer100g: 53.0, defaultGrams: 300, tag: "Junk Food" },
      { id: "def_27", name: "Panbauletto Cereali", carbsPer100g: 45.0, defaultGrams: 120, tag: "Pasta/Pane" },
      { id: "def_28", name: "Pasta Integrale", carbsPer100g: 62.0, defaultGrams: 120, tag: "Pasta/Pane" },
      { id: "def_29", name: "Patatine Grandi Mc", carbsPer100g: 21.0, defaultGrams: 257, tag: "Junk Food" },
      { id: "def_30", name: "Patè di Tonno", carbsPer100g: 1.5, defaultGrams: 30, tag: "Secondi" },
      { id: "def_31", name: "Pere", carbsPer100g: 10.0, defaultGrams: 150, tag: "Frutta" },
      { id: "def_32", name: "Pesca Noce", carbsPer100g: 10.5, defaultGrams: 100, tag: "Frutta" },
      { id: "def_33", name: "Piselli", carbsPer100g: 8.9, defaultGrams: 120, tag: "Verdura" },
      { id: "def_34", name: "Pizza Capricciosa", carbsPer100g: 34.0, defaultGrams: 450, tag: "Pasta/Pane" },
      { id: "def_35", name: "Pomodori Datterini", carbsPer100g: 3.6, defaultGrams: 200, tag: "Verdura" },
      { id: "def_36", name: "Riso Integrale", carbsPer100g: 75.0, defaultGrams: 60, tag: "Pasta/Pane" },
      { id: "def_37", name: "Rotolo Cioccolato", carbsPer100g: 54.0, defaultGrams: 300, tag: "Junk Food" },
      { id: "def_38", name: "Semi di Lino", carbsPer100g: 13.0, defaultGrams: 10, tag: "Snack" },
      { id: "def_39", name: "Wurstel con formaggio", carbsPer100g: 2.0, defaultGrams: 150, tag: "Secondi" },
      { id: "def_40", name: "Yogurt Soia", carbsPer100g: 10.5, defaultGrams: 125, tag: "Snack" }
    ];

    const toInsert = defaultFoods.map(f => ({
      id: f.id,
      user_id: user.id,
      name: f.name,
      carbs_per_100g: f.carbsPer100g,
      default_grams: f.defaultGrams,
      tags: [f.tag]
    }));

    await supabase.from('foods').insert(toInsert);
    foods = defaultFoods;
    renderFoods();
    showSnackbar('Dati sincronizzati con successo!');
  }

  async function login() {
    const email = authEmail.value;
    const password = authPass.value;
    if (!email || !password) return;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showSnackbar('Errore: ' + error.message);
    } else {
      // Nota: lo stato 'user' verrà aggiornato automaticamente dal listener in init()
      closeModal(modalAuth);
    }
  }

  async function logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      showSnackbar('Errore durante il logout');
    } else {
      closeModal(modalProfile);
    }
  }

  async function onAuthSuccess() {
    // Questa funzione è ora integrata nel listener onAuthStateChange in init()
  }

  async function checkUserProfile() {
    if (!user || !supabase) return;

    try {
      // Cerchiamo il profilo nella tabella 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Errore recupero profilo:', error);
        return;
      }

      if (!data || !data.username) {
        // Nessun username? Apri il modal obbligatorio
        openModal(modalUsername);
      } else {
        // Username presente? Aggiorna l'URL
        updateAppUrl(data.username);
        // Aggiorna anche il testo nel modal profilo
        profileEmailEl.innerHTML = `${user.email}<br><span style="color:var(--blue-400)">@${data.username}</span>`;
      }
    } catch (err) {
      console.error('Errore check profilo:', err);
    }
  }

  async function saveUsername() {
    const username = usernameInput.value.trim().toLowerCase();
    
    // Regola: solo lettere, numeri e underscore
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!username || username.length < 3) {
      showSnackbar('Username troppo corto (min 3 caratteri)');
      return;
    }
    if (!regex.test(username)) {
      showSnackbar('Usa solo lettere, numeri e underscore');
      return;
    }

    // 1. Verifica se l'username è già preso
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (existing) {
      showSnackbar('Questo username è già occupato!');
      return;
    }

    // 2. Salva nel database
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, username, updated_at: new Date() });

    if (error) {
      showSnackbar('Errore durante il salvataggio');
      console.error(error);
    } else {
      showSnackbar('Username salvato!');
      closeModal(modalUsername);
      updateAppUrl(username);
      profileEmailEl.innerHTML = `${user.email}<br><span style="color:var(--blue-400)">@${username}</span>`;
    }
  }

  function updateAppUrl(username) {
    if (username) {
      // Cambia l'URL in easydose.blindblues.com/username
      window.history.pushState({ username }, '', '/' + username);
    }
  }

  btnAuthOpen.addEventListener('click', handleAuth);
  btnLogin.addEventListener('click', login);
  btnRegister.addEventListener('click', register);
  btnGoogle.addEventListener('click', loginWithGoogle);
  btnLogout.addEventListener('click', logout);
  btnSaveUsername.addEventListener('click', saveUsername);
  $('#modal-auth-cancel').addEventListener('click', () => closeModal(modalAuth));
  modalProfileCancel.addEventListener('click', () => closeModal(modalProfile));

  // ── Init & Auth Listener ──
  
  function init() {
    if (!supabase) {
      load();
      return;
    }

    // Usiamo onAuthStateChange perché è molto più affidabile su mobile
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth Event:', event);
      
      if (session) {
        user = session.user;
        btnAuthOpen.classList.add('logged-in');
        
        await load();
        
        // Verifica se l'utente ha un username impostato
        await checkUserProfile();

        if (event === 'SIGNED_IN') {
          showSnackbar('Sessione attivata!');
          if (foods.length === 0) {
            syncDefaultFoods();
          }
        }
      } else {
        user = null;
        btnAuthOpen.classList.remove('logged-in');
        // Rimuovi username dall'URL tornando alla home
        window.history.pushState(null, '', '/');
        load();
        if (event === 'SIGNED_OUT') {
          showSnackbar('Sessione chiusa');
        }
      }
    });

    // Auto-correzione ID per salvataggio cloud sicuro
    let changed = false;
    foods = foods.map(f => {
      if (!isNaN(f.id) && parseInt(f.id) >= 1 && parseInt(f.id) <= 40) {
        f.id = 'def_' + f.id;
        changed = true;
      }
      return f;
    });
    if (changed) save();
  }

  init();
})();
