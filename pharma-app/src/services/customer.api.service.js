import apiClient from '../http/apiClient';

export default class CustomerAPI {
  static postCustomer = (customer) =>
    apiClient.post('/customer', customer, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  static getCustomer = (contextId, role) =>
    apiClient.get(`/customer?context=${contextId}&role=${role}`);
}
