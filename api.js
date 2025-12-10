// js/api.js



// URL API из задания – сюда подставь свой, когда получишь ключ

const API_DISHES_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

const API_BASE_URL   = "https://edu.std-900.ist.mospolytech.ru";

const API_KEY        = "ВАШ_API_KEY_ЗДЕСЬ"; // подставь реальный ключ

// Локальное хранилище заказов (офлайн режим)
const ORDERS_STORAGE_KEY = "polytech_travel_orders";

function isApiConfigured() {
    return Boolean(API_KEY && API_KEY !== "ВАШ_API_KEY_ЗДЕСЬ");
}

function getLocalOrders() {
    try {
        const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveLocalOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function buildOrderFromPayload(orderPayload) {
    const dishes = Array.isArray(orderPayload.dishes) ? orderPayload.dishes : [];
    const selected = TOURS.filter(t => dishes.includes(t.keyword));
    const total = selected.reduce((sum, d) => sum + (Number(d.price) || 0), 0);

    return {
        id: Date.now().toString(),
        created_at: new Date().toLocaleString("ru-RU"),
        dishes_names: selected.map(d => d.name),
        total_price: `${total.toLocaleString("ru-RU")} ₽`,
        ...orderPayload
    };
}



// Загрузка туров (dishes) через fetch, с fallback на LOCAL_TOURS

async function loadDishes() {

    // Сначала устанавливаем LOCAL_TOURS как базовые данные

    TOURS = [...LOCAL_TOURS];

    

    try {

        // Проверяем, есть ли валидный API ключ

        if (!isApiConfigured()) {

            console.log("API ключ не установлен, используются локальные данные");

            return;

        }

        const url = `${API_DISHES_URL}?api_key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Ошибка загрузки с API");

        }

        const data = await response.json();

        

        if (!data || data.length === 0) {

            console.warn("API вернул пустой массив, используются локальные данные");

            return;

        }

        // Преобразуем данные API в туры, используя LOCAL_TOURS как шаблон

        TOURS = data.map((item, index) => {

            // Находим соответствующий тур в LOCAL_TOURS по категории и индексу

            const categoryTours = LOCAL_TOURS.filter(t => t.category === item.category);

            const localTour = categoryTours[index % categoryTours.length] || categoryTours[0];

            if (localTour) {

                return {

                    keyword: localTour.keyword,

                    name: localTour.name,

                    price: localTour.price,

                    category: item.category,

                    count: localTour.count,

                    image: localTour.image,

                    kind: item.kind || localTour.kind

                };

            }

            // Если не нашли, возвращаем как есть, но с базовыми значениями

            return {

                keyword: item.keyword,

                name: item.name,

                price: item.price,

                category: item.category,

                count: item.count || "1 день",

                image: item.image,

                kind: item.kind

            };

        });

    } catch (e) {

        console.warn("Не удалось загрузить данные с API, используется локальный массив.", e);

        // TOURS уже установлен в LOCAL_TOURS в начале функции

    }

}



// API работы с заказами

async function createOrder(orderPayload) {

    // Если API не настроен, сохраняем заказ локально
    if (!isApiConfigured()) {
        const orders = getLocalOrders();
        const newOrder = buildOrderFromPayload(orderPayload);
        orders.push(newOrder);
        saveLocalOrders(orders);
        return newOrder;
    }

    const url = `${API_BASE_URL}/orders?api_key=${API_KEY}`;

    try {
        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json;charset=utf-8"

            },

            body: JSON.stringify(orderPayload)

        });

        if (!response.ok) {

            throw new Error("Ошибка при создании заказа");

        }

        return response.json();
    } catch (e) {
        console.warn("API недоступен, заказ сохранён локально", e);
        const orders = getLocalOrders();
        const newOrder = buildOrderFromPayload(orderPayload);
        orders.push(newOrder);
        saveLocalOrders(orders);
        return newOrder;
    }

}



async function getOrders() {

    if (!isApiConfigured()) {
        return getLocalOrders();
    }

    const url = `${API_BASE_URL}/orders?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Ошибка при получении заказов");

        }

        return response.json();
    } catch (e) {
        console.warn("API недоступен, загружаем локальные заказы", e);
        return getLocalOrders();
    }

}



async function updateOrder(orderId, payload) {

    if (!isApiConfigured()) {
        const orders = getLocalOrders();
        const idx = orders.findIndex(o => String(o.id) === String(orderId));
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...payload };
            saveLocalOrders(orders);
            return orders[idx];
        }
        throw new Error("Локальный заказ не найден");
    }

    const url = `${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`;

    const response = await fetch(url, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json;charset=utf-8"

        },

        body: JSON.stringify(payload)

    });

    if (!response.ok) {

        throw new Error("Ошибка при обновлении заказа");

    }

    return response.json();

}



async function deleteOrder(orderId) {

    if (!isApiConfigured()) {
        const orders = getLocalOrders().filter(o => String(o.id) !== String(orderId));
        saveLocalOrders(orders);
        return { success: true };
    }

    const url = `${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`;

    const response = await fetch(url, {

        method: "DELETE"

    });

    if (!response.ok) {

        throw new Error("Ошибка при удалении заказа");

    }

    return response.json();

}

