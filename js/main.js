document.addEventListener("DOMContentLoaded",()=>{
 const root=document.documentElement;
 const menu=document.querySelector(".menu"),links=document.querySelector(".links");
 if(menu) menu.onclick=()=>{links?.classList.toggle("mobile")};

 // Persistent theme preferences
 const saved=JSON.parse(localStorage.getItem("nexacore-theme")||"{}");
 const theme=saved.theme||"dark", accent=saved.accent||"blue", density=saved.density||"comfortable";
 applyTheme(theme,accent,density);

 const nav=document.querySelector("nav");
 if(nav){
   const control=document.createElement("div");
   control.className="theme-control";
   control.innerHTML=`
     <button class="theme-toggle" type="button" aria-label="Open theme settings" aria-expanded="false" title="Theme settings">◐</button>
     <div class="theme-panel" aria-label="Theme settings">
       <div class="theme-group"><h4>Appearance</h4><div class="theme-options">
         <button class="theme-option" data-theme-choice="light">Light</button>
         <button class="theme-option" data-theme-choice="dark">Dark</button>
         <button class="theme-option" data-theme-choice="system">System</button>
       </div></div>
       <div class="theme-group"><h4>Accent color</h4><div class="accent-options">
         <button class="accent-option accent-blue" data-accent-choice="blue" aria-label="Blue"></button>
         <button class="accent-option accent-purple" data-accent-choice="purple" aria-label="Purple"></button>
         <button class="accent-option accent-green" data-accent-choice="green" aria-label="Green"></button>
         <button class="accent-option accent-orange" data-accent-choice="orange" aria-label="Orange"></button>
       </div></div>
       <div class="theme-group"><h4>Layout density</h4><div class="theme-options">
         <button class="theme-option" data-density-choice="compact">Compact</button>
         <button class="theme-option" data-density-choice="comfortable">Comfortable</button>
       </div></div>
       <div class="theme-note">Your preference is saved automatically.</div>
     </div>`;
   const menuBtn=nav.querySelector(".menu");
   nav.insertBefore(control,menuBtn||null);
   const toggle=control.querySelector(".theme-toggle"),panel=control.querySelector(".theme-panel");
   toggle.onclick=e=>{e.stopPropagation(); const open=panel.classList.toggle("open"); toggle.setAttribute("aria-expanded",String(open));};
   control.querySelectorAll("[data-theme-choice]").forEach(btn=>btn.onclick=()=>{const next=btn.dataset.themeChoice; applyTheme(next,root.dataset.accent||accent,root.dataset.density||density); saveTheme();});
   control.querySelectorAll("[data-accent-choice]").forEach(btn=>btn.onclick=()=>{const next=btn.dataset.accentChoice; applyTheme(root.dataset.theme||theme,next,root.dataset.density||density); saveTheme();});
   control.querySelectorAll("[data-density-choice]").forEach(btn=>btn.onclick=()=>{const next=btn.dataset.densityChoice; applyTheme(root.dataset.theme||theme,root.dataset.accent||accent,next); saveTheme();});
   document.addEventListener("click",e=>{if(!control.contains(e.target)){panel.classList.remove("open");toggle.setAttribute("aria-expanded","false")}});
   updateActiveButtons(control);
 }

 function saveTheme(){localStorage.setItem("nexacore-theme",JSON.stringify({theme:root.dataset.theme,accent:root.dataset.accent,density:root.dataset.density})); updateActiveButtons(document.querySelector(".theme-control"));}
 function applyTheme(themeName,accentName,densityName){
   root.dataset.theme=themeName; root.dataset.accent=accentName; root.dataset.density=densityName;
   root.dataset.resolvedTheme=themeName==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):themeName;
 }
 function updateActiveButtons(control){if(!control)return; const currentTheme=root.dataset.theme,currentAccent=root.dataset.accent,currentDensity=root.dataset.density;
   control.querySelectorAll("[data-theme-choice]").forEach(b=>b.classList.toggle("active",b.dataset.themeChoice===currentTheme));
   control.querySelectorAll("[data-accent-choice]").forEach(b=>b.classList.toggle("active",b.dataset.accentChoice===currentAccent));
   control.querySelectorAll("[data-density-choice]").forEach(b=>b.classList.toggle("active",b.dataset.densityChoice===currentDensity));
 }

 matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{if(root.dataset.theme==="system") root.dataset.resolvedTheme=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";});

 document.querySelectorAll(".form").forEach(form=>form.addEventListener("submit",e=>{
   e.preventDefault(); const btn=form.querySelector("button"); if(!btn)return; const old=btn.textContent; btn.textContent="Message sent ✓"; btn.disabled=true;
   setTimeout(()=>{btn.textContent=old;btn.disabled=false;form.reset()},2500);
 }));
});
