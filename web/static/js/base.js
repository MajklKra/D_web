console.log(' ❤️ Vítejte na stránkách "Base.html"')

console.log(' We are always solving our 👾 !!! ')

/* TESTOVÁNÍ */

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

// async function updateName()
// {
//   try
//   {
//     const response = await fetch("https://svatkyapi.cz/api/day");
//     const data = await response.json();

//     console.log('Dnes má svátek: :', data.name);

//     const name = document.getElementById('DBC-row1-dateC-weatherC-nameC-span');

//     if (name)
//     {
//       name.textContent = data.name;
//     }

//   }
//   catch(error)
//   {
//     console.error('Chyba počasí:', error);
//   }
// }


async function updateName()
{
  try
  {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const date = `${yyyy}-${mm}-${dd}`;

    const response = await fetch(`https://svatkyapi.cz/api/day/${date}`);
    const data = await response.json();

    console.log('Datum:', date);
    console.log('Dnes má svátek:', data.name);

    const name = document.getElementById('DBC-row1-dateC-weatherC-nameC-span');

    if (name) {
      name.textContent = data.name;
    }

  } catch (error) {
    console.error('Chyba svátku:', error);
  }
}


// Graf - kapacita nemocnice

// const chartData = window.chartData;
// const chartCanvas = document.getElementById("capacityChart");


// document.addEventListener("DOMContentLoaded", function ()
// {
//     const chartData = window.chartData;
//     const chartCanvas = document.getElementById("capacityChart");

//     if (chartCanvas && chartData)
//     {
//         new Chart(chartCanvas,
//         {
//             type: "line",

//             plugins: [ChartDataLabels],

//             data:
//             {
//                 labels: chartData.labels,

//                 datasets:
//                 [
//                     {
//                         label: "Obsazenost",
//                         data: chartData.values,

//                         yAxisID: "y",

//                         borderColor: "#357fab",
//                         backgroundColor: "#357fab",

//                         borderWidth: 2,

//                         tension: 0.45,
//                         cubicInterpolationMode: "monotone",

//                         pointRadius: function(context)
//                         {
//                             const lastIndex = context.dataset.data.length - 1;

//                             return (
//                                 context.dataIndex === 0 ||
//                                 context.dataIndex === lastIndex
//                             )
//                             ? 0
//                             : 3.5;
//                         },

//                         pointHoverRadius: function(context)
//                         {
//                             const lastIndex = context.dataset.data.length - 1;

//                             return (
//                                 context.dataIndex === 0 ||
//                                 context.dataIndex === lastIndex
//                             )
//                             ? 0
//                             : 3.5;
//                         },

//                         pointBackgroundColor: "#3f7fb5",
//                         pointBorderColor: "#3f7fb5",
//                         pointBorderWidth: 0,

//                         fill: false,

//                         datalabels:
//                         {
//                             align: "top",
//                             anchor: "end",
//                             color: "#7f7f8c",
//                             offset: 1,

//                             font:
//                             {
//                                 family: "Montserrat",
//                                 size: 8,
//                                 weight: "600"
//                             },

//                             formatter: function(value, context)
//                             {
//                                 const lastIndex = context.dataset.data.length - 1;

//                                 if (
//                                     context.dataIndex === 0 ||
//                                     context.dataIndex === lastIndex
//                                 )
//                                 {
//                                     return null;
//                                 }

//                                 return value;
//                             }
//                         }

//                     },

//                     {
//                         label: "Kapacita",
//                         data: chartData.values2,

//                         yAxisID: "y1",

//                         borderColor: "#d4a373",
//                         backgroundColor: "#d4a373",

//                         borderWidth: 2,

//                         tension: 0.45,
//                         cubicInterpolationMode: "monotone",

//                         pointRadius: 0,
//                         pointHoverRadius: 0,

//                         fill: false,

//                         datalabels:
//                         {
//                             display: false
//                         }
//                     }
//                 ]
//             },

//             options:
//             {
//                 responsive: true,
//                 maintainAspectRatio: false,

