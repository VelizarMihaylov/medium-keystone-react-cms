import { combineReducers } from 'redux';
import getRecipes from './recipe_actions/get_recipes.js';
import loadingRecipes from './recipe_actions/loading_recipes.js';

const reducers = combineReducers({
	recipes: getRecipes,
	loadRecipes: loadingRecipes,
});

export default reducers;
