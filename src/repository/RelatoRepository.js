/* eslint-disable no-underscore-dangle */
import Relato from '@/models/Relato';
import Repository from '@/repository/Repository';

class RelatoRepository extends Repository {
  /* Retorna a referencia da coleção */
  static _getUserRelatosCollectionReference(userId) {
    return Repository.getUserDocumentReference(userId).collection('relatos');
  }

  /* Retorna a referencia da coleção */
  static _getUserRelatoDocumentReference(userId, relato) {
    return RelatoRepository._getUserRelatosCollectionReference(userId).doc(relato.id);
  }

  /* Retorna todos os relatos do usuário */
  static async getTodosRelatos(userId) {
    const relatosRef =
      RelatoRepository._getUserRelatosCollectionReference(userId)
        .orderBy('createdAt', 'desc');

    return relatosRef.get().then((querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push(
          new Relato(doc.data().conteudo, doc.data().intensidadeDaEmocao, {
            id: doc.id,
          }),
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
    const relatosRef = RelatoRepository
      ._getUserRelatosCollectionReference(userId);

    return relatosRef.add(relato.getData())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Erro ao adicionar um novo relato', error);
        throw Error(error);
      });
  }

  /* Deletar um relato */
  static async removerRelato(userId, relato) {
    /* Se não receber um relato, gera uma exceção */
    if (!(relato instanceof Relato)) {
      throw Error('relato deve ser um objeto Relato');
    }
    const relatoRef = RelatoRepository
      ._getUserRelatoDocumentReference(userId, relato);

    return relatoRef.delete()
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Erro ao remover um novo relato', error);
        throw Error(error);
      });
  }
}

export default RelatoRepository;
