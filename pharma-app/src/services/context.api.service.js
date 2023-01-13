const baseURL = process.env.REACT_APP_BASE_URL;

export default class ContextAPI {
  static async getContext() {
    const res = await fetch(`${baseURL}/context`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await res.json();
  }
  static async postContext(body) {
    const res = await fetch(`${baseURL}/context`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const contexts = ContextAPI.getContext();
      return await contexts;
    }
  }
}
