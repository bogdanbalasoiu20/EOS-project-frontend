import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/teams';

  getTeams() {
    return this.http.get<any[]>(this.api);
  }

  getLeadingTeams() {
    return this.http.get<any[]>(`${this.api}/my/leading`);
  }

  getMemberTeams() {
    return this.http.get<any[]>(`${this.api}/my/member`);
  }

  createTeam(team: any) {
    return this.http.post(this.api, team);
  }

  updateTeam(teamId: number, team: any) {
    return this.http.patch(`${this.api}/${teamId}`, team);
  }

  getTeamById(teamId: number) {
    return this.http.get<any>(`${this.api}/${teamId}`);
  }

  getMembers(teamId: number) {
    return this.http.get<any[]>(`${this.api}/${teamId}/members`);
  }

  getUsersNotInTeam(teamId: number) {
    return this.http.get<any[]>(`http://localhost:8080/users/not-in-team/${teamId}`);
  }

  addMember(teamId: number, userId: number) {
    return this.http.post(`${this.api}/${teamId}/members`, {
      userId: userId
    });
  }

  removeMember(teamId: number, userId: number) {
    return this.http.delete(`${this.api}/${teamId}/members/${userId}`);
  }

}
