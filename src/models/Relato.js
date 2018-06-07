/* eslint-disable no-underscore-dangle */
class Relato {
  constructor(conteudo, intensidadeDaEmocao, opcionais) {
    this.conteudo = conteudo;
    this.intensidadeDaEmocao = intensidadeDaEmocao;
    this.id = opcionais ? opcionais.id : undefined;
    this.createdAt = opcionais ? opcionais.createdAt : undefined;
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

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(valor) {
    if (!(valor instanceof Date) && typeof valor !== 'undefined') {
      throw new Error('Propriedade createdAt deve ser um Date() ou undefined.');
    } else {
      this._createdAt = valor;
    }
  }

  get conteudo() {
    return this._conteudo;
  }

  set conteudo(valor) {
    if (typeof valor !== 'string') {
      throw new Error('Propriedade conteúdo deve ser uma string.');
    } else if (valor === '') {
      throw new Error('Propriedade conteúdo não pode ser vazia.');
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
      createdAt: this.createdAt,
    };
  }
}

export default Relato;
