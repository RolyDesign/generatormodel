import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeakEntityComponent } from './edit-weak-entity.component';

describe('EditWeakEntityComponent', () => {
  let component: EditWeakEntityComponent;
  let fixture: ComponentFixture<EditWeakEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeakEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWeakEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
