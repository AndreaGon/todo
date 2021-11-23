import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {TasksComponent} from './tasks.component';
import {TaskItemComponent} from '../task-item/task-item.component';
//import {TaskService} from '../../services/task.service';

describe('TasksComponent', ()=>{
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let debugging: DebugElement;
  let element: HTMLElement;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[BrowserModule, HttpClientTestingModule],
      declarations: [TasksComponent, TaskItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(TasksComponent);

      component = fixture.componentInstance;

      fixture.detectChanges();
    });
  });

  //Demo of snapshot test for Jest
  it(`should display a task item`, async()=>{
    component.tasks = [
      {
        id: 1,
        text: "Testing title",
        day: "Testing day",
        reminder: false
      }
    ]

    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it(`should display a new data in the task list when there is new data`, async()=>{
    component.tasks = [
      {
        id: 1,
        text: "Testing title",
        day: "Testing day",
        reminder: false
      }
    ]

    component.ngOnInit();
    fixture.detectChanges();

    //Test if there is ONE data in the list UI
    expect(fixture).toMatchSnapshot();

    component.tasks.push(
      {
        id: 2,
        text: "Testing title 2",
        day: "Testing day 2",
        reminder: true
      }
    );

    fixture.detectChanges();

    //Test if there is TWO data in the list UI
    expect(fixture).toMatchSnapshot();

  });

  it(`should not display a task item if empty`, async()=>{
    component.tasks = [];
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it(`task should have green marker when set reminder is true`, async()=>{
    component.tasks = [
      {
        id: 1,
        text: "Testing title",
        day: "Testing day",
        reminder: false
      },
      {
        id: 2,
        text: "Testing title",
        day: "Testing day",
        reminder: true
      },
      {
        id: 3,
        text: "Testing title",
        day: "Testing day",
        reminder: true
      },
      {
        id: 4,
        text: "Testing title",
        day: "Testing day",
        reminder: true
      },
      {
        id: 5,
        text: "Testing title",
        day: "Testing day",
        reminder: false
      }
      
    ]

    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});