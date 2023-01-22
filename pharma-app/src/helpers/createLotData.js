export default function createLotData(customerId, data, expiringDate, nftBasicIngredientID) {
  return {
    customer: customerId,
    name: data.get('productName'),
    boxes: data.get('nftQuantity'),
    description: data.get('productDescription'),
    expires: expiringDate,
    leaflet: data.get('fileUpload'),
    ingredients: nftBasicIngredientID,
  };
}
