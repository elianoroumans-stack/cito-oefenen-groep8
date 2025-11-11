const spellingThemas=["Tremawoorden","lollywoorden","garagewoorden","routewoorden","cadeauwoorden","caféwoorden","theewoorden","chefwoorden","taxiwoorden","tropisch-woorden","colawoorden","politiewoorden","komma-s-woorden","centwoorden","verkleinwoorden","eeur-ieuw-woorden","plankwoorden","zingwoorden","luchtwoorden"];
const rekenenThemas=["Hoofdrekenen","breuken en procenten","verhoudingstabellen","patronen","verhaaltjessommen","oppervlakte","maten omrekenen","klokkijken","geld","grafieken"];
const werkwoordThemas=["Theorie"];

function openVak(){
  const vak=document.getElementById("vakSelector").value;
  const c=document.getElementById("vakContainer");
  document.getElementById("homepage").classList.add("hidden");
  c.classList.remove("hidden");

  if(vak==="begrijpend"||vak==="woordenschat"){
    c.innerHTML=`<div class='panel'><h2>${vak}</h2><div class='card'>Toets maken</div></div>`;
    return;
  }

  let themaList=[];
  if(vak==="spelling") themaList=spellingThemas;
  if(vak==="rekenen") themaList=rekenenThemas;
  if(vak==="werkwoordspelling") themaList=werkwoordThemas;

  const themaHTML=themaList.map(t=>`<div class='card'>${t}</div>`).join("");

  c.innerHTML=`<div class='panel'>
      <h2>${vak}</h2>
      <div class='card'>Toets maken</div>
      <h3>Thema's</h3>
      ${themaHTML}
  </div>`;
}

function openLogin(){
  const code=prompt("Voer code in:");
  if(code==="15032010661176200642323542"){
    document.getElementById("homepage").classList.add("hidden");
    document.getElementById("vakContainer").classList.add("hidden");
    document.getElementById("uploadPanel").classList.remove("hidden");
    populateThemaSelect();
  } else alert("Code onjuist");
}

function populateThemaSelect(){
  const vak=document.getElementById("uploadVak").value;
  const sel=document.getElementById("uploadThema");
  sel.innerHTML="";
  let list=[];
  if(vak==="spelling") list=spellingThemas;
  if(vak==="rekenen") list=rekenenThemas;
  if(vak==="werkwoordspelling") list=werkwoordThemas;
  list.forEach(t=>{
    const o=document.createElement("option");
    o.value=t;o.textContent=t;sel.appendChild(o);
  });
}

function toggleThemaSelect(){
  const type=document.getElementById("uploadType").value;
  const label=document.getElementById("themaLabel");
  const sel=document.getElementById("uploadThema");
  if(type==="thema"){label.classList.remove("visually-hidden");sel.classList.remove("visually-hidden");populateThemaSelect();}
  else{label.classList.add("visually-hidden");sel.classList.add("visually-hidden");}
}

document.getElementById("year").textContent=new Date().getFullYear();
