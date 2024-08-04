import { db } from '../config.firebase';
import { IResponsibleTokenRepository } from '../../../application/repositories/IResponsibleTokenRepository';
import { ResponsibleToken } from '../../../domain/entities/responsible-token.entity';

export class FirebaseResponsibleTokenRepository implements IResponsibleTokenRepository {
  private dbRef = db.ref('responsibleTokens');

  async save(responsibleToken: ResponsibleToken): Promise<ResponsibleToken> {
    const newResponsibleRef = this.dbRef.push();
    await newResponsibleRef.set(responsibleToken.toJSON());

    return ResponsibleToken.fromJSON({
      ...responsibleToken.toJSON(),
      id: newResponsibleRef.key as string
    });
  };

  async getResponsibleToken(token: string): Promise<ResponsibleToken | null> {
    const tokensRef = this.dbRef;
    
    const snapshot = await tokensRef.orderByChild('token').equalTo(token).once('value');
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const key = Object.keys(data)[0];
      return ResponsibleToken.fromJSON(data[key]);
    };
  
    return null;
  };
};
