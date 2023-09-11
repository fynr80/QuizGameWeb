import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlyerEditComponent } from './plyer-edit.component';

describe('PlyerEditComponent', () => {
  let component: PlyerEditComponent;
  let fixture: ComponentFixture<PlyerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlyerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
