
// https://www.codewars.com/kata/587593285448632b8d000143/train/javascript
// Bob has left a chain of broken promises in his wake.
// Can you help to fix things?
// In the sample test case (submitOrder(12345)), "Your order was placed successfully" should be logged to the console. Hit "Attempt" to see if you pass the kata.
// Some notes:
// You can assume that the functions Bob is calling actually exist and take the given parameters in the given order.
// User "12345" is a valid user for testing
// Any provided function whose name ends in Async returns a Promise.
// Any provided function whose name does not end in Async is synchronous, i.e. calculateShipping().

function submitOrder(user) {
  var shoppingCart, zipCode, shippingRate, orderSuccessful;
  
  Promise.all([
    OrderAPI.getShoppingCartAsync(user),
    CustomerAPI.getProfileAsync(user),
  ]).then(function(values){
    shoppingCart = values[0];
    zipCode = values[1].zipCode;
    
    shippingRate = calculateShipping(shoppingCart, zipCode);
    
    return OrderAPI.placeOrderAsync(shoppingCart, shippingRate)
  }).then(function(success){
    orderSuccessful = success
    
    console.log(`Your order ${orderSuccessful? "was" : "was NOT"} placed successfully`);
  }).catch(function(error){
    console.error(error)
  })
}