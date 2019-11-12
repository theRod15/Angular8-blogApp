import { Router, RouterEvent, NavigationEnd } from '@angular/router'
import { Post } from 'src/app/models'
import { Component, OnInit } from '@angular/core'

import { filter } from 'rxjs/operators'
import { FetchPosts } from 'src/app/services/fetchPosts.service'

@Component({
  selector: 'dashboard',
  templateUrl: './dashBoard.component.html'
})
export class DashBoard implements OnInit {
  userPosts: Post[]
  constructor(private router: Router, private fetch: FetchPosts) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        console.log('dashboard navigation', event)

        this.fetch.get().subscribe((data: Post[]) => {
          console.log('data updated', data)
          this.userPosts = data
        })
      })
    this.fetch.get().subscribe((data: Post[]) => {
      console.log('first data load', data)
      this.userPosts = data
    })
  }
}
