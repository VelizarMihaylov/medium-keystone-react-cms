import React, { Component } from 'react';
import { connect } from 'react-redux';
// Remember our thunk this is where we will need to make use of it
import { recipesFetchData } from '../actions/actions.js';
// We gonna use lodash to map over our recipe object
import _ from 'lodash';

class Recipe extends Component {
	constructor (props) {
		super(props);
		// Bind our render recipe to function so we can use it in the render method
		this.renderRecipe = this.renderRecipe.bind(this);
	}

	// Fetch recipes when component is mounted
	componentDidMount () {
		const API_URL = 'http://localhost:3000/api/recipe/?list';
		// I am setting some delay to simulate a real world request
		setTimeout(() => { this.props.fetchRecipe(API_URL); }, 1000);
	}
	// Function to render our recipe
	renderRecipe () {
		return _.map(this.props.recipes, recipe => {
			// Check if there is an image to be displayed
			const img = recipe.image ? recipe.image.filename : '';
			// Get the html for our recipe ingredients
			function createMarkupForIngredients () {
				if (recipe.ingredientList) {
					return {
						__html: recipe.ingredientList,
					};
				} else {
					return;
				}
			};
			// Get the html for our recipe cooking instructions
			function createMarkupForInstructions () {
				if (recipe.cookingInstructions) {
					return {
						__html: recipe.cookingInstructions,
					};
				} else {
					return;
				}
			};
			// Make sure we show only published recipes
			if (recipe.state === 'published') {
				return (
					<div key={recipe._id}>
						<h1>{recipe.name}</h1>
						<img style={{ width: '300px', height: '300px' }} src={img} />
						<h2>Ingredient List</h2>
						{/*
          In react we cant set HTML directly we need to use dangerouslySetInnerHTML.
          */}
						<div dangerouslySetInnerHTML={createMarkupForIngredients()} />
						<h2> Cooking Instructions </h2>
						{/*
          Same as above
          */}
						<div dangerouslySetInnerHTML={createMarkupForInstructions()} />
					</div>
				);
			}
		});
	}
	render () {
		// If data is still loading
		if (this.props.loading) {
			return (
				<div>
					<h1>LOADING...</h1>
				</div>
			);
		}
		// Show recipe once data is loaded
		return (
			<div>
				{this.renderRecipe()}
			</div>
		);
	};
};

function mapStateToProps (state, ownProps) {
	// Things return here are showing in props for Characters
	return {
		recipes: state.recipes,
		loading: state.loadRecipes,
	};
}

// anything returned from here will end up in the props
const mapDispatchToProps = dispatch => ({
	// Our thunk will be mapped to this.props.fetchRecipe
	fetchRecipe: (url) => dispatch(recipesFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
