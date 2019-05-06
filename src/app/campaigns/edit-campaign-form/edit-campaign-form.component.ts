import { Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerializableCampaign } from '../models/serializable-campaign';
import { CampaignService } from '../campaign-service';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-edit-campaign-form',
  templateUrl: './edit-campaign-form.component.html',
  styleUrls: ['./edit-campaign-form.component.css']
})
export class EditCampaignFormComponent implements OnInit {
  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can't be dismissed by clicking outside of the modal
  };

  public errorMessages = {
    name: {
      required: 'Campaign name can\'t be empty.',
    },
  };

  public form: FormGroup;
  public campaign: SerializableCampaign = new SerializableCampaign();
  public fakePackages = [];

  constructor(@Inject('CampaignService') private campaignService: CampaignService, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.campaign.name, Validators.required,
      ],
      packages: []
    });
  }

  public initialize(campaign: Campaign | null) {
    this.form.reset();

    if (campaign != null) {
      this.campaign.campaignId = campaign.campaignId;
      this.campaign.name = campaign.name;

      // TODO: Shouldn't data binding just work here?
      this.form.controls['name'].setValue(this.campaign.name);
    }
  }

  public onSubmit(): Promise<void> {
    if (!this.form.valid) {
      throw new Error('Invalid form submitted.');
    }

    if (this.campaign.campaignId != null) {
      return this.saveCampaign(this.campaign.campaignId);
    } else {
      return this.addCampaign();
    }
  }

  private addCampaign(): Promise<void> {
    this.campaign = Object.assign({}, this.form.value);
    return this.campaignService.createCampaign(this.campaign.name).then(campaignId => {
      if (campaignId == null) {
        throw new Error('Error saving campaign with id: ' + campaignId);
      }
    });
  }

  private saveCampaign(campaignId: string): Promise<void> {
    this.campaign = Object.assign({}, this.form.value);
    return this.campaignService.saveCampaign(this.campaign.name, campaignId);
  }
}