//                 layout:
//                 {
//                     padding:
//                     {
//                         left: 0,
//                         right: 0,
//                         top: 10,
//                         bottom:0
//                     }
//                 },

//                 plugins:
//                 {
//                     legend:
//                     {
//                         display: false
//                     },

//                     tooltip:
//                     {
//                         enabled: true
//                     }
//                 },

//                 scales:
//                 {
//                      x:
//                         {
//                             offset: false,

//                             ticks:
//                             {
//                                 display: false
//                             },

//                             grid:
//                             {
//                                 display: false
//                             },

//                             border:
//                             {
//                                 display: true,
//                                 width: 2,
//                                 color: "rgba(239,242,247,1)"
//                             }
//                         },

//                     y:

//                         {
//                             ticks:
//                             {
//                                 display: false,
//                                 stepSize: 25
//                             },

//                             grid:
//                             {
//                                 // color: "rgba(0,0,0,0.05)",

//                                 color: "rgba(239,242,247,1)",
//                                 drawTicks: false
//                             },

//                             border:
//                             {
//                                 display: true,
//                                 z: 10,
//                                 width: 2,
//                                 color: "rgba(239,242,247,1)"
//                             }
//                         },

//                     y1:
//                     {
//                         type: "linear",
//                         position: "right",
//                         display: false,

//                         grid:
//                         {
//                             drawOnChartArea: false,
//                             drawBorder: false
//                         }
//                     }
//                 }
//             }
//         });
//     }
// });


/* Kruhový graf */

// const percent = 75;

/* ORIGINÁL */

// const percent = window.percent;

// const options = {
//   series: [percent],
//   chart: {
//     type: 'radialBar',
//     width: 220,
//     sparkline: {
//       enabled: true
//     },
//     offsetX: 0,
//     offsetY: 0
//   },
//   colors: ['#2F80B7'],
//   plotOptions: {
//     radialBar: {
//       hollow: {
//         size: '45%'
//       },
//       track: {
//         background: '#EEF1F6'
//       },
//       dataLabels: {
//         name: {
//           show: false
//         },
//         value: {
//           show: true,
//           fontSize: '26px',
//           fontWeight: 600,
//           fontFamily: 'Montserrat',
//           color: '#324351',
//           offsetY: 8,
//           formatter: function ()
//           {
//             return percent + '%';
//           }
//         }
//       }
//     }
//   }
// };

// new ApexCharts(document.querySelector("#piechart"), options).render();


/* Scrollbar */


document.addEventListener("DOMContentLoaded", function ()
{
    const content = document.getElementById("DBC-row3-occupC-c2-empC-c1");

    const track = document.getElementById("DBC-row3-occupC-c2-empC-scrollC");
    const thumb = document.getElementById("DBC-row3-occupC-c2-empC-thumb");

    if (!content || !track || !thumb) return;

    content.addEventListener("scroll", updateThumb);

    function updateThumb()
    {
        const isEmpty = content.children.length === 0;

        if (isEmpty || content.scrollHeight <= content.clientHeight)
        {
            track.style.display = "none";
            content.style.width = "100%";
            return;
        }

        track.style.display = "block";
        content.style.width = "calc(100% - 10px)";

        const thumbHeight = 31;
        thumb.style.height = thumbHeight + "px";

        const maxScrollTop = content.scrollHeight - content.clientHeight;
        const maxThumbTop = track.clientHeight - thumbHeight;

        const thumbTop = (content.scrollTop / maxScrollTop) * maxThumbTop;
        thumb.style.top = thumbTop + "px";
    }


    // content.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    thumb.addEventListener("mousedown", function (e) {
        isDragging = true;
        startY = e.clientY;
        startTop = parseFloat(thumb.style.top) || 0;

        document.body.style.userSelect = "none";
        e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        const deltaY = e.clientY - startY;
        const thumbHeight = thumb.offsetHeight;
        const maxThumbTop = track.clientHeight - thumbHeight;

        let newTop = startTop + deltaY;
        newTop = Math.max(0, Math.min(newTop, maxThumbTop));

        thumb.style.top = newTop + "px";

        const maxScrollTop = content.scrollHeight - content.clientHeight;

        content.scrollTop = maxThumbTop > 0
            ? (newTop / maxThumbTop) * maxScrollTop
            : 0;
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        document.body.style.userSelect = "";
    });

    track.addEventListener("click", function (e) {
        if (e.target === thumb) return;

        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const thumbHeight = thumb.offsetHeight;
        const maxThumbTop = track.clientHeight - thumbHeight;

        let newTop = clickY - thumbHeight / 2;
        newTop = Math.max(0, Math.min(newTop, maxThumbTop));

        const maxScrollTop = content.scrollHeight - content.clientHeight;

        content.scrollTop = maxThumbTop > 0
            ? (newTop / maxThumbTop) * maxScrollTop
            : 0;
    });

    updateThumb();
});



