/* eslint-disable no-underscore-dangle */
import Relato from '@/models/Relato';
import Repository from '@/repository/Repository';

class RelatoRepository extends Repository {
  /* Retorna a referencia da coleção */
  static _getUserRelatosCollectionReference(userId) {
    return Repository.getUserDocumentReference(userId).collection('relatos');
  }

  /* Retorna todos os relatos do usuário */
  static async getTodosRelatos(userId) {
    const relatosRef = RelatoRepository._getUserRelatosCollectionReference(userId);

    return relatosRef.get().then((querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push(
          new Relato(doc.data().conteudo, doc.data().intensidadeDaEmocao, { id: doc.id }),
        );
      });
      return lista;
    });
  }

  /* Adiciona um novo relato */
  static async addNovoRelato(userId, relato) {
    /* Se não receber um relato, gera uma exceção */
    if (!(relato instanceof Relato)) {
      throw Error('relato deve ser um objeto Relato');
    }
    const relatosRef = RelatoRepository._getUserRelatosCollectionReference(userId);

    relatosRef.add(relato.getData())
      .then((docRef) => {
        console.log('Suuucesso:', docRef);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


export default RelatoRepository;
