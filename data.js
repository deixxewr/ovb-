// js/data.js



const LOCAL_TOURS = [

    // category: main – основные туры

    {

        keyword: "berlin_student",

        name: "Студенческий Берлин",

        price: 44000,

        category: "main",

        count: "4 дня / 3 ночи",

        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",

        kind: "meat"

    },

    {

        keyword: "elbrus_weekend",

        name: "Горные выходные на Эльбрусе",

        price: 27500,

        category: "main",

        count: "4 дня / 3 ночи",

        image: "https://telegra.ph/file/15cb5ac110d096ac3ef24.jpg",

        kind: "veg"

    },

    {

        keyword: "kazan_weekend",

        name: "Казань: история и кампусы",

        price: 21500,

        category: "main",

        count: "3 дня / 2 ночи",

        image: "https://cms.russpass.ru/v1/file/61e139752d49e6f7fae20fd9",

        kind: "fish"

    },

    {

        keyword: "prague_student",

        name: "Прага: архитектура и культура",

        price: 38000,

        category: "main",

        count: "5 дней / 4 ночи",

        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop",

        kind: "meat"

    },

    {

        keyword: "bali_weekend",

        name: "Бали: пляжи и экзотика",

        price: 65000,

        category: "main",

        count: "7 дней / 6 ночей",

        image: "https://static.tildacdn.com/tild6462-3638-4265-b463-633231366464/bali-1673534929-5756.jpg",

        kind: "fish"

    },

    {

        keyword: "altai_adventure",

        name: "Алтай: приключения в горах",

        price: 32000,

        category: "main",

        count: "6 дней / 5 ночей",

        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D0%B5%D0%B5_%D0%A4%D0%BE%D1%80%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B5_%D0%BE%D0%B7%D1%91%D1%80%D0%BE%2C_%D0%93%D0%BE%D1%80%D0%BD%D1%8B%D0%B9_%D0%90%D0%BB%D1%82%D0%B0%D0%B9.jpg",

        kind: "veg"

    },

    {

        keyword: "paris_culture",

        name: "Париж: культура и искусство",

        price: 52000,

        category: "main",

        count: "5 дней / 4 ночи",

        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",

        kind: "meat"

    },

    {

        keyword: "crim_sea",

        name: "Крым: море и достопримечательности",

        price: 28000,

        category: "main",

        count: "6 дней / 5 ночей",

        image: "https://www.airpano.ru/photogallery/images_1550/142_778142.jpg",

        kind: "fish"

    },

    {

        keyword: "baikal_nature",

        name: "Байкал: природа и экология",

        price: 35000,

        category: "main",

        count: "7 дней / 6 ночей",

        image: "https://www.rgo.ru/sites/default/files/media/2017-01-23/samaya_krasivaya_strana_peyzazh_ledyanaya_pautina_baykala.jpg",

        kind: "veg"

    },



    // starter – короткие туры и экскурсии

    {

        keyword: "moscow_citytour",

        name: "Обзорная экскурсия по Москве",

        price: 2000,

        category: "starter",

        count: "1 день",

        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&h=400&fit=crop",

        kind: "meat"

    },


    {

        keyword: "moscow_river",

        name: "Прогулка по Москве-реке",

        price: 2500,

        category: "starter",

        count: "1 день",

        image: "http://ticketspass.ru/upload/iblock/a82/a829f0d140891d46927093a4b82a963e.jpg",

        kind: "fish"

    },

    {

        keyword: "spb_one_day",

        name: "Однодневная поездка в Петербург",

        price: 3500,

        category: "starter",

        count: "1 день",

        image: "https://provodniq.com/wp-content/uploads/2019/03/1-6.jpg",

        kind: "meat"

    },

    {

        keyword: "sergiev_posad",

        name: "Сергиев Посад: духовный центр",

        price: 1800,

        category: "starter",

        count: "1 день",

        image: "https://perito.media/uploads/post/image/3dbc3951fcd233a8cd6e33a24269f6d058dedbac9a35e2f4ae4177f6cf794edd/%D0%A1%D0%B5%D1%80%D0%B3%D0%B8%D0%B5%D0%B2_%D0%9F%D0%BE%D1%81%D0%B0%D0%B4_%D1%81_%D0%B2%D1%8B%D1%81%D0%BE%D1%82%D1%8B_%D0%BF%D1%82%D0%B8%D1%87%D1%8C%D0%B5%D0%B3%D0%BE_%D0%BF%D0%BE%D0%BB%D0%B5%D1%82%D0%B0_6-2.jpg",

        kind: "veg"

    },

    {

        keyword: "kolomna_medieval",

        name: "Коломна: средневековая крепость",

        price: 2200,

        category: "starter",

        count: "1 день",

        image: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/73ea934f-359f-4459-9e4b-c0e2b826ea1b/",

        kind: "fish"

    },

    {

        keyword: "vladimir_suzdal",

        name: "Владимир и Суздаль: Золотое кольцо",

        price: 2800,

        category: "starter",

        count: "1 день",

        image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/%D0%A3%D1%81%D0%BF%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80.jpg",

        kind: "veg"

    },

    {

        keyword: "yaroslavl_history",

        name: "Ярославль: исторический центр",

        price: 2400,

        category: "starter",

        count: "1 день",

        image: "https://cdn.guidego.ru/images/6385a32e1cd7d603ef551c24.1600x1200.jpeg",

        kind: "meat"

    },

    {

        keyword: "rostov_veliky",

        name: "Ростов Великий: древний город",

        price: 2100,

        category: "starter",

        count: "1 день",

        image: "https://s0.rbk.ru/v6_top_pics/media/img/6/52/347419627619526.jpeg",

        kind: "fish"

    },

    {

        keyword: "pereslavl_museum",

        name: "Переславль-Залесский: музеи",

        price: 1900,

        category: "starter",

        count: "1 день",

        image: "https://kovcheg-minsk.by/templates/yootheme/cache/63/92915534-63789462.jpeg",

        kind: "veg"

    },

    {

        keyword: "tula_samovar",

        name: "Тула: самовары и пряники",

        price: 2300,

        category: "starter",

        count: "1 день",

        image: "https://storage.myseldon.com/news-pict-c7/C7216C3AA8E3644E8567F9818C30877A",

        kind: "meat"

    },



    // drink – транспорт

    {

        keyword: "train_2class",

        name: "Поезд, купе",

        price: 6000,

        category: "drink",

        count: "в обе стороны",

        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/292258216301365.678947f3cc24d.png",

        kind: "cold"

    },

    {

        keyword: "bus_transfer",

        name: "Автобусный трансфер",

        price: 3000,

        category: "drink",

        count: "в обе стороны",

        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",

        kind: "cold"

    },

    {

        keyword: "flight_economy",

        name: "Перелёт, эконом",

        price: 15000,

        category: "drink",

        count: "туда-обратно",

        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",

        kind: "hot"

    },



    // dessert – доп. услуги

    {

        keyword: "insurance_small",

        name: "Страховка базовая",

        price: 800,

        category: "dessert",

        count: "на поездку",

        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",

        kind: "small"

    },

    {

        keyword: "insurance_extended",

        name: "Страховка расширенная",

        price: 1500,

        category: "dessert",

        count: "на поездку",

        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",

        kind: "medium"

    },

    {

        keyword: "excursions_pack",

        name: "Пакет экскурсий",

        price: 5000,

        category: "dessert",

        count: "3–5 экскурсий",

        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",

        kind: "big"

    }

];



// Глобальный массив туров (может быть перезаписан данными из API)

let TOURS = [];

