import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorModelComponent } from './generator-model.component';

describe('GeneratorModelComponent', () => {
  let component: GeneratorModelComponent;
  let fixture: ComponentFixture<GeneratorModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratorModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
