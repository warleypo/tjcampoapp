<script>
	import Home from './Home.svelte'
	import Book from './Book.svelte'
	import NotFound from './NotFound.svelte'
	import Router, { link } from 'svelte-spa-router'
	import Register from './Register.svelte'
	import Login from './Login.svelte'

	export let name;

	const routes = {
		'/': Home,
		'/book/:name/:year?' : Book,
		'/register': Register,
		'/login': Login,
		'*': NotFound,
	}


</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<a href="/" use:link>Home</a>
	<a href="/book/chess/2022" use:link>Book</a>
	<a href="/login" use:link>Entrar</a>
	<a href="/register" use:link>Registrar</a>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>