/* app.js - Lógica del convertidor */
/* Tasas relativas (base arbitraria USD = 1). Actualiza estas si quieres */
const rates = {
  USD: 1,
  EUR: 0.95,
  GBP: 0.82,
  JPY: 149.3,
  CNY: 7.38,
  CAD: 1.36,
  AUD: 1.50,
  CHF: 0.92,
  MXN: 18.23,
  BRL: 5.12,
  KRW: 1395.3,
  INR: 83.1,
  RUB: 96.5,
  ARS: 820.0,
  CLP: 855.0,
  COP: 4120.0,
  SEK: 11.0,
  NOK: 10.6,
  ZAR: 19.8,
  TRY: 36.5
};

/* Mapa de banderas (emoji). Puedes cambiar por URLs si prefieres imágenes */
const flags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CNY: "🇨🇳",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  MXN: "🇲🇽",
  BRL: "🇧🇷",
  KRW: "🇰🇷",
  INR: "🇮🇳",
  RUB: "🇷🇺",
  ARS: "🇦🇷",
  CLP: "🇨🇱",
  COP: "🇨🇴",
  SEK: "🇸🇪",
  NOK: "🇳🇴",
  ZAR: "🇿🇦",
  TRY: "🇹🇷"
};

/* DOM */
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const resultValue = document.getElementById('resultValue');
const resultMeta = document.getElementById('resultMeta');
const swapBtn = document.getElementById('swapBtn');

/* Llenar los selects dinámicamente a partir del objeto rates */
function populateSelects() {
  const keys = Object.keys(rates);
  keys.forEach(code => {
    const label = `${flags[code] ?? ''} ${code}`;
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = label;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = code;
    opt2.textContent = label;
    toSelect.appendChild(opt2);
  });

  // Valores por defecto
  fromSelect.value = 'USD';
  toSelect.value = 'COP';
}

function showError(text) {
  result.classList.remove('hidden');
  resultValue.textContent = text;
  resultMeta.textContent = '';
}

/* Función principal de conversión */
function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  // Validaciones
  if (isNaN(amount)) {
    showError('Ingresa un monto válido.');
    return;
  }
  if (amount < 0) {
    showError('El monto no puede ser negativo.');
    return;
  }
  if (!rates[from] || !rates[to]) {
    showError('Moneda no soportada.');
    return;
  }

  // Fórmula: resultado = (monto / tasaOrigen) * tasaDestino
  const fromRate = rates[from];
  const toRate = rates[to];
  const raw = (amount / fromRate) * toRate;
  const rounded = Number(raw.toFixed(2));

  // Mostrar resultado con información adicional
  result.classList.remove('hidden');
  resultValue.textContent = `${flags[to] ?? ''} ${rounded.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})} ${to}`;
  const now = new Date();
  resultMeta.textContent = `${amount} ${from} → usada tasa: ${toRate}/${fromRate} · ${now.toLocaleString()}`;
}

/* Swap (intercambiar monedas) */
function swapCurrencies() {
  const a = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = a;
}

/* Eventos */
convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swapCurrencies);

/* Permitir Enter para convertir */
amountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') convert();
});

/* Inicialización */
populateSelects();

