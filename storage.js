// js/storage.js



const STORAGE_KEY = "polytech_travel_selected_tours";



function getStoredSelection() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) return [];

        return JSON.parse(raw);

    } catch {

        return [];

    }

}



function saveSelection(keywords) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));

}

