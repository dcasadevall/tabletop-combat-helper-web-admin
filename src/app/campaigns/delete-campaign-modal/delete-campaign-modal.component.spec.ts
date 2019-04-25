import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCampaignModalComponent } from './delete-campaign-modal.component';

describe('DeleteCampaignModalComponent', () => {
  let component: DeleteCampaignModalComponent;
  let fixture: ComponentFixture<DeleteCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
