import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GitHubServiceService } from './services/git-hub-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'CommitViewer';
  public authDetails;
  public authForm;
  public repos = [];
  public commits = [];

  constructor(
    private gitService: GitHubServiceService,
    private formBuilder: FormBuilder
  ) {

    this.authDetails = gitService.getAuthentication();

    this.getRepos();

    this.authForm = this.formBuilder.group({
      username: '',
      key: ''
    });
  }

  public saveAuth(value) {
    const { username, key } = value;
    console.log(value);
    this.gitService.saveAuthentication(username, key);
  }

  public getRepos() {
    this.gitService.getCurrentUserRepos().subscribe(response => {
      console.log('response', response);
      this.repos = response;
    });
  }

  public getCommits(repo: string) {
    this.gitService.getRepoCommitsforCurrentUser(`${repo}`).subscribe(response => {
      console.log(`commits for ${repo}:`, response);
      this.commits = response;
    });
  }
}
