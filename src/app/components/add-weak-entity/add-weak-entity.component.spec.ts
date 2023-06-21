import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeakEntityComponent } from './add-weak-entity.component';

describe('AddWeakEntityComponent', () => {
  let component: AddWeakEntityComponent;
  let fixture: ComponentFixture<AddWeakEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeakEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeakEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
