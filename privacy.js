const PRIVACY_PIN_KEY = 'salary-radar-pin-hash-v1';
const PRIVACY_SESSION_KEY = 'salary-radar-session-unlocked';

const privacyText = {
  en: {
    toggle: 'العربية',
    setupTitle: 'Create privacy PIN',
    setupSubtitle: 'Create a PIN for this device. Your budget stays hidden until unlocked.',
    unlockTitle: 'Unlock Salary Radar',
    unlockSubtitle: 'Enter your PIN to open your budget dashboard.',
    pin: 'PIN',
    confirm: 'Confirm PIN',
    create: 'Create PIN',
    unlock: 'Unlock',
    mismatch: 'PINs do not match. Technology weeps.',
    short: 'Use at least 4 digits.',
    wrong: 'Wrong PIN.',
    hint: 'This is a local device lock for privacy, not server authentication.',
    locked: 'Locked.',
    lock: 'Lock',
    changePin: 'Change PIN'
  },
  ar: {
    toggle: 'English',
    setupTitle: 'إنشاء رمز الخصوصية',
    setupSubtitle: 'أنشئ رمز PIN لهذا الجهاز. ستبقى ميزانيتك مخفية حتى فتح القفل.',
    unlockTitle: 'فتح رادار الراتب',
    unlockSubtitle: 'أدخل رمز PIN لفتح لوحة الميزانية.',
    pin: 'رمز PIN',
    confirm: 'تأكيد رمز PIN',
    create: 'إنشاء الرمز',
    unlock: 'فتح',
    mismatch: 'الرمزان غير متطابقين. حتى الآلة حزنت.',
    short: 'استخدم 4 أرقام على الأقل.',
    wrong: 'رمز PIN غير صحيح.',
    hint: 'هذا قفل محلي للخصوصية على الجهاز، وليس تسجيل دخول حقيقي عبر سيرفر.',
    locked: 'تم القفل.',
    lock: 'قفل',
    changePin: 'تغيير الرمز'
  }
};

let privacyLang = localStorage.getItem('salary-radar-privacy-lang') || (document.documentElement.lang === 'ar' ? 'ar' : 'en');

const lockEl = document.getElementById('privacyLock');
const appEl = document.querySelector('.app-shell');
const titleEl = document.getElementById('privacyTitle');
const subtitleEl = document.getElementById('privacySubtitle');
const pinEl = document.getElementById('privacyPin');
const confirmEl = document.getElementById('privacyPinConfirm');
const submitEl = document.getElementById('privacySubmit');
const msgEl = document.getElementById('privacyMessage');
const hintEl = document.getElementById('privacyHint');
const langEl = document.getElementById('privacyLanguage');

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hasPin() {
  return Boolean(localStorage.getItem(PRIVACY_PIN_KEY));
}

function applyPrivacyLanguage() {
  const t = privacyText[privacyLang];
  const setup = !hasPin();
  document.documentElement.lang = privacyLang;
  document.documentElement.dir = privacyLang === 'ar' ? 'rtl' : 'ltr';
  titleEl.textContent = setup ? t.setupTitle : t.unlockTitle;
  subtitleEl.textContent = setup ? t.setupSubtitle : t.unlockSubtitle;
  pinEl.placeholder = t.pin;
  confirmEl.placeholder = t.confirm;
  confirmEl.style.display = setup ? 'block' : 'none';
  submitEl.textContent = setup ? t.create : t.unlock;
  langEl.textContent = t.toggle;
  hintEl.textContent = t.hint;
}

function unlockApp() {
  sessionStorage.setItem(PRIVACY_SESSION_KEY, '1');
  lockEl.classList.add('is-unlocked');
  appEl.classList.remove('privacy-hidden');
  addLockButtons();
}

function lockApp() {
  sessionStorage.removeItem(PRIVACY_SESSION_KEY);
  msgEl.textContent = privacyText[privacyLang].locked;
  lockEl.classList.remove('is-unlocked');
  appEl.classList.add('privacy-hidden');
  pinEl.value = '';
  confirmEl.value = '';
  applyPrivacyLanguage();
  setTimeout(() => pinEl.focus(), 50);
}

function addLockButtons() {
  if (document.getElementById('lockActions')) return;
  const wrap = document.createElement('div');
  wrap.id = 'lockActions';
  wrap.className = 'lock-actions';
  const lockBtn = document.createElement('button');
  const changeBtn = document.createElement('button');
  lockBtn.type = 'button';
  changeBtn.type = 'button';
  lockBtn.textContent = privacyText[privacyLang].lock;
  changeBtn.textContent = privacyText[privacyLang].changePin;
  lockBtn.addEventListener('click', lockApp);
  changeBtn.addEventListener('click', () => {
    localStorage.removeItem(PRIVACY_PIN_KEY);
    sessionStorage.removeItem(PRIVACY_SESSION_KEY);
    lockApp();
  });
  wrap.append(lockBtn, changeBtn);
  const salaryBox = document.querySelector('.salary-box');
  if (salaryBox) salaryBox.appendChild(wrap);
}

async function submitPrivacy() {
  const t = privacyText[privacyLang];
  const pin = pinEl.value.trim();
  const confirm = confirmEl.value.trim();
  msgEl.textContent = '';

  if (pin.length < 4) {
    msgEl.textContent = t.short;
    return;
  }

  if (!hasPin()) {
    if (pin !== confirm) {
      msgEl.textContent = t.mismatch;
      return;
    }
    localStorage.setItem(PRIVACY_PIN_KEY, await sha256(pin));
    unlockApp();
    return;
  }

  const saved = localStorage.getItem(PRIVACY_PIN_KEY);
  const entered = await sha256(pin);
  if (entered === saved) unlockApp();
  else msgEl.textContent = t.wrong;
}

submitEl.addEventListener('click', submitPrivacy);
pinEl.addEventListener('keydown', e => { if (e.key === 'Enter') submitPrivacy(); });
confirmEl.addEventListener('keydown', e => { if (e.key === 'Enter') submitPrivacy(); });
langEl.addEventListener('click', () => {
  privacyLang = privacyLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('salary-radar-privacy-lang', privacyLang);
  applyPrivacyLanguage();
});

applyPrivacyLanguage();
if (sessionStorage.getItem(PRIVACY_SESSION_KEY) === '1' && hasPin()) {
  unlockApp();
} else {
  appEl.classList.add('privacy-hidden');
  lockEl.classList.remove('is-unlocked');
  setTimeout(() => pinEl.focus(), 50);
}
