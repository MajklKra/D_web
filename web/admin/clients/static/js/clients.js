

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                               */
/* Scroll-bar pohyb list-patients-component-listC-listC2-scrollC */
/*                                                               */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


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

/* Synchronizace počtu klientů do hlavního checkboxu */

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
            // countSpan.style.display = "flex";
            countSpan.style.visibility = "visible";
        }
        else
        {
            countSpan.textContent = "";
            // countSpan.style.display = "none";
            countSpan.style.visibility = "hidden";
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

/* * * * * * * * * * * * * * * * */
/*                               */
/*       Tlačítko přídej         */
/*                               */
/* * * * * * * * * * * * * * * * */

document.addEventListener("click", function (event)
{
    const addBtn = event.target.closest("#list-patients-component-searching-bar-btn1");

    if (addBtn)
    {
        const clientCard = document.getElementById("client-card");

        if (!clientCard)
        {
            return;
        }

        resetClientCard();

        accommodationState.mode = "location-select";

        addBtn.classList.add("active");
        clientCard.classList.add("show");

        document.getElementById("mainC-layer")?.classList.add("show");

        /* Disability of SB */

        // Budova povolena

        setSelectDisabled(
            "client-card-row2-c3-SB2C",
            "SB2C-floorBtn",
            true
        );

        // Patro zakázáno
        setSelectDisabled(
            "client-card-row2-c3-SB3C",
            "SB3C-depBtn",
            true
        );

        // Oddělení zakázáno
        setSelectDisabled(
            "client-card-row2-c3-SB4C",
            "SB4C-roomBtn",
            true
        );

        /* Disability of SB */



        /* Scroll-Bar 2 spuštění*/

        requestAnimationFrame(() =>
        {
            initAccommodationScrollbar();
        });

        return;
    }

    const closeBtn = event.target.closest("#client-card-row1-btn1");

    if (closeBtn)
    {
        const clientCard = document.getElementById("client-card");
        const addBtn = document.getElementById("list-patients-component-searching-bar-btn1");

        if (clientCard)
        {
            clientCard.classList.remove("show");
        }

        document.getElementById("mainC-layer")?.classList.remove("show");

        if (addBtn)
        {
            addBtn.classList.remove("active");
        }
    }

});


/* * * * * * * * * * * * * * * * * * * * * */
/*                                         */
/*       client-card-row2-c3-searchC       */
/*                                         */
/* * * * * * * * * * * * * * * * * * * * * */


document.addEventListener("focusin", e =>
{
    if (e.target.id === "client-card-row2-c3-searchC-searchInput")
    {
        document.getElementById("client-card-row2-c3-searchC-searchLabel").classList.add("hidden");
    }
});

document.addEventListener("focusout", e =>
{
    if (
        e.target.id === "client-card-row2-c3-searchC-searchInput" &&
        e.target.value === ""
    )
    {
        document
            .getElementById("client-card-row2-c3-searchC-searchLabel")
            .classList.remove("hidden");
    }
})


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                               */
/* Scroll-bar pohyb client-card-row2-c4-accomC-c2-empC-scrollC   */
/*                                                               */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


function initAccommodationScrollbar()
{
    const content = document.getElementById(
        "client-card-row2-c4-accomC-c2-empC-c1"
    );

    const track = document.getElementById(
        "client-card-row2-c4-accomC-c2-empC-scrollC"
    );

    const thumb = document.getElementById(
        "client-card-row2-c4-accomC-c2-empC-thumb"
    );

    if (!content || !track || !thumb)
    {
        console.warn("Scrollbar u umístění nebyl nalezen.");
        return;
    }

    function updateThumb()
    {
        const contentHeight = content.clientHeight;
        const scrollHeight = content.scrollHeight;

        const maxScroll = scrollHeight - contentHeight;
        const hasScroll = maxScroll > 1;

        /*
        * Pokud není co posouvat, celý scrollbar skryjeme.
        */
        if (!hasScroll)
        {
            track.style.display = "none";

            thumb.style.top = "0px";
            return;
        }

        /*
        * Scrollování existuje, scrollbar zobrazíme.
        */
        track.style.display = "block";

        /*
        * Výšku tracku získáme až po jeho zobrazení.
        */
        const trackHeight = track.clientHeight;

        const thumbHeight = 31;

        thumb.style.height = `${thumbHeight}px`;

        const maxThumbTop = trackHeight - thumbHeight;

        const thumbTop =
            (content.scrollTop / maxScroll) * maxThumbTop;

        thumb.style.top = `${thumbTop}px`;
    }


    /*
     * Při opakovaném otevření karty už nepřidáváme
     * další stejné listenery.
     */
    if (content.dataset.scrollbarInitialized === "true")
    {
        updateThumb();
        return;
    }

    content.dataset.scrollbarInitialized = "true";

    content.addEventListener("scroll", updateThumb);

    let dragging = false;
    let startMouseY = 0;
    let startThumbTop = 0;

    thumb.addEventListener("mousedown", event =>
    {
        event.preventDefault();

        dragging = true;
        startMouseY = event.clientY;
        startThumbTop = thumb.offsetTop;

        thumb.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", event =>
    {
        if (!dragging)
        {
            return;
        }

        const maxThumbTop =
            track.clientHeight - thumb.clientHeight;

        const maxScroll =
            content.scrollHeight - content.clientHeight;

        if (maxThumbTop <= 0 || maxScroll <= 0)
        {
            return;
        }

        let newThumbTop =
            startThumbTop + event.clientY - startMouseY;

        newThumbTop = Math.max(
            0,
            Math.min(newThumbTop, maxThumbTop)
        );

        thumb.style.top = `${newThumbTop}px`;

        content.scrollTop =
            (newThumbTop / maxThumbTop) * maxScroll;
    });

    document.addEventListener("mouseup", () =>
    {
        if (!dragging)
        {
            return;
        }

        dragging = false;

        thumb.style.cursor = "grab";
        document.body.style.userSelect = "";
    });

    /*
     * Kliknutí přímo na dráhu scrollbaru.
     */

    track.addEventListener("mousedown", event =>
    {
        if (event.target === thumb)
        {
            return;
        }

        const trackRect = track.getBoundingClientRect();

        const clickPosition =
            event.clientY - trackRect.top;

        const maxThumbTop =
            track.clientHeight - thumb.clientHeight;

        const maxScroll =
            content.scrollHeight - content.clientHeight;

        if (maxThumbTop <= 0 || maxScroll <= 0)
        {
            return;
        }

        let newThumbTop =
            clickPosition - thumb.clientHeight / 2;

        newThumbTop = Math.max(
            0,
            Math.min(newThumbTop, maxThumbTop)
        );

        content.scrollTop =
            (newThumbTop / maxThumbTop) * maxScroll;
    });

    updateThumb();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                                                 */
/*  Function of disability of client-card-row2-c3-SB2C  - client-card-row2-c3-SB4C */
/*                                                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function setSelectDisabled(wrapperId, buttonId, disabled)
{
    const wrapper = document.getElementById(wrapperId);
    const button = document.getElementById(buttonId);

    if (!wrapper || !button) return;

    wrapper.classList.toggle("disabled", disabled);
    button.disabled = disabled;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

   # client-card-row2-c3-searchC-searchInput načtení dat + vytvoření seznamu
     dostupných oddělení

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let departmentSearchTimeout = null;
let departmentSearchController = null;
let initialBuildingMenuHTML = null;
let departmentLocationController = null;





let buildingFloorsController = null;





const accommodationState =
{
    mode: null,

    selectedBuildingId: null,
    selectedFloorId: null,
    selectedDepartmentId: null,
    selectedRoomId: null,
    selectedBedId: null,

    onlyFreeBeds: false,

    buildings: [],
    floors: [],
    departments: [],
    rooms: [],
    beds: []
};


document.addEventListener("change", function (event)
{
    if (
        event.target.id !==
        "client-card-row2-c4-checkC-checkbox"
    )
    {
        return;
    }

    accommodationState.onlyFreeBeds =
        event.target.checked;

    /*
     * Vybraná postel už po změně filtru
     * nemusí být viditelná.
     */

    accommodationState.selectedBedId = null;

    renderAccommodationResults();

    console.log(
        "%cFiltrace volných postelí:",
        "color: green; font-weight: bold;",
        accommodationState.onlyFreeBeds
    );
});

document.addEventListener("input", function (event)
{
    if (
        event.target.id !==
        "client-card-row2-c3-searchC-searchInput"
    )
    {
        return;
    }

    const input = event.target;
    const search = input.value.trim();

    const results = document.getElementById(
        "client-card-row2-c3-searchC-results"
    );

    const departmentIdInput = document.getElementById(
        "client-card-row2-c3-searchC-departmentId"
    );

    if (!results || !departmentIdInput)
    {
        return;
    }

    clearTimeout(departmentSearchTimeout);

    /*
     * Search byl ručně vymazán.
     * Přecházíme do ručního SelectBox režimu.
     */

    if (search === "")
    {
        switchToLocationSelectMode();
        return;
    }

    /*
     * Jakmile uživatel píše do search,
     * jsme v režimu hledání oddělení.
     */

    setAccommodationMode("department-search");

    /*
     * Text se změnil, předchozí vybrané
     * oddělení již není platné.
     */

    departmentIdInput.value = "";

    departmentSearchTimeout = setTimeout(() =>
    {
        loadDepartmentSearchResults(search);
    }, 250);
});

async function loadDepartmentSearchResults(search)
{
    const results = document.getElementById("client-card-row2-c3-searchC-results");

    if (!results)
    {
        return;
    }

    /*
     * Pokud ještě běží starší požadavek,
     * zrušíme ho.
     */

    if (departmentSearchController)
    {
        departmentSearchController.abort();
    }

    departmentSearchController = new AbortController();

    try
    {
        const response = await fetch(
            `/administration/clients/api/search-departments?q=${encodeURIComponent(search)}`,
            {
                method: "GET",

                headers:
                {
                    "Accept": "application/json"
                },

                signal: departmentSearchController.signal
            }
        );

        if (!response.ok)
        {
            throw new Error(
                `Server odpověděl stavem ${response.status}`
            );
        }

        const data = await response.json();

        renderDepartmentSearchResults(
            data.departments || []
        );
    }
    catch (error)
    {
        /*
         * AbortError vznikne při zrušení staršího
         * požadavku a není to skutečná chyba.
         */
        if (error.name === "AbortError")
        {
            return;
        }

        console.error(
            "Nepodařilo se načíst oddělení:",
            error
        );

        results.innerHTML = `
            <div class="client-card-department-search-message">
                Oddělení se nepodařilo načíst.
            </div>
        `;

        results.classList.add("show");
    }
}

function renderDepartmentSearchResults(departments)
{
    const results = document.getElementById("client-card-row2-c3-searchC-results");

    if (!results)
    {
        return;
    }

    results.innerHTML = "";

    if (departments.length === 0)
    {
        results.innerHTML = `
            <div class="client-card-department-search-message">
                Nebylo nalezeno žádné oddělení.
            </div>
        `;

        results.classList.add("show");
        return;
    }

    departments.forEach(department =>
    {
        const button = document.createElement("button");

        button.type = "button";

        button.className ="client-card-department-search-option";

        button.dataset.departmentId =String(department.id);

        button.dataset.departmentName =department.name;

        button.textContent =department.name;

        results.appendChild(button);
    });

    results.classList.add("show");
}

document.addEventListener("click", function (event)
{
    const option = event.target.closest(".client-card-department-search-option");

    if (option)
    {
        const searchInput = document.getElementById("client-card-row2-c3-searchC-searchInput");

        const departmentIdInput = document.getElementById("client-card-row2-c3-searchC-departmentId");

        if (!searchInput || !departmentIdInput)
        {
            return;
        }

        const departmentId = option.dataset.departmentId;

        const departmentName = option.dataset.departmentName;

        /*
         * Do viditelného inputu vložíme název.
         */
        searchInput.value = departmentName;

        /*
         * Do skrytého inputu uložíme skutečné ID.
         */

        departmentIdInput.value = departmentId;

        document.getElementById("client-card-row2-c3-searchC-searchLabel")?.classList.add("hidden");

        closeDepartmentSearchResults();

        console.log( "Vybrané oddělení:",
            {
                id: departmentId,
                name: departmentName
            }
        );


        /* * * * * * * * * * * * * * * * * * * * *
        *   DRUHÝ KROK   loadDepartmentLocation  *
        * * * * * * * * * * * * * * * * * * * *  */

        loadDepartmentLocation(departmentId);

        return;
    }

    const searchContainer = document.getElementById("client-card-row2-c3-searchC");

    if (searchContainer && !searchContainer.contains(event.target))
    {
        closeDepartmentSearchResults();
    }
});

function closeDepartmentSearchResults()
{
    const results = document.getElementById("client-card-row2-c3-searchC-results");

    if (!results)
    {
        return;
    }

    results.classList.remove("show");
    results.innerHTML = "";
}

async function loadDepartmentLocation(departmentId)
{
    if (departmentLocationController)
    {
        departmentLocationController.abort();
    }

    departmentLocationController = new AbortController();

    try
    {
        const response = await fetch(
            `/administration/clients/api/department-location/${departmentId}`,
            {
                method: "GET",

                headers:
                {
                    "Accept": "application/json"
                },

                signal: departmentLocationController.signal
            }
        );

        if (!response.ok)
        {
            throw new Error(
                `Server odpověděl stavem ${response.status}`
            );
        }

        const data = await response.json();

        console.log( "Načtené umístění oddělení:" , "color: red; font-weight: bold;" , data);

        /* * * * * * * * * * * * * * * * * * * * * * * * *
        *    Krok číslo 3  - Funkce pro načtení dat      *
        * * * * * * * * * * * * * * * * * * * * * * * * */

        applyDepartmentLocationFromSearch(data);
    }
    catch (error)
    {
        if (error.name === "AbortError")
        {
            return;
        }

        console.error(
            "Nepodařilo se načíst umístění oddělení:",
            error
        );
    }
    finally
    {
        departmentLocationController = null;
    }
}

function applyDepartmentLocationFromSearch(data)
{
    /*
     * Data pocházejí z vyhledávání oddělení.
     */

    accommodationState.mode = "department-search";

    accommodationState.buildings =
        Array.isArray(data.buildings)
            ? data.buildings
            : [];

    accommodationState.floors =
        Array.isArray(data.floors)
            ? data.floors
            : [];

    /*
     * Oddělení ukládáme vždy jako pole.
     * Search vrací jedno konkrétní oddělení.
     */

    accommodationState.departments =
        data.department
            ? [data.department]
            : [];

    accommodationState.rooms =
        Array.isArray(data.rooms)
            ? data.rooms
            : [];

    // accommodationState.beds = [];

    accommodationState.beds =
    Array.isArray(data.beds)? data.beds: [];

    accommodationState.selectedDepartmentId =
        data.department?.id ?? null;

    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    /*
     * Pokud existuje pouze jedna budova nebo patro,
     * vybereme je automaticky.
     */

    accommodationState.selectedBuildingId =
        accommodationState.buildings.length === 1
            ? accommodationState.buildings[0].id
            : null;

    accommodationState.selectedFloorId =
        accommodationState.floors.length === 1
            ? accommodationState.floors[0].id
            : null;

    console.log(
        "%cAktuální accommodationState:",
        "color: green; font-weight: bold;",
        accommodationState
    );

    updateSelectBoxesFromAccommodationState();
    renderAccommodationResults();
}

/*
/        DNEŠNÍ VÝZVA
*/

function updateSelectBoxesFromAccommodationState()
{
    /* 23.7.2026 Dnes */
    // renderAccommodationBuildingMenu();


    /*
    /   24.7.2026 Dnes
    */

    renderAccommodationBuildingMenu();
    renderAccommodationFloorMenu();
    renderAccommodationDepartmentMenu();
    renderAccommodationRoomMenu();

    const buildingText = document.getElementById("SB1C-buildingText");

    const floorText = document.getElementById("SB2C-floorText");

    const departmentText = document.getElementById("SB3C-depText");

    const roomText = document.getElementById("SB4C-roomText");

    if (buildingText)
    {
        if (accommodationState.buildings.length === 1)
        {
            buildingText.textContent =
                accommodationState.buildings[0].name;
        }
        else
        {
            buildingText.textContent = "Vyberte budovu";
        }
    }

    if (floorText)
    {
        if (accommodationState.floors.length === 1)
        {
            floorText.textContent =
                accommodationState.floors[0].name;
        }
        else
        {
            floorText.textContent = "Vyberte patro";
        }
    }

    // if (departmentText)
    // {
    //     departmentText.textContent =
    //         accommodationState.department?.name
    //         || "Vyberte oddělení";
    // }


    if (departmentText)
    {
        if (accommodationState.departments.length === 1)
        {
            departmentText.textContent =
                accommodationState.departments[0].name;
        }
        else
        {
            departmentText.textContent =
                "Vyberte oddělení";
        }
    }


    if (roomText)
    {
        roomText.textContent = "Vyberte pokoj";
    }


    /*
     * Aktivace selectboxů po načtení oddělení.
     */

    setSelectDisabled(
        "client-card-row2-c3-SB2C",
        "SB2C-floorBtn",
        false
    );

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        false
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        false
    );
}

