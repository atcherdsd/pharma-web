import apiClient from '../http/apiClient';

export default class LotAPI {
  static getProductNameById = (id) => apiClient.get(`/lot?boxCustomer=${id}`);
}
