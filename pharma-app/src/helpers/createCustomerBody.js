export default function createCustomerBody(data) {
  return {
    context: data.get('context'),
    role: data.get('role'),
    name: data.get('name'),
    type: data.get('type'),
    country: data.get('country'),
    city: data.get('city'),
    province: data.get('province') || null,
    address: data.get('address'),
    postalCode: data.get('postalCode'),
    zip: data.get('fileUpload'),
    url: data.get('url') || null,
    representative_email: data.get('email'),
    representative_phone: data.get('phoneNumber') || null,
    password: data.get('password'),
  };
}
