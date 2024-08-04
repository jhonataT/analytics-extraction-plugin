import { Entity } from "../../core/domain/Entity";
import { generateToken } from "../../infra/jwt/services/jwt.service";

type ResponsibleProps = {
  token?: string;
  domain: string;
  email?: string;
  createdAt?: Date;
  lastAccess?: Date;
};

export class ResponsibleToken extends Entity<ResponsibleProps> {
  private constructor(props: ResponsibleProps, id?: string) {
    super(props, id);
    this.setToken(generateToken({ domain: props.domain, email: props.email, id: this._id }));
  };

  toJSON() {
    return {
      id: this.id,
      token: this.props.token,
      domain: this.props.domain,
      email: this.props.email,
      createdAt: this.props.createdAt,
      lastAccess: this.props.lastAccess
    };
  };

  static fromJSON(json: any): ResponsibleToken {
    return new ResponsibleToken({
      token: json.token,
      domain: json.domain,
      email: json.email,
      createdAt: json.createdAt,
      lastAccess: json.lastAccess,
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

  setToken(newToken: string) {
    this.props.token = newToken;
  }
};