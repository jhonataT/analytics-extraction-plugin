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

  static async create(props: AnalyticsDataProps, id?: string): Promise<string>  {
    const analyticsData = new AnalyticsData({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id);

    return analyticsData._id;
  };
};