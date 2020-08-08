from app import db, ma
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    inventory = db.relationship('Inventory', backref='user', uselist=False)
    recipes = db.relationship('Recipe', backref='user', uselist=True)

    def __repr__(self):
        return '<User {}>'.format(self.username) 


class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    ingredients = db.relationship('Ingredient', backref='inventory')


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    measurement = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(200))
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'))


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200))
    categories = db.relationship('Recipecategory', backref='recipe', uselist=True, lazy=True)
    ingredients = db.relationship('Recipeingredient', backref='recipe', uselist=True, lazy=True)
    time = db.relationship('RecipeTime', backref = 'recipe', uselist=False)
    servings = db.Column(db.Integer)
    description = db.Column(db.String(1000))
    instructions = db.Column(db.String(2000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Recipecategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    array_index = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)


class Recipeingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    measurement = db.Column(db.String(50), nullable=False)
    ignore = db.Column(db.Boolean, default=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)


class RecipeTime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hour = db.Column(db.Integer)
    minute = db.Column(db.Integer)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)


class IngredientSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ingredient


class RecipeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        include_relationships = True


class RecipecategorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Recipecategory


class RecipeIngredientSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Recipeingredient


class RecipeTimeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RecipeTime