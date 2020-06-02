import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AniAdocaoComponent } from './ani-adocao.component';

describe('AniAdocaoComponent', () => {
  let component: AniAdocaoComponent;
  let fixture: ComponentFixture<AniAdocaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniAdocaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AniAdocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
