import { Subject } from 'rxjs';

const productsSubject = new Subject([]);

export const productsService = {
  setProducts: (products) => {productsSubject.next(products);},
  clearProducts: () => productsSubject.next([]),
  getProducts: () => productsSubject.asObservable(),
}