<!--

    Componente: EntryNew

    Responsabilidade: Criar um novo relato do usuário

-->

<template>
    <v-container fluid>

        <!-- Titulo -->
        <v-flex xs10 sm3 lg3>
            <v-text-field
                    name="titulo"
                    label="Título"
                    v-model="form.titulo.texto"
                    :error="form.titulo.error"
            />
        </v-flex>

        <!-- Relato -->
        <v-flex xs12 sm6 lg6>
            <v-text-field
                    name="relato"
                    label="Relato"
                    multi-line
                    v-model="form.relato.texto"
                    :error="form.relato.error"
            />
        </v-flex>

        <!-- Date Picker -->
        <v-flex xs8 sm6 lg3>
            <v-dialog
                    persistent
                    lazy
                    full-width
                    width="290px"
                    v-model="datePickerModal"
                    ref="dialogoData"
                    :return-value.sync="form.data"
            >
                <v-text-field
                        readonly
                        prepend-icon="event"
                        label="Quando aconteceu?"
                        class="date-pick"
                        slot="activator"
                        v-model="dataFormatada"
                />

                <v-date-picker
                        scrollable
                        v-model="form.data"
                        :locale="locale"
                        :allowed-dates="datasPermitidas"
                >
                    <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn flat color="primary" @click="datePickerModal = false">Cancelar</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialogoData.save(form.data)">Salvar</v-btn>
                        </v-card-actions>
                    </template>
                </v-date-picker>
            </v-dialog>
        </v-flex>

        <!-- Selecionar Pessoas -->
        <v-flex xs12 sm7 lg7>
            <v-select
                    label="Quem estava com você?"
                    chips
                    tags
                    prepend-icon="person"
                    append-icon=""
                    clearable
                    v-model="form.pessoasChips"
            >
                <template slot="selection" slot-scope="data">
                    <v-chip
                            close
                            @input="pessoaRemover(data.item)"
                            :selected="data.selected"
                    >
                        <strong>{{ data.item }}</strong>&nbsp;
                    </v-chip>
                </template>
            </v-select>
        </v-flex>

        <!-- Selecionar Tags -->
        <v-flex xs12 sm7 lg7>
            <v-select
                    chips
                    tags
                    clearable
                    prepend-icon="local_offer"
                    append-icon=""
                    label="Tags"
                    v-model="form.tagsChips"
            >
                <template slot="selection" slot-scope="data">
                    <v-chip
                            close
                            @input="tagRemover(data.item)"
                            :selected="data.selected"
                    >
                        <strong>{{ data.item }}</strong>&nbsp;
                    </v-chip>
                </template>
            </v-select>
        </v-flex>

        <!-- Toast -->
        <toast
                :toast-mostrar="toast.mostrar"
                :cor="toast.cor"
                :texto="toast.texto"
                @toast-atualizar="toastAtualizar"
        />

    </v-container>
</template>

<script>

    /* Import Components */
    import Toast from '@/components/Toast';

    /* Import Propriedades */

    // EventBus - lida com as mensagens entre componentes não parentais
    import EventBus from '@/main';

    //  Moment.js - Manipula datas
    const moment = require('moment');

    export default {
      name: 'relato',
      components: {
        Toast,
      },
      data: () => ({

        /* Configuração View */
        iconeSalvar: 'save',
        datePickerModal: '',
        toast: {
          mostrar: false,
          cor: '',
          texto: '',
        },

        /* Formatos */
        locale: 'pt-BR',

        /* Formulario */
        form: {
          titulo: {
            texto: '',
            error: false,
            rules: '',
          },
          relato: {
            texto: '',
            error: false,
            rules: '',
          },
          data: null,
          pessoasChips: [],
          tagsChips: [],
        },


      }),
      computed: {

        /* Date Picker */

        // Formata data de acordo com a região
        dataFormatada() {
          const d = this.form.data ?
            moment(this.form.data, 'YYYY-MM-DD', this.locale, true)
            : this.getDataHoje(this.locale);

          return d.format('L');
        },

      },
      methods: {

        /* Date Picker */

        // Retorna a data de hoje
        getDataHoje(locale) {
          return moment(new Date(), 'YYYY-MM-DD', locale, true);
        },

        // Define o intervalo no DatePicker para o ultimos 100 anos
        datasPermitidas() {
          const max = new Date();
          const min = new Date();
          min.setFullYear(min.getFullYear() - 100);

          return {
            min: min.toISOString().substr(0, 10),
            max: max.toISOString().substr(0, 10),
          };
        },

        /* Selecionar Pessoas */
        pessoaRemover(item) {
          this.form.pessoasChips.splice(this.form.pessoasChips.indexOf(item), 1);
          this.form.pessoasChips = [...this.form.pessoasChips];
        },

        /* Selecionar Tags */
        tagRemover(item) {
          this.form.tagsChips.splice(this.form.tagsChips.indexOf(item), 1);
          this.form.tagsChips = [...this.form.tagsChips];
        },

        /* Salvar Formulario */
        formularioSalvar() {
          /*
            const dados = {
            titulo: this.form.titulo.texto,
            relato: this.form.relato.texto,
            data: this.form.data ? this.form.data : this.getDataHoje('en'),
            pessoas: this.form.pessoasChips,
            tags: this.form.tagsChips,
          };
          */


          /* Toast e Avisos */

          const completo = this.form.titulo.texto && this.form.relato.texto;
          if (completo) {
            this.toast.texto = 'Salvo';
            this.toast.cor = 'success';
          } else {
            this.toast.texto = 'Ops!';
            this.toast.cor = 'warning';
          }

          this.toast.mostrar = true;
        },


        /* Toast */

        toastAtualizar(value) {
          this.toast.mostrar = value;
        },

      },

      /* Chamado quando o componente é montado */
      mounted() {
        /* Toolbar */

        // Colocar icone save na toolbar
        EventBus.$emit('toolbar-definir-icone-esquerda', this.iconeSalvar);


        // Ouve o evento de click no icone salvar da toolbar
        const vm = this;
        EventBus.$on('toolbar-clicado-icone-esquerda', (value) => {
          if (value === vm.iconeSalvar) {
            vm.formularioSalvar();
          }
        });
      },

      /* Chamado quando o component é destruido */
      destroyed() {
        /* Event Bus */

        // Parar de ouvir o clique no icone da toolbar
        EventBus.$off('toolbar-clicado-icone-esquerda');

        // Tirar o icone de save da toolbar
        EventBus.$emit('toolbar-definir-icone-esquerda', 'null');
      },
    };

</script>

<style scoped>

    .date-pick {
        margin-top: 1em;
    }

</style>
