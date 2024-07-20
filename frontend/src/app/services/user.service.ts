import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/modals/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
const USER_KEY='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
private usersubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());
public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable=this.usersubject.asObservable();
   }


   login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUsertTOloaclStorage(user);
          // Handle successful login
          this.usersubject.next(user);
          console.log('Login successful:', user);
          this.toastrService.success(`welcome to Foodmine ${user.name}!`,`Login Successful`)
          // You can save the user data/token to local storage or state management here
        },
        error: (errorResponse) => {
          // Handle login error
          console.error('Login error:', errorResponse);
          this.toastrService.error(errorResponse.error,'Login failed');
          // Display an error message or perform any other error handling
        }
      })
    );
  }
  logout(){
    this.usersubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUsertTOloaclStorage(user:User)
  {
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  private getUserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY);
    if(userJson)return JSON.parse(userJson)as User;
    return new User();

  }
}
