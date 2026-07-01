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

        const thumbHeight = thumb.offsetHeight;

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


/* * * * * * * * * * * * */
/* Kruhový graf číslo 2  */
/* * * * * * * * * * * * */

// const percent2 = window.percent2;

// const options2 = {
//   series: [percent2],
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
//       startAngle: -180,
//       endAngle: 180,
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
//             return percent2 + '%';
//           }
//         }
//       }
//     }
//   }
// };

// new ApexCharts(document.querySelector("#piechart2"), options2).render();

/* * * * * * * * * * * * */
/* Kruhový graf číslo 3  */
/* * * * * * * * * * * * */

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
//         startAngle: -180,
//         endAngle: 180,
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
//           fontFamily: 'Montserrat',
//           fontWeight: 600,
//           color: '#324351',
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


/* Graf číslo 2 v pořadí - první kruhový graf od začátku Dashboardu */
/* Experimenty 24.6.2026 */

function getChartWidth(screenWidth, minScreen, maxScreen, minChartWidth, maxChartWidth)
{
    screenWidth = Math.max(minScreen, Math.min(screenWidth, maxScreen));

    const ratio = (screenWidth - minScreen) / (maxScreen - minScreen);

    return minChartWidth + ratio * (maxChartWidth - minChartWidth);
}

function getChartConfig(chartSize)
{
    if (chartSize >= 190)
    {
        return {
            chartSize,
            hollowSize: "45%",
            wordsSize: "26px",
            // offsetY: "8"
        };
    }

    if (chartSize >= 140)
    {
        return {
            chartSize,
            hollowSize: "40%",
            wordsSize: "20px",
            // offsetY: "6"
        };
    }

    if (chartSize >= 120)
    {
        return {
            chartSize,
            hollowSize: "38%",
            wordsSize: "14px",
            // offsetY: "4",
        };
    }

    return {
        chartSize,
        hollowSize: "35%",
        wordsSize: "14px",
        // offsetY: "2"
    };
}

let currentChartWidth = null;
let pieChart = null;

function updatePieChart()
{

    console.log(' ƒ function updatePieChart() has been reached ... ')

    let chartWidth;

    if (window.innerWidth > 1920)
    {
       chartWidth = Math.round(getChartWidth(window.innerWidth, 1921, 3840, 190, 190));

       console.log(" ↔️ width > 1920px and chartwidth: " + chartWidth );


    }
    else if (window.innerWidth > 1400)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1400, 1920, 140, 189));

        console.log(" ↔️ width > 1400px and chartwidth: " + chartWidth );
    }
    else if (window.innerWidth > 1200)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1200, 1399, 120, 139));

        console.log(" ↔️ width > 1200px and chartwidth: " + chartWidth );
    }
    else
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 920, 1199, 100, 119));

        console.log(" ↔️ width > 920px and chartwidth: " + chartWidth );
    }

    if (chartWidth !== currentChartWidth)
    {
        currentChartWidth = chartWidth;

        if (pieChart)
        {
            pieChart.destroy();
            pieChart = null;
        }

        createPieChart(chartWidth);
    }
}

window.addEventListener("resize", updatePieChart);
document.addEventListener("DOMContentLoaded", updatePieChart);

