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

  console.log('Viewport');
  console.log(`↔️ šířka viewportu: ${w}, ↕️ výška viewportu: ${h}`);
  console.log('🔥 šířka celého okna je:' + window.outerWidth);

}

// místo okamžitého volání:
requestAnimationFrame(() =>
{
  requestAnimationFrame(updateSize); // dvojitý RAF = po layoutu i po emulaci
});

window.addEventListener("resize", updateSize);
// bonus: emulace často mění visualViewport
window.visualViewport?.addEventListener("resize", updateSize);

