from flask import Blueprint, jsonify, request
from flask_restful import Resource, abort 
from models import Ingredient, IngredientSchema, Recipe, RecipeSchema, Recipeingredient, RecipeIngredientSchema, Recipecategory, RecipecategorySchema, RecipeTime, RecipeTimeSchema
from app import db, ma , api

main = Blueprint('main', __name__)


def abort_if_not_exist(ingredient):
    if not ingredient:
        abort(404, message = "item does not exist")
    

class IngredientItem(Resource):
    def get(self, item_id):
        ingredient_schema = IngredientSchema()
        ingredient = Ingredient.query.filter_by(id=item_id).first()
        abort_if_not_exist(ingredient)
        return jsonify(ingredient_schema.dump(ingredient))

    def delete(self, item_id):
        ingredient_schema = IngredientSchema()
        ingredient = Ingredient.query.filter_by(id=item_id).first()
        abort_if_not_exist(ingredient)
        db.session.delete(ingredient)
        db.session.commit()
        return jsonify(ingredient_schema.dump(ingredient))

    def patch(self, item_id):
        ingredient_schema = IngredientSchema()
        ingredient = Ingredient.query.filter_by(id=item_id).first()
        abort_if_not_exist(ingredient)
        
        quantity = request.json.get('quantity', '')
        name = request.json.get('name', '')
        measurement = request.json.get('measurement', '')
        url = request.json.get('url', '')
        array_index = request.json.get('array_index', '')
         
        if quantity or quantity == 0:
            ingredient.quantity = quantity
        if name:
            ingredient.name = name
        if measurement:
            ingredient.measurement = measurement
        if url:
            ingredient.url = url
        if array_index:
            ingredient.array_id = array_id       
        
        db.session.add(ingredient)
        db.session.commit()
        return jsonify(ingredient_schema.dump(ingredient))

class IngredientList(Resource):

    def get(self):
        all_ingredients = Ingredient.query.all()
        ingredient_schema = IngredientSchema(many=True)
        return jsonify(ingredient_schema.dump(all_ingredients))

    def post(self):
        name = request.json.get('name', '')
        quantity = request.json.get('quantity', '')
        measurement = request.json.get('measurement', '')
        url = request.json.get('url', '')
        inventory_id = request.json.get('inventory_id', '')
        ids = request.json.get('ids', '')
        
        i = 0
        if ids:
            for id in ids:
                ingredient = Ingredient.query.filter_by(id=id).first()
                abort_if_not_exist(ingredient)

                ingredient.array_id = i
                i += 1
                db.session.add(ingredient)

        ingredient = Ingredient(name = name, quantity=quantity, measurement=measurement, url=url, inventory_id=inventory_id, array_id=i)
        ingredient_schema = IngredientSchema()

        db.session.add(ingredient)
        db.session.commit()

        return jsonify(ingredient_schema.dump(ingredient))


class RecipeItem(Resource):
    
    def get(self, recipe_id):

        recipe_schema = RecipeSchema(many=True)
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        abort_if_not_exist(recipe)
        recipe = complete_recipe(recipe_schema.dump([recipe]))
        
        return jsonify(recipe[0])

    def delete(self, recipe_id):
        
        recipe_schema = RecipeSchema(many=True)
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        abort_if_not_exist(recipe)

        return_value = complete_recipe(recipe_schema.dump([recipe]))

        ingredients = Recipeingredient.query.filter_by(recipe_id=recipe_id).all()
        categories = Recipecategory.query.filter_by(recipe_id=recipe_id).all()
        time = RecipeTime.query.filter_by(recipe_id=recipe_id).all()

        delete_array(ingredients)
        delete_array(categories)
        delete_array(time)

        db.session.delete(recipe)
        db.session.commit()
        
        return jsonify(return_value[0])


    def patch(self, recipe_id):

        recipe_schema = RecipeSchema(many=True)
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        abort_if_not_exist(recipe)

        name = request.json.get('name', '')
        url =  request.json.get('url', '')
        categories = request.json.get('categories', '')
        ingredients = request.json.get('ingredients', '')
        time = request.json.get('time', '')
        servings = request.json.get('servings', '')
        description = request.json.get('description', '')
        instructions = request.json.get('instructions', '')

        if name:
            recipe.name = name
        if url:
            recipe.url = url
        if servings:
            recipe.servings = servings
        if description:
            recipe.description = description
        if instructions:
            recipe.instructions = '/'.join(instructions)
        
        # edit this to handle different array sizes, similar to that of categories below
        if ingredients:
            prev_ingredients = recipe.ingredients
            prev_ids = [prev_ingredient.id for prev_ingredient in prev_ingredients]

            new_length = len(ingredients)

            if new_length > len(prev_ids):
                i = 0
                for prev_ingredient in prev_ingredients:
                    prev_ingredient.name = ingredients[i]['name']
                    prev_ingredient.quantity = ingredients[i]['quantity']
                    prev_ingredient.measurement = ingredients[i]['measurement']
                    prev_ingredient.ignore = ingredients[i]['ignore']
                    prev_ingredient.recipe_id = recipe_id
                    i += 1
                    db.session.add(prev_ingredient)

                for ingredient in ingredients[i:]:
                    ingredient = Recipeingredient(recipe_id = recipe_id, name = ingredient['name'], 
                    measurement = ingredient['measurement'], ignore = ingredient['ignore'], quantity = ingredient['quantity'])
                    db.session.add(ingredient)

            elif new_length < len(prev_ids):
                i = 0  
                while i < new_length:
                    prev_ingredients[i].name = ingredients[i]['name']
                    prev_ingredients[i].quantity = ingredients[i]['quantity']
                    prev_ingredients[i].measurement = ingredients[i]['measurement']
                    prev_ingredients[i].ignore = ingredients[i]['ignore']
                    prev_ingredients[i].recipe_id = recipe_id
                    i += 1
                    db.session.add(prev_ingredients[i])

                delete_array(prev_ingredients[i:])

            else:
                i = 0
                for prev_ingredient in prev_ingredients:
                    prev_ingredient.name = ingredients[i]['name']
                    prev_ingredient.quantity = ingredients[i]['quantity']
                    prev_ingredient.measurement = ingredients[i]['measurement']
                    prev_ingredient.ignore = ingredients[i]['ignore']
                    prev_ingredient.recipe_id = recipe_id
                    i += 1
                    db.session.add(prev_ingredient)


        if categories:
            prev_catergories = recipe.categories
            array_index = 0
            prev_ids = [prev_catergory.id for prev_catergory in prev_catergories]
            
            new_length = len(categories)
            
            if new_length > len(prev_ids):
                i = 0
                for prev_catergory in prev_catergories:
                    prev_catergory.name = categories[i]
                    prev_catergory.array_index = array_index
                    i += 1
                    array_index += 1
                    db.session.add(prev_catergory)
                
                for category in categories[i:]:
                    category = Recipecategory(recipe_id=recipe_id, name=category, array_index=array_index)
                    array_index += 1
                    db.session.add(category)

            elif new_length < len(prev_ids):
                i = 0
                while i < new_length:
                    prev_catergories[i].name = categories[i]
                    prev_catergories[i].array_index = array_index
                    i += 1
                    array_index += 1
                    db.session.add(prev_catergories[i])
                
                delete_array(prev_catergories[i:])


            else:
                i = 0
                for prev_catergory in prev_catergories:

                    prev_catergory.name = categories[i]
                    prev_catergory.array_index = array_index
                    i += 1
                    array_index += 1
                    db.session.add(prev_catergory)    

        if time:
           prev_time = RecipeTime.query.filter_by(recipe_id=recipe_id).first()
           if time['hour']: 
               prev_time.hour = time['hour']
           if time['minute']:    
               prev_time.minute = time['minute']

           db.session.add(prev_time)


        db.session.commit()
        recipe = complete_recipe(recipe_schema.dump([recipe]))
        
        return jsonify(recipe[0])   