function createPieChart(chartSize)
{
    const percent = Number(window.percent) || 0;
    const chartEl = document.querySelector("#piechart");

    if (!chartEl) {
        console.log("Element #piechart neexistuje");
        return;
    }

    const config = getChartConfig(chartSize);

    console.log('⚙️ config chartSize: ' + config.chartSize);
    console.log('⚙️ config wordsSize: ' + config.wordsSize);
    console.log('⚙️ config hollowSize : ' + config.hollowSize);
    console.log('⚙️ config offesetY: ' + config.offsetY);

    chartEl.innerHTML = "";
    chartEl.style.width = config.chartSize + "px";
    chartEl.style.height = config.chartSize + "px";
    chartEl.style.minHeight = config.chartSize + "px";

    pieChart = new ApexCharts(chartEl, {
        series: [percent],
        chart: {
            type: "radialBar",
            width: config.chartSize,
            height: config.chartSize,
            sparkline: {
                enabled: true
            }
        },
        colors: ["#2F80B7"],
        plotOptions: {
            radialBar: {
                hollow: {
                    size: config.hollowSize
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
                        fontSize: config.wordsSize,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        color: "#324351",
                        offsetY: 6,

                        // offsetY: config.offsetY,

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

/* * * * * * * * * * * * */
/* Kruhový graf číslo 2  */
/* * * * * * * * * * * * */

// const percent2 = window.percent2;

// const options2 =
// {
//   series: [percent2],
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
//       startAngle: -180,
//       endAngle: 180,
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
//             return percent2 + '%';
//           }
//         }
//       }
//     }
//   }
// };

// new ApexCharts(document.querySelector("#piechart2"), options2).render();



/* Kruhový graf číslo 2 a v pořadí číslo 3*/


// function getChartWidth(screenWidth, minScreen, maxScreen, minChartWidth, maxChartWidth)
// {
//     screenWidth = Math.max(minScreen, Math.min(screenWidth, maxScreen));

//     const ratio = (screenWidth - minScreen) / (maxScreen - minScreen);

//     return minChartWidth + ratio * (maxChartWidth - minChartWidth);
// }

// function getChartConfig(chartSize)
// {
//     if (chartSize >= 190)
//     {
//         return {
//             chartSize,
//             hollowSize: "45%",
//             wordsSize: "26px",
//             // offsetY: "8"
//         };
//     }

//     if (chartSize >= 140)
//     {
//         return {
//             chartSize,
//             hollowSize: "40%",
//             wordsSize: "20px",
//             // offsetY: "6"
//         };
//     }

//     if (chartSize >= 120)
//     {
//         return {
//             chartSize,
//             hollowSize: "38%",
//             wordsSize: "14px",
//             // offsetY: "4",
//         };
//     }

//     return {
//         chartSize,
//         hollowSize: "35%",
//         wordsSize: "14px",
//         // offsetY: "2"
//     };
// }


function getChartConfig2(chartSize)
{
    console.log('%c ƒ function getChartConfig2() has been reached ... ', 'color: blue;');

    if (chartSize >= 180)
    {
        return {
            chartSize,
            hollowSize: "48%",
            wordsSize: "27px",
            // offsetY: "8"
        };
    }

    if (chartSize >= 140)
    {
        return {
            chartSize,
            hollowSize: "40%",
            wordsSize: "20px",
            // offsetY: "6"
        };
    }

    if (chartSize >= 120)
    {
        return {
            chartSize,
            hollowSize: "38%",
            wordsSize: "14px",
            // offsetY: "4",
        };
    }

    return {
        chartSize,
        hollowSize: "35%",
        wordsSize: "14px",
        // offsetY: "2"
    };
}

const percent2 = window.percent2;
let currentChartWidth2 = null;
let pieChart2 = null;

function updatePieChart2()
{
    console.log('%c ƒ function updatePieChart2() has been reached ... ', 'color: green;');

    let chartWidth;

    if (window.innerWidth > 1920)
    {
       chartWidth = Math.round(getChartWidth(window.innerWidth, 1921, 3840, 180, 180));

       console.log("%c ↔️ width > 1920px and chartwidth: " + chartWidth,  "color: green; font-weight: bold;" );

    }
    else if (window.innerWidth > 1400)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1400, 1920, 140, 189));

        console.log("%c ↔️ width > 1400px and chartwidth: " + chartWidth,  "color: green; font-weight: bold;" );
    }
    else if (window.innerWidth > 1200)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1200, 1399, 120, 139));

        console.log("%c ↔️ width > 1200px and chartwidth: " + chartWidth,  "color: green; font-weight: bold;" );
    }
    else
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 920, 1199, 100, 119));

        console.log("%c ↔️ width > 920px and chartwidth: " + chartWidth,  "color: green; font-weight: bold;" );
    }

    if (chartWidth !== currentChartWidth2)
    {
        currentChartWidth2 = chartWidth;

        console.log(" %c ↔️ currentChartWidth: " +  currentChartWidth ,  "color: green; font-weight: bold;" );

        if (pieChart2)
        {
            pieChart2.destroy();
            pieChart2 = null;
        }

        createPieChart2(chartWidth);
    }
}

window.addEventListener("resize", updatePieChart2);
document.addEventListener("DOMContentLoaded", updatePieChart2);

function createPieChart2(chartSize)
{

    console.log("%c ƒ function createPieChart2() has been reached ... ", "color: green; font-weight: bold;");

    const percent = Number(window.percent) || 0;
    const chartEl = document.querySelector("#piechart2");

    if (!chartEl)
    {
        console.log("Element #piechart2 neexistuje");
        return;
    }

    const config2 = getChartConfig2(chartSize);

    console.log(' %c ⚙️ config2 chartSize: ' + config2.chartSize, "color: green; font-weight: bold;");
    console.log(' %c ⚙️ config2 wordsSize: ' + config2.wordsSize, "color: green; font-weight: bold;");
    console.log(' %c ⚙️ config2 hollowSize : ' + config2.hollowSize, "color: green; font-weight: bold;");
    console.log(' %c ⚙️ config2 offesetY: ' + config2.offsetY, "color: green; font-weight: bold;");

    chartEl.innerHTML = "";
    chartEl.style.width = config2.chartSize + "px";
    chartEl.style.height = config2.chartSize + "px";
    chartEl.style.minHeight = config2.chartSize + "px";

    pieChart2 = new ApexCharts(chartEl, {
        series: [percent2],
        chart: {
            type: "radialBar",
            width: config2.chartSize,
            height: config2.chartSize,
            sparkline: {
                enabled: true
            }
        },
        colors: ["#2F80B7"],
        plotOptions: {
            radialBar: {
                startAngle: -180,
                endAngle: 180,
                hollow: {
                    size: config2.hollowSize
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
                        fontSize: config2.wordsSize,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        color: "#324351",
                        offsetY: 6,

                        // offsetY: config.offsetY,

                        formatter: function () {
                            return percent2 + "%";
                        }
                    }
                }
            }
        }
    });

    pieChart2.render();
}

