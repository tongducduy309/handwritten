import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandwritingRecognitionComponent } from './handwriting-recognition.component';

describe('HandwritingRecognitionComponent', () => {
  let component: HandwritingRecognitionComponent;
  let fixture: ComponentFixture<HandwritingRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandwritingRecognitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandwritingRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
