const baseURL = 'http://134.0.115.216/v1';

export default class RequestAPI {
  static async reqToForgotPassword(body) {
    const res = await fetch(`${baseURL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      let successData = await res.json();
      return {
        ...successData,
        message: 'Restore email successfully sent! Please, check your email.',
      };
    } else {
      let errorData = await res.json();
      return errorData;
    }
  }
  static async reqToResetPassword(body) {
    const res = await fetch(`${baseURL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      let successData = await res.json();
      return {
        ...successData,
        message: 'Password successfully changed',
      };
    } else {
      let errorData = await res.json();
      return errorData;
    }
  }
  static async reqToLogin(body) {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
}
