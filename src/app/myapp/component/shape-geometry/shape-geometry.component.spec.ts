import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeGeometryComponent } from './shape-geometry.component';

describe('ShapeGeometryComponent', () => {
  let component: ShapeGeometryComponent;
  let fixture: ComponentFixture<ShapeGeometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeGeometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
