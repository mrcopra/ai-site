const STORAGE_KEY = 'salary-radar-v2';
const OLD_STORAGE_KEY = 'salary-radar-v1';

const categories = ['Bills', 'Shopping', 'Visa Card', 'Food', 'Transport', 'Savings', 'Other'];

const translations = {
  en: {
    htmlLang: 'en',
    dir: 'ltr',
    toggle: 'العربية',
    currency: 'SAR',
    eyebrow: 'Personal Budget Monitor',
    appTitle: 'Salary Radar',
    subtitle: 'Track bills, shopping, visa card spending, savings, and the mysterious money leaks that keep humanity humble.',
    monthlySalary: 'Monthly salary',
    saveSalary: 'Save salary',
    remaining: 'Remaining',
    spent: 'Spent',
    saved: 'Saved',
    dailySafeSpend: 'Daily safe spend',
    dailyNote: 'For the rest of this month',
    addTransactionTitle: 'Add transaction',
    itemNamePlaceholder: 'Name, e.g. Electricity bill',
    amountPlaceholder: 'Amount',
    add: 'Add',
    resetMonth: 'Reset month',
    chartTitle: 'Where your salary went',
    moneyMood: 'Money mood',
    transactions: 'Transactions',
    exportJson: 'Export JSON',
    ofSalary: 'of salary',
    noDate: 'No date',
    delete: 'Delete',
    empty: 'No transactions yet. Suspiciously peaceful.',
    alertInvalid: 'Add a name and valid amount. The budget goblin demands basic effort.',
    confirmReset: 'Reset all transactions for this month? Salary will stay saved.',
    notes: {
      noSalary: 'Set salary to begin',
      healthy: 'Healthy. Try not to celebrate by buying something ridiculous.',
      over: 'Over budget. The salary has left the chat.',
      danger: 'Danger zone. Wallet is making horror movie noises.',
      careful: 'Careful. Spending is getting confident.'
    },
    mood: {
      calm: 'Calm. Your money is behaving like it had parents.',
      noSalary: 'Enter your salary first. A budget without salary is just decorative anxiety.',
      critical: 'Critical. You spent more than your salary. This is how banks get villain origin stories.',
      danger: 'Danger. Keep spending only on survival-level things: food, fuel, bills, and not another gadget.',
      warning: 'Warning. You are not broke, but the budget is starting to side-eye you.'
    },
    tips: {
      start: 'Start by adding fixed bills first, then visa card payments, then shopping.',
      freeze: 'Freeze non-essential shopping until next salary.',
      visa: 'Check Visa Card transactions first, because small swipes breed in the dark.',
      daily: 'Use the daily safe spend number as your hard ceiling.',
      delay: 'Delay optional purchases for 48 hours before buying.',
      moveSavings: 'Move savings immediately after salary arrives.',
      groupSmall: 'Group small purchases under Shopping so leaks become visible.',
      good: 'Good zone. Keep bills and Visa Card updated weekly.',
      saveTarget: 'Try saving at least 10–20% before shopping starts whispering.',
      lowSavings: 'Savings are under 10%. Future-you is already filing a complaint.'
    },
    categories: {
      Bills: 'Bills',
      Shopping: 'Shopping',
      'Visa Card': 'Visa Card',
      Food: 'Food',
      Transport: 'Transport',
      Savings: 'Savings',
      Other: 'Other'
    }
  },
  ar: {
    htmlLang: 'ar',
    dir: 'rtl',
    toggle: 'English',
    currency: 'ر.س',
    eyebrow: 'مراقبة الميزانية الشخصية',
    appTitle: 'رادار الراتب',
    subtitle: 'تابع الفواتير، التسوق، بطاقة الفيزا، الادخار، وتسريبات المال الغامضة التي تجعل الراتب يختفي وكأنه دخل بوابة زمنية.',
    monthlySalary: 'الراتب الشهري',
    saveSalary: 'حفظ الراتب',
    remaining: 'المتبقي',
    spent: 'المصروف',
    saved: 'المدخر',
    dailySafeSpend: 'الصرف اليومي الآمن',
    dailyNote: 'لباقي أيام الشهر',
    addTransactionTitle: 'إضافة عملية',
    itemNamePlaceholder: 'الاسم، مثال: فاتورة الكهرباء',
    amountPlaceholder: 'المبلغ',
    add: 'إضافة',
    resetMonth: 'تصفير الشهر',
    chartTitle: 'أين ذهب الراتب؟',
    moneyMood: 'مزاج الميزانية',
    transactions: 'العمليات',
    exportJson: 'تصدير JSON',
    ofSalary: 'من الراتب',
    noDate: 'بدون تاريخ',
    delete: 'حذف',
    empty: 'لا توجد عمليات بعد. هدوء مالي مثير للشك.',
    alertInvalid: 'أدخل اسمًا ومبلغًا صحيحًا. حتى وحش الميزانية يحتاج معلومات بسيطة.',
    confirmReset: 'هل تريد تصفير عمليات هذا الشهر؟ سيتم الاحتفاظ بالراتب.',
    notes: {
      noSalary: 'أدخل الراتب للبدء',
      healthy: 'الوضع صحي. لا تحتفل بشراء شيء لا تحتاجه، نعرف هذه الحركة.',
      over: 'تجاوزت الميزانية. الراتب غادر المحادثة.',
      danger: 'منطقة خطرة. المحفظة تصدر أصوات فيلم رعب.',
      careful: 'انتبه. الصرف بدأ يأخذ ثقة زائدة.'
    },
    mood: {
      calm: 'هادئ. أموالك تتصرف وكأن عندها تربية.',
      noSalary: 'أدخل الراتب أولًا. ميزانية بدون راتب مجرد قلق بزخرفة جميلة.',
      critical: 'حرج. صرفت أكثر من راتبك. هكذا تبدأ البنوك قصص الشر.',
      danger: 'خطر. اصرف فقط على الضروريات: أكل، بنزين، فواتير، وليس جهازًا جديدًا كالعادة.',
      warning: 'تحذير. لست مفلسًا، لكن الميزانية بدأت تنظر لك بنظرة اتهام.'
    },
    tips: {
      start: 'ابدأ بإضافة الفواتير الثابتة، ثم دفعات الفيزا، ثم التسوق.',
      freeze: 'أوقف التسوق غير الضروري إلى الراتب القادم.',
      visa: 'راجع عمليات بطاقة الفيزا أولًا، لأن السحبات الصغيرة تتكاثر في الظلام.',
      daily: 'استخدم رقم الصرف اليومي الآمن كسقف لا تتجاوزه.',
      delay: 'أجل المشتريات الاختيارية 48 ساعة قبل الشراء.',
      moveSavings: 'حوّل الادخار مباشرة بعد نزول الراتب.',
      groupSmall: 'اجمع المشتريات الصغيرة تحت التسوق حتى تظهر التسريبات.',
      good: 'منطقة جيدة. حدّث الفواتير والفيزا أسبوعيًا.',
      saveTarget: 'حاول ادخار 10–20% قبل أن يبدأ التسوق بالوسوسة.',
      lowSavings: 'الادخار أقل من 10%. نسختك المستقبلية تقدّم شكوى رسمية.'
    },
    categories: {
      Bills: 'فواتير',
      Shopping: 'تسوق',
      'Visa Card': 'بطاقة فيزا',
      Food: 'طعام',
      Transport: 'مواصلات',
      Savings: 'ادخار',
      Other: 'أخرى'
    }
  }
};

