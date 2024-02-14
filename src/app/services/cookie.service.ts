import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private cookieStore = new Map<string, string>();

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = new Map<string, string>();
    if (!cookies) { return; }
    const cookiesArr = cookies.split(';');
    cookiesArr.forEach( cookie => {
      let pair = cookie.split('=');
      this.cookieStore.set(pair[0].trim(), pair[1]);
    })
  }

  get(key: string) {
    this.parseCookies();
    return this.cookieStore.has(key) ? this.cookieStore.get(key) : null;
  }

  remove(key: string) {
    // document.cookie = key = '; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/';
    document.cookie = '';
    this.set(key,'');
  }

  set(key: string, value: string) {
    document.cookie = key + '=' + (value || '');
  }
}
