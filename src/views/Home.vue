<template>

    <v-container fluid :grid-list-lg="relatosLista.length" :fill-height="!relatosLista.length" style="padding: 0;">

      <!-- Dialog -->
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Tem certeza que você quer excluir o relato?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" flat="flat" @click.native="removerRelato()">Excluir</v-btn>
            <v-btn color="success" flat="flat" @click.native="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <v-flex xs12 sm8 lg8 offset-sm2 offset-lg2 align-center>

          <div v-if="relatosReady">
            <!-- Cartão default, caso não haja nenhum relato -->
            <v-card v-if="!relatosLista.length" flat height="100%" color="transparent">
              <v-card-text>
                <div class="text-xs-center">
                  <v-icon x-large color="iconLight">fa fa-book</v-icon>
                  <p class="textBackgroundLight--text" style="font-size: 1.25em">
                    <br/>
                    Nada aqui!
                  </p>
                </div>
              </v-card-text>
            </v-card>

            <!-- Mostra os relatos do usuário -->
            <v-layout v-else row wrap>

              <!-- Itera pela lista de cartões -->
              <template v-for="cartao in relatosLista">

                <v-flex xs12>

                  <v-card raised color="cartaoBackground">

                    <!-- Titulo -->
                    <v-card-title primary-title class="v-card-title">
                      <div class="title ellipsis">{{ cartao.titulo }}</div>
                    </v-card-title>

                    <!-- Texto -->
                    <v-card-text class="v-card-text">

                      <!-- Relato -->
                      <div class="body-1 ellipsis">
                        <span v-if="cartao.data" class="caption grey--text text--darken-3">{{cartao.data}} - </span>
                        {{ cartao.conteudo }}

                      </div>

                      <!-- Pessoas -->
                      <div v-if="false">
                        <br/>
                        <v-icon>person</v-icon>
                        <template v-for="pessoa in cartao.pessoas">
                          <v-chip color="cartaoChip" small>{{pessoa}}</v-chip>
                        </template>
                      </div>

                      <!-- Tags -->
                      <div v-if="false">
                        <br/>
                        <v-icon>local_offer</v-icon>
                        <template v-for="tag in cartao.tags">
                          <v-chip color="cartaoChip" small>{{tag}}</v-chip>
                        </template>
                      </div>

                    </v-card-text>

                    <!-- Ações do Cartão -->
                    <v-card-actions>
                      <v-layout row justify-space-around>
                        <template v-for="botaoRodape in relatoBotoesRodape">
                          <v-flex class="text-xs-center">
                            <v-btn flat :disabled="botaoRodape.desabilitado" @click="acaoRelato(botaoRodape.id, cartao)">
                              <v-icon color="iconLight">
                                {{ botaoRodape.icone }}
                              </v-icon>
                            </v-btn>
                          </v-flex>
                        </template>
                      </v-layout>
                    </v-card-actions>

                  </v-card>

                </v-flex>

              </template>

            </v-layout>
          </div>

          <!-- FAB -->
          <button-action
                  cor="accent"
                  icone="create"
                  @botao-clicado="relato"/>

        </v-flex>
    </v-container>
</template>

<script>

    import ButtonAction from '@/components/ButtonAction';
    import relatoService from '@/services/RelatoService';

    // EventBus - lida com as mensagens entre componentes não parentais
    import EventBus from '@/main';

    export default {
      name: 'home',
      components: {
        ButtonAction,
      },
      data: () => ({
        dialog: false,
        relatosReady: false,
        relatosLista: [],
        relatoBotoesRodape: [
          /* {
            icone: 'mdi-book-open-variant',
            desabilitado: true,
          }, */
          {
            id: 'EDITAR',
            icone: 'mode_edit',
            desabilitado: true,
          },
          {
            id: 'REMOVER',
            icone: 'delete',
            desabilitado: false,
          },
        ],
        relatoParaRemocao: null,
      }),
      methods: {

        /* FAB */

        relato() {
          this.$router.push('/relato');
        },

        acaoRelato(acao, relato) {
          switch (acao) {
            case 'REMOVER':
              this.confirmarRemocaoDeRelato(relato);
              break;
            default:
              break;
          }
        },

        confirmarRemocaoDeRelato(relato) {
          this.relatoParaRemocao = relato;
          this.dialog = true;
        },

        removerRelato() {
          this.dialog = false;
          relatoService.removerRelato(this.relatoParaRemocao).then(() => {
            this.relatosLista = this.relatosLista.filter(r => r !== this.relatoParaRemocao);
            EventBus.$emit('toaster', {
              texto: 'Relato removido com sucesso',
              cor: 'success',
            });
          },
          );
        },
      },

      mounted() {
        try {
          relatoService.getTodosRelatos().then((relatos) => {
            this.relatosLista = relatos;
            this.relatosReady = true;
          });
        } catch (e) {
          if (e.name !== 'NotReadyException') {
            throw e;
          }
        }
      },
    };
</script>

<style scoped>

    .v-card-title {
        padding-top: 16px;
        padding-bottom: 4px;
    }

    .v-card-text {
        padding-top: 4px;
        padding-bottom: 4px;
    }

    .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

</style>
