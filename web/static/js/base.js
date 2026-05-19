console.log(' ❤️ Vítejte na stránkách "Base.html"')

console.log(' We are always solving our 👾 !!! ')

// Funkce pro aktualizaci data a času
function aktualizovatDatumCas()
{
  const today = new Date();
  const date = today.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\s/g, '');
  console.log('Aktuální datum je:' + date)

  const time = today.toLocaleTimeString('cs-CZ', { hour: 'numeric', minute: 'numeric' });
  console.log('Aktuální čas je:' + time)

  /* Experimenty dne 7.5.2026 */

  const den = today.getDate();
  const mesic = today.getMonth() + 1; // měsíce jsou od 0 do 11
  const rok = today.getFullYear();

  console.log("Den:", den);
  console.log("Měsíc:", mesic);
  console.log("Rok:", rok);

  const dayP = document.getElementById('day');
  const monthP = document.getElementById('month');
  const yearP = document.getElementById('year');

  dayP.textContent = den;
  monthP.textContent = mesic;
  yearP.textContent = rok;

  // const hodiny = today.getHours();
  // const minuty = today.getMinutes();

  const hodiny = String(today.getHours()).padStart(2, '0');
  const minuty = String(today.getMinutes()).padStart(2, '0');

  console.log("Hodiny:", hodiny);
  console.log("Minuty:", minuty);

  const hoursP = document.getElementById('hour');
  const minutesP = document.getElementById('minutes');

  hoursP.textContent = hodiny;
  minutesP.textContent = minuty;

  /* Experimenty 18.5.2026 */

  const w_day = document.getElementById('w_day');
  const w_month = document.getElementById('w_month');
  const w_year = document.getElementById('w_year');

  w_day.textContent = den;
  w_month.textContent = mesic;
  w_year.textContent = rok;

  const w_hour = document.getElementById('w_hour');
  const w_minutes = document.getElementById('w_minutes');

  w_hour.textContent = hodiny;
  w_minutes.textContent = minuty;

}

// Inicializace zobrazení data a času při načtení stránky
aktualizovatDatumCas();

// Aktualizace každou minutu (60000 milisekund)
setInterval(aktualizovatDatumCas, 60000);


function updateSize()
{
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;

  console.log('Viewport');
  console.log(`↔️ šířka viewportu: ${w}, ↕️ výška viewportu: ${h}`);
  console.log('🔥 šířka celého okna je:' + window.outerWidth);
  console.log('🔥 výška celého okna je:' + window.outerHeight);

  /* Měření elementů*/

  const el = document.getElementById("leftMenu");
  const rect = el.getBoundingClientRect();
  console.log(`leftMenu: ${rect.width}px × ${rect.height}px`);

}

// místo okamžitého volání:
requestAnimationFrame(() =>
{
  requestAnimationFrame(updateSize); // dvojitý RAF = po layoutu i po emulaci
});

window.addEventListener("resize", updateSize);
// bonus: emulace často mění visualViewport
window.visualViewport?.addEventListener("resize", updateSize);

