import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { PersonComponent } from './person.component';
import { PeopleService, Person } from '../people.service';

describe('PersonComponent', () => {
  let fixture: ComponentFixture<PersonComponent>;
  let component: PersonComponent;
  let getPersonSpy: jasmine.Spy;

  const person: Person = {
    "uid": "3",
    "height": "96",
    "mass": "32",
    "hair_color": "n/a",
    "skin_color": "white, blue",
    "eye_color": "red",
    "birth_year": "33BBY",
    "gender": "n/a",
    "created": "2023-07-05T04:41:53.694Z",
    "edited": "2023-07-05T04:41:53.694Z",
    "name": "R2-D2",
    "homeworld": "8"
  };

  const personObs = new Observable<Person>(subscriber => {
    setTimeout(() => {
      subscriber.next(person);

      subscriber.complete();
    });
  });

  beforeEach(() => {
    const peopleService = jasmine.createSpyObj('PeopleService', ['get']);

    TestBed.configureTestingModule({
      imports: [PersonComponent],
      providers: [
        { provide: PeopleService, useValue: peopleService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '5' } } } }
      ]
    });

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    getPersonSpy = peopleService.get.and.returnValue(personObs);
  });

  it('fetches and displays person', fakeAsync(() => {
    expect(component.person).toBeUndefined();

    fixture.detectChanges();

    expect(component.person).toBeUndefined();
    expect(getPersonSpy).toHaveBeenCalledOnceWith('5');

    tick();

    expect(component.person).toEqual(person);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toEqual(' 8 ');
    expect(fixture.debugElement.query(By.css('[data-test-name]')).nativeElement.textContent).toEqual('R2-D2');
  }));
});
