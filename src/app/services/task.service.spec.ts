import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Task} from '../Task';

import {TaskService} from './task.service';
import { Observable } from 'rxjs';

describe('TaskService', ()=>{
    let injector: TestBed;
    let service: TaskService;
    let httpMock: HttpTestingController;

    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[TaskService]
        });

        injector = getTestBed();
        service = injector.inject(TaskService);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(()=>{
        httpMock.verify();
    });

    const dummyData: Task[] = [
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'May 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'May 6th at 1:30pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Food Shopping',
            day: 'May 7th at 12:30pm',
            reminder: false,
        }
    ]

    it('#getTasks should return expected data', async()=>{
        service.getTasks().subscribe((res) =>{
            expect(res.length).toEqual(dummyData.length);
            expect(res).toEqual(dummyData);
        });

        const req = httpMock.expectOne('http://localhost:5000/tasks');
        expect(req.request.method).toBe('GET');
        req.flush(dummyData);
    });

    it("#deleteTask should delete correct task", async()=>{
        service.deleteTask(dummyData[0]).subscribe((res: any)=>{
            expect(res).toBe(1);
        });

        const req = httpMock.expectOne('http://localhost:5000/tasks/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(1);
    });

    it("#addTask should add new data", async()=>{
        const newData = {
            id: 4,
            text: 'Dentist Appointment',
            day: 'May 10th at 12:30pm',
            reminder: true,
        };
        service.addTask(newData).subscribe((res: any)=>{
            console.log(res);
            expect(res).toEqual(4);
        });

        const req = httpMock.expectOne('http://localhost:5000/tasks');
        expect(req.request.method).toBe('POST');
        req.flush(4);
    });

    it("#updateTaskReminder should update existing data", async()=>{
        service.updateTaskReminder(dummyData[0]).subscribe((res: any)=>{
            expect(res).toBe(false);
        });

        const req = httpMock.expectOne('http://localhost:5000/tasks/1');
        expect(req.request.method).toBe('PUT');
        req.flush(false);
    });
});

