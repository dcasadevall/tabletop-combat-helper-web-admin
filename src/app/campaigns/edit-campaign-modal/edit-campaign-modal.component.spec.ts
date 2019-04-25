import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignModalComponent } from './edit-campaign-modal.component';

describe('EditCampaignModalComponent', () => {
  let component: EditCampaignModalComponent;
  let fixture: ComponentFixture<EditCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
