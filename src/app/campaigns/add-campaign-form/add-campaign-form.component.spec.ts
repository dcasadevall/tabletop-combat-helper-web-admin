import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaignFormComponent } from './add-campaign-form.component';

describe('AddCampaignFormComponent', () => {
  let component: AddCampaignFormComponent;
  let fixture: ComponentFixture<AddCampaignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampaignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
