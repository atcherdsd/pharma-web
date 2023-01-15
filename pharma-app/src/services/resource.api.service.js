import apiClient from '../http/apiClient';

export default class ResourceAPI {
  static getCountry = () => apiClient.get('/resource/country');
}
