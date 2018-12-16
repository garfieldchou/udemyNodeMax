const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find(product => product.id === id);
      if(existingProduct) {
        const prodIdx = cart.products.indexOf(existingProduct);
        let qty = cart.products[prodIdx].qty;
        const updatedProduct = {...cart.products[prodIdx], qty: qty+1 };
        cart.products[prodIdx] = updatedProduct;
      } else {
        cart.products.push({id, qty: 1});
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart, null, 2), err => {
        console.log(err);
      });
    });
  }
};
