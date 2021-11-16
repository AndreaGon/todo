import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import {ButtonComponent} from '../button/button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugging: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderComponent, ButtonComponent ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(HeaderComponent);

      component = fixture.componentInstance;

      debugging = fixture.debugElement.query(By.css('header'));
      element = debugging.nativeElement;

      fixture.detectChanges();

    });
  });

  it(`should show title 'Task Tracker'`, async()=>{
    element = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(element.textContent).toContain('Task Tracker');
  });

  it(`add button should exist`, async()=>{
    element = fixture.debugElement.query(By.css('app-button')).nativeElement;
    expect(element).toBeTruthy();
  });

  it(`add button should have the text 'Add' initially`, async()=>{
    element = fixture.debugElement.query(By.css('app-button')).nativeElement;
    expect(element.getAttribute('ng-reflect-text')).toBe('Add');
  });

  it(`add button should be green initially`, async()=>{
    element = fixture.debugElement.query(By.css('app-button')).nativeElement;
    expect(element.getAttribute('ng-reflect-color')).toBe('green');
  });

  it(`add button text should turn 'Close' on click`, async()=>{
    element = fixture.debugElement.query(By.css('app-button button')).nativeElement;
    element.click();

    fixture.detectChanges();

    expect(element.textContent?.trim()).toBe('Close');
  });

  it(`add button should be red on open`, async()=>{
    element = fixture.debugElement.query(By.css('app-button button')).nativeElement;
    element.click();

    fixture.detectChanges();

    expect(element.style.backgroundColor).toBe('red');
  });

  it(`add button should have text 'Add' on close`, async()=>{
    component.showAddTask = true;
    element = fixture.debugElement.query(By.css('app-button button')).nativeElement;

    element.click();
    fixture.detectChanges();
    
    expect(element.textContent?.trim()).toBe('Add');
  });

  it(`add button should be green on close`, async()=>{
    component.showAddTask = true;
    element = fixture.debugElement.query(By.css('app-button button')).nativeElement;

    element.click();
    fixture.detectChanges();
    
    expect(element.style.backgroundColor).toBe('green');
  });
});
