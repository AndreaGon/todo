import {ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { FooterComponent } from './footer.component';
import {appRoutes} from "../../app.module";
import { TasksComponent } from '../tasks/tasks.component';
import { AboutComponent } from '../about/about.component';

describe('FooterComponent', ()=>{
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugging: DebugElement;
  let element: HTMLElement;

  let location: Location;
  let router: Router;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations:[FooterComponent, TasksComponent, AboutComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(()=>{
      router = TestBed.get(Router);

      location = TestBed.get(Location);
      router.initialNavigation();

      fixture = TestBed.createComponent(FooterComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it(`should display the Copyright text`, async()=>{
    debugging = fixture.debugElement.query(By.css('footer p'));
    element = debugging.nativeElement;
    expect(element.textContent).toContain('Copyright');
  });

  it('should route to About page (FakeRoute)', fakeAsync(()=>{
    element = fixture.debugElement.query(By.css("footer a")).nativeElement;
    element.click();
    tick();
    expect(location.path()).toBe('/about');
  }));
});