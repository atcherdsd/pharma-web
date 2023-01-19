import apiClient from '../http/apiClient';

export default class LotAPI {
  static postLot = (lotData) => apiClient.post('/lot', lotData);

  static getProductNameById = (id) => apiClient.get(`/lot?boxCustomer=${id}`);
}
