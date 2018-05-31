/* eslint-disable no-underscore-dangle */
class Relato {
  constructor(conteudo, intensidadeDaEmocao, opcionais) {
    this.conteudo = conteudo;
    this.intensidadeDaEmocao = intensidadeDaEmocao;
    this.id = opcionais ? opcionais.id : undefined;
  }

  /* Getters and Setters */

  get id() {
    return this._id;
  }

  set id(valor) {
    if (typeof valor !== 'string' && typeof valor !== 'undefined') {
      throw new Error('Propriedade id deve ser uma string ou undefined.');
    } else {
      this._id = valor;
    }
  }

  get conteudo() {
    return this._conteudo;
  }

  set conteudo(valor) {
    if (typeof valor !== 'string') {
      throw new Error('Propriedade conteúdo deve ser uma string.');
    } else {
      this._conteudo = valor;
    }
  }

  get intensidadeDaEmocao() {
    return this._intensidadeDaEmocao;
  }

  set intensidadeDaEmocao(valor) {
    if (typeof valor !== 'number') {
      throw new Error('Propriedade intensidadeDaEmocao deve ser um number.');
    } else {
      this._intensidadeDaEmocao = valor;
    }
  }

  /* Methods */

  /* Método necessário para não armazenar dados de controle como dados do
  documento no banco de dados */
  getData() {
    return {
      conteudo: this.conteudo,
      intensidadeDaEmocao: this.intensidadeDaEmocao,
    };
  }
}

export default Relato;
