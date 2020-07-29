from app import db, ma
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    inventory = db.relationship('Inventory', backref='user', uselist=False)

    def __repr__(self):
        return '<User {}>'.format(self.username) 


class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    ingredients = db.relationship('Ingredient', backref='inventory')


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    quantity = db.Column(db.Float)
    measurement = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(200))
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'))

    def __init__(self, name, quantity, measurement, url, inventory_id):
        self.name = name
        self.quantity = quantity
        self.measurement = measurement
        self.url = url
        self.inventory_id = inventory_id
    

class IngredientSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ingredient     