let state = {
  salary: 0,
  language: 'en',
  transactions: []
};

const $ = (id) => document.getElementById(id);
const currentText = () => translations[state.language || 'en'];
const money = (value) => {
  const t = currentText();
  const locale = state.language === 'ar' ? 'ar-SA' : undefined;
  return `${t.currency} ${Number(value || 0).toLocaleString(locale, { maximumFractionDigits: 2 })}`;
};

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
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = {
        salary: Number(parsed.salary || 0),
        language: parsed.language || 'en',
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : []
      };
      saveState();
    } catch {
      state = { salary: 0, language: 'en', transactions: [] };
    }
  }
  $('salaryInput').value = state.salary || '';
  $('itemDate').valueAsDate = new Date();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyLanguage() {
  const t = currentText();
  document.documentElement.lang = t.htmlLang;
  document.documentElement.dir = t.dir;
  document.title = state.language === 'ar' ? 'رادار الراتب | مراقبة الميزانية' : 'Salary Radar | Budget Monitor';
  $('languageToggle').textContent = t.toggle;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  $('itemCategory').innerHTML = categories
    .map(cat => `<option value="${cat}">${t.categories[cat]}</option>`)
    .join('');
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
  const t = currentText();
  const { spent, saved, remaining } = getTotals();
  const salary = Number(state.salary || 0);
  const spentPct = salary ? Math.round((spent / salary) * 100) : 0;
  const savingsPct = salary ? Math.round((saved / salary) * 100) : 0;
  const daily = remaining > 0 ? remaining / daysLeftInMonth() : 0;

  $('remainingAmount').textContent = money(remaining);
  $('spentAmount').textContent = money(spent);
  $('savedAmount').textContent = money(saved);
  $('dailyBudget').textContent = money(daily);
  $('spentPercent').textContent = `${spentPct}% ${t.ofSalary}`;
  $('savingsPercent').textContent = `${savingsPct}% ${t.ofSalary}`;

  let note = t.notes.healthy;
  if (!salary) note = t.notes.noSalary;
  else if (remaining < 0) note = t.notes.over;
  else if (spentPct > 80) note = t.notes.danger;
  else if (spentPct > 55) note = t.notes.careful;
  $('remainingNote').textContent = note;

  updateMood(spentPct, savingsPct, remaining);
}

