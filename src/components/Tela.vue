<style>
    #screem {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    
    main {
        flex: 1 0 auto;
    }
</style>


<template>
    <div id="screem">
    
        <header>
            <nav class="red darken-4">
                <div class="nav-wrapper">
                    <ul class="left">
                        <a href="#" class="brand-logo left">Validity Check</a>
                    </ul>
    
                    <ul class="right">
                        <li><a @click="logout()"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
                    </ul>
    
    
                    <ul class="right hide-on-med-and-down">
                        <li><a><i class="material-icons left">add</i> Adicionar Produtos</a></li>
                        <li><a><i class="material-icons left">sync_problem</i> Listar produtos vencidos</a></li>
                        <li><a><i class="material-icons left">view_module</i> Listar todos</a></li>
                        <li><a><i class="material-icons left">search</i> Pesquisar</a></li>
    
                    </ul>
    
    
                </div>
            </nav>
    
            <div class="fixed-action-btn toolbar hide-on-large-only">
                <a class="btn-floating btn-large red">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <!-- Se precisar do tooltipe adicionar a classe "tooltipped" -->
                    <li><a class="btn-floating" data-position="top" data-tooltip="Adicionar Produtos"><i class="material-icons">add</i>Adicionar</a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Listar produtos vencidos"><i class="material-icons">sync_problem</i></a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Listar todos"><i class="material-icons">view_module</i></a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Pesquisar"><i class="material-icons">search</i></a></li>
                </ul>
            </div>
        </header>
    
        <main>
    
            <!-- TODO: gerar a tabela do db -->
    
            <div class="container">
                <tabela v-bind:titulos="['Nome', 'Codigo de barras', 'Preço', 'Data de validade']" highlight="true" striped="true">
                    
                </tabela>
            </div>
    
        </main>
    
        <footer class="page-footer red darken-4">
            <div class="footer-copyright">
                <div class="container">
                    © 2018 Erik Borella <br>
                    <a>build alpha 2.0</a>
                    <a class="white-text right">Contato: erikborella@gmail.com</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import tabela from "./Tabela.vue";
    import telem from "./ElementoTabela.vue";

    
    export default {
        
        name: "Tela",
        components: {
            tabela,
            telem
        },
        props: ["user"],
    

        firebase: {
            //FIXME: Coisar o db aqui
            DBContent: "",
        },
    
    
        created() {
            iziToast.success({
                title: `Bem vindo ${this.user.displayName || this.user.email}`,
                iconUrl: this.user.photoURL ||
                    "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_account_circle_48px-512.png",
                closeOnClick: true
            });
        },
    
    
        methods: {
            logout() {
                this.$parent.logOut();
                this.$destroy();
            },
    
        },
    
        mounted() {
            if (!this.user) {
                this.logout();
                this.$parent.$data.isLoged = false;
            }
    
            $(".fixed-action-btn").floatingActionButton({
                toolbarEnabled: true
            });
    
    
    
            $(".tooltipped").tooltip();
        }
    };
</script>
