// Демо-данные растений 
const plants = [
  { id: 1, name: 'Монстера', latin: 'Monstera deliciosa', icon: '🌿', water: '3 дня', light: 'medium', lightLabel: 'Средний свет' },
  { id: 2, name: 'Фикус', latin: 'Ficus elastica', icon: '🌳', water: '5 дней', light: 'high', lightLabel: 'Яркий свет' },
  { id: 3, name: 'Сансевиерия', latin: 'Sansevieria', icon: '🌵', water: '14 дней', light: 'low', lightLabel: 'Тень' },
  { id: 4, name: 'Спатифиллум', latin: 'Spathiphyllum', icon: '🌸', water: '4 дня', light: 'medium', lightLabel: 'Средний свет' }
];

// Страница растений
const grid = document.getElementById('plantsGrid');
const filterLight = document.getElementById('filterLight');
const sortBy = document.getElementById('sortBy');

function renderPlants() {
  if (!grid) return;
  let list = [...plants];

  if (filterLight && filterLight.value !== 'all') {
    list = list.filter(p => p.light === filterLight.value);
  }
  if (sortBy && sortBy.value === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  grid.innerHTML = list.map(p => `
    <article class="plant-card">
      <div class="plant-card__icon">${p.icon}</div>
      <div class="plant-card__body">
        <h3 class="plant-card__name">${p.name}</h3>
        <p class="plant-card__latin">${p.latin}</p>
        <div class="plant-card__meta">
          <span class="plant-card__badge plant-card__badge--water">💧 ${p.water}</span>
          <span class="plant-card__badge plant-card__badge--light">☀️ ${p.lightLabel}</span>
        </div>
      </div>
    </article>
  `).join('');
}

if (grid) {
  filterLight?.addEventListener('change', renderPlants);
  sortBy?.addEventListener('change', renderPlants);
  renderPlants();
}

// Календарь
const calendarDays = document.getElementById('calendarDays');
const calendarTasks = document.getElementById('calendarTasks');

// Задачи привязаны к конкретному дню 
const tasksByDay = {
  0: [
    { icon: '💧', title: 'Полить Монстеру', sub: 'Сегодня, 10:00', type: 'water' },
    { icon: '🌾', title: 'Подкормить Фикус', sub: 'Сегодня, 18:00', type: 'feed' }
  ],
  1: [
    { icon: '💧', title: 'Полить Спатифиллум', sub: 'Завтра, 09:00', type: 'water' }
  ],
  2: [
    { icon: '💧', title: 'Полить Фикус', sub: 'Послезавтра, 10:00', type: 'water' },
    { icon: '🌾', title: 'Подкормить Монстеру', sub: 'Послезавтра, 17:00', type: 'feed' }
  ],
  3: [],
  4: [
    { icon: '💧', title: 'Полить Сансевиерию', sub: 'Через 4 дня, 11:00', type: 'water' }
  ],
  5: [],
  6: [
    { icon: '🌾', title: 'Подкормить Спатифиллум', sub: 'Через 6 дней, 16:00', type: 'feed' }
  ]
};

let selectedDay = 0;

function renderTasks(dayIndex) {
  if (!calendarTasks) return;

  const tasks = tasksByDay[dayIndex] || [];

  if (tasks.length === 0) {
    calendarTasks.innerHTML = `
      <div class="task-empty">
        <p class="task-empty__text">На этот день задач нет</p>
      </div>
    `;
    return;
  }

  calendarTasks.innerHTML = tasks.map(t => `
    <div class="task ${t.type === 'feed' ? 'task--feed' : ''}">
      <div class="task__icon">${t.icon}</div>
      <div>
        <div class="task__title">${t.title}</div>
        <div class="task__sub">${t.sub}</div>
      </div>
    </div>
  `).join('');
}

function renderCalendar() {
  if (!calendarDays) return;

  const today = new Date();
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  let html = '';

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    html += `
      <div class="calendar__day ${i === selectedDay ? 'is-active' : ''}" data-day="${i}">
        <div class="calendar__day-num">${d.getDate()}</div>
        <div class="calendar__day-name">${dayNames[d.getDay()]}</div>
      </div>
    `;
  }
  calendarDays.innerHTML = html;

  renderTasks(selectedDay);
}

if (calendarDays) {
  renderCalendar();

  calendarDays.addEventListener('click', e => {
    const day = e.target.closest('.calendar__day');
    if (!day) return;

    selectedDay = Number(day.dataset.day);

    document.querySelectorAll('.calendar__day').forEach(d => d.classList.remove('is-active'));
    day.classList.add('is-active');

    renderTasks(selectedDay);
  });
}

if (calendarDays) {
  renderCalendar();
  calendarDays.addEventListener('click', e => {
    const day = e.target.closest('.calendar__day');
    if (!day) return;
    document.querySelectorAll('.calendar__day').forEach(d => d.classList.remove('is-active'));
    day.classList.add('is-active');
  });
}