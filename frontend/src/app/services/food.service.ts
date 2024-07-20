import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/modals/food';
import { Tag } from '../shared/modals/Tag';
import { ReturnStatement } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { FOOD_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_TAGS_URL, FOODS_BY_TAG_URL, FOODS_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Food[]>
  {
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchTerm);
  }
 getFoodById(foodId:number):Observable<Food>{
 return this.http.get<Food>(FOOD_BY_ID_URL+foodId);
 }
 getAlltags():Observable<Tag[]>{
  return this.http.get<Tag[]>(FOODS_TAGS_URL);
 }
 getAllFoodByTag(tag:string):Observable<Food[]>
 {
  return tag==="All"?
  this.getAll():
  this.http.get<Food[]>(FOODS_BY_TAG_URL+tag);
 }
 
}
