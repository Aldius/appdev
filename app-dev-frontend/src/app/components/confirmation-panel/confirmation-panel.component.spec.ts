import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPanelComponent } from './confirmation-panel.component';

describe('ConfirmationPanelComponent', () => {
  let component: ConfirmationPanelComponent;
  let fixture: ComponentFixture<ConfirmationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
