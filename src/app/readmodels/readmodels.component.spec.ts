import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmodelsComponent } from './readmodels.component';

describe('ReadmodelsComponent', () => {
  let component: ReadmodelsComponent;
  let fixture: ComponentFixture<ReadmodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmodelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
