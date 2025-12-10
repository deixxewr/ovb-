// js/order.js

// Функция для восстановления выбранных туров из localStorage
function restoreSelectionFromStorage() {
    const selected = getStoredSelection();
    selected.forEach(keyword => {
        const card = document.querySelector(`[data-dish="${keyword}"]`);
        if (card) {
            card.classList.add('selected');
        }
    });
}

// Функция для добавления тура в заказ
function addToOrder(keyword) {
    const selected = getStoredSelection();
    const tour = TOURS.find(t => t.keyword === keyword);
    
    if (!tour) return;
    
    // Удаляем другие туры из той же категории
    const filtered = selected.filter(k => {
        const t = TOURS.find(tour => tour.keyword === k);
        return t && t.category !== tour.category;
    });
    
    // Добавляем новый тур
    filtered.push(keyword);
    saveSelection(filtered);
    
    // Обновляем UI
    updateOrderUI();
    restoreSelectionFromStorage();
}

// Функция для удаления тура из заказа
function removeFromOrder(keyword) {
    const selected = getStoredSelection();
    const filtered = selected.filter(k => k !== keyword);
    saveSelection(filtered);
    
    // Убираем выделение с карточки
    const card = document.querySelector(`[data-dish="${keyword}"]`);
    if (card) {
        card.classList.remove('selected');
    }
    
    // Обновляем UI
    updateOrderUI();
    restoreSelectionFromStorage();
}

// Функция для обновления UI заказа
function updateOrderUI() {
    const selected = getStoredSelection();
    
    // Обновляем панель заказа
    const orderCategories = {
        soup: document.getElementById('order-soup'),
        main: document.getElementById('order-main'),
        starter: document.getElementById('order-starter'),
        drink: document.getElementById('order-drink'),
        dessert: document.getElementById('order-dessert')
    };
    
    const categoryElements = {
        soup: document.querySelector('[data-order-category="soup"]'),
        main: document.querySelector('[data-order-category="main"]'),
        starter: document.querySelector('[data-order-category="starter"]'),
        drink: document.querySelector('[data-order-category="drink"]'),
        dessert: document.querySelector('[data-order-category="dessert"]')
    };
    
    let total = 0;
    
    // Очищаем все списки заказов
    Object.values(orderCategories).forEach(list => {
        if (list) list.innerHTML = '';
    });
    
    // Скрываем все категории
    Object.values(categoryElements).forEach(el => {
        if (el) el.classList.remove('active');
    });
    
    // Показываем выбранные туры
    selected.forEach(keyword => {
        const tour = TOURS.find(t => t.keyword === keyword);
        if (!tour) return;
        
        const list = orderCategories[tour.category];
        const categoryEl = categoryElements[tour.category];
        
        if (list && categoryEl) {
            const li = document.createElement('li');
            li.dataset.keyword = keyword;
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${tour.name} - ${tour.price.toLocaleString('ru-RU')} ₽`;
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'order-remove-btn';
            removeBtn.textContent = '×';
            removeBtn.title = 'Удалить';
            removeBtn.onclick = () => {
                removeFromOrder(keyword);
            };
            
            li.appendChild(nameSpan);
            li.appendChild(removeBtn);
            list.appendChild(li);
            categoryEl.classList.add('active');
            total += tour.price;
        }
    });
    
    // Обновляем итоговую стоимость
    const totalBlock = document.getElementById('order-total-block');
    const totalEl = document.getElementById('order-total');
    
    if (totalEl) {
        totalEl.textContent = total.toLocaleString('ru-RU');
    }
    
    if (totalBlock) {
        if (total > 0) {
            totalBlock.classList.add('active');
        } else {
            totalBlock.classList.remove('active');
        }
    }
    
    // Обновляем sticky панель
    const stickyCheckout = document.getElementById('sticky-checkout');
    const stickyTotal = document.getElementById('sticky-total');
    const checkoutLink = document.getElementById('checkout-link');
    
    if (stickyCheckout && stickyTotal) {
        if (selected.length > 0) {
            stickyCheckout.style.display = 'block';
            stickyTotal.textContent = total.toLocaleString('ru-RU');
            
            // Проверяем валидность заказа
            const isValid = checkCombo(selected.map(k => TOURS.find(t => t.keyword === k)).filter(Boolean));
            if (checkoutLink) {
                if (isValid) {
                    checkoutLink.removeAttribute('aria-disabled');
                    checkoutLink.style.pointerEvents = 'auto';
                    checkoutLink.style.opacity = '1';
                } else {
                    checkoutLink.setAttribute('aria-disabled', 'true');
                    checkoutLink.style.pointerEvents = 'none';
                    checkoutLink.style.opacity = '0.5';
                }
            }
        } else {
            stickyCheckout.style.display = 'none';
        }
    }
    
    // Скрываем/показываем текст "Ничего не выбрано"
    const emptyText = document.getElementById('order-empty-text');
    if (emptyText) {
        if (selected.length === 0) {
            emptyText.style.display = 'block';
        } else {
            emptyText.style.display = 'none';
        }
    }
}

// Функция для проверки комбо
function checkCombo(dishes) {
    if (!dishes || dishes.length === 0) return false;
    
    const hasMain = dishes.some(d => d.category === "main");
    const hasDrink = dishes.some(d => d.category === "drink");
    
    // Минимальное комбо: основной тур + транспорт
    return hasMain && hasDrink;
}

// Флаг для отслеживания, добавлен ли обработчик делегирования
let addButtonsHandlerAttached = false;

// Функция для привязки обработчиков кнопок "Добавить"
function attachAddButtonsHandlers() {
    // Используем делегирование событий для всех кнопок
    if (!addButtonsHandlerAttached) {
        document.addEventListener('click', function(e) {
            // Проверяем, что клик был по кнопке "Добавить"
            if (!e.target.classList.contains('dish-add-btn')) {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const card = e.target.closest('.dish-card');
            if (!card) {
                console.warn('Карточка не найдена');
                return;
            }
            
            const keyword = card.dataset.dish;
            if (!keyword) {
                console.warn('Keyword не найден в карточке');
                return;
            }
            
            console.log('Клик по кнопке "Добавить" для тура:', keyword);
            
            // Переключаем выделение
            if (card.classList.contains('selected')) {
                // Удаляем из заказа
                const selected = getStoredSelection();
                const filtered = selected.filter(k => k !== keyword);
                saveSelection(filtered);
                card.classList.remove('selected');
                console.log('Тур удален из заказа');
            } else {
                // Добавляем в заказ
                addToOrder(keyword);
                card.classList.add('selected');
                console.log('Тур добавлен в заказ');
            }
            
            updateOrderUI();
        });
        
        addButtonsHandlerAttached = true;
        console.log('Обработчик кнопок "Добавить" установлен');
    }
}

