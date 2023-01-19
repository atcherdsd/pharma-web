import apiClient from '../http/apiClient';

export default class IngredientAPI {
  static postIngredient = (ingredientData) => apiClient.post('/ingredient', ingredientData);

  static getIngredients = (id) => apiClient.get(`/ingredient?customer=${id}`);
}
