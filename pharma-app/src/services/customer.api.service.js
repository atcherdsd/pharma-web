import apiClient from '../http/apiClient';

export default class CustomerAPI {
  static postCustomer = (customer) => apiClient.post('/customer', customer);
}
