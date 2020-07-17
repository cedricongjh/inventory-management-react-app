from flask import Blueprint, jsonify, request
from flask_restful import Resource, abort 
from models import Ingredient, IngredientSchema
from app import db, ma , api

main = Blueprint('main', __name__)


def abort_if_not_exist(ingredient):
    if not ingredient:
        abort(404, message = "ingredient does not exist")
    

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
         
        if quantity: 
            ingredient.quantity = quantity
        if name:
            ingredient.name = name
        if measurement:
            ingredient.measurement = measurement
        if url:
            ingredient.url = url    
        
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
        
        ingredient = Ingredient(name = name, quantity=quantity, measurement=measurement, url=url, inventory_id=inventory_id)
        ingredient_schema = IngredientSchema()

        db.session.add(ingredient)
        db.session.commit()

        return jsonify(ingredient_schema.dump(ingredient))
        

api.add_resource(IngredientList, '/inventory') 
api.add_resource(IngredientItem, '/item/<item_id>')