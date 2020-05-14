import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermifugosComponent } from './vermifugos.component';

describe('VermifugosComponent', () => {
  let component: VermifugosComponent;
  let fixture: ComponentFixture<VermifugosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermifugosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermifugosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
