import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingComponentComponent } from './reading-component.component';

describe('ReadingComponentComponent', () => {
  let component: ReadingComponentComponent;
  let fixture: ComponentFixture<ReadingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
