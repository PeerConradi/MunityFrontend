import { Injectable, Inject } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Presence } from '../models/presence.model';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private userService: UserService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public savePresence(model: Presence) {
    return this.http.put(this.baseUrl + 'api/Presence/SavePresence', model);
  }

  public getLatestPresence(committeeid: string) {
    let headers = new HttpHeaders();
    headers = headers.set('committeeid', committeeid);
    return this.http.get<Presence>(this.baseUrl + 'api/Presence/GetCommitteePresence', { headers: headers });
  }
}
