/* eslint-disable no-param-reassign */
import relatoRepository from '@/repository/RelatoRepository';
import servicesUtils from '@/utils/ServicesUtils';
import userUtils from '@/utils/UserUtils';
import { NotReadyException } from '@/exceptions/exceptions';

class RelatoService {
  static getTodosRelatos() {
    // Se o usuário não está logado ou o firebase não está inicializado, retorna nulo
    if (!servicesUtils.isUsuarioLogadoEFirebaseInicializado()) {
      throw new NotReadyException();
    }

    return relatoRepository.getTodosRelatos(userUtils.getUserId());
  }

  static addNovoRelato(relato) {
    // Se o usuário não está logado ou o firebase não está inicializado, retorna nulo
    if (!servicesUtils.isUsuarioLogadoEFirebaseInicializado()) {
      throw new NotReadyException();
    }

    // Adiciona a hora da criação no relato
    relato.createdAt = new Date();

    try {
      return relatoRepository.addNovoRelato(userUtils.getUserId(), relato);
    } catch (e) {
      throw e;
    }
  }

  static removerRelato(relato) {
    // Se o usuário não está logado ou o firebase não está inicializado, retorna nulo
    if (!servicesUtils.isUsuarioLogadoEFirebaseInicializado()) {
      throw new NotReadyException();
    }

    try {
      return relatoRepository.removerRelato(userUtils.getUserId(), relato);
    } catch (e) {
      throw e;
    }
  }
}


export default RelatoService;
