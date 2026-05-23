const STORAGE_KEY = 'salary-radar-v1';

let state = {
  salary: 0,
  transactions: []
};

const $ = (id) => document.getElementById(id);
const money = (value) => `SAR ${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const categoryColors = {
  Bills: '#60a5fa',
  Shopping: '#a78bfa',
  'Visa Card': '#fb7185',
  Food: '#facc15',
  Transport: '#22d3ee',
  Savings: '#4ade80',
  Other: '#94a3b8'
};

let categoryChart;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch {
      state = { salary: 0, transactions: [] };
    }
  }
  $('salaryInput').value = state.salary || '';
  $('itemDate').valueAsDate = new Date();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTotals() {
  const spent = state.transactions
    .filter(t => t.category !== 'Savings')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const saved = state.transactions
    .filter(t => t.category === 'Savings')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const remaining = state.salary - spent - saved;
  return { spent, saved, remaining };
}

function daysLeftInMonth() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return Math.max(1, end.getDate() - now.getDate() + 1);
}

function updateSummary() {
  const { spent, saved, remaining } = getTotals();
  const salary = Number(state.salary || 0);
  const spentPct = salary ? Math.round((spent / salary) * 100) : 0;
  const savingsPct = salary ? Math.round((saved / salary) * 100) : 0;
  const daily = remaining > 0 ? remaining / daysLeftInMonth() : 0;

  $('remainingAmount').textContent = money(remaining);
  $('spentAmount').textContent = money(spent);
  $('savedAmount').textContent = money(saved);
  $('dailyBudget').textContent = money(daily);
  $('spentPercent').textContent = `${spentPct}% of salary`;
  $('savingsPercent').textContent = `${savingsPct}% of salary`;

  let note = 'Healthy. Try not to celebrate by buying something ridiculous.';
  if (!salary) note = 'Set salary to begin';
  else if (remaining < 0) note = 'Over budget. The salary has left the chat.';
  else if (spentPct > 80) note = 'Danger zone. Wallet is making horror movie noises.';
  else if (spentPct > 55) note = 'Careful. Spending is getting confident.';
  $('remainingNote').textContent = note;

  updateMood(spentPct, savingsPct, remaining);
}

function updateMood(spentPct, savingsPct, remaining) {
  const meter = Math.min(100, spentPct);
  $('meterFill').style.width = `${meter}%`;

  const tips = [];
  let mood = 'Calm. Your money is behaving like it had parents.';

  if (!state.salary) {
    mood = 'Enter your salary first. A budget without salary is just decorative anxiety.';
    tips.push('Start by adding fixed bills first, then visa card payments, then shopping.');
  } else if (remaining < 0) {
    mood = 'Critical. You spent more than your salary. This is how banks get villain origin stories.';
    tips.push('Freeze non-essential shopping until next salary.');
    tips.push('Check Visa Card transactions first, because small swipes breed in the dark.');
  } else if (spentPct >= 80) {
    mood = 'Danger. Keep spending only on survival-level things: food, fuel, bills, and not another gadget.';
    tips.push('Use the daily safe spend number as your hard ceiling.');
    tips.push('Delay optional purchases for 48 hours before buying.');
  } else if (spentPct >= 55) {
    mood = 'Warning. You are not broke, but the budget is starting to side-eye you.';
    tips.push('Move savings immediately after salary arrives.');
    tips.push('Group small purchases under Shopping so leaks become visible.');
  } else {
    tips.push('Good zone. Keep bills and Visa Card updated weekly.');
    tips.push('Try saving at least 10–20% before shopping starts whispering.');
  }

  if (savingsPct < 10 && state.salary > 0) tips.push('Savings are under 10%. Future-you is already filing a complaint.');

  $('moodText').textContent = mood;
  $('tipsBox').innerHTML = tips.map(t => `<div class="tip">${t}</div>`).join('');
}

function categoryTotals() {
  const totals = {};
  for (const t of state.transactions) {
    totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
  }
  return totals;
}

function updateChart() {
  const totals = categoryTotals();
  const labels = Object.keys(totals);
  const data = Object.values(totals);

  if (categoryChart) categoryChart.destroy();
  const ctx = $('categoryChart');
  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map(l => categoryColors[l] || categoryColors.Other),
        borderColor: 'rgba(255,255,255,.15)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#dbeafe', padding: 16, font: { weight: '700' } }
        }
      },
      cutout: '68%'
    }
  });
}

function renderTransactions() {
  const list = $('transactionList');
  if (!state.transactions.length) {
    list.innerHTML = '<div class="empty">No transactions yet. Suspiciously peaceful.</div>';
    return;
  }

  list.innerHTML = state.transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(t => `
      <div class="transaction">
        <div>
          <b>${escapeHtml(t.name)}</b>
          <small>${t.date || 'No date'}</small>
        </div>
        <span class="badge">${t.category} · ${money(t.amount)}</span>
        <button class="delete-btn" data-id="${t.id}">Delete</button>
      </div>
    `).join('');

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.transactions = state.transactions.filter(t => t.id !== btn.dataset.id);
      saveState();
      render();
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addTransaction() {
  const name = $('itemName').value.trim();
  const amount = Number($('itemAmount').value);
  const category = $('itemCategory').value;
  const date = $('itemDate').value;

  if (!name || !amount || amount <= 0) {
    alert('Add a name and valid amount. The budget goblin demands basic effort.');
    return;
  }

  state.transactions.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    amount,
    category,
    date
  });

  $('itemName').value = '';
  $('itemAmount').value = '';
  saveState();
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `salary-radar-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function render() {
  updateSummary();
  updateChart();
  renderTransactions();
}

$('saveSalary').addEventListener('click', () => {
  state.salary = Number($('salaryInput').value || 0);
  saveState();
  render();
});

$('addTransaction').addEventListener('click', addTransaction);
$('exportData').addEventListener('click', exportData);
$('resetMonth').addEventListener('click', () => {
  if (confirm('Reset all transactions for this month? Salary will stay saved.')) {
    state.transactions = [];
    saveState();
    render();
  }
});

loadState();
render();
