import { Campaign } from './campaign';
import { identifier, primitive, serializable } from 'serializr';

export class SerializableCampaign implements Campaign {
  @serializable(identifier())
  private readonly _campaignId: string;
  public get campaignId(): string {
    return this._campaignId;
  }

  @serializable(primitive())
  private readonly _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor(public readonly name: string, campaignId: string) {
    this._name = name;
    this._campaignId = campaignId;
  }
}
