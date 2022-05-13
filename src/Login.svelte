<script>
    import axios from 'axios'
    import { push, link } from 'svelte-spa-router'

    let name = '', email = '', password = '', password_confirmation = ''

    $: submit = async () => {
        const response = await axios.post('auth/login', {
            email,
            password,
        }, {withCredentials: true})
        
        // console.log('Resultado', response)

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

            await push('/')
        }

    }
</script>


<main>
    <form action="" on:submit|preventDefault={submit}>
        <h1>Por favor entre</h1>

        <div>
            <label for="">E-mail</label>
            <input bind:value={email} type="email" name="email" placeholder="E-mail">
        </div>

        <div>
            <label for="">Senha</label>
            <input bind:value={password} type="password" name="password" placeholder="Senha">
        </div>

        <button type="submit"> Entrar </button>

        <div>
            <a href="/register" use:link>Registrar-se</a>
        </div>
    </form>
</main>