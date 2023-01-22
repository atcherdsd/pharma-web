export default function createCustomerBody(data, contexts, countryCode) {
  return {
    context: findUuid(data.get('context'), contexts),
    role: data.get('role'),
    name: data.get('name'),
    type: data.get('type'),
    country: countryCode,
    city: data.get('city'),
    province: data.get('province') || null,
    address: data.get('address'),
    zip: data.get('zip'),
    document: data.get('fileUpload'),
    url: data.get('url') || null,
    representative_email: data.get('email'),
    representative_phone: data.get('phoneNumber') || null,
    password: data.get('password'),
  };
}

function findUuid(context, contexts) {
  return contexts.find((contextItem) => {
    return contextItem.name == context;
  }).id;
}

// function findCountry(country, countries) {
//   return countries.find((countryItem) => {
//     return countryItem.name == country;
//   }).code;
// }
