// Simple front-end demo logic.
// NOTE: This demo does NOT implement a real server upload. It stores uploads in-memory per session only.
const spellingThemas = ["Tremawoorden","lollywoorden","garagewoorden","routewoorden","cadeauwoorden","caféwoorden","theewoorden","chefwoorden","taxiwoorden","tropisch-woorden","colawoorden","politiewoorden","komma-s-woorden","centwoorden","verkleinwoorden","eeur-ieuw-woorden","plankwoorden","zingwoorden","luchtwoorden"];
const rekenenThemas = ["Hoofdrekenen","breuken en procenten","verhoudingstabellen","patronen","verhaaltjessommen","oppervlakte","maten omrekenen","klokkijken","geld","grafieken"];
const werkwoordThemas = ["Theorie"];

// in-memory storage (demo)
const storage = {
  spelling: { toets: [], thema: {} },
  rekenen: { toets: [], thema: {} },
  werkwoordspelling: { toets: [], thema: {} },
  begrijpend: { toets: [] },
  woordenschat: { toets: [] }
};

function openVak(){
  const vak = document.getElementById('vakSelector').value;
  const container = document.getElementById('vakContainer');
  document.getElementById('homepage').classList.add('hidden');
  container.classList.remove('hidden');
  container.innerHTML = '';

  if(vak === 'begrijpend' || vak === 'woordenschat'){
    container.innerHTML = `
      <div class="panel">
        <h2>${capitalize(vak)}</h2>
        <div class="card" onclick="startToets('${vak}')">Toets maken (geüpload bestand)</div>
      </div>
    `;
    return;
  }

  let themaList = [];
  if(vak === 'spelling') themaList = spellingThemas;
  if(vak === 'rekenen') themaList = rekenenThemas;
  if(vak === 'werkwoordspelling') themaList = workwoordThemas;

  let themaHTML = themaList.map(t => `<div class="card" onclick="startThema('${vak}','${t.replace(/'/g,'\'')}')">${t}</div>`).join('');

  container.innerHTML = `
    <div class="panel">
      <h2>${capitalize(vak)}</h2>
      <div class="card" onclick="startToets('${vak}')">Toets maken (geüpload bestand)</div>
      <h3>Thema's</h3>
      ${themaHTML}
    </div>
  `;
}

function startToets(vak){
  alert('Start toets voor: ' + vak + '. (In deze demo: er is nog geen echte toets runner.)');
}

function startThema(vak, thema){
  alert('Oefenen thema: ' + thema + ' (vak: ' + vak + '). (In deze demo: content komt van een geüpload bestand.)');
}

function openLogin(){
  const code = prompt('Voer code in:');
  if(code === '15032010661176200642323542'){
    document.getElementById('vakContainer').classList.add('hidden');
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('uploadPanel').classList.remove('hidden');
    populateThemaSelect();
  } else {
    alert('Code onjuist');
  }
}

function populateThemaSelect(){
  const sel = document.getElementById('uploadThema');
  sel.innerHTML = '<option value="">Kies thema...</option>';
  const vak = document.getElementById('uploadVak').value || 'spelling';
  let list = [];
  if(vak === 'spelling') list = spellingThemas;
  if(vak === 'rekenen') list = rekenenThemas;
  if(vak === 'werkwoordspelling') list = workwoordThemas;
  list.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    sel.appendChild(opt);
  });
}

function toggleThemaSelect(){
  const type = document.getElementById('uploadType').value;
  const label = document.getElementById('themaLabel');
  const sel = document.getElementById('uploadThema');
  if(type === 'thema'){
    label.classList.remove('visually-hidden');
    sel.classList.remove('visually-hidden');
  } else {
    label.classList.add('visually-hidden');
    sel.classList.add('visually-hidden');
  }
}

function handleUpload(e){
  e.preventDefault();
  const f = document.getElementById('fileInput').files[0];
  if(!f){ alert('Kies eerst een bestand'); return; }
  const vak = document.getElementById('uploadVak').value;
  const type = document.getElementById('uploadType').value;
  const thema = document.getElementById('uploadThema').value;
  // demo: store filename only
  if(type === 'toets'){
    storage[vak].toets.push(f.name);
  } else {
    if(!thema){ alert('Kies een thema'); return; }
    storage[vak].thema[thema] = storage[vak].thema[thema] || [];
    storage[vak].thema[thema].push(f.name);
  }
  document.getElementById('uploadResult').innerHTML = `<p>Bestand <strong>${f.name}</strong> toegevoegd (demo). Je kunt deze nu gebruiken als voorbeeldbestand.</p>`;
  document.getElementById('uploadForm').reset();
  toggleThemaSelect();
}

function cancelUpload(){
  document.getElementById('uploadForm').reset();
  toggleThemaSelect();
}

function capitalize(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// set year
document.getElementById('year').textContent = new Date().getFullYear();