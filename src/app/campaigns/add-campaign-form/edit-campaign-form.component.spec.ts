import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignFormComponent } from './edit-campaign-form.component';

describe('EditCampaignFormComponent', () => {
  let component: EditCampaignFormComponent;
  let fixture: ComponentFixture<EditCampaignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCampaignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
