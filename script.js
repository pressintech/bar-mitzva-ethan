const target = new Date("2026-12-24T10:00:00+01:00").getTime();

function updateCountdown(){
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById("rsvpForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.getElementById("formMessage").textContent =
    "Merci ! Le formulaire est prêt. Nous connecterons cette étape à la base RSVP finale.";
});
