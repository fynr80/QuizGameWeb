import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditModalComponent } from './question-edit-modal.component';

describe('QuestionEditModalComponent', () => {
  let component: QuestionEditModalComponent;
  let fixture: ComponentFixture<QuestionEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
