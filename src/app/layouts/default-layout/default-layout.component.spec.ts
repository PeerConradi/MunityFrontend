import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  //let fixture: ComponentFixture<DefaultLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(DefaultLayoutComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
    component = new DefaultLayoutComponent(null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});