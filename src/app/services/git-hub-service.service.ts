import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repo } from '../models/Repo';
import { Commit } from '../models/Commit';

@Injectable({
  providedIn: 'root'
})
export class GitHubServiceService {

  private API_BASE_URL = 'https://api.github.com/';

  constructor(
    private http: HttpClient
  ) { }

  public saveAuthentication(username: string, key: string) {
    const auth = { username, key };
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  public getAuthentication() {
    const auth = localStorage.getItem('auth');
    return JSON.parse(auth);
  }

  public getCurrentUserRepos(): Observable<Repo[]> {
    const { username } = this.getAuthentication();
    return this.getUserRepos(username);
  }

  public getUserRepos(username: string): Observable<Repo[]> {
    console.log('getting user repos for ', username);
    return this.http.get<Repo[]>(`${this.API_BASE_URL}users/${username}/repos`);
  }

  public getRepoCommitsforCurrentUser(repo: string): Observable<Commit[]> {
    const { username } = this.getAuthentication();
    return this.getRepoCommitsForUser(repo, username);
  }

  public getRepoCommitsForUser(repo: string, username: string): Observable<Commit[]> {
    return this.http.get<Commit[]>(`${this.API_BASE_URL}repos/${username}/${repo}/commits`);
  }
}
