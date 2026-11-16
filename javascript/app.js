let profile=null;
const $=id=>document.getElementById(id);
const avatarMarkup='<svg class="broki-svg broki-mini" viewBox="0 0 180 220" aria-hidden="true" focusable="false"><use href="#broki-avatar"></use></svg>';
const homeFoodGrid=document.querySelector(".home-food-grid");
homeFoodGrid.innerHTML=`
 <article class="food-card"><img src="assets/food/trucha-a-la-plancha.jpg" alt="Trucha a la plancha servida con ensalada y arroz" fetchpriority="high"><h4>Trucha a la plancha</h4></article>
 <article class="food-card"><img src="assets/food/sopa-de-quinua.jpg" alt="Sopa boliviana de quinua con hierbas frescas" loading="lazy"><h4>Sopa de quinua</h4></article>
 <article class="food-card"><img src="assets/food/ensalada-de-quinua.jpeg" alt="Ensalada de quinua con tomate, maíz y legumbres" loading="lazy"><h4>Ensalada de quinua</h4></article>
 <article class="food-card"><img src="assets/food/sopa-de-mani.jpg" alt="Sopa de maní boliviana servida con papas" loading="lazy"><h4>Sopa de maní</h4></article>
 <article class="food-card"><img src="assets/food/chairo-paceno.jpg" alt="Chairo paceño, sopa tradicional de La Paz" loading="lazy"><h4>Chairo paceño</h4></article>`;
