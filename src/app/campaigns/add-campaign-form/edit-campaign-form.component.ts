import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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

  public onSubmit(): Promise<boolean> {
    if (!this.form.valid) {
      return Promise.resolve(false);
    }

    this.campaign = Object.assign({}, this.form.value);
    return this.campaignService.addCampaign(this.campaign.name).then(campaignId => {
      return campaignId != null;
    });
  }
}
