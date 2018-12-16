import { Component, OnInit } from '@angular/core';
import { WareService } from '../../shared/services/ware.service';
import { ComponentBase } from '../../shared/components/component-base';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './wares.component.html'
})
export class WaresComponent extends ComponentBase implements OnInit {
  entities: any[];

  constructor(private wareService: WareService, private router: Router, private titleService: Title) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('X4:Foundations - Wares');
    this.wareService
      .getWares()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.entities = data;
      });
  }

  showEntity(item: any) {
    return this.router.navigate(['/wares', item.id]);
  }
}