import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFieldsComponent } from './list-fields.component';

describe('ListFieldsComponent', () => {
  let component: ListFieldsComponent;
  let fixture: ComponentFixture<ListFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
