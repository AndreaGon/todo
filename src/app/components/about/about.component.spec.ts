import {ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { AboutComponent } from './about.component';
import {appRoutes} from "../../app.module";
import { TasksComponent } from '../tasks/tasks.component';

describe('AboutComponent', ()=>{
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let debugging: DebugElement;
  let element: HTMLElement;

  let location: Location;
  let router: Router;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations:[AboutComponent, TasksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(()=>{
      router = TestBed.get(Router);

      location = TestBed.get(Location);
      router.initialNavigation();

      fixture = TestBed.createComponent(AboutComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should display title', async()=>{
    element = fixture.debugElement.query(By.css("h2")).nativeElement;
    expect(element.textContent).toContain("Task Tracker");
  });

  it('should display title', async()=>{
    element = fixture.debugElement.query(By.css("h4")).nativeElement;
    expect(element.textContent).toContain("Version: 1.0.0");
  });

  it('should route to Home page (FakeRoute)', fakeAsync(()=>{
    element = fixture.debugElement.query(By.css(".home")).nativeElement;
    element.click();
    tick();
    expect(location.path()).toBe('/');
  }));
});