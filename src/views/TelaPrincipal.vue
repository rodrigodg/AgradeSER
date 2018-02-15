<template>

    <v-container fluid :grid-list-lg="cartoesLista.length" :fill-height="!cartoesLista.length">
        <v-flex xs12 sm8 lg8 offset-sm2 offset-lg2 align-center>

            <!-- Cartão default, caso não haja nenhum relato -->
            <v-card v-if="!cartoesLista.length" flat height="100%" color="transparent">
                <v-card-text>
                    <div class="text-xs-center">
                        <v-icon x-large color="iconLight">fa-book</v-icon>
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
                <template v-for="cartao in cartoesLista">

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
                                    <span class="caption grey--text text--darken-3">{{cartao.data}}</span>
                                    -
                                   {{ cartao.relato }}

                                </div>

                                <!-- Pessoas -->
                                <br/>
                                <v-icon>person</v-icon>
                                <template v-for="pessoa in cartao.pessoas">
                                    <v-chip color="cartaoChip" small>{{pessoa}}</v-chip>
                                </template>

                                <!-- Tags -->
                                <br/>
                                <v-icon>local_offer</v-icon>
                                <template v-for="tag in cartao.tags">
                                    <v-chip color="cartaoChip" small>{{tag}}</v-chip>
                                </template>

                            </v-card-text>

                            <!-- Ações do Cartão -->
                            <v-card-actions>
                                <v-layout row justify-space-around>
                                    <template v-for="botaoRodape in cartaoBotoesRodape">
                                        <v-flex>
                                            <v-btn flat :disabled="botaoRodape.desabilitado">
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

    export default {
      name: 'telaPrincipal',
      components: {
        ButtonAction,
      },
      data: () => ({
        cartoesLista: [
          {
            titulo: 'Um dia como um outro qualquer',
            relato: 'Hoje foi um dia como outro qualquer, sem nada de novo e nada a mencionar',
            data: '10/05/10',
            pessoas: ['João', 'Paulo', 'Menezes'],
            tags: ['dia', 'qualquer'],
          },
          {
            titulo: 'Segundo Titulo',
            relato: 'Segundo Relato',
            data: '05/10/05',
            pessoas: ['SegPri', 'SegSeg'],
            tags: ['Seg', 'SegTer'],
          },
        ],
        cartaoBotoesRodape: [
          {
            icone: 'mdi-book-open-variant',
            desabilitado: true,
          },
          {
            icone: 'mode_edit',
            desabilitado: true,
          },
          {
            icone: 'delete',
            desabilitado: true,
          },
        ],
      }),
      methods: {

        /* FAB */

        relato() {
          this.$router.push('/relato');
        },
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