document.querySelector(".food-count").textContent="5 platos";
const foodCredits=document.createElement("p");
foodCredits.className="food-gallery-credits";
foodCredits.innerHTML=`Créditos: <a href="https://commons.wikimedia.org/wiki/File:Trucha_a_la_plancha.jpg" target="_blank" rel="noopener">Q'orikenti, CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Sopa_de_Quinua,_plato_t%C3%ADpico_boliviano.jpg" target="_blank" rel="noopener">Q'orikenti, CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Quinoa_Salad_(140491457).jpeg" target="_blank" rel="noopener">J. Doll, CC BY 3.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Sopa_de_Man%C3%AD_de_Bolivia.jpg" target="_blank" rel="noopener">Bolivia Photos, CC BY-SA 2.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Chairo_pace%C3%B1o_(37949536302)_(cropped).jpg" target="_blank" rel="noopener">Dan Lundberg, CC BY-SA 2.0</a>. Imágenes redimensionadas y recortadas para la galería.`;
homeFoodGrid.after(foodCredits);
document.querySelectorAll(".broki-mini").forEach(node=>node.outerHTML=avatarMarkup);
const growthTable=(()=>{
 const encoded=[
  "wf8YNF0Az/5fNGAAXAHOOGAAEgFCOloArgCbPV4AbwDDP1cAQQDhP10ACAD/QVUA7P8gQVwAt/8HQ1QA",
  "qv/GQVsAd/+LQ1MAcP8NQloAQP++Q1IAQP8GQloAEv+xQ1IAFf/HQVkA5/5vQ1EA7/5kQVkAwv4OQ1EA",
  "zv7sQFkAof6aQlEArv5nQFgAgf4bQlAAkf7mP1gAZf6fQVAAd/5mP1gASv4hQVAAXv7xPlcAMf6rQFAA",
  "R/6BPlcAGf43QE8AMv4ePlcABP7OP08AHv7DPVcA7/1qP08ACv5uPVcA2/0LP08A+P0kPVYAyf22Pk8A",
  "5/3hPFYAt/1mPk4A1v2oPFYAp/0gPk4Axv12PFYAlv3hPU4At/1OPFYAh/2pPU4AyP1IPVUAlf2TPk4A",
  "yP0rPVUAuP1sPk4AyP0PPVQA2v1GPk4AyP30PFQA/P0fPk4AyP3aPFQAG/77PU4AyP3APFQAOf7WPU4A",
  "yP2oPFQAVP6zPU4AyP2PPFQAb/6QPU8AyP14PFUAhv5vPU8AyP1iPFUAmv5OPU8AyP1MPFUArf4tPU8A",
  "yP04PFUAvf4OPU8AyP0lPFUAyv7vPE8AyP0UPFYA1P7SPE8AyP0EPFYA2/61PFAAyP31O1cA4P6aPFAA",
  "yP3oO1cA4f6APFAAyP3bO1gA4P5pPFAAyP3QO1gA3P5SPFEAyP3FO1kA1v49PFEAyP27O1kAzf4qPFEA",
  "yP2xO1oAwv4XPFEAyP2pO1sAtv4FPFIAyP2iO1sApv70O1IAyP2cO1wAlv7lO1IAyP2YO1wAg/7WO1MA",
  "yP2UO10Abv7HO1MAyP2SO10AWP65O1MAyP2SO14AP/6sO1QAyP2SO18AJf6fO1QAyP2UO18ACv6TO1UA",
  "yP2WO2AA7v2IO1UAyP2aO2AA0P19O1UAyP2dO2EAsf1zO1YAyP2hO2EAkv1pO1YAyP2mO2IAcf1gO1cA",
  "yP2rO2IAT/1YO1cAh/yMO2EAHf2gO1QAdfyLO2EABv2eO1QAY/yLO2IA7vycO1QAUfyMO2IA1/ydO1UA",
  "P/yNO2MAwPyeO1UALvyOO2MAqfyhO1UAHfyRO2QAkfykO1UAC/yUO2QAevyqO1YA+vuXO2UAZPywO1YA",
  "6vubO2UATfy4O1YA2fugO2UANvzBO1cAyfumO2YAIPzKO1cAuPusO2YACvzVO1cAqPuzO2cA8/vhO1cA",
  "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",
  "qvz8Uo8A7/ugVIAA"
 ].join("");
 const bytes=Uint8Array.from(atob(encoded),character=>character.charCodeAt(0));
 const view=new DataView(bytes.buffer);
 return Array.from({length:216},(_,month)=>[0,1].map(sex=>[0,1,2].map(value=>view.getInt16(month*12+sex*6+value*2,true)/1000)));
})();
const foods={
 breakfast:[
 {name:"Avena cocida con banana",cost:"low",likes:["fruit","dairy"],kcal:330,alt:"Pan integral con huevo y tomate"},
 {name:"Pan integral con huevo",cost:"low",likes:["eggs"],kcal:340,alt:"Avena con fruta de estación"},
 {name:"Yogur natural con avena y fruta",cost:"mid",likes:["dairy","fruit"],kcal:320,alt:"Api o leche con pan y queso"},
 {name:"Pan con queso fresco y papaya",cost:"low",likes:["dairy","fruit"],kcal:350,alt:"Tostadas con huevo"}
 ],
 snack:[
 {name:"Una fruta de estación",cost:"low",likes:["fruit"],kcal:100,alt:"Zanahoria en bastones"},
 {name:"Yogur natural",cost:"mid",likes:["dairy"],kcal:140,alt:"Una fruta de estación"},
 {name:"Maní o semillas (porción pequeña)",cost:"low",likes:[],kcal:170,alt:"Una banana"},
 {name:"Huevo duro y tomate",cost:"low",likes:["eggs","vegetables"],kcal:150,alt:"Fruta de estación"}
 ],
 lunch:[
 {name:"Pollo a la plancha con arroz y ensalada",cost:"mid",likes:["chicken","vegetables"],kcal:560,alt:"Lentejas guisadas con arroz"},
 {name:"Guiso de lentejas con arroz y verduras",cost:"low",likes:["legumes","vegetables"],kcal:540,alt:"Porotos con papa y ensalada"},
 {name:"Carne de res magra con papa y ensalada",cost:"high",likes:["beef","vegetables"],kcal:570,alt:"Garbanzos guisados con arroz"},
 {name:"Pescado a la plancha con papa y verduras",cost:"high",likes:["fish","vegetables"],kcal:520,alt:"Tortilla de huevo con papa y ensalada"},
 {name:"Porotos con arroz y ensalada",cost:"low",likes:["legumes","vegetables"],kcal:550,alt:"Lentejas guisadas con arroz"},
 {name:"Tortilla de verduras con quinoa",cost:"mid",likes:["eggs","vegetables"],kcal:510,alt:"Guiso de lentejas con arroz"}
 ],
 dinner:[
 {name:"Sopa de verduras con huevo y pan",cost:"low",likes:["vegetables","eggs"],kcal:390,alt:"Tortilla de verduras con papa"},
 {name:"Ensalada de garbanzos, tomate y huevo",cost:"mid",likes:["legumes","vegetables","eggs"],kcal:420,alt:"Sopa de verduras con huevo"},
 {name:"Pollo salteado con verduras y arroz",cost:"mid",likes:["chicken","vegetables"],kcal:450,alt:"Porotos con verduras"},
 {name:"Tortilla de papa y ensalada",cost:"low",likes:["eggs","vegetables"],kcal:430,alt:"Sopa de zapallo y pan integral"},
 {name:"Quinoa con verduras y queso fresco",cost:"mid",likes:["vegetables","dairy"],kcal:440,alt:"Lentejas con verduras"}
 ]
};
const budgetRank={low:1,mid:2,high:3};
function selectedLikes(){return [...document.querySelectorAll('input[name="likes"]:checked')].map(x=>x.value)}
function mealPick(type,day,likes,budget,dislikes,diet){
 let list=foods[type].filter(f=>budgetRank[f.cost]<=budgetRank[budget]);
 if(diet==="vegetarian") list=list.filter(f=>!f.likes.includes("chicken")&&!f.likes.includes("beef")&&!f.likes.includes("fish"));
 if(diet==="noFish") list=list.filter(f=>!f.likes.includes("fish"));
 if(diet==="noPork") list=list; // Las recetas de esta versión no incluyen cerdo.
 if(likes.length) {
  const preferred=list.filter(f=>f.likes.some(x=>likes.includes(x)));
  if(preferred.length) list=preferred;
 }
 const avoided=dislikes.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean);
 list=list.filter(f=>!avoided.some(word=>(f.name+" "+f.alt).toLowerCase().includes(word)));
 if(!list.length) list=foods[type].filter(f=>budgetRank[f.cost]<=budgetRank[budget]);
 return list[(day*3+type.length)%list.length];
}
function renderPersonalMenu(){
 if(!profile){$("menuIntro").textContent="Primero completa tus datos y preferencias.";return;}
 const likes=selectedLikes(), budget=$("budget").value, diet=$("diet").value, dislikes=$("dislikes").value;
 const days=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
 const types=[["Desayuno","breakfast"],["Media mañana","snack"],["Almuerzo","lunch"],["Merienda","snack"],["Cena","dinner"]];
 const factor=profile.pediatric?1:profile.target/profile.tdee;
 const groupLabels={chicken:"Pollo",eggs:"Huevo",legumes:"Legumbres",fish:"Pescado",beef:"Carne",dairy:"Lácteos",vegetables:"Verduras",fruit:"Frutas"};
 const costLabels={low:"Económico",mid:"Moderado",high:"Flexible"};
 let all=[];
 $("dayTabs").innerHTML=days.map((day,i)=>`<button type="button" class="day-tab" data-day="${i}" aria-pressed="${i===0}">${day.slice(0,3)}</button>`).join("");
 $("dayTabs").classList.remove("hidden");
 $("days").innerHTML=days.map((day,i)=>{
  let meals=types.map(([label,type])=>{
   const mealIndex=all.length;
   const item=mealPick(type,i+mealIndex,likes,budget,dislikes,diet);all.push(item);
   const portion=Math.max(.75,Math.min(1.3,factor));
    const portionText=profile.pediatric?"Porción orientativa; no calculada por la app":portion<.9?"Porción orientativa algo menor":portion>1.1?"Porción orientativa algo mayor":"Porción estándar orientativa";
  const kcalLabel=profile.pediatric?"":`<span class="kcal"> · ≈ ${item.kcal} kcal</span>`;
  const mealIcon=type==="breakfast"?"🍳":type==="snack"?"🍎":type==="lunch"?"🥗":"🥣";
  const detailId=`meal-details-${i}-${mealIndex}`;
  const foodGroups=item.likes.length?item.likes.map(group=>groupLabels[group]||group).join(", "):"Sin grupo etiquetado";
  const calorieDetail=profile.pediatric?"":`<div class="meal-detail"><span>Calorías aproximadas</span><strong>≈ ${item.kcal} kcal</strong></div>`;
  const childNote=profile.pediatric?"<p>El menú para menores es general; no incluye un cálculo calórico.</p>":"";
  const details=`<div class="meal-details" id="${detailId}" hidden><div class="meal-details-grid">${calorieDetail}<div class="meal-detail"><span>Presupuesto</span><strong>${costLabels[item.cost]}</strong></div><div class="meal-detail"><span>Grupo de alimentos</span><strong>${foodGroups}</strong></div><div class="meal-detail"><span>Porción</span><strong>${portionText}</strong></div></div><p><strong>Alternativa:</strong> ${item.alt}</p>${childNote}</div>`;
  return `<article class="meal-card"><div class="meal-art">${avatarMarkup}<span class="food-icon" aria-hidden="true">${mealIcon}</span></div><div class="meal-copy"><b>${label}</b><div class="meal-name">${item.name}${kcalLabel}</div><em>${portionText}.</em></div><button class="meal-arrow" type="button" data-food="${item.name}" aria-label="Ver datos de ${item.name}" aria-controls="${detailId}" aria-expanded="false">›</button>${details}</article>`;
  }).join("");
  return `<article class="day${i===0?" active":""}" data-day-panel="${i}"><h4>${day}</h4>${meals}</article>`;
 }).join("");
 $("dayTabs").querySelectorAll(".day-tab").forEach(button=>button.addEventListener("click",()=>{
  $("dayTabs").querySelectorAll(".day-tab").forEach(tab=>tab.setAttribute("aria-pressed",String(tab===button)));
  $("days").querySelectorAll("[data-day-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.dayPanel===button.dataset.day));
 }));
 $("menuIntro").textContent=profile.pediatric?`Menú general por preferencias · sin cálculo de calorías para menores · Presupuesto ${$("budget").selectedOptions[0].text}`:`Menú orientativo · ${Math.round(profile.target).toLocaleString("es-BO")} kcal/día estimadas · Presupuesto ${$("budget").selectedOptions[0].text}`;
 $("menuNotice").textContent=profile.pediatric?"Este menú es general y no está calculado para el crecimiento de un menor. La app no filtra ingredientes por alergias; verifica cada receta y consulta con un profesional de salud.":`Broki priorizó opciones ${budget==="low"?"económicas":budget==="mid"?"de costo moderado":"variadas"} y tus alimentos preferidos. Las porciones sugeridas son aproximadas; el menú no calcula con precisión las calorías reales de cada preparación.`;
}
function updateAgeFields(){
 const ageValue=$("age").value;
 const pediatric=ageValue!==""&&Number(ageValue)<18;
 $("heightLabel").textContent=pediatric&&Number(ageValue)<2?"Longitud recostado (cm) *":"Estatura (cm) *";
 $("ageMonthsField").classList.remove("hidden");
 $("ageMonths").disabled=false;
 $("ageMonths").required=pediatric;
 $("activityField").classList.toggle("hidden",pediatric);
 $("goalField").classList.toggle("hidden",pediatric);
 $("activity").disabled=pediatric;
 $("activity").required=!pediatric;
 $("goal").disabled=pediatric;
 $("goal").required=!pediatric;
 if(profile){
  profile=null;
  $("results").classList.add("hidden");
  $("emptyState").classList.remove("hidden");
  $("days").innerHTML="";
  $("dayTabs").classList.add("hidden");
  $("menuIntro").textContent="Actualiza tus datos y calcula de nuevo para generar alternativas.";
 }
}
function classifyChildBmi(zScore,ageMonths){
 if(ageMonths<=60){
  if(zScore>3)return "Por encima de +3 DE (referencia OMS)";
  if(zScore>2)return "Por encima de +2 DE (referencia OMS)";
  if(zScore>1)return "Entre +1 y +2 DE (referencia OMS)";
  if(zScore< -3)return "Por debajo de -3 DE (referencia OMS)";
  if(zScore< -2)return "Por debajo de -2 DE (referencia OMS)";
 }else{
  if(zScore>2)return "Por encima de +2 DE (referencia OMS)";
  if(zScore>1)return "Por encima de +1 DE (referencia OMS)";
  if(zScore< -3)return "Por debajo de -3 DE (referencia OMS)";
  if(zScore< -2)return "Por debajo de -2 DE (referencia OMS)";
 }
 return "Sin alerta por estos puntos de corte OMS";
}
$("profileForm").addEventListener("submit",e=>{
 e.preventDefault();
 const age=+$("age").value,sex=$("sex").value,weight=+$("weight").value,height=+$("height").value,activity=+$("activity").value,goal=$("goal").value;
 if(age<0||age>100||!sex){alert("Revisa la edad y el sexo de referencia.");return;}
 if(age<18){
  const ageMonth=Number($("ageMonths").value),totalMonths=age*12+ageMonth;
  if(weight<2||weight>300||height<45||height>230){alert("Revisa el peso y la estatura.");return;}
  const bmi=weight/((height/100)**2),sexIndex=sex==="female"?0:1;
  const [l,m,s]=growthTable[totalMonths][sexIndex];
  const zScore=l===0?Math.log(bmi/m)/s:(Math.pow(bmi/m,l)-1)/(l*s);
  profile={pediatric:true,bmi,target:null,tdee:null};
  $("bmi").textContent=bmi.toFixed(1);
  $("bmiLabel").textContent=classifyChildBmi(zScore,totalMonths);
  $("bmiZ").textContent=`${zScore>0?"+":""}${zScore.toFixed(2)} DE`;
    $("growthLabel").textContent=`OMS ${totalMonths<=60?"0–5":"5–19"} años · ${age} ${age===1?"año":"años"} y ${ageMonth} ${ageMonth===1?"mes":"meses"}`;
  $("bmiNote").textContent="El IMC para la edad es una referencia, no un diagnóstico ni una evaluación completa del crecimiento. En menores no se calcula una meta de calorías o de cambio de peso; consulta con pediatría o nutrición.";
  document.querySelectorAll(".adult-only").forEach(node=>node.classList.add("hidden"));
  $("childMetric").classList.remove("hidden");
  $("emptyState").classList.add("hidden");
  $("results").classList.remove("hidden");
  $("resultCard").scrollIntoView({behavior:"smooth",block:"nearest"});
  return;
 }
 if(weight<30||weight>300||height<120||height>230||!activity){alert("Revisa tus datos de adulto y selecciona el nivel de actividad.");return;}
 const bmi=weight/((height/100)**2),bmr=10*weight+6.25*height-5*age+(sex==="male"?5:-161),tdee=bmr*activity;
 let target=tdee,goalLabel="Mantenimiento estimado";
 if(goal==="lose"&&bmi>=18.5) {target=tdee-250;goalLabel="Déficit moderado orientativo";}
 if(goal==="gain"&&bmi<30) {target=tdee+250;goalLabel="Superávit moderado orientativo";}
 if(goal==="habits")goalLabel="Enfoque en hábitos y variedad";
 let bmiText,bmiAdvice;
 if(bmi<18.5){bmiText="Por debajo del rango de referencia";bmiAdvice="El IMC está por debajo del rango de referencia para adultos. No se aplicará un objetivo automático de pérdida de peso.";}
 else if(bmi<25){bmiText="Rango de referencia";bmiAdvice="El IMC está dentro del rango de referencia habitual para adultos.";}
 else if(bmi<30){bmiText="Por encima del rango de referencia";bmiAdvice="El IMC es solo orientativo y no distingue músculo de grasa.";}
 else{bmiText="IMC elevado";bmiAdvice="Conviene valorar tu contexto con un profesional; el IMC por sí solo no diagnostica.";}
 if(goal==="lose"&&bmi<18.5){target=tdee;goalLabel="Sin déficit automático por IMC bajo";}
 if(goal==="gain"&&bmi>=30){target=tdee;goalLabel="Objetivo a revisar con profesional";}
 profile={bmr,bmi,tdee,target,goal,goalLabel};
 $("bmr").textContent=Math.round(bmr).toLocaleString("es-BO");$("bmi").textContent=bmi.toFixed(1);$("bmiLabel").textContent=bmiText;$("tdee").textContent=Math.round(tdee).toLocaleString("es-BO");$("target").textContent=Math.round(target).toLocaleString("es-BO")+" kcal";$("goalLabel").textContent=goalLabel;
 $("childMetric").classList.add("hidden");
 document.querySelectorAll(".adult-only").forEach(node=>node.classList.remove("hidden"));
 $("bmiNote").textContent=bmiAdvice+" El objetivo energético es una estimación educativa, no una dieta terapéutica. Si tienes una condición médica, embarazo, antecedentes de trastornos alimentarios o necesidades especiales, consulta a un nutricionista.";
 $("emptyState").classList.add("hidden");$("results").classList.remove("hidden");
 $("resultCard").scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("generate").addEventListener("click",()=>{
 if(!profile){alert("Primero completa tus datos y calcula tus resultados.");setActiveView("data","#calculadora");return;}
 renderPersonalMenu();setActiveView("menu","#menu");
});
["diet","budget","dislikes","allergies"].forEach(id=>$(id).addEventListener("change",()=>{if(profile)renderPersonalMenu()}));
document.querySelectorAll('input[name="likes"]').forEach(x=>x.addEventListener("change",()=>{if(profile)renderPersonalMenu()}));
$("age").addEventListener("input",updateAgeFields);
$("ageMonths").addEventListener("change",updateAgeFields);
updateAgeFields();
const appViews=[
 {name:"home",element:$("home")},
 {name:"menu",element:$("menu")},
 {name:"data",element:$("calculadora").closest(".layout")},
 {name:"dressup",element:$("vestir")},
 {name:"tastes",element:$("preferencias")}
];
const bottomNavLinks=[...document.querySelectorAll(".bottom-nav a")];
function viewForHash(hash){
 if(hash==="#inicio")return "home";
 const target=$(hash.slice(1));
 if(!target)return null;
 return appViews.find(view=>view.element===target||view.element.contains(target))?.name||null;
}
function setActiveView(viewName,hash=location.hash,writeHistory=true){
 if(!appViews.some(view=>view.name===viewName))return;
 appViews.forEach(view=>view.element.classList.toggle("view-hidden",view.name!==viewName));
 bottomNavLinks.forEach(link=>{
  if(viewForHash(link.hash)===viewName)link.setAttribute("aria-current","page");
  else link.removeAttribute("aria-current");
 });
 if(writeHistory&&hash&&location.hash!==hash)history.pushState({view:viewName},"",hash);
 window.scrollTo({top:0,behavior:writeHistory?"smooth":"auto"});
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",event=>{
 const viewName=viewForHash(link.hash);
 if(!viewName)return;
 event.preventDefault();
 setActiveView(viewName,link.hash,true);
}));
window.addEventListener("popstate",()=>setActiveView(viewForHash(location.hash)||"home",location.hash));
setActiveView(viewForHash(location.hash)||"home",location.hash);
function updateWardrobe(option){
 const kind=option.dataset.kind;
 document.querySelectorAll(`.wardrobe-option[data-kind="${kind}"]`).forEach(item=>item.setAttribute("aria-pressed",String(item===option)));
 if(kind==="hat")$("avatarHat").textContent=option.dataset.value;
 if(kind==="accessory"){
  $("avatarAccessory").textContent=option.dataset.value;
  $("avatarAccessory").className=`avatar-accessory position-${option.dataset.position||"face"}`;
 }
 if(kind==="shirt")$("brokiDoll").style.setProperty("--broki-shirt",option.dataset.value);
 const hat=document.querySelector('.wardrobe-option[data-kind="hat"][aria-pressed="true"]').dataset.label;
 const accessory=document.querySelector('.wardrobe-option[data-kind="accessory"][aria-pressed="true"]').dataset.label;
 const shirtLabel=document.querySelector('.wardrobe-option[data-kind="shirt"][aria-pressed="true"]').dataset.label.toLowerCase();
 const shirt=shirtLabel==="amarillo"?"amarilla":shirtLabel;
 $("lookMessage").textContent=`¡Broki luce ${hat.toLowerCase()}, ${accessory.toLowerCase()} y ropa ${shirt}!`;
 $("brokiDoll").classList.remove("pop");
 requestAnimationFrame(()=>$("brokiDoll").classList.add("pop"));
}
document.querySelectorAll(".wardrobe-tab").forEach(tab=>tab.addEventListener("click",()=>{
 document.querySelectorAll(".wardrobe-tab").forEach(item=>item.setAttribute("aria-selected",String(item===tab)));
 document.querySelectorAll("[data-wardrobe-panel]").forEach(panel=>panel.hidden=panel.dataset.wardrobePanel!==tab.dataset.wardrobe);
 const firstOption=document.querySelector(`.wardrobe-options${tab.dataset.wardrobe==="hat"?"[aria-label='Gorros']":`[data-wardrobe-panel="${tab.dataset.wardrobe}"]`} .wardrobe-option`);
 if(firstOption)firstOption.focus({preventScroll:true});
}));
document.querySelectorAll(".wardrobe-option").forEach(option=>option.addEventListener("click",()=>updateWardrobe(option)));
$("days").addEventListener("click",event=>{
 const button=event.target.closest(".meal-arrow");
 if(!button)return;
 const details=$(button.getAttribute("aria-controls"));
 const expanded=button.getAttribute("aria-expanded")==="true";
 button.setAttribute("aria-expanded",String(!expanded));
 button.setAttribute("aria-label",`${expanded?"Ver":"Ocultar"} datos de ${button.dataset.food}`);
 details.hidden=expanded;
});
$("surpriseOutfit").addEventListener("click",()=>{
 ["hat","accessory","shirt"].forEach(kind=>{
  const options=[...document.querySelectorAll(`.wardrobe-option[data-kind="${kind}"]`)];
  updateWardrobe(options[Math.floor(Math.random()*options.length)]);
 });
});
$("resetOutfit").addEventListener("click",()=>document.querySelectorAll('.wardrobe-option[data-default="true"]').forEach(updateWardrobe));
