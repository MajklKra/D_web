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

//   w_day.textContent = den;
//   w_month.textContent = mesic;
//   w_year.textContent = rok;

  if (w_day && w_month && w_year)
  {
    w_day.textContent = den;
    w_month.textContent = mesic;
    w_year.textContent = rok;
  }

  const w_hour = document.getElementById('w_hour');
  const w_minutes = document.getElementById('w_minutes');

//   w_hour.textContent = hodiny;
//   w_minutes.textContent = minuty;

  if (w_hour && w_minutes)
  {
    w_hour.textContent = hodiny;
    w_minutes.textContent = minuty;
  }


   /* Aktualizace DasboardC - dateC*/

    // <p id="DBC-row1-dateC-timeC-hour">14</p>
    // <p id="DBC-row1-dateC-timeC-colon">:</p>
    // <p id="DBC-row1-dateC-timeC-minutes">20</p>


    const d_hour = document.getElementById('DBC-row1-dateC-timeC-hour');
    const d_minutes = document.getElementById('DBC-row1-dateC-timeC-minutes');

    if (d_hour && d_minutes)
    {
        d_hour.textContent = hodiny;
        d_minutes.textContent = minuty;
    }

  /* Aktualizace teploty */

  aktualizovatTeplotu();
  updateName();

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


/* Experimenty 21. 5. 2026 */

async function aktualizovatTeplotu()
{
  try
  {
    const response = await fetch('/administration/clients/weather');
    const data = await response.json();

    console.log('Aktualizovaná teplota:', data.temp);

    const teplota = document.getElementById('temperature');
    const teplota2 = document.getElementById('DBC-row1-dateC-weatherC-weatherC-temperature');

    if (teplota)
    {

      teplota.textContent = Math.round(data.temp) + " °C";
    }

    if (teplota2)
    {

      teplota2.textContent = Math.round(data.temp) + " °C";
    }

  }
  catch(error)
  {
    console.error('Chyba počasí:', error);
  }
}



document.getElementById("logoutBtn").addEventListener("click", () =>
{
    const url = document.getElementById("logoutBtn").dataset.logoutUrl;
    window.location.href = url;
});


/* Dnešní experimenty 26.5.2026 */

