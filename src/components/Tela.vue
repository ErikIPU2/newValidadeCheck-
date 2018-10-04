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
    
                    <a href="#" data-target="slideBar" class="sidenav-trigger right show-on-large hide-on-med-and-down"><i class="material-icons left">menu</i>Opções</a>
                    <a href="#" data-target="slideBar" class="sidenav-trigger right hide-on-large-only right"><i class="material-icons left">menu</i></a>
    
    
    
                    <ul class="right hide-on-med-and-down">
    
                        <li><a data-target="addModal" class="modal-trigger"><i class="material-icons left">add</i> Adicionar Produtos</a></li>
                        <li><a><i class="material-icons left">sync_problem</i> Listar produtos vencidos</a></li>
                        <li><a><i class="material-icons left">view_module</i> Listar todos</a></li>
                        <li><a><i class="material-icons left">search</i> Pesquisar</a></li>
    
                    </ul>
    
    
                </div>
            </nav>
    
            <ul id="slideBar" class="sidenav">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src="https://pre00.deviantart.net/dc34/th/pre/f/2015/030/6/f/_minflat__dark_material_design_wallpaper__4k__by_dakoder-d8fjqzu.jpg">
                        </div>
                        <a href="#user"><img class="circle" v-bind:src="user.photoURL || 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_account_circle_48px-512.png'"></a>
                        <a href="#name"><span class="white-text name">{{ user.displayName || user.email }}</span></a>
                        <a href="#email" v-if="user.displayName"><span class="white-text email">{{ user.email }}</span></a>
                    </div>
                </li>
                <li><a @click="logout()" class="waves-effect"><i class="fas fa-sign-out-alt"></i>Sair</a></li>
            </ul>
    
            <div class="fixed-action-btn toolbar hide-on-large-only">
                <a class="btn-floating btn-large red">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <!-- Se precisar do tooltipe adicionar a classe "tooltipped" -->
                    <li><a data-target="addModal" class="btn-floating modal-trigger" data-position="top" data-tooltip="Adicionar Produtos"><i class="material-icons">add</i>Adicionar</a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Listar produtos vencidos"><i class="material-icons">sync_problem</i></a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Listar todos"><i class="material-icons">view_module</i></a></li>
                    <li><a class="btn-floating" data-position="top" data-tooltip="Pesquisar"><i class="material-icons">search</i></a></li>
                </ul>
            </div>
        </header>
    
        <main>
    
            <div class="container">
                <blockquote v-if="DBItens.length === 0">
                    <h1>Nenhum item cadastrado</h1>
                </blockquote>
                <tabela v-else v-bind:titulos="['Nome', 'Codigo de barras', 'Preço', 'Data de validade']" highlight="true" striped="true">
    
                    <telem v-for="(itens, i) in DBItens" :key="i" v-bind:contents="[itens.name, itens.barcode, itens.price, itens.valid]">
                    </telem>
    
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
    
        <!-- Modais -->
        <div id="addModal" class="modal">
            <div class="modal-content">
                <h4>Cadastrar Produto</h4>
                <form>
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">description</i>
                            <input type="text" id="add_name" class="validate" v-model="i_name">
                            <label for="add_name">Nome do produto</label>
                        </div>
    
                        <div class="input-field col s6">
                            <i class="material-icons prefix">calendar_view_day</i>
                            <input type="text" id="add_barcode" class="validate" v-model="i_barcode">
                            <label for="add_barcode">Codigo de Barras</label>
                        </div>
    
                        <div class="row">
                            <div class="input-field col s6">
                                <i class="material-icons prefix">attach_money</i>
                                <input type="number" id="add_price" class="validate" step="0.25" v-model="i_price">
                                <label for="add_price">Preço</label>
                            </div>
    
                            <div class="input-field col s6">
                                <i class="material-icons prefix">event</i>
                                <input type="text" id="add_valid" class="validate" v-model="i_valid">
                                <label for="add_valid">Data de validade</label>
                            </div>
                        </div>
                    </div>
    
                    <br><br>
    
                    <div class="center-align">
                        <a @click="addProd()" class="waves-effect waves-red btn red darken-4">Cadastrar Produto</a>
                    </div>
    
                    <div class="modal-footer">
    
                    </div>
    
                </form>
            </div>
    
        </div>
    
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
        props: ["user", "uid"],
    
        data() {
            return {
                DBItens: [],
    
                i_name: "",
                i_price: "",
                i_valid: "",
                i_barcode: ""
    
            }
        },

        filters: {
            moneySimbol(val) {
                return `${val} R$`
            }
        },
    
        firebase: {
            DBContent: firebase.database().ref("data")
        },
    
        created() {
    
            this.$bindAsArray('DBItens', firebase.database().ref("data").child(this.uid))
    
            iziToast.success({
                title: `Bem vindo ${this.user.displayName || this.user.email}`,
                iconUrl: this.user.photoURL ||
                    "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_account_circle_48px-512.png",
                closeOnClick: true
            });
    
    
    
        },
    
    
        methods: {
    
            logout() {
                $('.sidenav').sidenav("destroy");
                this.$parent.logOut();
                this.$destroy();
            },
    
            addProd() {
                if (!this.i_name || !this.i_price || !this.i_valid || !this.i_barcode) {
                    return this.$parent.errorThrow("no-camp-complete");
                }
    
                var prop = {
                    name: this.i_name,
                    price: this.i_price,
                    valid: this.i_valid,
                    barcode: this.i_barcode
                }
    
                this.$firebaseRefs.DBContent.child(this.uid).push(prop);
            },
    
        },
    
        mounted() {
    
            if (!this.user) {
                this.logout();
                this.$destroy();
                this.$parent.$data.isLoged = false;
            }
    
            $(".fixed-action-btn").floatingActionButton({
                toolbarEnabled: true
            });
    
            $(".tooltipped").tooltip();
            $('.sidenav').sidenav();
            $('.modal').modal();
            $('.datepicker').datepicker();
    
    
        }
    };
</script>
