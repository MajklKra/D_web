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

}

// Inicializace zobrazení data a času při načtení stránky
aktualizovatDatumCas();

// Aktualizace každou minutu (60000 milisekund)
setInterval(aktualizovatDatumCas, 60000);


function updateSize()
{
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;

  console.log('Vieport');
  console.log(`↔️ šířka okna: ${w}, ↕️ výška okna: ${h}`);
  console.log('🔥 šířka okna je:' + window.outerWidth);

  if (window.outerWidth < 992)
  {

    const body = document.body;
    document.body.classList.remove("pc-mode");
    document.body.classList.add("table-mode");

    const prohibitonC = document.getElementById("prohibitonC");
    prohibitonC.style.display = "flex";

  }

  if (window.outerWidth >= 992)
  {

    const body = document.body;

    document.body.classList.remove("table-mode");
    document.body.classList.add("pc-mode");

    const prohibitonC = document.getElementById("prohibitonC");
    prohibitonC.style.display = "none";

  }
}

// místo okamžitého volání:
requestAnimationFrame(() =>
{
  requestAnimationFrame(updateSize); // dvojitý RAF = po layoutu i po emulaci
});

window.addEventListener("resize", updateSize);
// bonus: emulace často mění visualViewport
window.visualViewport?.addEventListener("resize", updateSize);