if (window.__baseLoaded)
{
  console.warn("base.js už běžel – přeskočeno");
}
else
{
    console.log(" 🚩 Menu část větve dosažena. ")

    window.__baseLoaded = true;

    const ACTIVE_NAV_KEY = "activeSideNavHref";
    const ACTIVE_NAV_CLASS = "nav-active";
    const ACTIVE_SUBNAV_CLASS = "subnav-active";
    const SIDE_NAV_LINK_SELECTOR = "#leftMenu a[hx-push-url]";

    function initSidebar(root = document)
    {

        const allSections = [];
        window._sidebarSections = allSections;

        if (window.sidebarInitialized)
        {
            console.log('🔧 initSidebar – už inicializováno, přeskočeno');
            return;
        }

        // Obecný helper pro jednu sekci
        function setupSection(config)
        {
            const btn = document.getElementById(config.btnId);
            const img = document.getElementById(config.imgId);

            const img2 = document.getElementById(config.img2Id);
            const h1 = document.getElementById(config.h1Id);

            if (!btn || !img) {
                console.log('🔧 initSidebar – nenašel jsem', config.btnId, config.imgId, config.img2Id, config.h1Id);
                return;
            }

            // najdeme všechny řádky v sekci
            const rows = config.rowIds
                .map(id => document.getElementById(id))
                .filter(row => row !== null);


            // je sekce aktuálně otevřená? (aspoň jeden řádek není display:none)
            const isOpenNow = rows.some(row =>
                getComputedStyle(row).display !== "none"
            );

            let rotated = isOpenNow;

            // srovnáme šipku podle aktuálního stavu
            img.style.transform  = rotated ? "rotate(180deg)" : "rotate(0deg)";
            img.style.transition = "transform 0.3s";

            // ─────────────────────
            //  REGISTRACE SEKCE
            // ─────────────────────

            allSections.push
            ({
                id: config.btnId,
                close()
                {
                    console.log("⛔ Zavírám sekci:", config.btnId);
                    rotated = false;
                    img.style.transform = "rotate(0deg)";
                    img.style.transition = "transform 0.3s";
                    rows.forEach(row => row.style.display = "none");
                }
            });

            btn.addEventListener("click", function ()
            {
                    console.log("Klik na", config.btnId);

                    const willOpen = !rotated;

                    // zavřít všechny ostatní sekce
                    allSections.forEach(section => {
                        if (section.id !== config.btnId) {
                            section.close();
                        }
                    });

                    // toggle aktuální
                    rotated = willOpen;
                    img.style.transform = rotated ? "rotate(180deg)" : "rotate(0deg)";

                    rows.forEach(row =>row.style.display = rotated ? "block" : "none");
                });
            }

        // ─────────────────────
        //  KONKRÉTNÍ SEKCE
        // ─────────────────────

        // srow1
        setupSection
        ({
            btnId: "dropdownBtn",
            imgId: "dropdownImg1",
            rowIds: ["srow1-menu"],
            img2Id: "StructureImg", // hlavní obrázek
            h1Id: "strucDecs" // nadpis
        });

        // srow2
        setupSection({
            btnId: "dropdownBtn7",
            imgId: "dropdownImg2",
            rowIds: [""],
            img2Id: "employeeImg", // hlavní obrázek
            h1Id: "e_description" // nadpis
        });

        // 3) srow3
        setupSection({
            btnId: "dropdownBtn2",
            imgId: "dropdownImg3",
            rowIds: ["srow3-menu"],
            img2Id: "equipmentImg", // hlavní obrázek
            h1Id: "eq_Description" // nadpis
        });

        // srow4
        setupSection({
            btnId: "dropdownBtn3",
            imgId: "dropdownImg4",
            rowIds: ["srow4-menu"],
            img2Id: "relationsImg", // hlavní obrázek
            h1Id: "rDescription" // nadpis
        });

        // srow6
        setupSection({
            btnId: "dropdownBtn4",
            imgId: "dropdownImg6",
            rowIds: ["srow6-menu"],
            img2Id: "integrationsImg", // hlavní obrázek
            h1Id: "iDescription" // nadpis
        });

        // srow7
        setupSection({
            btnId: "dropdownBtn5",
            imgId: "dropdownImg7",
            rowIds: ["srow7-menu"],
            img2Id: "mediaImg", // hlavní obrázek
            h1Id: "mDescription" // nadpis
        });

        // srow8
        setupSection({
            btnId: "dropdownBtn6",
            imgId: "dropdownImg8",
            rowIds: ["srow8-menu"],
            img2Id: "settingsImg", // hlavní obrázek
            h1Id: "tDescription" // nadpis
        });

        window.sidebarInitialized = true;
    }

    function closeAllSidebarSections()
    {
        if (!Array.isArray(window._sidebarSections)) return;
        window._sidebarSections.forEach(s => s?.close && s.close());
    }

    // 1) první načtení celé stránky
    document.addEventListener("DOMContentLoaded", function ()
    {
        // console.log('🌱 DOMContentLoaded – inicializace sidebaru');
        initSidebar();
    });

    // 2) HTMX – když něco doswapuje
    document.body.addEventListener("htmx:load", function (evt)
    {
        // console.log("⚡ htmx:load – něco bylo právě doswapováno", evt.target);
        initSidebar();  // sidebar je mimo #contentC, stačí jednou
    });

    // 3) návrat z historie (tlačítko zpět/vpřed)

    document.body.addEventListener("htmx:historyRestore", function (evt)
    {
        // console.log("⏪ htmx:historyRestore – návrat z historie", evt.target);

        // správně resetujeme příznak na window:
        window.sidebarInitialized = false;
        initSidebar();
    });

    function clearAllActiveSideNav()
    {
        document
            .querySelectorAll("#leftMenu .nav-active, #leftMenu .subnav-active")
            .forEach(el =>
            {
                el.classList.remove("nav-active");
                el.classList.remove("subnav-active");
            });
    }

    function getActiveTargetFromLink(a)
    {
        const activeRowId = a.dataset.activeRow;

        if (activeRowId)
        {
            return document.getElementById(activeRowId);
        }

        if (a.classList.contains("row"))
        {
            return a;
        }

        return null;
    }

    function markActiveSideNavByUrl()
    {

        const links = document.querySelectorAll(SIDE_NAV_LINK_SELECTOR);

        if (!links.length) return;

        clearAllActiveSideNav();

        const currentPath = window.location.pathname;

        // ✅ HOME pravidlo: na home nikdy nic neobarvuj + smaž uložený stav
        if (currentPath === "/administration/clients/home")
        {

            sessionStorage.removeItem(ACTIVE_NAV_KEY);
            clearAllActiveSideNav();

            // ✅ zavři všechny sekce (platí i při zpět/vpřed)
            closeAllSidebarSections();

            return;
        }

        let matched = null;

        // 1) primárně podle URL
        links.forEach(a => {
            const href = a.getAttribute("href");

            console.log('📌 Aktuální href je: ' + href);

            if (!href) return;

            const aPath = new URL(href, window.location.origin).pathname;

            console.log('🔗 Aktuální ULR je: ' + aPath);

            if (aPath === currentPath) matched = a;

            console.log('🔗 Nastavená ULR je: ' + matched);

        });

        // 2) fallback jen když NEJSI na home
        if (!matched)
        {
            const saved = sessionStorage.getItem(ACTIVE_NAV_KEY);
            console.log("save is: " + saved)
            if (saved)
            {
                const savedPath = new URL(saved, window.location.origin).pathname;
                links.forEach(a =>
                {
                    const aPath = new URL(a.getAttribute("href"), window.location.origin).pathname;
                    if (aPath === savedPath) matched = a;
                });
            }
        }

        if (matched)
        {
            const target = getActiveTargetFromLink(matched);

            if (target)
            {
                target.classList.add(ACTIVE_NAV_CLASS);
            }

            if (matched.classList.contains("row-menu-item") || matched.classList.contains("row-menu-item-bottom"))
            {
                matched.classList.add(ACTIVE_SUBNAV_CLASS);
            }
        }
    }

    document.addEventListener("click", e =>
    {

        const a = e.target.closest(SIDE_NAV_LINK_SELECTOR);

        console.log("🔗 Aktuální kliknutá ULR je: " + a);

        if (!a) return;

        const href = a.getAttribute("href");

        console.log("📌 Aktuální kliknutá reference je: " + href);

        if (!href) return;

        const path = new URL(href, window.location.origin).pathname;

        console.log("📌 Aktuální kliknutá path je: " + path);

        if (path === "/administration/clients/home")
        {
            sessionStorage.removeItem(ACTIVE_NAV_KEY);
            clearAllActiveSideNav();
            return;
        }

        sessionStorage.setItem(ACTIVE_NAV_KEY, href);

        clearAllActiveSideNav();

        const target = getActiveTargetFromLink(a);

        if (target)
        {
            target.classList.add(ACTIVE_NAV_CLASS);
        }

        if (a.classList.contains("row-menu-item") || a.classList.contains("row-menu-item-bottom"))
        {
            a.classList.add(ACTIVE_SUBNAV_CLASS);
        }

    });


    document.addEventListener("DOMContentLoaded", markActiveSideNavByUrl);
    document.body.addEventListener("htmx:load", markActiveSideNavByUrl);
    document.body.addEventListener("htmx:historyRestore", markActiveSideNavByUrl);
}


/* Dnešní experimenty 28.5.2026 */

async function updateName()
{
  try
  {
    const response = await fetch("https://svatkyapi.cz/api/day");
    const data = await response.json();

    console.log('Dnes má svátek: :', data.name);

    const name = document.getElementById('DBC-row1-dateC-weatherC-nameC-span');

    if (name)
    {
      name.textContent = data.name;
    }

  }
  catch(error)
  {
    console.error('Chyba počasí:', error);
  }
}