import apiClient from '../http/apiClient';

export default class LotAPI {
  static postLot = (lotData) =>
    apiClient.post('/lot', lotData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  static getProductNameById = (id) => apiClient.get(`/lot?boxCustomer=${id}`);
}
