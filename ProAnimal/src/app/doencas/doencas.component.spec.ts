import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencasComponent } from './doencas.component';

describe('DoencasComponent', () => {
  let component: DoencasComponent;
  let fixture: ComponentFixture<DoencasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoencasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
