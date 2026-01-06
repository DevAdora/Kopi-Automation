export const categories = [
    {
        id: 1,
        name: "Meals",
        image: require('../assets/images/meals.png')
    },
    {
        id: 2,
        name: "Beverages",
        image: require('../assets/images/beverages.png')
    },
    {
        id: 3,
        name: "Snacks",
        image: require('../assets/images/snacks.png')
    },
];

export const menus = [
    // {
    //     id: 1,
    //     categoryName: "Beverages",
    //     itemList: [
    //     ]
    // }
    
    {
        id: 1,
        name: "Americano",
        image: require('../assets/images/Beverages/americano.png'),
        price: 90.00
    },
    {
        id: 2,
        name: "Cappuccino",
        image: require('../assets/images/Beverages/cappuccino.png'),
        price: 100.00
    },
    {
        id: 3,
        name: "Espresso",
        image: require('../assets/images/Beverages/espresso.png'),
        price: 90.00
    },
    {
        id: 4,
        name: "Latte",
        image: require('../assets/images/Beverages/latte.png'),
        price: 110.00
    },
    {
        id: 5,
        name: "Machiato",
        image: require('../assets/images/Beverages/machiato.png'),
        price: 95.00
    },
    {
        id: 6,
        name: "Mocha",
        image: require('../assets/images/Beverages/mocha.png'),
        price: 95.00
    }
    
];

const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#5E3023",
    primary2: "#F3E9DC",
    secondary: "#39B68D",
    grey: "#CCCCCC",
    backgroundcolor: "F3E9DC"
}

export default COLORS;