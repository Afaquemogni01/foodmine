// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Cart } from '../shared/modals/cart';
// import { Food } from '../shared/modals/food';
// import { Cartitem } from '../shared/modals/cartitem';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//  private cart:Cart =this.getCartFromLocalStorage();
//  private cartSubject: BehaviorSubject<Cart>=new BehaviorSubject(this.cart);
//   constructor() { }


//   addTocart(food :Food):void{
//     let cartitem=this.cart.items
//     .find(item=> food.id===food.id);
//     if(cartitem)
//       return;
//     this.cart.items.push(new Cartitem(food));
//     this.getCartFromLocalStorage();
//   }
//   removeFromCart(foodId:string):void{
//     this.cart.items=this.cart.items
//     .filter(items=> items.food.id!=foodId);
//     this.getCartFromLocalStorage();
//   }
//   changeQuantity(foodId:string,quantity:number)
//   {
//     let cartitem=this.cart.items
//     .find(item=> item.food.id===foodId);
//     if(!cartitem)return;

//     cartitem.quantity=quantity;
//     cartitem.price=quantity*cartitem.food.price;
//     this.getCartFromLocalStorage();
//   }
//   clearcart()
//   {
//     this.cart=new Cart();
//     this.getCartFromLocalStorage();
//   }
//   getCartObservable():Observable<Cart>{
//     return this.cartSubject.asObservable();
//   }
//   private setCartToLocalStorage():void{
//     this.cart.totalPrice=this.cart.items.reduce((prevSum,currentItem)=>prevSum+currentItem.price,0);
//     this.cart.totalCount=this.cart.items
//     .reduce((prevsum,currentItem)=>prevsum+currentItem.quantity,0);
//     const cartjson=JSON.stringify(this.cart);
//     localStorage.setItem('Cart',cartjson)
//     this.cartSubject.next(this.cart);
//   }
//   private getCartFromLocalStorage():Cart{
//     const cartjson=localStorage.getItem('cart');
//     return cartjson?JSON.parse(cartjson):new Cart();
//   }
//   getCart():Cart{
//     return this.cart;
//   }
// }









import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/modals/cart';
import { Food } from '../shared/modals/food';
import { Cartitem } from '../shared/modals/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      return;
    }
    this.cart.items.push(new Cartitem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: number, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  getCart(): Cart {
    return this.cart;
  }
}
