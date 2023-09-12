import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRequestModalComponent } from './quiz-request-modal.component';

describe('QuizRequestModalComponent', () => {
  let component: QuizRequestModalComponent;
  let fixture: ComponentFixture<QuizRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
