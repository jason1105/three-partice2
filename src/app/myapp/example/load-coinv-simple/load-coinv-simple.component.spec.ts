import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCoinvSimpleComponent } from './load-coinv-simple.component';

describe('LoadCoinvSimpleComponent', () => {
  let component: LoadCoinvSimpleComponent;
  let fixture: ComponentFixture<LoadCoinvSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadCoinvSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCoinvSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
