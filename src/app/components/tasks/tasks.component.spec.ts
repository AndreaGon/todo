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

    debugging = fixture.debugElement.query(By.css('app-task-item'));
    
    expect(debugging).toBeDefined();
  });

  it(`should not display a task item if empty`, async()=>{
    component.tasks = [];
    component.ngOnInit();
    fixture.detectChanges();

    debugging = fixture.debugElement.query(By.css('app-task-item'));

    expect(debugging).toBeNull();
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

    let element = fixture.debugElement.queryAll(By.css('app-task-item .reminder'));
    
    expect(element.length).toBe(3);
  });
});