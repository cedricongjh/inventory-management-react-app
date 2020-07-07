from flask import Blueprint, jsonify, request
from models import Ingredient
from app import db

main = Blueprint('main', __name__)

@main.route('/inventory', methods=['GET', 'POST'])
def ingredients():
    return {'hi': 'test'}
    