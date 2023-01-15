import apiClient from '../http/apiClient';

export default class ContextAPI {
  static getContext = () => apiClient.get('/context');

  static postContext = (name) => apiClient.post('/context', { name });
}
