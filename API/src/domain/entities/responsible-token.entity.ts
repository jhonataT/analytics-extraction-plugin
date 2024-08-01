import { Entity } from "../../core/domain/Entity";

type ResponsibleProps = {
  token: string;
  email?: string;
  createdAt?: Date;
  lastAccess?: Date;
  lastExtractionsCount: number
};

export class ResponsibleToken extends Entity<ResponsibleProps> {
  private constructor(props: ResponsibleProps, id?: string) {
    super(props, id);
  };

  toJSON() {
    return {
      id: this.id,
      token: this.props.token,
      email: this.props.email,
      createdAt: this.props.createdAt?.toISOString(),
      lastAccess: this.props.lastAccess?.toISOString(),
      lastExtractionsCount: this.props.lastExtractionsCount,
    };
  };

  static fromJSON(json: any): ResponsibleToken {
    return new ResponsibleToken({
      token: json.token,
      email: json.email,
      createdAt: json.createdAt?.toISOString(),
      lastAccess: json.lastAccess?.toISOString(),
      lastExtractionsCount: json.lastExtractionsCount,
      
    }, json.id);
  }

  static create(props: ResponsibleProps, id?: string) {
    const responsible = new ResponsibleToken({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      lastAccess: props.lastAccess ?? new Date(),
    }, id);

    return responsible;
  };
};