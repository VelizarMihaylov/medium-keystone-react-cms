import { GET_RECIPES } from '../../actions/actions';

export default function getRecipe (state = {}, action) {
	switch (action.type) {
		case GET_RECIPES:
			return action.payload;
	}
	return state;
}
