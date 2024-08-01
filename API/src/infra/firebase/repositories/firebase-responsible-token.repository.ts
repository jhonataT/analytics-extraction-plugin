import { db } from '../config.firebase';
import { IResponsibleTokenRepository } from '../../../application/repositories/IResponsibleTokenRepository';
import { ResponsibleToken } from '../../../domain/entities/responsible-token.entity';

export class FirebaseResponsibleTokenRepository implements IResponsibleTokenRepository {
  private dbRef = db.ref('analyticsData');

  async save(responsibleToken: ResponsibleToken): Promise<ResponsibleToken> {
    const newResponsibleRef = this.dbRef.push();
    await newResponsibleRef.set(responsibleToken.toJSON());

    return ResponsibleToken.fromJSON({
      ...responsibleToken.toJSON(),
      id: newResponsibleRef.key as string
    });
  };

  async getResponsibleToken(token: string): Promise<ResponsibleToken | null> {
    const responsibleRef = this.dbRef.child(token);
    const snapshot = await responsibleRef.once('value');

    if (snapshot.exists())
      return ResponsibleToken.fromJSON(snapshot.val());

    return null;
  };
};
