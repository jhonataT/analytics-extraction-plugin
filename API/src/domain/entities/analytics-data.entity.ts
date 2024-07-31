import { Entity } from "../../core/domain/Entity";

type AnalyticsDataProps = {
  device: 'android' | 'ios' | 'desktop';
  os: string;
  sourceDomainUrl: string;
  themeChangeCount: number;
  createdAt?: Date;
};

export class AnalyticsData extends Entity<AnalyticsDataProps> {
  private constructor(props: AnalyticsDataProps, id?: string) {
    super(props, id);
  };

  static create(props: AnalyticsDataProps, id?: string) {
    const analyticsData = new AnalyticsData({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id);

    return analyticsData;
  };
};