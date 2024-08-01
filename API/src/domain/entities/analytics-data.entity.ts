import { Entity } from "../../core/domain/Entity";

type AnalyticsDataProps = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  responsibleToken: string;
  createdAt?: Date;
};

export class AnalyticsData extends Entity<AnalyticsDataProps> {
  private constructor(props: AnalyticsDataProps, id?: string) {
    super(props, id);
  };

  toJSON() {
    return {
      device: this.props.device,
      os: this.props.os,
      sourceDomainUrl: this.props.sourceDomainUrl,
      themeChangeCount: this.props.themeChangeCount,
      responsibleToken: this.props.responsibleToken,
      id: this.id,
      createdAt: this.props.createdAt?.toISOString()
    };
  };

  static fromJSON(json: any): AnalyticsData {
    return new AnalyticsData({
      device: json.device,
      os: json.os,
      sourceDomainUrl: json.sourceDomainUrl,
      themeChangeCount: json.themeChangeCount,
      responsibleToken: json.responsibleToken,
      createdAt: json.createdAt ? new Date(json.createdAt) : undefined
    }, json.id);
  }

  static async create(props: AnalyticsDataProps, id?: string): Promise<AnalyticsData>  {
    const analyticsData = new AnalyticsData({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id);

    return analyticsData;
  };
};