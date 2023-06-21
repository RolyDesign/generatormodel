import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWeakEntityFieldsComponent } from './list-weak-entity-fields.component';

describe('ListWeakEntityFieldsComponent', () => {
  let component: ListWeakEntityFieldsComponent;
  let fixture: ComponentFixture<ListWeakEntityFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWeakEntityFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWeakEntityFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
