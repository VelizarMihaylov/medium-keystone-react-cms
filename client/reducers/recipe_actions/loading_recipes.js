import { LOADING_RECIPES } from '../../actions/actions';

export default function loadingRecipes (state = true, action) {
	switch (action.type) {
		case LOADING_RECIPES:
			return action.payload;
	}
	return state;
}
