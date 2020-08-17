const testitems = [
    {   
        'id': 0,
        'name': 'shopping list',
        'array_index': 0,
        'items' : {
            'salt' :{
                'name': 'salt',
                'quantity': 100,
                'measurement': 'tsp',
                'item_index': 0,
                'bought': false
            },
            'pasta': {
                'name': 'pasta',
                'quantity': 10,
                'measurement': 'servings',
                'item_index': 1,
                'bought': false
            },
            'carrot': {
                'name': 'carrot',
                'quantity': 5,
                'measurement': 'pcs',
                'item_index': 2,
                'bought': false
            },
            '5 pencils': {
                'name': '5 pencils',
                'item_index': 3,
                'bought': false
            },
            'erasers' :{
                'name': 'erasers',
                'item_index': 4,
                'bought': false
            },
            'potato chips': {
                'name': 'potato chips',
                'item_index': 5,
                'bought': false
            }
        },
        'categories': {
            'ingredients': {
                'name': 'ingredients',
                'addToPantry': true,
                'category_index': 0,
                'items': ['salt', 'pasta', 'carrot']
            },
            'stationary' : {
                'name': 'stationary',
                'category_index': 1,
                'items': ['5 pencils', 'erasers']
            },
            'snacks': {
                'name': 'snacks',
                'category_index': 2,
                'items': ['potato chips']
            }
        },
        'categoryOrder': ['ingredients', 'stationary', 'snacks']
    },
    {
        'id': 1,
        'name': 'monthly shopping list',
        'array_index': 1,
        'items': {

            'pringles':{
                'name': 'pringles',
                'item_index': 0,
                'bought': false
            },
            'icecream' :{
                'name': 'icecream',
                'item_index': 1,
                'bought': false
            },
            '1.5L coke': {
                'name': '1.5L coke',
                'item_index': 2,
                'bought': false
            },
        },
        'categories': {
            'snacks': {
                'name': 'snacks',
                'category_index': 0,
                'items': ['pringles', 'icecream']
                
            },
            'drinks': {
                'name': 'drinks',
                'category_index': 1,
                'items': ['1.5L coke']
            }
        },
        'categoryOrder': ['snacks', 'drinks']
    }
]


export default testitems