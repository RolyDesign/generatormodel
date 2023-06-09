import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditappComponent } from './editapp.component';

describe('EditappComponent', () => {
  let component: EditappComponent;
  let fixture: ComponentFixture<EditappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
