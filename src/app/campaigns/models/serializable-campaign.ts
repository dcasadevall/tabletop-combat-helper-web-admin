import { Campaign } from './campaign';
import { identifier, primitive, serializable } from 'serializr';

export class SerializableCampaign implements Campaign {
  @serializable(identifier())
  public campaignId: string;

  @serializable(primitive())
  public name: string;

  public constructor(name?: string, campaignId?: string) {
    this.name = name;
    this.campaignId = campaignId;
  }
}