function resetAccommodationSelection()
{

    accommodationState.mode = null;

    accommodationState.buildings = [];
    accommodationState.floors = [];
    accommodationState.departments = [];
    accommodationState.rooms = [];
    accommodationState.beds = [];

    accommodationState.selectedBuildingId = null;
    accommodationState.selectedFloorId = null;
    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    const departmentIdInput = document.getElementById("client-card-row2-c3-searchC-departmentId");

    if (departmentIdInput)
    {
        departmentIdInput.value = "";
    }

    const buildingMenu = document.getElementById(
        "client-card-row2-c3-SB1C-menu"
    );

    if (buildingMenu && initialBuildingMenuHTML !== null)
    {
        buildingMenu.innerHTML = initialBuildingMenuHTML;
    }

    const buildingText =
        document.getElementById("SB1C-buildingText");

    const floorText =
        document.getElementById("SB2C-floorText");

    const departmentText =
        document.getElementById("SB3C-depText");

    const roomText =
        document.getElementById("SB4C-roomText");

    if (buildingText)
    {
        buildingText.textContent = "";
    }

    if (floorText)
    {
        floorText.textContent = "";
    }

    if (departmentText)
    {
        departmentText.textContent = "";
    }

    if (roomText)
    {
        roomText.textContent = "";
    }

    document
        .getElementById("client-card-row2-c3-SB1C-wrapper")
        ?.classList.remove("open");

    setSelectDisabled(
        "client-card-row2-c3-SB2C",
        "SB2C-floorBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );
}

/*
* AKTIVACE SELECTBOXŮ client-card-row2-c3-SB1C - client-card-row2-c3-SB4C
*/

function renderAccommodationBuildingMenu()
{

    const menu = document.getElementById("client-card-row2-c3-SB1C-menu");

    if (!menu)
    {
        console.warn("Menu budov SB1 nebylo nalezeno.");
        return;
    }

    /*
    * Původní menu uložíme pouze jednou,
    * ještě před jeho prvním přepsáním.
    */

    if (initialBuildingMenuHTML === null)
    {
        initialBuildingMenuHTML = menu.innerHTML;

        console.log(
            "Uloženo původní menu budov:",
            initialBuildingMenuHTML
        );
    }


    /*
     * Odstraníme původní obsah menu.
     */

    menu.innerHTML = "";

    /*
     * Vytvoříme položku pro každou budovu,
     * kterou vrátil endpoint department-location.
     */
    accommodationState.buildings.forEach(building =>
    {
        const option = document.createElement("button");
        option.type = "button";

        option.className = "client-card-row2-c3-SB1C-menu-options";

        option.dataset.value = String(building.id);
        option.textContent = building.name;

        menu.appendChild(option);
    });
}

/*
 *     TOTÁLNÍ NASAZENÍ DNE 24. 7. 2026
 */

function renderAccommodationMenu(menuId,options,optionClass)
{
    const menu = document.getElementById(menuId);

    if (!menu)
    {
        console.warn(`Menu ${menuId} nebylo nalezeno.`);
        return;
    }

    menu.innerHTML = "";

    options.forEach(item =>
    {
        const option = document.createElement("button");

        option.type = "button";
        option.className = optionClass;

        option.dataset.value = String(item.id);
        option.textContent = item.name;

        menu.appendChild(option);
    });
}

function renderAccommodationFloorMenu()
{
    renderAccommodationMenu(
        "client-card-row2-c3-SB2C-menu",
        accommodationState.floors,
        "client-card-row2-c3-SB2C-menu-options"
    );
}

function renderAccommodationDepartmentMenu()
{
    renderAccommodationMenu( "client-card-row2-c3-SB3C-menu", accommodationState.departments, "client-card-row2-c3-SB3C-menu-options");
}

function renderAccommodationRoomMenu()
{
    const selectedFloorId =
        accommodationState.selectedFloorId;

    let roomsToRender =
        selectedFloorId === null
            ? accommodationState.rooms
            : accommodationState.rooms.filter(room =>
                String(room.floor_id) ===
                String(selectedFloorId)
            );

    renderAccommodationMenu(
        "client-card-row2-c3-SB4C-menu",
        roomsToRender,
        "client-card-row2-c3-SB4C-menu-options"
    );
}


const accommodationSelectBoxes =
{
    SB1:
    {
        wrapperId: "client-card-row2-c3-SB1C-wrapper",
        buttonId: "SB1C-buildingBtn",
        optionClass: "client-card-row2-c3-SB1C-menu-options",
        textId: "SB1C-buildingText",
        inputId: "client-card-row2-c3-SB1C-filter",
        stateProperty: "selectedBuildingId"
    },

    SB2:
    {
        wrapperId: "client-card-row2-c3-SB2C-wrapper",
        buttonId: "SB2C-floorBtn",
        optionClass: "client-card-row2-c3-SB2C-menu-options",
        textId: "SB2C-floorText",
        inputId: "client-card-row2-c3-SB2C-filter",
        stateProperty: "selectedFloorId"
    },

    SB3:
    {
        wrapperId: "client-card-row2-c3-SB3C-wrapper",
        buttonId: "SB3C-depBtn",
        optionClass: "client-card-row2-c3-SB3C-menu-options",
        textId: "SB3C-depText",
        inputId: "client-card-row2-c3-SB3C-filter",
        stateProperty: "selectedDepartmentId"
    },

    SB4:
    {
        wrapperId: "client-card-row2-c3-SB4C-wrapper",
        buttonId: "SB4C-roomBtn",
        optionClass: "client-card-row2-c3-SB4C-menu-options",
        textId: "SB4C-roomText",
        inputId: "client-card-row2-c3-SB4C-filter",
        stateProperty: "selectedRoomId"
    }
};

document.addEventListener("click", function (event)
{
    for (const config of Object.values(accommodationSelectBoxes))
    {
        const wrapper = document.getElementById(
            config.wrapperId
        );

        if (!wrapper)
        {
            continue;
        }

        const button = event.target.closest(
            `#${config.buttonId}`
        );

        const option = event.target.closest(
            `.${config.optionClass}`
        );

        /*
         * Kliknutí na tlačítko SelectBoxu.
         */
        // if (button)
        // {
        //     if (button.disabled)
        //     {
        //         return;
        //     }

        //     const wasOpen =
        //         wrapper.classList.contains("open");

        //     /*
        //      * Nejprve zavřeme všechna menu.
        //      */
        //     closeAllAccommodationSelectBoxes();

        //     /*
        //      * Pokud kliknuté menu předtím nebylo otevřené,
        //      * otevřeme ho.
        //      */
        //     if (!wasOpen)
        //     {
        //         wrapper.classList.add("open");
        //     }

        //     return;
        // }


        if (button)
        {
            if (button.disabled)
            {
                return;
            }

            const wasOpen =
                wrapper.classList.contains("open");

            closeAllAccommodationSelectBoxes();

            if (!wasOpen)
            {
                wrapper.classList.add("open");
            }

            return;
        }


        if (option && wrapper.contains(option))
        {

            const value = option.dataset.value;
            const text = option.textContent.trim();

            /*
            * Uložení vybrané hodnoty do centrálního stavu.
            */
            accommodationState[config.stateProperty] = value;


            // if (config.stateProperty === "selectedBuildingId")
            // {
            //     handleAccommodationSelectChange(
            //         config.stateProperty
            //     );
            // }
            // else if (
            //     config.stateProperty === "selectedFloorId" &&
            //     accommodationState.mode === "location-select"
            // )
            // {
            //     handleAccommodationSelectChange(
            //         config.stateProperty
            //     );
            // }
            // else if (
            //     config.stateProperty === "selectedDepartmentId" &&
            //     accommodationState.mode === "location-select"
            // )
            // {
            //     handleAccommodationSelectChange(
            //         config.stateProperty
            //     );
            // }


            if (config.stateProperty === "selectedBuildingId")
            {
                handleAccommodationSelectChange(
                    config.stateProperty
                );
            }
            else if (
                config.stateProperty === "selectedFloorId" &&
                accommodationState.mode === "location-select"
            )
            {
                handleAccommodationSelectChange(
                    config.stateProperty
                );
            }
            // else if (
            //     config.stateProperty === "selectedDepartmentId" &&
            //     accommodationState.mode === "location-select"
            // )
            // {
            //     handleAccommodationSelectChange(
            //         config.stateProperty
            //     );
            // }

            else if (config.stateProperty === "selectedDepartmentId")
            {
                if (accommodationState.mode === "location-select")
                {
                    handleAccommodationSelectChange(
                        config.stateProperty
                    );
                }
                else if (accommodationState.mode === "department-search")
                {
                    handleDepartmentSearchSelectChange(value);
                }
            }

            else if (config.stateProperty === "selectedRoomId")
            {
                handleAccommodationRoomChange();
            }


            const textElement = document.getElementById(
                config.textId
            );

            const hiddenInput = document.getElementById(
                config.inputId
            );

            /*
            * Aktualizace textu a hidden inputu
            * právě vybraného SelectBoxu.
            */
            if (textElement)
            {
                textElement.textContent = text;
            }

            if (hiddenInput)
            {
                hiddenInput.value = value;
            }

            /*
            * Pokud uživatel vybral patro,
            * zrušíme starý pokoj a načteme pokoje
            * patřící pouze do vybraného patra.
            */

            if (config.stateProperty === "selectedFloorId")
            {
                accommodationState.selectedRoomId = null;

                const roomText = document.getElementById(
                    "SB4C-roomText"
                );

                const roomInput = document.getElementById(
                    "client-card-row2-c3-SB4C-filter"
                );

                if (roomText)
                {
                    roomText.textContent = "Vyberte pokoj";
                }

                if (roomInput)
                {
                    roomInput.value = "";
                }

                renderAccommodationRoomMenu();
            }

            wrapper.classList.remove("open");

            console.log(
                "Vybraná hodnota:",
                config.stateProperty,
                value,
                text
            );

            return;
        }

    }

    /*
     * Kliknutí mimo SelectBoxy.
     */

    const clickedInsideAccommodationSelectBox =
        event.target.closest(
            "#client-card-row2-c3-SB1C-wrapper, " +
            "#client-card-row2-c3-SB2C-wrapper, " +
            "#client-card-row2-c3-SB3C-wrapper, " +
            "#client-card-row2-c3-SB4C-wrapper"
        );

    if (!clickedInsideAccommodationSelectBox)
    {
        closeAllAccommodationSelectBoxes();
    }
});

function closeAllAccommodationSelectBoxes(exceptWrapperId = null)
{
    const wrapperIds =
    [
        "client-card-row2-c3-SB1C-wrapper",
        "client-card-row2-c3-SB2C-wrapper",
        "client-card-row2-c3-SB3C-wrapper",
        "client-card-row2-c3-SB4C-wrapper"
    ];

    wrapperIds.forEach(wrapperId =>
    {
        if (wrapperId === exceptWrapperId)
        {
            return;
        }

        document
            .getElementById(wrapperId)
            ?.classList.remove("open");
    });
}


/*
*      Reset Client´s form
*/

function resetClientCard()
{
    const form = document.getElementById("client-card-row2");

    /*
     * Reset běžných prvků formuláře:
     * inputy, radio buttony, checkboxy apod.
     */
    if (form)
    {
        form.reset();
    }

    /*
     * Reset celé části umístění:
     * budova, patro, oddělení, pokoj
     * a accommodationState.
     */

    resetAccommodationSelection();

    const selectedBedInput = document.getElementById("client-card-selected-bed-id");

    if (selectedBedInput)
    {
        selectedBedInput.value = "";
    }

    /*
     * Vyhledávání oddělení.
     */

    const departmentSearchInput = document.getElementById("client-card-row2-c3-searchC-searchInput");
    const departmentSearchLabel = document.getElementById("client-card-row2-c3-searchC-searchLabel");

    if (departmentSearchInput)
    {
        departmentSearchInput.value = "";
    }

    if (departmentSearchLabel)
    {
        departmentSearchLabel.classList.remove("hidden");
    }

    closeDepartmentSearchResults();

    /*
     * Zrušení případného čekajícího vyhledávání.
     */

    clearTimeout(departmentSearchTimeout);
    departmentSearchTimeout = null;

    if (departmentSearchController)
    {
        departmentSearchController.abort();
        departmentSearchController = null;
    }

    /*
     * Zrušení případného načítání umístění oddělení.
     */

    if (departmentLocationController)
    {
        departmentLocationController.abort();
        departmentLocationController = null;
    }

    /*
     * Vyčištění hidden inputů SelectBoxů.
     */

    Object.values(accommodationSelectBoxes).forEach(config =>
    {
        const hiddenInput = document.getElementById(
            config.inputId
        );

        if (hiddenInput)
        {
            hiddenInput.value = "";
        }
    });

    /*
     * Vyčištění menu pater, oddělení a pokojů.
     * Menu budov obnovuje resetAccommodationSelection().
     */

    const menusToClear =
    [
        "client-card-row2-c3-SB2C-menu",
        "client-card-row2-c3-SB3C-menu",
        "client-card-row2-c3-SB4C-menu"
    ];

    menusToClear.forEach(menuId =>
    {
        const menu = document.getElementById(menuId);

        if (menu)
        {
            menu.innerHTML = "";
        }
    });

    /*
     * Výchozí texty SelectBoxů.
     */

    const defaultTexts =
    {
        "SB1C-buildingText": "",
        "SB2C-floorText": "",
        "SB3C-depText": "",
        "SB4C-roomText": ""
    };

    Object.entries(defaultTexts).forEach(([elementId, text]) =>
    {
        const element = document.getElementById(elementId);

        if (element)
        {
            element.textContent = text;
        }
    });

    /*
     * Zavření všech otevřených SelectBoxů.
     */

    closeAllAccommodationSelectBoxes();

    /*
     * Scroll seznamu umístění vrátíme nahoru.
     */

    const accommodationContent = document.getElementById("client-card-row2-c4-accomC-c2-empC-c1");
    const accommodationThumb = document.getElementById("client-card-row2-c4-accomC-c2-empC-thumb");

    if (accommodationContent)
    {
        accommodationContent.scrollTop = 0;
    }

    if (accommodationThumb)
    {
        accommodationThumb.style.top = "0px";
    }

    clearAccommodationResults();
    resetClientPhoto();

}


/*
/       Definovámí režimů filtrování
/       27. 7. 2026
*/

function setAccommodationMode(newMode)
{
    /*
     * Pokud už je režim aktivní,
     * nic dalšího neděláme.
     */

    if (accommodationState.mode === newMode)
    {
        return;
    }

    /*
     * Přechod na vyhledávání oddělení.
     */

    if (newMode === "department-search")
    {
        resetLocationSelectMode();
    }

    /*
     * Přechod na ruční výběr umístění.
     */

    if (newMode === "location-select")
    {
        resetDepartmentSearchMode();
    }

    accommodationState.mode = newMode;

    console.log(
        "%cAktivní režim filtrace:",
        "color: blue; font-weight: bold;",
        newMode
    );
}

function resetDepartmentSearchMode()
{
    const searchInput = document.getElementById(
        "client-card-row2-c3-searchC-searchInput"
    );

    const searchLabel = document.getElementById(
        "client-card-row2-c3-searchC-searchLabel"
    );

    const departmentIdInput = document.getElementById(
        "client-card-row2-c3-searchC-departmentId"
    );

    if (searchInput)
    {
        searchInput.value = "";
    }

    if (searchLabel)
    {
        searchLabel.classList.remove("hidden");
    }

    if (departmentIdInput)
    {
        departmentIdInput.value = "";
    }

    clearTimeout(departmentSearchTimeout);
    departmentSearchTimeout = null;

    if (departmentSearchController)
    {
        departmentSearchController.abort();
        departmentSearchController = null;
    }

    if (departmentLocationController)
    {
        departmentLocationController.abort();
        departmentLocationController = null;
    }


    const buildingMenu = document.getElementById(
        "client-card-row2-c3-SB1C-menu"
    );

    if (
        buildingMenu &&
        initialBuildingMenuHTML !== null
    )
    {
        buildingMenu.innerHTML = initialBuildingMenuHTML;
    }

    /*
    * Vyčistíme data pocházející z hledaného oddělení.
    */

    accommodationState.buildings = [];
    accommodationState.floors = [];
    accommodationState.departments = [];
    accommodationState.rooms = [];
    accommodationState.beds = [];

    accommodationState.selectedBuildingId = null;
    accommodationState.selectedFloorId = null;
    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    /*
    * Vyčistíme SelectBoxy za budovou.
    */

    resetAccommodationSelectBox(
        "SB2C-floorText",
        "client-card-row2-c3-SB2C-filter",
        "Vyberte patro"
    );

    resetAccommodationSelectBox(
        "SB3C-depText",
        "client-card-row2-c3-SB3C-filter",
        "Vyberte oddělení"
    );

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        "Vyberte pokoj"
    );

    renderAccommodationFloorMenu();
    renderAccommodationDepartmentMenu();
    renderAccommodationRoomMenu();

    setSelectDisabled(
        "client-card-row2-c3-SB2C",
        "SB2C-floorBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );

    clearAccommodationResults();

    closeDepartmentSearchResults();
}

function resetLocationSelectMode()
{
    accommodationState.selectedBuildingId = null;
    accommodationState.selectedFloorId = null;
    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    Object.values(accommodationSelectBoxes).forEach(config =>
    {
        const hiddenInput = document.getElementById(
            config.inputId
        );

        if (hiddenInput)
        {
            hiddenInput.value = "";
        }
    });

    const defaultTexts =
    {
        "SB1C-buildingText": "",
        "SB2C-floorText": "",
        "SB3C-depText": "",
        "SB4C-roomText": ""
    };

    Object.entries(defaultTexts).forEach(([elementId, text]) =>
    {
        const element = document.getElementById(elementId);

        if (element)
        {
            element.textContent = text;
        }
    });

    closeAllAccommodationSelectBoxes();
}

function handleAccommodationSelectChange(changedProperty)
{
    console.log(
        "%cZměna SelectBoxu:",
        "color: darkorange; font-weight: bold;",
        changedProperty,
        accommodationState
    );

    if (accommodationState.mode !== "location-select")
    {
        return;
    }

    if (changedProperty === "selectedBuildingId")
    {
        handleAccommodationBuildingChange();
        return;
    }

    if (changedProperty === "selectedFloorId")
    {
        handleAccommodationFloorChange();
        return;
    }

    if (changedProperty === "selectedDepartmentId")
    {
        handleAccommodationDepartmentChange();
        return;
    }

    /*
     * Nově reagujeme také na výběr pokoje.
     */

    if (changedProperty === "selectedRoomId")
    {
        handleAccommodationRoomChange();
    }
}

/* SELECT BOXY LOGIKA */

function handleAccommodationBuildingChange()
{
    accommodationState.selectedFloorId = null;
    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    accommodationState.floors = [];
    accommodationState.departments = [];
    accommodationState.rooms = [];
    accommodationState.beds = [];

    resetAccommodationSelectBox(
        "SB2C-floorText",
        "client-card-row2-c3-SB2C-filter",
        "Vyberte patro"
    );

    resetAccommodationSelectBox(
        "SB3C-depText",
        "client-card-row2-c3-SB3C-filter",
        "Vyberte oddělení"
    );

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        "Vyberte pokoj"
    );

    /*
     * Vyprázdníme stará menu.
     */

    renderAccommodationFloorMenu();
    renderAccommodationDepartmentMenu();
    renderAccommodationRoomMenu();

    /*
     * Než server vrátí patra, necháme
     * všechny následující SelectBoxy zakázané.
     */

    setSelectDisabled(
        "client-card-row2-c3-SB2C",
        "SB2C-floorBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );

    clearAccommodationResults();

    loadFloorsForBuilding(
        accommodationState.selectedBuildingId
    );
}

async function loadFloorsForBuilding(buildingId)
{
    if (!buildingId)
    {
        console.warn("Nebyla vybrána žádná budova.");
        return;
    }

    /*
     * Pokud ještě běží starší požadavek,
     * zrušíme jej.
     */

    if (buildingFloorsController)
    {
        buildingFloorsController.abort();
    }

    buildingFloorsController = new AbortController();

    try
    {
        console.log(
            "%cNačítám patra budovy:",
            "color: blue; font-weight: bold;",
            buildingId
        );

        const response = await fetch(
            `/administration/clients/api/building-floors/${encodeURIComponent(buildingId)}`,
            {
                method: "GET",

                headers:
                {
                    "Accept": "application/json"
                },

                signal: buildingFloorsController.signal
            }
        );

        if (!response.ok)
        {
            throw new Error(
                `Server odpověděl stavem ${response.status}`
            );
        }

        const data = await response.json();

        accommodationState.floors =
            Array.isArray(data.floors)
                ? data.floors
                : [];

        renderAccommodationFloorMenu();

        /*
         * SB2 povolíme pouze tehdy,
         * pokud existuje alespoň jedno patro.
         */

        const hasFloors =
            accommodationState.floors.length > 0;

        setSelectDisabled(
            "client-card-row2-c3-SB2C",
            "SB2C-floorBtn",
            !hasFloors
        );

        console.log(
            "%cNačtená patra:",
            "color: green; font-weight: bold;",
            accommodationState.floors
        );
    }
    catch (error)
    {
        if (error.name === "AbortError")
        {
            return;
        }

        console.error(
            "Nepodařilo se načíst patra budovy:",
            error
        );

        accommodationState.floors = [];

        renderAccommodationFloorMenu();

        setSelectDisabled(
            "client-card-row2-c3-SB2C",
            "SB2C-floorBtn",
            true
        );
    }
    finally
    {
        buildingFloorsController = null;
    }
}

function resetAccommodationSelectBox(
    textElementId,
    hiddenInputId,
    defaultText
)
{
    const textElement = document.getElementById(
        textElementId
    );

    const hiddenInput = document.getElementById(
        hiddenInputId
    );

    if (textElement)
    {
        textElement.textContent = defaultText;
    }

    if (hiddenInput)
    {
        hiddenInput.value = "";
    }
}

function clearAccommodationResults()
{
    const container = document.getElementById(
        "client-card-row2-c4-accomC-c2-empC-c1"
    );

    if (!container)
    {
        return;
    }

    container.innerHTML = "";

    requestAnimationFrame(() =>
    {
        initAccommodationScrollbar();
    });
}

async function handleAccommodationFloorChange()
{
    const buildingId =
        accommodationState.selectedBuildingId;

    const floorId =
        accommodationState.selectedFloorId;

    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    accommodationState.departments = [];
    accommodationState.rooms = [];
    accommodationState.beds = [];

    resetAccommodationSelectBox(
        "SB3C-depText",
        "client-card-row2-c3-SB3C-filter",
        "Vyberte oddělení"
    );

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        "Vyberte pokoj"
    );

    renderAccommodationDepartmentMenu();
    renderAccommodationRoomMenu();

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );

    clearAccommodationResults();

    if (!buildingId || !floorId)
    {
        console.warn(
            "Chybí budova nebo patro:",
            {
                buildingId,
                floorId
            }
        );

        return;
    }

    await loadDepartmentsForLocation(
        buildingId,
        floorId
    );
}

