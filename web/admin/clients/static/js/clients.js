

console.log(" %c𝐖𝐄𝐋𝐂𝐎𝐌𝐄 TO client´s page !!! ", "color:yellow");

/* Změna padding pro list-patients-component-searching-bar-searchInput */

document.addEventListener("focusin", e =>
{
    if (e.target.id === "list-patients-component-searching-bar-searchInput")
    {
        document
            .getElementById("list-patients-component-searchLabel")
            .classList.add("hidden");
    }
});

document.addEventListener("focusout", e =>
{
    if (
        e.target.id === "list-patients-component-searching-bar-searchInput" &&
        e.target.value === ""
    )
    {
        document
            .getElementById("list-patients-component-searchLabel")
            .classList.remove("hidden");
    }
});

/* * * * * * * */
/* SELECTBOX1  */
/* * * * * * * */

document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox1");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox1-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox1-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox1-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox1-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        updateSelectBoxesState();

        console.log("Vybráno:", hiddenInput.value);

        select.classList.remove("open");

        sendCurrentFilters();

        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});

/* * * * * * * */
/* SELECTBOX2  */
/* * * * * * * */

document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox2");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox2-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox2-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox2-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox2-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        updateSelectBoxesState();

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");

        sendCurrentFilters();

        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});

/* * * * * * * */
/* SELECTBOX3  */
/* * * * * * * */

document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox3");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox3-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox3-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox3-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox3-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        updateSelectBoxesState();

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");

        sendCurrentFilters();

        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});

/* * * * * * * */
/* SELECTBOX4  */
/* * * * * * * */

document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox4");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox4-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox4-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox4-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox4-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        updateSelectBoxesState();

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");

        sendCurrentFilters();

        return;
    }

    if (!select.contains(e.target))
    {
        select.classList.remove("open");
    }

});

