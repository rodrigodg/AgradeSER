<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    v-model="drawer"
    color="background"
  >
    <v-list
      dense
      color="background"
    >
      <template v-for="item in drawerItens">
        <v-layout
          row
          v-if="item.cabecalho"
          align-center
          :key="item.cabecalho"
        >
          <v-flex xs6>
            <v-subheader v-if="item.cabecalho">
              {{ item.cabecalho }}
            </v-subheader>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.filhos"
          v-model="item.model"
          append-icon=""
          :key="item.texto"
          :prepend-icon="item.model ? item.icone : item.iconeAlternativo"
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.texto"/>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="filho in item.filhos"
            :key="filho.texto"
            :disabled="filho.desabilitar"
            @click="!filho.desabilitar ? $router.push(filho.rota) : ''"
          >
            <v-list-tile-action v-if="filho.icone">
              <v-icon>{{ filho.icone }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="filho.texto"/>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-else
          :disabled="item.desabilitar"
          :key="item.texto"
          @click="!item.desabilitar ? $router.push(item.rota) : ''"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icone }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.texto }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    export default {
      name: 'drawer',
      props: ['drawerMostrar'],

      data: () => ({
        drawer: this.drawerMostrar,
        drawerItens: [
          { cabecalho: 'Relatos' },
          { icone: 'book', texto: 'Todos os relatos', rota: '/home', desabilitar: false },
          {
            icone: 'keyboard_arrow_up',
            iconeAlternativo: 'keyboard_arrow_down',
            texto: 'Cadernos',
            model: false,
            filhos: [
              { icone: 'person', texto: 'Pessoas', rota: 'people', desabilitar: true },
              { icone: 'favorite', texto: 'Emoções', rota: 'emotions', desabilitar: true },
              { icone: 'place', texto: 'Locais', rota: 'places', desabilitar: true },
              { icone: 'import_contacts', texto: 'Diário da gratidão', rota: 'gratitude', desabilitar: true },
            ],
          },
          {
            icone: 'keyboard_arrow_up',
            iconeAlternativo: 'keyboard_arrow_down',
            texto: 'Tags',
            model: false,
            filhos: [
              { icone: 'add', texto: 'Adicionar', id: 'tag_add', desabilitar: true },
            ],
          },
          { cabecalho: 'AgradeSER' },
          { icone: 'settings', texto: 'Configurações', id: 'settings', desabilitar: true },
          { icone: 'chat_bubble', texto: 'Enviar feedback', id: 'feedback', desabilitar: true },
        ],
      }),

      watch: {

        /* Drawer */

        drawerMostrar() {
          this.drawer = this.drawerMostrar;
        },
        drawer() {
          this.$emit('drawer-atualizacao', this.drawer);
        },
      },

    };
</script>

<style scoped>

</style>
