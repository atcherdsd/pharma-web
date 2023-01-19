import apiClient from '../http/apiClient';

export default class BoxAPI {
  static getBoxByLotAndCustomerID = (lotId, customerId) =>
    apiClient.get(`/box?lot=${lotId}&customer=${customerId}&status=1
  `);
  static getBoxImage = (hash) => apiClient.get(`/box/${hash}/qr`);
  static freeze = (hash, customer) => apiClient.put(`/box/${hash}/freeze`, { customer });
}
