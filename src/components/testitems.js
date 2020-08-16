const testitems = [
    {
        'name': 'shopping list',
        'array_index': 0,
        'items' : {
            0 :{
                'name': 'salt',
                'quantity': 100,
                'measurement': 'tsp',
                'item_index': 0,
                'bought': false
            },
            1: {
                'name': 'pasta',
                'quantity': 10,
                'measurement': 'servings',
                'item_index': 1,
                'bought': false
            },
            2: {
                'name': 'carrot',
                'quantity': 5,
                'measurement': 'pcs',
                'item_index': 2,
                'bought': false
            },
            3: {
                'name': '5 pencils',
                'item_index': 3,
                'bought': false
            },
            4 :{
                'name': 'erasers',
                'item_index': 4,
                'bought': false
            },
            5: {
                'name': 'potato chips',
                'item_index': 5,
                'bought': false
            }
        },
        'categories': {
            0: {
                'name': 'ingredients',
                'addToPantry': true,
                'category_index': 0,
                'items': [0, 1, 2]
            },
            1 : {
                'name': 'stationary',
                'category_index': 1,
                'items': [3, 4]
            },
            2: {
                'name': 'snacks',
                'category_index': 2,
                'items': [5]
            }
        },
        'categoryOrder': [0, 1, 2]
    },
    {
        'name': 'monthly shopping list',
        'array_index': 1,
        'items': {

            0:{
                'name': 'pringles',
                'item_index': 0,
                'bought': false
            },
            1 :{
                'name': 'icecream',
                'item_index': 1,
                'bought': false
            },
            2: {
                'name': '1.5L coke',
                'item_index': 2,
                'bought': false
            },
        },
        'categories': {
            0: {
                'name': 'snacks',
                'category_index': 0,
                'items': [0, 1]
                
            },
            1: {
                'name': 'drinks',
                'category_index': 1,
                'items': [2]
            }
        },
        'categoryOrder': [0, 1]
    }
]


export default testitems