function initCustomScrollbar()
{
    const content = document.getElementById(
        "list-patients-component-listC-listC2-content"
    );

    const track = document.getElementById(
        "list-patients-component-listC-listC2-scrollC"
    );

    const thumb = document.getElementById(
        "list-patients-component-listC-listC2-scrollC-thumb"
    );

    if (!content || !track || !thumb)
    {
        return;
    }

    /*
     * Pokud už jsou listenery přidané,
     * pouze znovu přepočítáme scrollbar.
     */
    if (content._customScrollbarReady === true)
    {
        content._updateCustomScrollbar?.();
        return;
    }

    content._customScrollbarReady = true;

    function updateThumbPosition()
    {
        const maxScroll =
            content.scrollHeight - content.clientHeight;

        const hasScroll = maxScroll > 1;

        track.style.opacity = hasScroll ? "1" : "0";
        track.style.pointerEvents = hasScroll ? "auto" : "none";

        if (!hasScroll)
        {
            thumb.style.top = "0px";
            return;
        }

        const maxThumb =
            track.clientHeight - thumb.clientHeight;

        if (maxThumb <= 0)
        {
            thumb.style.top = "0px";
            return;
        }

        const newTop =
            (content.scrollTop / maxScroll) * maxThumb;

        thumb.style.top = `${newTop}px`;
    }

    content._updateCustomScrollbar = updateThumbPosition;

    content.addEventListener(
        "scroll",
        updateThumbPosition
    );

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    thumb.addEventListener("mousedown", event =>
    {
        event.preventDefault();

        isDragging = true;
        startY = event.clientY;
        startTop = thumb.offsetTop;

        thumb.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", event =>
    {
        if (!isDragging)
        {
            return;
        }

        const maxThumb =
            track.clientHeight - thumb.clientHeight;

        const maxScroll =
            content.scrollHeight - content.clientHeight;

        if (maxThumb <= 0 || maxScroll <= 0)
        {
            return;
        }

        let newTop =
            startTop + (event.clientY - startY);

        newTop = Math.max(
            0,
            Math.min(newTop, maxThumb)
        );

        thumb.style.top = `${newTop}px`;

        content.scrollTop =
            (newTop / maxThumb) * maxScroll;
    });

    document.addEventListener("mouseup", () =>
    {
        if (!isDragging)
        {
            return;
        }

        isDragging = false;
        thumb.style.cursor = "grab";
        document.body.style.userSelect = "";
    });

    updateThumbPosition();
}

document.addEventListener("htmx:afterSwap", event =>
{
    const target = event.detail.target;

    if (
        target.id ===
        "list-patients-component-listC-listC2-content-table-box"
    )
    {
        const content = document.getElementById(
            "list-patients-component-listC-listC2-content"
        );

        const thumb = document.getElementById(
            "list-patients-component-listC-listC2-scrollC-thumb"
        );

        if (content)
        {
            content.scrollTop = 0;
        }

        if (thumb)
        {
            thumb.style.top = "0px";
        }
    }

    requestAnimationFrame(initCustomScrollbar);
});

document.addEventListener("htmx:historyRestore", () =>
{
    requestAnimationFrame(initCustomScrollbar);
});

window.addEventListener("pageshow", () =>
{
    requestAnimationFrame(initCustomScrollbar);
});


/* * * * * * * * * * * */
/*  SELECTION MANAGER  */
/* * * * * * * * * * * */

const SelectionManager =
{
    storageKey: "selectedPatientIds",

    selected: new Set(),

    init()
    {
        try
        {
            const saved = sessionStorage.getItem(this.storageKey);

            this.selected = saved
                ? new Set(JSON.parse(saved).map(String))
                : new Set();
        }
        catch (error)
        {
            console.error("Chyba při načítání výběru klientů:", error);

            this.selected = new Set();
            sessionStorage.removeItem(this.storageKey);
        }
    },

    save()
    {
        sessionStorage.setItem(
            this.storageKey,
            JSON.stringify([...this.selected])
        );
    },

    add(patientId)
    {
        this.selected.add(String(patientId));
        this.save();
    },

    remove(patientId)
    {
        this.selected.delete(String(patientId));
        this.save();
    },

    setAll(patientIds)
    {
        this.selected = new Set(
            patientIds.map(String)
        );

        this.save();
        this.restore();
    },

    has(patientId)
    {
        return this.selected.has(String(patientId));
    },

    clear()
    {
        this.selected.clear();
        this.save();
        this.restore();
    },

    count()
    {
        return this.selected.size;
    },

    getAll()
    {
        return [...this.selected];
    },

    restore()
    {
        const rows = document.querySelectorAll(
            "#list-patients-component-listC-listC2-content-table-box-t1 tbody tr"
        );

        rows.forEach(row =>
        {
            const patientId = row.dataset.patientId;

            const checkbox = row.querySelector(
                ".list-patients-component-listC-listC2-content-table-box-t1-col1-checkbox"
            );

            if (!checkbox || !patientId)
            {
                return;
            }

            const isSelected = this.has(patientId);

            checkbox.checked = isSelected;
            row.classList.toggle("selected", isSelected);
        });


        /* Experiment */

        updateSelectionControls();

        /* Experiment */
    }
};

document.addEventListener("change", function (e)
{
    if (!e.target.matches(
        ".list-patients-component-listC-listC2-content-table-box-t1-col1-checkbox"
    ))
    {
        return;
    }

    const row = e.target.closest("tr");

    if (!row)
    {
        return;
    }

    const patientId = row.dataset.patientId;

    if (!patientId)
    {
        return;
    }

    if (e.target.checked)
    {
        SelectionManager.add(patientId);
    }
    else
    {
        SelectionManager.remove(patientId);
    }

    row.classList.toggle("selected", e.target.checked);

    /* Experiment */
    updateSelectionControls();
    /* Experiment */

    console.log("%cVybraní klienti:","color:hotpink; font-weight:bold;",SelectionManager.getAll());
});

// document.addEventListener("DOMContentLoaded", () =>
// {
//     SelectionManager.init();
//     SelectionManager.restore();

//     initCustomScrollbar();
// });

document.addEventListener("DOMContentLoaded", () =>
{
    const navigation = performance.getEntriesByType("navigation")[0];

    if (navigation && navigation.type === "reload")
    {
        sessionStorage.removeItem(SelectionManager.storageKey);
    }

    SelectionManager.init();
    SelectionManager.restore();

    updateSelectBoxesState();
    initCustomScrollbar();

});

document.addEventListener("htmx:afterSwap", event =>
{
    const target = event.detail.target;

    if (
        target.id ===
        "list-patients-component-listC-listC2-content-table-box"
    )
    {
        const content = document.getElementById(
            "list-patients-component-listC-listC2-content"
        );

        const thumb = document.getElementById(
            "list-patients-component-listC-listC2-scrollC-thumb"
        );

        if (content)
        {
            content.scrollTop = 0;
        }

        if (thumb)
        {
            thumb.style.top = "0px";
        }

        syncTotalRecords();

        SelectionManager.restore();
    }

    requestAnimationFrame(() =>
    {
        initCustomScrollbar();
        updateSelectBoxesState();
    });
});

document.addEventListener("htmx:historyRestore", () =>
{
    SelectionManager.restore();

    updateSelectBoxesState();

    requestAnimationFrame(initCustomScrollbar);
});

window.addEventListener("pageshow", () =>
{
    SelectionManager.restore();

    updateSelectBoxesState();

    requestAnimationFrame(initCustomScrollbar);
});

/* Další experimenty */

/* Synchronizace počtu kilentů do hlavního checkboxu */

function syncTotalRecords()
{
    const headCheckbox = document.getElementById("list-patients-component-listC-head-c1-checkbox");

    const totalRecordsElement = document.getElementById("list-patients-component-lessC-p3");

    if (!headCheckbox || !totalRecordsElement)
    {
        return;
    }

    const totalRecords = Number(totalRecordsElement.textContent.trim());

    if (!Number.isFinite(totalRecords))
    {
        return;
    }

    headCheckbox.dataset.totalRecords = String(totalRecords);

    console.log("%cAktualizovaný počet klientů:","color:hotpink; font-weight:bold;", totalRecords);
}

function updateSelectionControls()
{
    const button = document.getElementById("list-patients-component-searching-bar-btn2");

    const countSpan = document.getElementById("list-patients-component-searching-bar-count");

    const headCheckbox = document.getElementById("list-patients-component-listC-head-c1-checkbox");

    const selectedCount = SelectionManager.count();

    if (button && countSpan)
    {
        const isActive = selectedCount >= 2;

        button.classList.toggle("active", isActive);
        button.disabled = !isActive;

        if (isActive)
        {
            countSpan.textContent = selectedCount + " klientů";
            countSpan.style.display = "flex";
        }
        else
        {
            countSpan.textContent = "";
            countSpan.style.display = "none";
        }
    }

    if (headCheckbox)
    {
        const totalRecords = Number(
            headCheckbox.dataset.totalRecords || 0
        );

        headCheckbox.checked =
            totalRecords > 0 &&
            selectedCount === totalRecords;

        headCheckbox.indeterminate =
            selectedCount > 0 &&
            selectedCount < totalRecords;
    }
}

document.addEventListener("change", async function (event)
{

    console.log(" %cListener change started .... ","color:red; font-wight: bold;");

    if (
        event.target.id !==
        "list-patients-component-listC-head-c1-checkbox"
    )
    {
        return;
    }

    const headCheckbox = event.target;

    /*
     * Po kliknutí odstraníme indeterminate stav.
     * Checkbox je nyní buď plně zapnutý, nebo vypnutý.
     */

    headCheckbox.indeterminate = false;

    if (!headCheckbox.checked)
    {
        SelectionManager.clear();

        console.log(
            "%cVšichni klienti byli odznačeni.",
            "color:hotpink; font-weight:bold;"
        );

        return;
    }

    try
    {
        headCheckbox.disabled = true;

        const response = await fetch(
            "/administration/clients/api/all-patient-ids",
            {
                method: "GET",
                headers:
                {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok)
        {
            throw new Error(
                `Server odpověděl stavem ${response.status}`
            );
        }

        const data = await response.json();

        console.log(" %c ❗data:","color:red; font-weight: bold;", data);

        if (!Array.isArray(data.patient_ids))
        {
            throw new Error(
                "Server nevrátil platný seznam klientů."
            );
        }

        SelectionManager.setAll(data.patient_ids);

        console.log(
            "%cOznačeni všichni klienti:",
            "color:hotpink; font-weight:bold;",
            SelectionManager.getAll()
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se označit všechny klienty:",
            error
        );

        headCheckbox.checked = false;
        headCheckbox.indeterminate = false;

        alert("Nepodařilo se označit všechny klienty.");
    }
    finally
    {
        headCheckbox.disabled = false;
        updateSelectionControls();
    }

});

/* Experimenty 13.7.2026 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* Zobrazení kontejneru + načtení jména  Aktuální verze  */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function openDeleteDialog()
{
    document.getElementById("list-patients-component-listC-deleteC-shadow")?.classList.add("show");

    document.getElementById("list-patients-component-listC-deleteC")?.classList.add("show");
}

function closeDeleteDialog()
{
    const dialog = document.getElementById("list-patients-component-listC-deleteC");

    document.getElementById("list-patients-component-listC-deleteC-shadow")?.classList.remove("show");

    dialog?.classList.remove("show");

    if (dialog)
    {
        delete dialog.dataset.patientId;
    }
}

document.addEventListener("click", function (e)
{
    const btn = e.target.closest(".list-patients-component-listC-listC2-content-table-box-t1-col8-btn1");

    if (!btn)
    {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    const row = btn.closest("tr");

    if (!row)
    {
        return;
    }

    const patientId = row.dataset.patientId;

    const patientName = row.querySelector(".list-patients-component-listC-listC2-content-table-box-t1-col2")?.textContent.trim();

    const deleteDialog = document.getElementById("list-patients-component-listC-deleteC");

    const clientName = document.getElementById("list-patients-component-listC-deleteC-row1-client");

    const deleteButton = document.getElementById("list-patients-component-listC-deleteC-row2-deleteBtn");

    if (!deleteDialog || !deleteButton || !patientId)
    {
        return;
    }

    deleteDialog.dataset.patientId = patientId;

    if (clientName)
    {
        clientName.textContent = patientName || "";
    }

    /*
     * Nastavení HTMX požadavku pro konkrétního klienta.
     */

    deleteButton.setAttribute("hx-post",`/administration/clients/delete/${patientId}`);

    deleteButton.setAttribute("hx-target","#list-patients-component-listC-listC2-content-table-box");

    deleteButton.setAttribute("hx-swap","outerHTML");

    /*
     * Protože jsme HTMX atributy přidali dynamicky,
     * musíme tlačítko nechat HTMX znovu zpracovat.
     */

    htmx.process(deleteButton);

    openDeleteDialog();
});

document.addEventListener("htmx:afterRequest", function (event)
{
    const source = event.detail.elt;

    if (
        source.id !== "list-patients-component-listC-deleteC-row2-deleteBtn"
    )
    {
        return;
    }

    if (!event.detail.successful)
    {
        return;
    }

    const dialog = document.getElementById("list-patients-component-listC-deleteC");

    const patientId = dialog?.dataset.patientId;

    if (patientId)
    {
        /*
         * Smazaného klienta odstraníme také ze SelectionManageru.
         */
        SelectionManager.remove(patientId);
    }

    closeDeleteDialog();
    updateSelectionControls();

    requestAnimationFrame(initCustomScrollbar);
});

document.addEventListener("htmx:responseError", function (event)
{
    const source = event.detail.elt;

    if (
        source.id !=="list-patients-component-listC-deleteC-row2-deleteBtn"
    )
    {
        return;
    }

    console.error("Nepodařilo se odstranit klienta:",event.detail.xhr.responseText);

    alert("Klienta se nepodařilo odstranit.");
});

document.addEventListener("click", function (e)
{
    const cancelBtn = e.target.closest("#list-patients-component-listC-deleteC-row2-noBtn");

    if (!cancelBtn)
    {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    closeDeleteDialog();
});

/* * * * * * * * * * * * * * */
/* Hromadné mazání klientů   */
/*      13.7.2026            */
/* * * * * * * * * * * * * * */

document.addEventListener("click", async function (event)
{
    const button = event.target.closest("#list-patients-component-searching-bar-btn2");

    if (!button)
    {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const patientIds = SelectionManager.getAll();

    /*
     * Hromadné mazání je povoleno až od dvou klientů.
     */

    if (patientIds.length < 2)
    {
        return;
    }

    try
    {
        button.disabled = true;

        const currentPage =
            new URLSearchParams(window.location.search)
                .get("page") || "1";

        const response = await fetch(
            // `/administration/clients/delete-selected?page=${currentPage}`,
            `/administration/clients/delete-selected`,
            {
                method: "POST",

                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "text/html"
                },

                body: JSON.stringify({
                    patient_ids: patientIds
                })
            }
        );

        if (!response.ok)
        {
            const errorText = await response.text();

            throw new Error(errorText ||`Server odpověděl stavem ${response.status}`);
        }

        const html = await response.text();

        /*
         * Odpověď obsahuje novou tabulku
         * a nové stránkování.
         */


        const parser = new DOMParser();

        const responseDocument = parser.parseFromString(html,"text/html");

        const newTable = responseDocument.getElementById("list-patients-component-listC-listC2-content-table-box");

        const newPagination = responseDocument.getElementById("list-patients-component-lessC");

        const currentTable = document.getElementById("list-patients-component-listC-listC2-content-table-box");

        const currentPagination = document.getElementById("list-patients-component-lessC");

        if (!newTable || !currentTable)
        {
            throw new Error("Server nevrátil aktualizovanou tabulku.");
        }

        currentTable.replaceWith(newTable);

        if (newPagination && currentPagination)
        {
            currentPagination.replaceWith(newPagination);
        }

        /*
         * Po úspěšném smazání vyčistíme celý výběr.
         */

        SelectionManager.clear();

        syncTotalRecords();
        updateSelectionControls();

        // requestAnimationFrame(initCustomScrollbar);

        requestAnimationFrame(() =>
        {
            initCustomScrollbar();

            const content = document.getElementById(
                "list-patients-component-listC-listC2-content"
            );

            const thumb = document.getElementById(
                "list-patients-component-listC-listC2-scrollC-thumb"
            );

            if (content)
            {
                content.scrollTop = 0;
            }

            if (thumb)
            {
                thumb.style.top = "0px";
            }
        });

        console.log("%cOdstranění klienti:","color:hotpink; font-weight:bold;",patientIds);
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se odstranit vybrané klienty:",
            error
        );

        alert("Vybrané klienty se nepodařilo odstranit.");

        /*
         * Při chybě výběr zachováme.
         */

        updateSelectionControls();
    }
});


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*    Načtení vybraných hodnot                             */
/*    list-patients-component-searching-bar-searchInput    */
/*    list-patients-component-searching-bar-selectBox1     */
/*    list-patients-component-searching-bar-selectBox2     */
/*    list-patients-component-searching-bar-selectBox3     */
/*    list-patients-component-searching-bar-selectBox4     */
/*                   14.7.2026                             */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


// function sendCurrentFilters()
// {
//     const filters =
//     {
//         search: document.getElementById("list-patients-component-searching-bar-searchInput").value,

//         clients: document.getElementById("list-patients-component-searching-bar-selectBox1-filter").value,

//         department: document.getElementById("list-patients-component-searching-bar-selectBox2-filter").value,

//         building: document.getElementById("list-patients-component-searching-bar-selectBox3-filter").value,

//         source: document.getElementById("list-patients-component-searching-bar-selectBox4-filter").value
//     };

//     console.log(filters);

//     fetch("/administration/clients/current_data", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(filters)
//     });
// }


/* * * * * * * * * Dnešní korekce * * * * * * */

    async function sendCurrentFilters()
    {

        SelectionManager.clear();

        const filters =
        {
            search: document.getElementById(
                "list-patients-component-searching-bar-searchInput"
            ).value,

            clients: document.getElementById(
                "list-patients-component-searching-bar-selectBox1-filter"
            ).value,

            department: document.getElementById(
                "list-patients-component-searching-bar-selectBox2-filter"
            ).value,

            building: document.getElementById(
                "list-patients-component-searching-bar-selectBox3-filter"
            ).value,

            source: document.getElementById(
                "list-patients-component-searching-bar-selectBox4-filter"
            ).value
        };

        console.log("Odesílané filtry:", filters);

        try
        {
            const response = await fetch(
                "/administration/clients/current_data?page=1",
                {
                    method: "POST",

                    headers:
                    {
                        "Content-Type": "application/json",
                        "Accept": "text/html"
                    },

                    body: JSON.stringify(filters)
                }
            );

            if (!response.ok)
            {
                throw new Error(
                    `Server odpověděl stavem ${response.status}`
                );
            }

            const html = await response.text();

            console.log("HTML vrácené serverem:", html);

            const parser = new DOMParser();

            const responseDocument = parser.parseFromString(html,"text/html");

            const newTable = responseDocument.getElementById("list-patients-component-listC-listC2-content-table-box");

            const newPagination = responseDocument.getElementById("list-patients-component-lessC");

            const currentTable = document.getElementById("list-patients-component-listC-listC2-content-table-box");

            const currentPagination = document.getElementById("list-patients-component-lessC");

            if (!newTable)
            {
                throw new Error("Server nevrátil element aktualizované tabulky.");
            }

            if (!currentTable)
            {
                throw new Error("Na stránce nebyla nalezena současná tabulka.");
            }

            if (!newPagination)
            {
                console.warn("Server nevrátil nové stránkování.");
            }

            currentTable.replaceWith(newTable);

            if (newPagination && currentPagination)
            {
                currentPagination.replaceWith(newPagination);
            }


            htmx.process(newTable);

            if (newPagination)
            {
                htmx.process(newPagination);
            }


            window.history.replaceState(
                {},
                "",
                "/administration/clients/?page=1"
            );

            // SelectionManager.restore();
            syncTotalRecords();
            updateSelectionControls();

            requestAnimationFrame(() =>
            {
                initCustomScrollbar();

                const content = document.getElementById(
                    "list-patients-component-listC-listC2-content"
                );

                const thumb = document.getElementById(
                    "list-patients-component-listC-listC2-scrollC-thumb"
                );

                if (content)
                {
                    content.scrollTop = 0;
                }

                if (thumb)
                {
                    thumb.style.top = "0px";
                }
            });
        }
        catch (error)
        {
            console.error(
                "Tabulku se nepodařilo aktualizovat:",
                error
            );
        }
    }

/* * * * * * * * * Dnešní korekce * * * * * * */

document.addEventListener("input", function (event)
{
    if (
        event.target.id ===
        "list-patients-component-searching-bar-searchInput"
    )
    {
        sendCurrentFilters();
    }
});



/* * * * * * * * * * * * * /
/*  Deaktivace SB2 a SB3 */
/* * * * * * * * * * * * */

// function updateSelectBoxesState()
// {
//     const sb1 = document.getElementById("list-patients-component-searching-bar-selectBox1-filter").value;

//     const sb2Btn = document.getElementById("list-patients-component-searching-bar-selectBox2-btn1");
//     const sb3Btn = document.getElementById("list-patients-component-searching-bar-selectBox3-btn1");

//     const disable = (sb1 === "without-bed");

//     sb2Btn.disabled = disable;
//     sb3Btn.disabled = disable;

//     sb2Btn.classList.toggle("disabled", disable);
//     sb3Btn.classList.toggle("disabled", disable);

//     if (disable)
//     {
//         document.getElementById("list-patients-component-searching-bar-selectBox2-filter").value = "all";
//         document.getElementById("list-patients-component-searching-bar-selectBox2-sp2").textContent = "Všechny";

//         document.getElementById("list-patients-component-searching-bar-selectBox3-filter").value = "all";
//         document.getElementById("list-patients-component-searching-bar-selectBox3-sp2").textContent = "Všechny";
//     }
// }


function updateSelectBoxesState()
{
    const sb1Input = document.getElementById(
        "list-patients-component-searching-bar-selectBox1-filter"
    );

    const sb2 = document.getElementById(
        "list-patients-component-searching-bar-selectBox2"
    );

    const sb3 = document.getElementById(
        "list-patients-component-searching-bar-selectBox3"
    );

    const sb2Btn = document.getElementById(
        "list-patients-component-searching-bar-selectBox2-btn1"
    );

    const sb3Btn = document.getElementById(
        "list-patients-component-searching-bar-selectBox3-btn1"
    );

    if (!sb1Input || !sb2 || !sb3 || !sb2Btn || !sb3Btn)
    {
        return;
    }

    const disabled = sb1Input.value === "without-bed";

    sb2Btn.disabled = disabled;
    sb3Btn.disabled = disabled;

    sb2Btn.classList.toggle("disabled", disabled);
    sb3Btn.classList.toggle("disabled", disabled);

    sb2.classList.remove("open");
    sb3.classList.remove("open");

    console.log(
        "Stav SB2 a SB3:",
        disabled ? "deaktivováno" : "aktivováno",
        "SB1:",
        sb1Input.value
    );
}



/* 17.7.2026 dnešní experimenty */

