<template>
    <div>
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
                    <li><a class="btn-floating tooltipped" data-position="top" data-tooltip="Adicionar Produtos"><i class="material-icons">add</i>Adicionar</a></li>
                    <li><a class="btn-floating tooltipped" data-position="top" data-tooltip="Listar produtos vencidos"><i class="material-icons">sync_problem</i></a></li>
                    <li><a class="btn-floating tooltipped" data-position="top" data-tooltip="Listar todos"><i class="material-icons">view_module</i></a></li>
                    <li><a class="btn-floating tooltipped" data-position="top" data-tooltip="Pesquisar"><i class="material-icons">search</i></a></li>
                </ul>
            </div>
        </header>
    
        <main>

            <!-- TODO: gerar a tabela do db -->

        </main>
    
        <footer></footer>
    </div>
</template>

<script>
    export default {
        name: "Tela",
        props: ["user"],
    
        created() {
            iziToast.success({
                title: `Bem vindo ${this.user.displayName || this.user.email}`,
                iconUrl: this.user.photoURL ||
                    "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_account_circle_48px-512.png",
                closeOnClick: true,
                position: "center"
            });
        },
    
        methods: {
            logout() {
                this.$parent.logOut();
                this.$destroy();
            }
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