class RecipeList(Resource):

    def get(self):
        all_recipes = Recipe.query.all()
        recipe_schema = RecipeSchema(many=True)
        recipe = complete_recipe(recipe_schema.dump(all_recipes))
        return jsonify(recipe)


    def post(self):
        name = request.json.get('name', '')
        url =  request.json.get('url', '')
        categories = request.json.get('categories', '')
        ingredients = request.json.get('ingredients', '')
        time = request.json.get('time', '')
        servings = request.json.get('servings', '')
        description = request.json.get('description', '')
        instructions = request.json.get('instructions', '')

        recipe = Recipe(name = name, url = url, servings = servings, instructions='/'.join(instructions), description=description)
        db.session.add(recipe)
        db.session.commit()
        
        id = recipe.id

        for i in range(len(categories)):
            category_ = Recipecategory(name = categories[i], array_index=i, recipe_id=id)
            db.session.add(category_)

        recipetime = RecipeTime(recipe_id = id, hour= time['hour'], minute=time['minute'])
        db.session.add(recipetime)

        for ingredient in ingredients:
            ingredient = Recipeingredient(recipe_id = id, name = ingredient['name'], measurement = ingredient['measurement'], quantity = ingredient['quantity'], ignore = ingredient['ignore'])     
            db.session.add(ingredient)

        db.session.commit()
        
        added_recipe = Recipe.query.get(id)
        recipe_schema = RecipeSchema(many=True)
        recipe = complete_recipe(recipe_schema.dump([added_recipe]))
        return jsonify(recipe[0])    

def complete_recipe(recipe_array):
    for recipe in recipe_array:
        recipe['ingredients'] = get_items(recipe['ingredients'], Recipeingredient, RecipeIngredientSchema())
        recipe['categories'] = get_items(recipe['categories'], Recipecategory, RecipecategorySchema())
        recipe['instructions'] = recipe['instructions'].split('/')
        recipe['categories'] = convert_to_array(recipe['categories'])
        recipe['time'] = key_to_object(recipe['time'], RecipeTime, RecipeTimeSchema())   
    return recipe_array    


# gets arrays of objects from an array of primary keys
def get_items(array, model, schema):
    new_array = []
    for id in array:
        model_ = model.query.get(id)
        schema_ = schema
        new_array.append(schema_.dump(model_))
    return new_array   


# converts an array of objects to an array based on the stored array_index value in the db
def convert_to_array(array):
    new_array = [0] * len(array)
    for obj in array:
        new_array[obj['array_index']] = obj['name']
    return new_array


# obtains object from key
def key_to_object(key, model, schema):
    model_ = model.query.get(key)
    schema_ = schema
    return schema_.dump(model_)


# deletes an array of objects from database
def delete_array(array):
    for item in array:
        db.session.delete(item)
    

api.add_resource(IngredientList, '/inventory') 
api.add_resource(IngredientItem, '/item/<item_id>')
api.add_resource(RecipeList, '/recipes')
api.add_resource(RecipeItem, '/recipe/<recipe_id>')