function updateMood(spentPct, savingsPct, remaining) {
  const t = currentText();
  const meter = Math.min(100, spentPct);
  $('meterFill').style.width = `${meter}%`;

  const tips = [];
  let mood = t.mood.calm;

  if (!state.salary) {
    mood = t.mood.noSalary;
    tips.push(t.tips.start);
  } else if (remaining < 0) {
    mood = t.mood.critical;
    tips.push(t.tips.freeze);
    tips.push(t.tips.visa);
  } else if (spentPct >= 80) {
    mood = t.mood.danger;
    tips.push(t.tips.daily);
    tips.push(t.tips.delay);
  } else if (spentPct >= 55) {
    mood = t.mood.warning;
    tips.push(t.tips.moveSavings);
    tips.push(t.tips.groupSmall);
  } else {
    tips.push(t.tips.good);
    tips.push(t.tips.saveTarget);
  }

  if (savingsPct < 10 && state.salary > 0) tips.push(t.tips.lowSavings);

  $('moodText').textContent = mood;
  $('tipsBox').innerHTML = tips.map(tip => `<div class="tip">${tip}</div>`).join('');
}

function categoryTotals() {
  const totals = {};
  for (const t of state.transactions) {
    totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
  }
  return totals;
}

function updateChart() {
  const t = currentText();
  const totals = categoryTotals();
  const labels = Object.keys(totals);
  const data = Object.values(totals);

  if (categoryChart) categoryChart.destroy();
  const ctx = $('categoryChart');
  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels.map(label => t.categories[label] || label),
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
  const t = currentText();
  const list = $('transactionList');
  if (!state.transactions.length) {
    list.innerHTML = `<div class="empty">${t.empty}</div>`;
    return;
  }

  list.innerHTML = state.transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(item => `
      <div class="transaction">
        <div>
          <b>${escapeHtml(item.name)}</b>
          <small>${item.date || t.noDate}</small>
        </div>
        <span class="badge">${t.categories[item.category] || item.category} · ${money(item.amount)}</span>
        <button class="delete-btn" data-id="${item.id}">${t.delete}</button>
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
  const t = currentText();
  const name = $('itemName').value.trim();
  const amount = Number($('itemAmount').value);
  const category = $('itemCategory').value;
  const date = $('itemDate').value;

  if (!name || !amount || amount <= 0) {
    alert(t.alertInvalid);
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
  applyLanguage();
  updateSummary();
  updateChart();
  renderTransactions();
}

$('languageToggle').addEventListener('click', () => {
  state.language = state.language === 'ar' ? 'en' : 'ar';
  saveState();
  render();
});

$('saveSalary').addEventListener('click', () => {
  state.salary = Number($('salaryInput').value || 0);
  saveState();
  render();
});

$('addTransaction').addEventListener('click', addTransaction);
$('exportData').addEventListener('click', exportData);
$('resetMonth').addEventListener('click', () => {
  const t = currentText();
  if (confirm(t.confirmReset)) {
    state.transactions = [];
    saveState();
    render();
  }
});

loadState();
render();
