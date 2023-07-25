import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerModalComponent } from './player-modal.component';

describe('PlayerModalComponent', () => {
  let component: PlayerModalComponent;
  let fixture: ComponentFixture<PlayerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