async function loadDepartmentsForLocation(
    buildingId,
    floorId
)
{
    try
    {
        console.log(
            "%cNačítám oddělení pro umístění:",
            "color: blue; font-weight: bold;",
            {
                buildingId,
                floorId
            }
        );

        const response = await fetch(
            `/administration/clients/api/location-departments` +
            `?building_id=${encodeURIComponent(buildingId)}` +
            `&floor_id=${encodeURIComponent(floorId)}`,
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

        console.log(
            "%cServer vrátil oddělení:",
            "color: green; font-weight: bold;",
            data
        );

        accommodationState.departments =
            Array.isArray(data.departments)
                ? data.departments
                : [];

        renderAccommodationDepartmentMenu();

        const hasDepartments =
            accommodationState.departments.length > 0;

        setSelectDisabled(
            "client-card-row2-c3-SB3C",
            "SB3C-depBtn",
            !hasDepartments
        );

        setSelectDisabled(
            "client-card-row2-c3-SB4C",
            "SB4C-roomBtn",
            true
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se načíst oddělení:",
            error
        );

        accommodationState.departments = [];

        renderAccommodationDepartmentMenu();

        setSelectDisabled(
            "client-card-row2-c3-SB3C",
            "SB3C-depBtn",
            true
        );
    }
}

async function loadDepartmentsForLocation(buildingId, floorId)
{
    try
    {
        console.log(
            "%cNačítám oddělení:",
            "color: blue; font-weight: bold;",
            {
                buildingId: buildingId,
                floorId: floorId
            }
        );

        const response = await fetch(
            `/administration/clients/api/location-departments` +
            `?building_id=${encodeURIComponent(buildingId)}` +
            `&floor_id=${encodeURIComponent(floorId)}`,
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

        accommodationState.departments =
            Array.isArray(data.departments)
                ? data.departments
                : [];

        renderAccommodationDepartmentMenu();

        const hasDepartments =
            accommodationState.departments.length > 0;

        setSelectDisabled(
            "client-card-row2-c3-SB3C",
            "SB3C-depBtn",
            !hasDepartments
        );

        console.log(
            "%cNačtená oddělení:",
            "color: green; font-weight: bold;",
            accommodationState.departments
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se načíst oddělení:",
            error
        );

        accommodationState.departments = [];

        renderAccommodationDepartmentMenu();

        setSelectDisabled(
            "client-card-row2-c3-SB3C",
            "SB3C-depBtn",
            true
        );
    }
}

async function handleAccommodationDepartmentChange()
{
    const buildingId =
        accommodationState.selectedBuildingId;

    const floorId =
        accommodationState.selectedFloorId;

    const departmentId =
        accommodationState.selectedDepartmentId;

    /*
     * Při změně oddělení rušíme starý pokoj
     * a případně vybranou postel.
     */

    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    accommodationState.rooms = [];
    accommodationState.beds = [];

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        "Vyberte pokoj"
    );

    renderAccommodationRoomMenu();

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );

    clearAccommodationResults();

    if (!buildingId || !floorId || !departmentId)
    {
        console.warn(
            "Pro načtení pokojů chybí některé ID:",
            {
                buildingId,
                floorId,
                departmentId
            }
        );

        return;
    }

    await loadRoomsForLocation(
        buildingId,
        floorId,
        departmentId
    );

     await loadBedsForDepartment(
        departmentId
    );

    renderAccommodationResults();
}

