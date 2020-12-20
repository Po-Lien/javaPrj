import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
//import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) { }

  // private authClient = new OktaAuth({
  //     issuer: 'https://{YourOktaDomain}/oauth2/default',
  //     clientId: '{ClientId}'
  //   });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  async checkAuthenticated() {
    const authenticated = true;
    //const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated)
    return authenticated;
  }

  async login(username: string, password: string) {
    //const transaction = await this.authClient.signIn({username, password});
    // if (transaction.status !== 'SUCCESS') {
    //   throw Error('We cannot handle the ' + transaction.status + ' status');
    // }
    if(this.isAuthenticated)
    this.isAuthenticated.next(true);
    else
    this.isAuthenticated.next(false);
    //this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string) {
    try {
      //await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
