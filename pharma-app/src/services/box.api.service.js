import apiClient from '../http/apiClient';

export default class BoxAPI {
  static getBoxByLotAndCustomerID = (lotId, customerId, status) =>
    apiClient.get(`/box?lot=${lotId}&customer=${customerId}&status=${status}&limit=50
  `);
  static getBoxImage = (hash) => apiClient.get(`/box/${hash}/qr`);
  static rebox = (hash, reboxData) => apiClient.put(`/box/${hash}/rebox`, reboxData);
  static freeze = (hash, customer) => apiClient.put(`/box/${hash}/freeze`, { customer });
  static burn = (hash, customer) => apiClient.put(`/box/${hash}/burn`, { customer });
  static transfer = (hash, customer, destination) =>
    apiClient.put(`/box/${hash}/transfer`, { customer, destination });
}
