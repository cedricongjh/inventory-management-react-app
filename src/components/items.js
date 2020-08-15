const items = [
    {
        'name': 'shopping list',
        'array_index': 0,
        'categories': [
            {
                'category': 'ingredients',
                'addToPantry': true,
                'category_index': 0,
                'items': [
                    {
                        'name': 'salt',
                        'quantity': 100,
                        'measurement': 'tsp',
                        'item_index': 0,
                        'bought': false
                    },
                    {
                        'name': 'pasta',
                        'quantity': 10,
                        'measurement': 'servings',
                        'item_index': 1,
                        'bought': false
                    },
                    {
                        'name': 'carrot',
                        'quantity': 5,
                        'measurement': 'pcs',
                        'item_index': 2,
                        'bought': false
                    },
                ]
            },
            {
                'category': 'stationary',
                'category_index': 1,
                'items': [
                    {
                        'name': '5 pencils',
                        'item_index': 0,
                        'bought': false
                    },
                    {
                        'name': 'erasers',
                        'item_index': 1,
                        'bought': false
                    }
                ]
            },
            {
                'category': 'snacks',
                'category_index': 2,
                'items': [
                    {
                        'name': 'potato chips',
                        'item_index': 0,
                        'bought': false
                    }
                ]
            }
        ]
    },
    {
        'name': 'monthly shopping list',
        'array_index': 1,
        'categories': [
            {
                'category': 'snacks',
                'category_index': 0,
                'items': [
                    {
                        'name': 'pringles',
                        'item_index': 0,
                        'bought': false
                    },
                    {
                        'name': 'icecream',
                        'item_index': 1,
                        'bought': false
                    }
                ]
            },
            {
                'category': 'drinks',
                'category_index': 1,
                'items': [
                    {
                        'name': '1.5L coke',
                        'item_index': 0,
                        'bought': false
                    }
                ]
            }
        ]
    }
]


export default items