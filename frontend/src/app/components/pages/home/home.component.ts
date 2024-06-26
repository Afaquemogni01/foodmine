import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/modals/food';
import { __param } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
foods:Food[]=[];
constructor(private foodService:FoodService,activatedRoute:ActivatedRoute)
{
  activatedRoute.params.subscribe((params)=>
  {
    if(params.searchTerm)
      this.foods=foodService.getAllFoodsBySearchTerm(params.searchTerm);
    else if(params.tag)
      {
        this.foods=this.foodService.getAllFoodByTag(params.tag);
      }
    {
      this.foods=foodService.getAll();
    }
  })
  
}
  ngOnInit(): void {
    
  }

}
