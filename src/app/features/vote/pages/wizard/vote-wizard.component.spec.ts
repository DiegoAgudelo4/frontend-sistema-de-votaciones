import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteWizardComponent } from './vote-wizard.component';

describe('VoteWizardComponent', () => {
  let component: VoteWizardComponent;
  let fixture: ComponentFixture<VoteWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
