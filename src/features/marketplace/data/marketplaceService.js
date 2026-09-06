import products from './products';

export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 250);
  });
}
