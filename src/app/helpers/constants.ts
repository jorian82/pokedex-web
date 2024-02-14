import { HttpHeaders } from "@angular/common/http";

/* Standalone */
export const API_URL = '/api/';

/* Separate application */
// export const API_URL = 'http://localhost:8080/api/';

export const httpOptions = {
  headers: new HttpHeaders( {'Content-Type':'application/json'})
}
