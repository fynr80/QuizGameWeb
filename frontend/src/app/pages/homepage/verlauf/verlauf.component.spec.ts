import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlaufComponent } from './verlauf.component';

describe('VerlaufComponent', () => {
  let component: VerlaufComponent;
  let fixture: ComponentFixture<VerlaufComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerlaufComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerlaufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