/* * * * * * * * * * * * */
/*                       */
/* Kruhový graf číslo 3  */
/*                       */
/* * * * * * * * * * * * */


const percent3 = window.percent3;
let currentChartWidth3 = null;
let pieChart3 = null;

function getChartConfig3(chartSize)
{
    console.log('%c ƒ function getChartConfig3() has been reached ... ', 'color: red;');

    if (chartSize >= 180)
    {
        return {
            chartSize,
            hollowSize: "48%",
            wordsSize: "27px",
            // offsetY: "8"
        };
    }

    if (chartSize >= 140)
    {
        return {
            chartSize,
            hollowSize: "40%",
            wordsSize: "20px",
            // offsetY: "6"
        };
    }

    if (chartSize >= 120)
    {
        return {
            chartSize,
            hollowSize: "38%",
            wordsSize: "14px",
            // offsetY: "4",
        };
    }

    return {
        chartSize,
        hollowSize: "35%",
        wordsSize: "14px",
        // offsetY: "2"
    };
}

function updatePieChart3()
{
    console.log('%c ƒ function updatePieChart3() has been reached ... ', 'color: red;');

    let chartWidth;

    if (window.innerWidth > 1920)
    {
       chartWidth = Math.round(getChartWidth(window.innerWidth, 1921, 3840, 180, 180));

       console.log("%c ↔️ width > 1920px and chartwidth: " + chartWidth,  "color: red; font-weight: bold;" );

    }
    else if (window.innerWidth > 1400)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1400, 1920, 140, 189));

        console.log("%c ↔️ width > 1400px and chartwidth: " + chartWidth,  "color: red; font-weight: bold;" );
    }
    else if (window.innerWidth > 1200)
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 1200, 1399, 120, 139));

        console.log("%c ↔️ width > 1200px and chartwidth: " + chartWidth,  "color: red; font-weight: bold;" );
    }
    else
    {
        chartWidth = Math.round(getChartWidth(window.innerWidth, 920, 1199, 100, 119));

        console.log("%c ↔️ width > 920px and chartwidth: " + chartWidth,  "color: red; font-weight: bold;" );
    }

    if (chartWidth !== currentChartWidth3)
    {
        currentChartWidth3 = chartWidth;

        console.log(" %c ↔️ currentChartWidth3: " +  currentChartWidth3 ,  "color: red; font-weight: bold;" );

        if (pieChart3)
        {
            pieChart3.destroy();
            pieChart3 = null;
        }

        createPieChart3(chartWidth);
    }
}

window.addEventListener("resize", updatePieChart3);
document.addEventListener("DOMContentLoaded", updatePieChart3);

function createPieChart3(chartSize)
{

    console.log("%c ƒ function createPieChart3() has been reached ... ", "color: red; font-weight: bold;");

    const percent = Number(window.percent) || 0;
    const chartEl = document.querySelector("#piechart3");

    if (!chartEl)
    {
        console.log("Element #piechart3 neexistuje");
        return;
    }

    const config3 = getChartConfig3(chartSize);

    console.log(' %c ⚙️ config3 chartSize: ' + config3.chartSize, "color: red; font-weight: bold;");
    console.log(' %c ⚙️ config3 wordsSize: ' + config3.wordsSize, "color: red; font-weight: bold;");
    console.log(' %c ⚙️ config3 hollowSize : ' + config3.hollowSize, "color: red; font-weight: bold;");
    console.log(' %c ⚙️ config3 offesetY: ' + config3.offsetY, "color: red; font-weight: bold;");

    chartEl.innerHTML = "";
    chartEl.style.width = config3.chartSize + "px";
    chartEl.style.height = config3.chartSize + "px";
    chartEl.style.minHeight = config3.chartSize + "px";

    pieChart3 = new ApexCharts(chartEl, {
        series: [percent3],
        chart: {
            type: "radialBar",
            width: config3.chartSize,
            height: config3.chartSize,
            sparkline: {
                enabled: true
            }
        },
        colors: ["#2F80B7"],
        plotOptions: {
            radialBar: {
                startAngle: -180,
                endAngle: 180,
                hollow: {
                    size: config3.hollowSize
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
                        fontSize: config3.wordsSize,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        color: "#324351",
                        offsetY: 6,

                        // offsetY: config.offsetY,

                        formatter: function () {
                            return percent3 + "%";
                        }
                    }
                }
            }
        }
    });

    pieChart3.render();
}