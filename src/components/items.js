const items = [
                {id : 1,
                name: 'Chocolate PB oats', 
                image_url: '/images/chocolate_pb_oats.png',
                categories: ['breakfast', 'vegan'],
                ingredients: [{name: 'rolled oats',
                               quantity: 0.75,
                               measurement: 'cup',
                               ignore: false
                              },
                              {name: 'cocoa powder',
                               quantity: 1,
                               measurement: 'cup',
                               ignore: false
                              }, 
                              {name: 'banana',
                              quantity: 1,
                              measurement: 'pcs',
                              ignore: false
                              },
                              {name: 'strawberry',
                              quantity: 1,
                              measurement: 'cup',
                              ignore: false
                              },
                              {name: 'peanut butter',
                              quantity: 1,
                              measurement: 'serving',
                              ignore: false}
                             ],
                time: {hours: 0, minutes: 10},
                servings: 1,             
                description: 'Yummy peanut butter oats to start the day with.',  
                instructions: ['Cut up strawberries and bananas', 
                               'Bring water to a boil in a pot', 
                               'Cook oats for 3 mins, mixing in cocoa powder',
                               'Pour the oats into a bowl. Add bananas and strawberries, and peanut butter to top it off and serve']
                }, 
                {id : 2,
                    name: 'Vegan mac and cheese', 
                    image_url: '/images/vegan_mac_and_cheese.png',
                    categories: ['lunch', 'dinner', 'vegan', 'breakfast'],
                    ingredients: [{name: 'macadamias',
                                   quantity: 0.5,
                                   measurement: 'cup',
                                   ignore: false
                                  },
                                  {name: 'carrot',
                                   quantity: 1,
                                   measurement: 'pcs',
                                   ignore: false
                                  }, 
                                  {name: 'nutritional yeast',
                                  quantity: 0.25,
                                  measurement: 'cup',
                                  ignore: false
                                  },
                                  {name: 'white vinegar',
                                  quantity: 1,
                                  measurement: 'tsp',
                                  ignore: false
                                  },
                                  {name: 'ground nutmeg',
                                  quantity: 0.125,
                                  measurement: 'tsp',
                                  ignore: false
                                  },
                                  {name: 'pasta',
                                  quantity: 3,
                                  measurement: 'serving',
                                  ignore: false
                                  },  
                                 ],
                    time: {hours: 0, minutes: 20},
                    servings: 2,             
                    description: 'Healthy and low-carb vegan mac and cheese',
                    instructions: ['Add macadamias, carrot, nutritional yeast, white vinegar, ground nutmeg into a blender and blend to create the vegan cheese sauce', 
                                   'Boil water and add the pasta in. Cook for 5 mins', 
                                   'Place the pasta in a bowl, pour the cheese sauce over it and serve'
                                  ] 
                }               
                ] 
 
export default items