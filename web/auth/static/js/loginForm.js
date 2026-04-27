
console.log(' Suc♥️cess welcome to the login form. ')

function updateSize()
{
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;

  console.log('Vieport');
  console.log(`↔️ šířka okna: ${w}, ↕️ výška okna: ${h}`);

  // const el = document.getElementById("loginForm");
  // const rect = el.getBoundingClientRect();
  // console.log(`loginForm: ${rect.width}px × ${rect.height}px`);

}

// místo okamžitého volání:
requestAnimationFrame(() =>
{
  requestAnimationFrame(updateSize); // dvojitý RAF = po layoutu i po emulaci
});

window.addEventListener("resize", updateSize);
// bonus: emulace často mění visualViewport
window.visualViewport?.addEventListener("resize", updateSize);

document.getElementById("errorBtn").addEventListener("click", function ()
{
    console.log("Kliknuto na errorBtn2");

    console.log("Špatné heslo - zavírám chybovou hlášku");

    const errorC = document.getElementById("errorC");
    errorC.style.display = "none";

    const tazC = document.getElementById("TazC");
    tazC.style.display = "none";

    document.getElementById("password").focus();   // <- id inputu kam chceš fokus
});

document.getElementById("errorBtn2").addEventListener("click", function ()
{
    console.log("Kliknuto na errorBtn2");

    console.log("Špatné jméno - zavírám chybovou hlášku");

    const errorC2 = document.getElementById("errorC2");
    errorC2.style.display = "none";

    const tazC = document.getElementById("TazC");
    tazC.style.display = "none";

    document.getElementById("name").focus();   // <- id inputu kam chceš fokus

});

// console.log
// ({
//   body_client: document.body.clientHeight,                         // viditelná výška
//   body_scroll: document.body.scrollHeight,                         // celková výška obsahu
//   html_client: document.documentElement.clientHeight,              // výška viewportu
//   html_scroll: document.documentElement.scrollHeight,              // celková výška celé stránky
// });