async function loadRoomsForLocation(
    buildingId,
    floorId,
    departmentId
)
{
    try
    {
        console.log(
            "%cNačítám pokoje:",
            "color: blue; font-weight: bold;",
            {
                buildingId,
                floorId,
                departmentId
            }
        );

        const response = await fetch(
            `/administration/clients/api/location-rooms` +
            `?building_id=${encodeURIComponent(buildingId)}` +
            `&floor_id=${encodeURIComponent(floorId)}` +
            `&department_id=${encodeURIComponent(departmentId)}`,
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

        accommodationState.rooms =
            Array.isArray(data.rooms)
                ? data.rooms
                : [];

        renderAccommodationRoomMenu();

        const hasRooms =
            accommodationState.rooms.length > 0;

        setSelectDisabled(
            "client-card-row2-c3-SB4C",
            "SB4C-roomBtn",
            !hasRooms
        );

        console.log(
            "%cNačtené pokoje:",
            "color: green; font-weight: bold;",
            accommodationState.rooms
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se načíst pokoje:",
            error
        );

        accommodationState.rooms = [];

        renderAccommodationRoomMenu();

        setSelectDisabled(
            "client-card-row2-c3-SB4C",
            "SB4C-roomBtn",
            true
        );
    }
}

async function handleAccommodationRoomChange()
{
    accommodationState.selectedBedId = null;

    clearAccommodationResults();

    const roomId = accommodationState.selectedRoomId;

    if (!roomId)
    {
        return;
    }

    console.log(
        "%cNačítám a vykresluji pokoj:",
        "color: green; font-weight: bold;",
        roomId
    );

    await loadBedsForRoom(roomId);
}

async function loadBedsForDepartment(departmentId)
{
    if (!departmentId)
    {
        accommodationState.beds = [];
        return;
    }

    try
    {
        console.log(
            "%cNačítám postele oddělení:",
            "color: blue; font-weight: bold;",
            departmentId
        );

        const response = await fetch(
            `/administration/clients/api/department-location/${encodeURIComponent(departmentId)}`,
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

        accommodationState.beds =
            Array.isArray(data.beds)
                ? data.beds
                : [];

        console.log(
            "%cNačtené postele oddělení:",
            "color: green; font-weight: bold;",
            accommodationState.beds
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se načíst postele oddělení:",
            error
        );

        accommodationState.beds = [];
    }
}

async function loadBedsForRoom(roomId)
{
    if (!roomId)
    {
        accommodationState.beds = [];
        return;
    }

    try
    {
        console.log(
            "%cNačítám postele pokoje:",
            "color: blue; font-weight: bold;",
            roomId
        );

        const response = await fetch(
            `/administration/clients/api/location-beds/${encodeURIComponent(roomId)}`,
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

        accommodationState.beds =
            Array.isArray(data.beds)
                ? data.beds
                : [];

        console.log(
            "%cNačtené postele:",
            "color: green; font-weight: bold;",
            accommodationState.beds
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se načíst postele pokoje:",
            error
        );

        accommodationState.beds = [];
    }

    renderAccommodationResults();
}

function renderBed(bed, parentElement)
{
    /*
     * Sem zatím přesuneme celý blok,
     * který dnes vykresluje jednu postel
     * nebo jednoho pacienta.
     */

    if (bed.patient)
    {
        const patientElement = document.createElement("p");

        patientElement.className = "client-card-row2-c4-accomC-occup_patient";

        /*
            * Číslo postele.
            */

        const patientBedNumber = document.createElement("span");

        patientBedNumber.className = "client-card-row2-c4-accomC-occup_patient_id";

        patientBedNumber.textContent = bed.number;

        /*
            * Jméno klienta.
            */

        const patientName = document.createElement("span");

        patientName.className = "client-card-row2-c4-accomC-occup_patient_name";

        patientName.textContent = `${bed.patient.surname ?? ""} ${bed.patient.name ?? ""}`.trim();


        /*
            * Data můžeme uložit také do datasetu.
            */

        patientElement.dataset.bedId = String(bed.id);

        patientElement.dataset.patientId = String(bed.patient.id);


        patientElement.appendChild(patientBedNumber);

        patientElement.appendChild(patientName);

        parentElement.appendChild(patientElement);

        return;
    }


    /*
        * VOLNÁ POSTEL
        */

    const bedElement = document.createElement("p");

    bedElement.className = "client-card-row2-c4-accomC-occup_bed";

    const bedButton = document.createElement("button");

    bedButton.type = "button";

    bedButton.className = "client-card-row2-c4-accomC-occup_btn";

    bedButton.dataset.bedId = String(bed.id);

    bedButton.dataset.roomId = String(bed.room_id);

    bedButton.dataset.bedNumber = String(bed.number);

    /*
        * Obnovení označené postele
        * po novém vykreslení.
        */

    const isSelected = String(accommodationState.selectedBedId) === String(bed.id);

    bedButton.classList.toggle("selected",isSelected);


    /*
        * Číslo postele.
        */

    const bedIdElement = document.createElement("span");

    bedIdElement.className = "client-card-row2-c4-accomC-occup_bed_id";

    bedIdElement.textContent = bed.number;


    /*
        * Kontejner SVG ikony.
        */

    const bedIconElement = document.createElement("span");

    bedIconElement.className = "client-card-row2-c4-accomC-occup_img_C";

    bedIconElement.innerHTML = `
        <svg
            viewBox="3 7 18 11"
            class="client-card-row2-c4-accomC-occup_img"
        >

            <defs>
                <style>
                .client-card-row2-c4-accomC-occup_img-b-cls-1 {
                    fill: currentColor;
                }
                </style>
            </defs>



            <path
                class="client-card-row2-c4-accomC-occup_img-b-cls-1"
                d="M19.73,10.27c-.37,0-.67.3-.67.67v1.91H4.84v-5.03c0-.37-.3-.67-.67-.67h0c-.37,0-.67.3-.67.67v9.25c0,.07.06.13.13.13h1.08c.07,0,.13-.06.13-.13v-1.5h14.22v1.5c0,.07.06.13.13.13h1.08c.07,0,.13-.06.13-.13v-6.13c0-.37-.3-.67-.67-.67Z"
            />

            <path
                class="client-card-row2-c4-accomC-occup_img-b-cls-1"
                d="M8.64,12.16h9.64c.07,0,.13-.06.13-.13v-1.64c0-.37-.3-.67-.67-.67h-8.56c-.37,0-.67.3-.67.67v1.64c0,.07.06.13.13.13Z"
            />

            <circle
                class="client-card-row2-c4-accomC-occup_img-b-cls-1"
                cx="6.63"
                cy="10.82"
                r="1.34"
            />
        </svg>
    `;

    bedButton.appendChild(bedIdElement);

    bedButton.appendChild(bedIconElement);

    bedElement.appendChild(bedButton);

    parentElement.appendChild(bedElement);

}

function renderAccommodationResults()
{
    const container = document.getElementById("client-card-row2-c4-accomC-c2-empC-c1");

    if (!container)
    {
        return;
    }

    container.className = "client-card-row2-c4-accomC-c2-empC-c1";

    /*
     * Odstraníme předchozí dynamický obsah
     * i původní testovací data.
     */

    container.innerHTML = "";

    const selectedRoomId = accommodationState.selectedRoomId;

    /*
     * Pokud není vybraný konkrétní pokoj,
     * zobrazíme všechny pokoje.
     *
     * Pokud pokoj vybraný je,
     * zobrazíme pouze tento pokoj.
     */

    // const roomsToRender = selectedRoomId ? accommodationState.rooms.filter(room => String(room.id) === String(selectedRoomId)) : accommodationState.rooms;

    let roomsToRender =
    selectedRoomId
        ? accommodationState.rooms.filter(room =>
            String(room.id) === String(selectedRoomId)
        )
        : accommodationState.rooms;

    if (accommodationState.onlyFreeBeds)
    {
        roomsToRender = roomsToRender.filter(room =>
            accommodationState.beds.some(bed =>
                String(bed.room_id) === String(room.id) &&
                !bed.patient
            )
        );
    }

    // if (roomsToRender.length === 0)
    // {
    //     container.innerHTML = `
    //         <div class="client-card-department-search-message">
    //             Nebyly nalezeny žádné pokoje.
    //         </div>
    //     `;

    //     requestAnimationFrame(initAccommodationScrollbar);

    //     return;
    // }


    if (roomsToRender.length === 0)
    {
        container.innerHTML = `
            <div class="client-card-department-search-message">
                ${
                    accommodationState.onlyFreeBeds
                        ? "Nebyly nalezeny žádné volné postele."
                        : "Nebyly nalezeny žádné pokoje."
                }
            </div>
        `;

        requestAnimationFrame(initAccommodationScrollbar);

        return;
    }


    roomsToRender.forEach(room =>
    {
        /*
         * Všechny postele patřící do aktuálního pokoje.
         */

        // const roomBeds = accommodationState.beds.filter(bed => String(bed.room_id) === String(room.id));

        let roomBeds = accommodationState.beds.filter(bed => String(bed.room_id) === String(room.id));

        /*
        * Pokud je checkbox zatržený,
        * ponecháme jen postele bez klienta.
        */

        if (accommodationState.onlyFreeBeds)
        {
            roomBeds = roomBeds.filter(
                bed => !bed.patient
            );
        }

        const groupedBeds = groupBedsBySubrooms(roomBeds);

        console.log(
            "%cRozdělené postele:",
            "color: blue; font-weight:bold;",
            groupedBeds
        );

        console.log(
            "%cPostele pokoje:",
            "color: purple; font-weight: bold;",
            room.id,
            roomBeds
        );

        /*
         * Celý řádek pokoje.
         */

        const roomRow = document.createElement("div");

        roomRow.className = "client-card-row2-c4-accomC-occup_row";

        /*
         * Název pokoje.
         */

        const roomTitle = document.createElement("div");

        roomTitle.className = "client-card-row2-c4-accomC-occup_room";

        roomTitle.textContent =  `${room.number}\u00A0${room.name}`;

        /*
         * Seznam obsazených a volných postelí.
         */

        const bedList = document.createElement("div");

        bedList.className = "client-card-row2-c4-accomC-occup_list";

        if (roomBeds.length === 0)
        {
            const emptyMessage = document.createElement("div");

            emptyMessage.className = "client-card-department-search-message";

            emptyMessage.textContent = "V tomto pokoji nejsou žádné postele.";

            bedList.appendChild(emptyMessage);
        }
        else
        {
            groupedBeds.roomBeds.forEach(bed =>
            {
                renderBed(bed,bedList);
            });

            groupedBeds.subrooms.forEach(subroom =>
            {
                const subroomContainer = document.createElement("div");

                subroomContainer.className = "client-card-row2-c4-accomC-occup_subroom";

                const subroomTitle = document.createElement("div");

                subroomTitle.className = "client-card-row2-c4-accomC-occup_subroom_title";

                subroomTitle.textContent = subroom.name ?? `Box ${subroom.number}`;

                const subroomBeds = document.createElement("div");

                subroomBeds.className = "client-card-row2-c4-accomC-occup_subroom_beds";

                subroom.beds.forEach(bed =>
                {
                    renderBed(bed, subroomBeds);
                });

                subroomContainer.appendChild(subroomTitle);
                subroomContainer.appendChild(subroomBeds);

                bedList.appendChild(subroomContainer);
            });
        }

        roomRow.appendChild(roomTitle);

        roomRow.appendChild(bedList);

        container.appendChild(roomRow);
    });

    /*
     * Po vykreslení přepočítáme scrollbar.
     */

    requestAnimationFrame(() =>
    {
        initAccommodationScrollbar();
    });
}

// document.addEventListener("click", function (event)
// {

//         const bedButton = event.target.closest(
//             ".client-card-row2-c4-accomC-occup_btn"
//         );

//         if (!bedButton)
//         {
//             return;
//         }

//         /*
//             * Obsazené tlačítko je disabled,
//             * ale kontrolu provedeme i zde.
//             */

//         if (bedButton.disabled)
//         {
//             return;
//         }

//         const bedId =
//             bedButton.dataset.bedId;

//         if (!bedId)
//         {
//             console.warn(
//                 "Kliknutá postel nemá data-bed-id."
//             );

//             return;
//         }


//         /*
//         * Uložení vybrané postele
//         * do aplikačního stavu.
//         */

//         accommodationState.selectedBedId =
//             bedId;


//         /*
//             * Uložení BedID do formuláře.
//             */

//         const hiddenInput =
//             document.getElementById(
//                 "client-card-selected-bed-id"
//             );

//         if (hiddenInput)
//         {
//             hiddenInput.value = bedId;
//         }


//         /*
//             * Odebrání označení ze staré postele.
//             */

//         document.querySelectorAll(
//             ".client-card-row2-c4-accomC-occup_btn.selected"
//         ).forEach(button =>
//         {
//             button.classList.remove("selected");
//         });


//         /*
//             * Označení nové postele.
//             */

//         bedButton.classList.add("selected");


//         console.log(
//             "%cVybraná postel:",
//             "color: green; font-weight: bold;",
//             {
//                 bedId:
//                     accommodationState.selectedBedId,

//                 roomId:
//                     bedButton.dataset.roomId,

//                 bedNumber:
//                     bedButton.dataset.bedNumber
//             }
//         );
//     }
// );


function groupBedsBySubrooms(roomBeds)
{
    const result =
    {
        roomBeds: [],
        subrooms: []
    };

    const subrooms = new Map();

    roomBeds.forEach(bed =>
    {
        /*
         * Postel je přímo v pokoji.
         */

        if (bed.subroom_id == null)
        {
            result.roomBeds.push(bed);
            return;
        }

        /*
         * Pokud Box ještě neexistuje,
         * vytvoříme ho.
         */

        if (!subrooms.has(bed.subroom_id))
        {
            subrooms.set(bed.subroom_id,
            {
                id: bed.subroom_id,
                name: bed.subroom_name,
                number: bed.subroom_number,
                beds: []
            });
        }

        subrooms.get(bed.subroom_id).beds.push(bed);
    });

    result.subrooms = [...subrooms.values()];

    return result;
}

function switchToLocationSelectMode()
{
    /*
     * Zrušení probíhajících search požadavků.
     */

    clearTimeout(departmentSearchTimeout);
    departmentSearchTimeout = null;

    if (departmentSearchController)
    {
        departmentSearchController.abort();
        departmentSearchController = null;
    }

    if (departmentLocationController)
    {
        departmentLocationController.abort();
        departmentLocationController = null;
    }

    closeDepartmentSearchResults();

    /*
     * Vyčištění search ID.
     */

    const departmentIdInput = document.getElementById(
        "client-card-row2-c3-searchC-departmentId"
    );

    if (departmentIdInput)
    {
        departmentIdInput.value = "";
    }

    // const searchLabel = document.getElementById(
    //     "client-card-row2-c3-searchC-searchLabel"
    // );

    // if (searchLabel)
    // {
    //     searchLabel.classList.remove("hidden");
    // }


    const searchInput = document.getElementById("client-card-row2-c3-searchC-searchInput");

    const searchLabel = document.getElementById("client-card-row2-c3-searchC-searchLabel");

    if (searchLabel && searchInput)
    {
        /*
        * Pokud je input stále aktivní, například po kliknutí
        * na křížek type="search", label musí zůstat skrytý.
        */
        searchLabel.classList.toggle("hidden",document.activeElement === searchInput);
    }


    /*
     * Obnovení původní nabídky všech budov.
     */

    const buildingMenu = document.getElementById(
        "client-card-row2-c3-SB1C-menu"
    );

    if (
        buildingMenu &&
        initialBuildingMenuHTML !== null
    )
    {
        buildingMenu.innerHTML = initialBuildingMenuHTML;
    }

    /*
     * Přechod do ručního režimu.
     */

    accommodationState.mode = "location-select";

    accommodationState.buildings = [];
    accommodationState.floors = [];
    accommodationState.departments = [];
    accommodationState.rooms = [];
    accommodationState.beds = [];

    accommodationState.selectedBuildingId = null;
    accommodationState.selectedFloorId = null;
    accommodationState.selectedDepartmentId = null;
    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    /*
     * Vyčištění všech hidden inputů SelectBoxů.
     */

    Object.values(accommodationSelectBoxes).forEach(config =>
    {
        const hiddenInput = document.getElementById(
            config.inputId
        );

        if (hiddenInput)
        {
            hiddenInput.value = "";
        }
    });

    /*
     * Výchozí texty SelectBoxů.
     */

    resetAccommodationSelectBox(
        "SB1C-buildingText",
        "client-card-row2-c3-SB1C-filter",
        ""
    );

    resetAccommodationSelectBox(
        "SB2C-floorText",
        "client-card-row2-c3-SB2C-filter",
        ""
    );

    resetAccommodationSelectBox(
        "SB3C-depText",
        "client-card-row2-c3-SB3C-filter",
        ""
    );

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        ""
    );

    /*
     * Vyčištění menu za budovou.
     */

    renderAccommodationFloorMenu();
    renderAccommodationDepartmentMenu();
    renderAccommodationRoomMenu();

    /*
     * Povolená je jen budova.
     */

    setSelectDisabled(
        "client-card-row2-c3-SB2C",
        "SB2C-floorBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB3C",
        "SB3C-depBtn",
        true
    );

    setSelectDisabled(
        "client-card-row2-c3-SB4C",
        "SB4C-roomBtn",
        true
    );

    clearAccommodationResults();
    closeAllAccommodationSelectBoxes();

    console.log(
        "%cSearch byl vymazán – aktivní ruční výběr.",
        "color: blue; font-weight: bold;",
        accommodationState
    );
}

async function handleDepartmentSearchSelectChange(departmentId)
{
    /*
     * Po opětovném výběru oddělení rušíme
     * dříve vybraný konkrétní pokoj.
     */

    accommodationState.selectedRoomId = null;
    accommodationState.selectedBedId = null;

    resetAccommodationSelectBox(
        "SB4C-roomText",
        "client-card-row2-c3-SB4C-filter",
        "Vyberte pokoj"
    );

    /*
     * Znovu načteme celé oddělení:
     * všechny budovy, patra, pokoje a postele.
     */

    await loadDepartmentLocation(departmentId);
}

/*
*       OBRÁZEK
*/


document.addEventListener("click", function (event)
{
    const photoContainer = event.target.closest("#client-card-row2-c1-imgC");

    if (!photoContainer)
    {
        return;
    }

    const photoInput = document.getElementById("client-card-photo-input");

    photoInput?.click();
});


/*
*           NÁHLED FOTOGRAFIE
*/

document.addEventListener("change", function (event)
{
    if (event.target.id !== "client-card-photo-input")
    {
        return;
    }

    const file = event.target.files?.[0];

    if (!file)
    {
        return;
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type))
    {
        alert("Vyber fotografii JPG, PNG nebo WEBP.");

        event.target.value = "";

        return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize)
    {
        alert("Fotografie může mít maximálně 5 MB.");

        event.target.value = "";

        return;
    }

    const preview = document.getElementById("client-card-photo-preview");

    const personIcon = document.getElementById("client-card-row2-c1-imgC-img1");

    const plusIcon = document.getElementById("client-card-row2-c1-imgC-img2");

    if (!preview)
    {
        return;
    }

    preview.src = URL.createObjectURL(file);
    preview.hidden = false;

    if (personIcon)
    {
        personIcon.style.display = "none";
    }

    if (plusIcon)
    {
        plusIcon.style.display = "none";
    }
});


function resetClientPhoto()
{
    const input = document.getElementById("client-card-photo-input");
    const preview = document.getElementById("client-card-photo-preview");
    const icon = document.getElementById("client-card-row2-c1-imgC-img1");

    if (input)
    {
        input.value = "";
    }

    if (preview)
    {
        preview.removeAttribute("src");
        preview.hidden = true;
    }

    if (icon)
    {
        icon.hidden = false;
    }
}

/*
*       ZRUŠENÍ VÝBĚRU POSTELE
*/

document.addEventListener("click", function (event)
{
    const bedButton = event.target.closest(
        ".client-card-row2-c4-accomC-occup_btn"
    );

    if (!bedButton)
    {
        return;
    }

    const bedId = bedButton.dataset.bedId;

    if (!bedId)
    {
        return;
    }

    const hiddenInput = document.getElementById(
        "client-card-selected-bed-id"
    );

    const isAlreadySelected =
        String(accommodationState.selectedBedId) ===
        String(bedId);

    /*
     * Druhé kliknutí na stejnou postel.
     */
    if (isAlreadySelected)
    {
        bedButton.classList.remove("selected");

        accommodationState.selectedBedId = null;

        if (hiddenInput)
        {
            hiddenInput.value = "";
        }

        console.log(
            "%cPostel byla odznačena.",
            "color: orange; font-weight: bold;"
        );

        return;
    }

    /*
     * Odznačení předchozí postele.
     */
    document.querySelectorAll(
        ".client-card-row2-c4-accomC-occup_btn.selected"
    ).forEach(button =>
    {
        button.classList.remove("selected");
    });

    /*
     * Označení nové postele.
     */
    bedButton.classList.add("selected");

    accommodationState.selectedBedId = bedId;

    if (hiddenInput)
    {
        hiddenInput.value = bedId;
    }

    console.log(
        "%cVybraná postel:",
        "color: green; font-weight: bold;",
        {
            bedId: bedId,
            roomId: bedButton.dataset.roomId,
            bedNumber: bedButton.dataset.bedNumber
        }
    );
});


/*
*    mainC-layer
*/

function openClientCard()
{
    document.getElementById("client-card-row2").style.display = "flex";
    document.getElementById("mainC-layer").style.display = "block";
}

function closeClientCard()
{
    document.getElementById("client-card-row2").style.display = "none";
    document.getElementById("mainC-layer").style.display = "none";
}