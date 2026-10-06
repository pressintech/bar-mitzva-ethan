const target = new Date("2026-12-24T10:00:00+01:00").getTime();

function updateCountdown() {
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);

  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =========================================
// RSVP — SUPABASE
// =========================================

const SUPABASE_URL =
  "https://zsopohnafoauyhbuhohb.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_iXeDcpJZgmXxi5lD4iu4Pg_HTmYtuo9";

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

rsvpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = rsvpForm.querySelector("button");

  submitButton.disabled = true;
  submitButton.textContent = "ENVOI EN COURS...";

  const formData = new FormData(rsvpForm);

  const data = {
    nom: formData.get("nom"),
    presence: formData.get("presence"),
    adultes: Number(formData.get("adultes") || 0),
    enfants: Number(formData.get("enfants") || 0),
    message: formData.get("message") || ""
  };

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/rsvp`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=minimal"
        },

        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi");
    }

    rsvpForm.reset();

    formMessage.textContent =
      "Merci ! Votre réponse a bien été enregistrée.";

  } catch (error) {

    console.error(error);

    formMessage.textContent =
      "Une erreur est survenue. Merci de réessayer.";

  } finally {

    submitButton.disabled = false;
    submitButton.textContent = "CONFIRMER MA RÉPONSE";

  }
});
