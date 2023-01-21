import apiClient from '../http/apiClient';

export default class BoxAPI {
  static getBoxByLotAndCustomerID = (lotId, customerId) =>
    apiClient.get(`/box?limit=10&lot=${lotId}&customer=${customerId}&status=1
  `);
  static getBoxImage = (hash) => apiClient.get(`/box/${hash}/qr`);
  static rebox = (hash, reboxData) => apiClient.put(`/box/${hash}/rebox`, reboxData);
  static freeze = (hash, customer) => apiClient.put(`/box/${hash}/freeze`, { customer });
}
