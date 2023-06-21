import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWeakEntitiesComponent } from './list-weak-entities.component';

describe('ListWeakEntitiesComponent', () => {
  let component: ListWeakEntitiesComponent;
  let fixture: ComponentFixture<ListWeakEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWeakEntitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWeakEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
