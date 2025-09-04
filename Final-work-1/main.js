const pairInput = document.getElementById('pairInput');
const pairList = document.getElementById('pairList');
const msg = document.getElementById('msg');
const btnAdd = document.getElementById('btnAdd');
const btnSortName = document.getElementById('btnSortName');
const btnSortValue = document.getElementById('btnSortValue');
const btnDelete = document.getElementById('btnDelete');

function validatePair(str) {
  const parts = str.split("=");
  if (parts.length !== 2) return null;
  const name = parts[0].trim();
  const value = parts[1].trim();
  if (!/^[a-zA-Z0-9]+$/.test(name)) return null;
  if (!/^[a-zA-Z0-9]+$/.test(value)) return null;
  return [name, value];
}

function showMessage(text, isError = true) {
  msg.style.color = isError ? '#b00' : '#0a0';
  msg.textContent = text;
  if (!isError) {
    setTimeout(() => {
      if (msg.textContent === text) msg.textContent = '';
    }, 2000);
  }
}

function addOption(obj, selectAfter = false) {
  const option = document.createElement('option');
  option.text = `${obj.name}=${obj.value}`;
  option.value = JSON.stringify(obj);
  pairList.add(option);
  if (selectAfter) option.selected = true;
}

function addPair() {
  const raw = pairInput.value;
  const match = validatePair(raw);
  if (!match) {
    showMessage('Invalid format. Use: Name=Value (letters and digits only).');
    return;
  }
  const name = match[0];
  const value = match[1];

  for (let i = 0; i < pairList.options.length; i++) {
    const opt = pairList.options[i];
    const obj = JSON.parse(opt.value);
    if (obj.name === name) {
      obj.value = value;
      opt.value = JSON.stringify(obj);
      opt.text = `${name}=${value}`;
      showMessage(`Updated: ${name}=${value}`, false);
      pairInput.value = '';
      return;
    }
  }

  addOption({ name, value }, false);
  showMessage(`Added: ${name}=${value}`, false);
  pairInput.value = '';
}

function sortList(key) {
  const arr = Array.from(pairList.options);
  arr.sort((a, b) => {
    const oa = JSON.parse(a.value);
    const ob = JSON.parse(b.value);
    return String(oa[key]).localeCompare(String(ob[key]));
  });
  pairList.innerHTML = '';
  arr.forEach(opt => pairList.add(opt));
  showMessage(`Sorted by ${key}`, false);
}

function deleteSelected() {
  const selected = Array.from(pairList.selectedOptions);
  if (selected.length === 0) {
    showMessage('Nothing selected for deletion.');
    return;
  }
  selected.forEach(opt => opt.remove());
  showMessage('Selected items deleted.', false);
}

btnAdd.addEventListener('click', addPair);
btnSortName.addEventListener('click', () => sortList('name'));
btnSortValue.addEventListener('click', () => sortList('value'));
btnDelete.addEventListener('click', deleteSelected);
