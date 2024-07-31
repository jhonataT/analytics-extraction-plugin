import { Entity } from "../../core/domain/Entity";

type ResponsibleProps = {
  token: string;
  email?: string;
  createdAt?: Date;
  lastAccess?: Date;
  lastExtractionsCount: number
};

export class Responsible extends Entity<ResponsibleProps> {
  private constructor(props: ResponsibleProps, id?: string) {
    super(props, id);
  };

  static create(props: ResponsibleProps, id?: string) {
    const responsible = new Responsible({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      lastAccess: props.lastAccess ?? new Date(),
    }, id);

    return responsible;
  };
};