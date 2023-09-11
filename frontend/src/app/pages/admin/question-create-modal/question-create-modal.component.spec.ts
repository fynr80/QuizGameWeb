import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreateModalComponent } from './question-create-modal.component';

describe('QuestionCreateModalComponent', () => {
  let component: QuestionCreateModalComponent;
  let fixture: ComponentFixture<QuestionCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