/* Kruhový graf číslo 2 */

const percent2 = window.percent2;

const options2 = {
  series: [percent2],
  chart: {
    type: 'radialBar',
    width: 220,
    sparkline: {
      enabled: true
    },
    offsetX: 0,
    offsetY: 0
  },
  colors: ['#2F80B7'],
  plotOptions: {
    radialBar: {
      startAngle: -180,
      endAngle: 180,
      hollow: {
        size: '45%'
      },
      track: {
        background: '#EEF1F6'
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: true,
          fontSize: '26px',
          fontWeight: 600,
          fontFamily: 'Montserrat',
          color: '#324351',
          offsetY: 8,
          formatter: function ()
          {
            return percent2 + '%';
          }
        }
      }
    }
  }
};

new ApexCharts(document.querySelector("#piechart2"), options2).render();


/* Kruhový graf číslo 3 */


// const percent3 = window.percent3;

// const options3 = {
//   series: [percent3],
//   chart: {
//     type: 'radialBar',
//     width: 220,
//     sparkline: {
//       enabled: true
//     },
//     offsetX: 0,
//     offsetY: 0
//   },
//   colors: ['#2F80B7'],
//   plotOptions: {
//     radialBar: {
//       hollow: {
//         size: '45%'
//       },
//       track: {
//         background: '#EEF1F6'
//       },
//       dataLabels: {
//         name: {
//           show: false
//         },
//         value: {
//           show: true,
//           fontSize: '26px',
//           fontWeight: 700,
//           color: '#2D3B4D',
//           offsetY: 8,
//           formatter: function ()
//           {
//             return percent2 + '%';
//           }
//         }
//       }
//     }
//   }
// };

// new ApexCharts(document.querySelector("#piechart3"), options3).render();


const percent3 = window.percent3;

const options3 = {
  series: [percent3],
  chart: {
    type: 'radialBar',
    width: 220,
    sparkline: {
      enabled: true
    },
    offsetX: 0,
    offsetY: 0
  },
  colors: ['#2F80B7'],
  plotOptions: {
    radialBar: {
        startAngle: -180,
        endAngle: 180,
      hollow: {
        size: '45%'
      },
      track: {
        background: '#EEF1F6'
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: true,
          fontSize: '26px',
          fontFamily: 'Montserrat',
          fontWeight: 600,
          color: '#324351',
          offsetY: 8,
          formatter: function ()
          {
            return percent2 + '%';
          }
        }
      }
    }
  }
};

new ApexCharts(document.querySelector("#piechart3"), options3).render();


/* 12.6.2026 První graf */

let capacityChart;

