import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawBridgeComponent } from './draw-bridge.component';

describe('DrawBridgeComponent', () => {
  let component: DrawBridgeComponent;
  let fixture: ComponentFixture<DrawBridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
