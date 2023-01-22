import apiClient from '../http/apiClient';

export default class IngredientAPI {
  static postIngredient = (ingredientData) => apiClient.post('/ingredient', ingredientData);

  static getIngredients = (id) => apiClient.get(`/ingredient?customer=${id}`);

  static putIngredient = (nftBasicIngredientID, transferData) =>
    apiClient.put(`/ingredient/${nftBasicIngredientID}/transfer`, transferData);
}
