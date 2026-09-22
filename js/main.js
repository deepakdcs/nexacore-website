
document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu"),links=document.querySelector(".links");
 if(menu) menu.onclick=()=>{links.classList.toggle("mobile")};
 document.querySelectorAll(".form").forEach(form=>form.addEventListener("submit",e=>{
   e.preventDefault(); const btn=form.querySelector("button"); const old=btn.textContent; btn.textContent="Message sent ✓"; btn.disabled=true;
   setTimeout(()=>{btn.textContent=old;btn.disabled=false;form.reset()},2500);
 }));
});
