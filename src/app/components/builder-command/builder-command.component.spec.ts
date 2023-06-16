import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderCommandComponent } from './builder-command.component';

describe('BuilderCommandComponent', () => {
  let component: BuilderCommandComponent;
  let fixture: ComponentFixture<BuilderCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderCommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
