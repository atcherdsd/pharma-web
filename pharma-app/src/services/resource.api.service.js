const baseURL = process.env.REACT_APP_BASE_URL;

export default class ResourceAPI {
  static async getCountry() {
    const res = await fetch(`${baseURL}/resource/country`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await res.json();
  }
}
