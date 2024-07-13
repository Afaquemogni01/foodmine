import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/modals/cart';
import { Cartitem } from 'src/app/shared/modals/cartitem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  
 
  cart!:Cart;
 constructor(private cartService:CartService){
  this.cartService.getCartObservable().subscribe((cart)=>{
    this.cart=cart;
  })
 }


ngOnInit(): void {
    
}
removeFromCart(cartitem:Cartitem)
{
  this.cartService.removeFromCart(cartitem.food.id);
}
changeQuantity(cartitem:Cartitem,quantityInString:string)
{
  const quantity=parseInt(quantityInString);
  this.cartService.changeQuantity(cartitem.food.id,quantity);
}
}

