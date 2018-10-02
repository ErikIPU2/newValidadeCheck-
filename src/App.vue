<template>
	<div id="app">
		<div v-if="loaded">
			<loader>Carregando...</loader>
		</div>
		<div v-else>
			<div v-if="!isLoged">
				<meta name="theme-color" content="#ffffff">
				<div class="container">
					<div class="row">
						<div class="card col s12 offset-l2 l8 z-depth-5" style="margin-top: 5%">
							<div class="card-image waves-effect waves-block waves-light">
								<br>
								<img src="https://timeline.canaltech.com.br/272326.700/google-remove-botao-ver-imagem-das-buscas-para-evitar-roubo-108334.jpg" class="responsive-img">
							</div>
							<div class="card-content">
								<form>
									<div class="row">
										<div class="input-field">
											<i class="material-icons prefix">alternate_email</i>
											<input id="loginEmail" type="email" class="validate" v-model="login_email" @keyup.enter="login()">
											<label for="loginEmail">Email</label>
											<span class="helper-text" v-bind:data-error="emailError"></span>
										</div>
										<div class="input-field">
											<i class="material-icons prefix">lock</i>
											<input id="loginPassword" type="password" class="validate" v-model="login_password" @keyup.enter="login()">
											<label for="loginPassword">Senha</label>
											<span class="helper-text" v-bind:data-error="passwordError"></span>
										</div>
									</div>
									<div class="row center-align">
										<a @click="login()" class="waves-effect waves-light btn-large red darken-3">Logar</a>
										<a @click="signUp()" class="waves-effect waves-light btn-large red darken-3">Cadastrar</a>
									</div>
									<div class="row center-align">
										<a @click="googleLogin()" class="waves-effect waves-light btn red darken-4"><i class="fab fa-google left"></i>Logar com o Google</a>
									</div>
								</form>
							</div>
						</div>
						<!-- chupa meu pau -->
					</div>
				</div>
			</div>
	
			<div v-else>
				<meta name="theme-color" content="#B71C1C">
				<tela v-bind:user="user"></tela>
			</div>
		</div>
	
	</div>
</template>

<script>
	import tela from "./components/Tela.vue";
	import loader from "./components/Loader.vue";
	
	export default {
		name: "app",
	
		components: {
			tela,
			loader
		},
	
		created() {
			//serve para ver se já existe alguem logado
			firebase.auth().onAuthStateChanged(user => {
				this.user = user;
				if (user) {
					this.isLoged = true;
				} else {
					this.isLoged = false;
				}
	
				this.loaded = false;
			});
		},
	
		data() {
			return {
				isLoged: false,
				loaded: true,
	
				login_email: "",
				login_password: "",
	
				emailError: "",
				passwordError: "",
	
				user: ""
			};
		},
	
		methods: {
			//faz login com o google
			googleLogin() {
				var provider = new firebase.auth.GoogleAuthProvider();
				firebase
					.auth()
					.signInWithRedirect(provider)
					.catch(e => {
						alert(e.code);
					});
			},
	
			//deslogar
			logOut() {
				firebase
					.auth()
					.signOut()
					.catch(error => {
						console.log("saiu");
					});
			},
	
			//cadastrar
			signUp() {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.login_email, this.login_password)
					.catch(e => {
						this.errorThrow(e.code);
					});
			},
	
			//logar
			login() {
				if (!this.login_email || !this.login_password) {
					return this.errorThrow("no-camp-complete");
				}
				firebase
					.auth()
					.signInWithEmailAndPassword(this.login_email, this.login_password)
					.catch(e => {
						this.errorThrow(e.code);
					});
			},
	
			//Tradução dos erros
			errorThrow(errorCode) {
				var toast = message => {
					iziToast.error({
						title: message,
						position: "center",
						closeOnClick: true
					});
				};
	
				//banco de erros
				switch (errorCode) {
					case "auth/email-already-in-use":
						toast("Email já esta em uso");
						break;
	
					case "auth/invalid-email":
						toast("Email invalido");
						break;
	
					case "auth/operation-not-allowed":
						toast("Conta não ativada");
						break;
	
					case "auth/weak-password":
						toast("Sua senha está fraca demais");
						break;
	
					case "auth/user-not-found":
						toast("Usuario não encontrado");
						break;
	
					case "auth/wrong-password":
						toast("Senha incoreta");
						break;
	
					case "no-camp-complete":
						toast("Preencha todos os campos");
						break;
	
					default:
						iziToast.error({
							title: "Erro desconhecido",
							message: errorCode,
							closeOnClick: true,
							position: "center"
						});
						break;
				}
			}
		}
	};
</script>

