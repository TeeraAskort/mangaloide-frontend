import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  public id: number | undefined = undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    const param: string | null = route.snapshot.paramMap.get('id');
    if (param) {
      this.id = parseInt(param, 10);
    } else {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {}
}
