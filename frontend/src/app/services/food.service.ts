import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/modals/food';
import { Tag } from '../shared/modals/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]
  {
    return sample_foods;
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
 getFoodById(foodId:number):Food{
 return this.getAll().find(food=>food.id==foodId)??new Food();
 }
 getAlltags():Tag[]{
  return sample_tags;
 }
 getAllFoodByTag(tag:string):Food[]
 {
  return tag==="All"?
  this.getAll():
  this.getAll().filter(food => food.tags?.includes(tag));
 }
}
