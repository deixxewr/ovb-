// js/render.js



function createDishCard(dish) {

    const card = document.createElement("div");

    card.className = "dish-card";

    card.dataset.dish = dish.keyword;

    card.dataset.category = dish.category;

    card.dataset.kind = dish.kind;



    const formattedPrice = typeof dish.price === 'number' 
        ? dish.price.toLocaleString('ru-RU') 
        : dish.price;

    card.innerHTML = `

        <img src="${dish.image}" alt="${dish.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400/CCCCCC/666666?text=${encodeURIComponent(dish.name)}';">

        <p class="dish-price">${formattedPrice} ₽</p>

        <p class="dish-name">${dish.name}</p>

        <p class="dish-count">${dish.count}</p>

        <button type="button" class="dish-add-btn">Добавить</button>

    `;



    return card;

}



function renderCategory(category) {

    const container = document.querySelector(`.dishes-grid[data-dishes-list="${category}"]`);

    if (!container) {

        console.warn(`Контейнер для категории ${category} не найден`);

        return;

    }



    const dishes = TOURS

        .filter(d => d.category === category)

        .sort((a, b) => a.name.localeCompare(b.name, "ru"));



    console.log(`Категория ${category}: найдено ${dishes.length} туров`);



    container.innerHTML = "";

    dishes.forEach(dish => {

        const card = createDishCard(dish);

        container.appendChild(card);

    });

}



async function initMenuPage() {

    await loadDishes();

    console.log(`Загружено туров: ${TOURS.length}`);

    console.log("Туры:", TOURS);

    ["main", "starter", "drink", "dessert"].forEach(renderCategory);

    // Добавляем обработчики один раз после отрисовки всех категорий
    attachAddButtonsHandlers();

    restoreSelectionFromStorage();

    updateOrderUI();

}



document.addEventListener("DOMContentLoaded", () => {

    if (document.querySelector(".dishes-grid")) {

        initMenuPage();

    }

});