function createChart(size)
{

    let paddingTop;
    let paddingBottom;
    let pointsize;
    let fontsize;

    if (size === "wide")
    {
        paddingTop = 24;
        console.log("Wide padding-top: " + paddingTop);
        paddingBottom = 4;
        console.log("Wide paddingBottom: " + paddingBottom);
        pointsize = 3.5;
        console.log("Wide pointsize: " + pointsize);
        fontsize = 8;
        console.log("Wide fontsize: " + fontsize);
    }
    else if (size === "normal")
    {
        paddingTop = 18;
        console.log("normal padding-top: " + paddingTop);
        paddingBottom = 2;
        console.log("Wide paddingBottom: " + paddingBottom)
        pointsize = 3;
        console.log("Wide pointsize: " + pointsize);
        fontsize = 6;
        console.log("Wide fontsize: " + fontsize);
    }
    else if (size === "medium")
    {
        paddingTop = 15;
        console.log("medium padding-top: " + paddingTop);
        pointsize = 2;
        console.log("Wide pointsize: " + pointsize);
        fontsize = 6;
        console.log("Wide fontsize: " + fontsize);
    }
    else if (size === "small")
    {
        paddingTop = 11;
        console.log("small padding-top: " + paddingTop);
        pointsize = 2;
        console.log("Wide pointsize: " + pointsize);
        fontsize = 4;
        console.log("Wide fontsize: " + fontsize);
    }


    const chartData = window.chartData;
    const chartCanvas = document.getElementById("capacityChart");

    if (chartCanvas && chartData)
    {
        capacityChart = new Chart(chartCanvas,
        {
            type: "line",

            plugins: [ChartDataLabels],

            data:
            {
                labels: chartData.labels,

                datasets:
                [
                    {
                        label: "Obsazenost",
                        data: chartData.values,

                        yAxisID: "y",

                        borderColor: "#357fab",
                        backgroundColor: "#357fab",

                        borderWidth: 2,

                        tension: 0.45,
                        cubicInterpolationMode: "monotone",

                        pointRadius: function(context)
                        {
                            const lastIndex = context.dataset.data.length - 1;

                            return (
                                context.dataIndex === 0 ||
                                context.dataIndex === lastIndex
                            )
                            ? 0
                            : pointsize;
                        },

                        pointHoverRadius: function(context)
                        {
                            const lastIndex = context.dataset.data.length - 1;

                            return (
                                context.dataIndex === 0 ||
                                context.dataIndex === lastIndex
                            )
                            ? 0
                            : pointsize;
                        },

                        pointBackgroundColor: "#3f7fb5",
                        pointBorderColor: "#3f7fb5",
                        pointBorderWidth: 0,

                        fill: false,

                        datalabels:
                        {
                            align: "top",
                            anchor: "end",
                            color: "#7f7f8c",
                            offset: 1,

                            font:
                            {
                                family: "Montserrat",
                                size: fontsize,
                                weight: "600"
                            },

                            formatter: function(value, context)
                            {
                                const lastIndex = context.dataset.data.length - 1;

                                if (
                                    context.dataIndex === 0 ||
                                    context.dataIndex === lastIndex
                                )
                                {
                                    return null;
                                }

                                return value;
                            }
                        }

                    },

                    {
                        label: "Kapacita",
                        data: chartData.values2,

                        yAxisID: "y1",

                        borderColor: "#d4a373",
                        backgroundColor: "#d4a373",

                        borderWidth: 2,

                        tension: 0.45,
                        cubicInterpolationMode: "monotone",

                        pointRadius: 0,
                        pointHoverRadius: 0,

                        fill: false,

                        datalabels:
                        {
                            display: false
                        }
                    }
                ]
            },

            options:
            {
                responsive: true,
                maintainAspectRatio: false,

                layout:
                {
                    padding:
                    {
                        left: 0,
                        right: 0,
                        top: paddingTop,
                        bottom:paddingBottom
                    }
                },

                plugins:
                {
                    legend:
                    {
                        display: false
                    },

                    tooltip:
                    {
                        enabled: true
                    }
                },

                scales:
                {
                     x:
                        {
                            offset: false,

                            ticks:
                            {
                                display: false
                            },

                            grid:
                            {
                                display: false
                            },

                            border:
                            {
                                display: true,
                                width: 2,
                                color: "rgba(239,242,247,1)"
                            }
                        },

                    y:

                        {
                            ticks:
                            {
                                display: false,
                                stepSize: 25
                            },

                            grid:
                            {
                                // color: "rgba(0,0,0,0.05)",

                                color: "rgba(239,242,247,1)",
                                drawTicks: false
                            },

                            border:
                            {
                                display: true,
                                z: 10,
                                width: 2,
                                color: "rgba(239,242,247,1)"
                            }
                        },

                    y1:
                    {
                        type: "linear",
                        position: "right",
                        display: false,

                        grid:
                        {
                            drawOnChartArea: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }
}

function getBreakpoint()
{
    const w = window.innerWidth;

    if (w >= 1920) return "wide";
    if (w >= 1400) return "normal";
    if (w >= 1200) return "medium";

    return "small";
}

let currentBreakpoint = getBreakpoint();

document.addEventListener("DOMContentLoaded", function ()
{
    createChart(currentBreakpoint);
});

window.addEventListener("resize", () =>
{
    const newBreakpoint = getBreakpoint();

    if (newBreakpoint !== currentBreakpoint)
    {
        currentBreakpoint = newBreakpoint;

        if (capacityChart)
        {
            capacityChart.destroy();
        }

        createChart(newBreakpoint);
    }

});


/* 22.6.2026 */

/* Nový Kruhový graf číslo 2 */

let pieChart;

function getBreakpoint()
{
    const w = window.innerWidth;

    if (w >= 1920) return "wide";
    if (w >= 1400) return "normal";
    if (w >= 1200) return "medium";

    return "small";
}

// function getChartSize(size)
// {
//     if (size === "wide") return 220;
//     if (size === "normal") return 170;
//     if (size === "medium") return 150;

//     return 100;
// }

function getChartConfig(size)
{
    if (size === "wide")
    {
        return {
            chartSize: 220,
            hollowSize: "45%",
            wordsSize: "26px"
        };
    }

    if (size === "normal")
    {
        return {
            chartSize: 170,
            hollowSize: "40%",
            wordsSize: "20px"
        };
    }

    if (size === "medium")
    {
        return {
            chartSize:  145,
            hollowSize: "40%",
            wordsSize:  "16px"
        };
    }

    return {
        chartSize: 100,
        hollowSize: "40%",
        wordsSize: "16px"
    };
}

function createPieChart(size)
{

    console.log(" createPieChart size: " + size);

    const percent = window.percent;
    const chartEl = document.querySelector("#piechart");

    if (!chartEl) {
        console.log("Element #piechart neexistuje");
        return;
    }

    // const chartSize = getChartSize(size);

    const config = getChartConfig(size);
    const chartSize = config.chartSize;
    const hollowSize = config.hollowSize;
    const wordsSize = config.wordsSize;

    console.log("breakpoint:", size);
    console.log("chartSize:", chartSize);
    console.log("wordsSize:", wordsSize);

    chartEl.innerHTML = "";
    chartEl.style.width = chartSize + "px";
    chartEl.style.height = chartSize + "px";
    chartEl.style.minHeight = chartSize + "px";

    pieChart = new ApexCharts(chartEl, {
        series: [percent],
        chart: {
            type: "radialBar",
            width: chartSize,
            // height: chartSize,
            sparkline: {
                enabled: true
            }
        },
        colors: ["#2F80B7"],
        plotOptions: {
            radialBar: {
                hollow: {
                    // size: "45%"

                    size: hollowSize
                },
                track: {
                    background: "#EEF1F6"
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        // fontSize: chartSize < 180 ? "20px" : "26px",
                        fontSize: wordsSize,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        color: "#324351",
                        offsetY: 8,
                        formatter: function () {
                            return percent + "%";
                        }
                    }
                }
            }
        }
    });

    pieChart.render();
}

let currentBreakpoint2 = getBreakpoint();

document.addEventListener("DOMContentLoaded", function ()
{
    createPieChart(currentBreakpoint2);
});

window.addEventListener("resize", function ()
{
    const newBreakpoint = getBreakpoint();

    if (newBreakpoint !== currentBreakpoint2)
    {
        currentBreakpoint2 = newBreakpoint;

        if (pieChart) {
            pieChart.destroy();
            pieChart = null;
        }

        createPieChart(newBreakpoint);
    }
});




