import apiClient from '../http/apiClient';

export default class IngredientAPI {
  // static getContext = () => apiClient.get('/context');

  static postIngredient = (ingredient) => apiClient.post('/ingredient', ingredient);
}
