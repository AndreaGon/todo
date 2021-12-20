import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';

import {DebugElement} from '@angular/core';

import {AddTaskComponent} from './add-task.component';

describe('AddTaskComponent', ()=>{
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let debugging: DebugElement;
  let element: HTMLElement;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations:[AddTaskComponent]

    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(AddTaskComponent);

      debugging = fixture.debugElement.query(By.css('form'));
      component = fixture.componentInstance;

      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be hidden initially`, async()=>{
    expect(debugging).toBeNull();
  });

  it(`should be visible when add button is clicked`, async()=>{
    component.showAddTask = true;
    fixture.detectChanges();
    debugging = fixture.debugElement.query(By.css('form'));

    expect(debugging).toBeDefined();
  });

  it(`should clear the form on submit`, async()=>{
    component.text = "Testing Title";
    component.day = "Testing day";
    component.reminder = true;

    component.onSubmit();
    fixture.detectChanges();

    expect(component.text).toBe('Testing Title');
    expect(component.day).toBe('Testing day');
    expect(component.reminder).toBeFalsy();
  });

  it(`should display error when form is submitted empty`, async()=>{
    spyOn(window, "alert");
    
    component.onSubmit();
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith("Please add a task!");
  });

});
