import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSimpleComponent } from './load-simple.component';

describe('LoadSimpleComponent', () => {
  let component: LoadSimpleComponent;
  let fixture: ComponentFixture<LoadSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
