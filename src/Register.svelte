<script>
    import axios from 'axios'
    import { push, link } from 'svelte-spa-router'
    import { onMount } from 'svelte'

    let name = '', email = '', congregation_id = '', password = '', password_confirmation = '', permission = '1'
    let userProfile = null;
    let congList = []
    onMount(async () => {
        const response = await axios.get('congregations/list')
        congList = Array.from(response.data)

        const profileResponse = await axios.get('auth/user-profile')

        if (profileResponse.status === 200) {
            userProfile = profileResponse.data
            console.log(userProfile);
        } else {
            userProfile = null
        }
    })


    $: submit = async () => {
        const response = await axios.post('auth/register', {
            name,
            email,
            congregation_id,
            permission,
            password,
            password_confirmation
        })
        
        console.log('Resultado', response)

        await push('/login')
    }
</script>


<main>
    <form action="" on:submit|preventDefault={submit}>
        <h1>Por favor registre-se</h1>

        <div>
            <label for="">Nome</label>
            <input bind:value={name} type="text" name="name" placeholder="Nome">
        </div>

        <div>
            <label for="">E-mail</label>
            <input bind:value={email} type="email" name="email" placeholder="E-mail">
        </div>

        <div>
            <label for="">Congregação</label>
            <select name="congregation_id" bind:value={congregation_id}>
                {#each congList as cong}
                    <option value="{cong.id}">{cong.name}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="">Permissão</label>
            <select name="permission" bind:value={permission}>
                <option value="1">Visualizar</option>
                <!-- // 1 - show/index, 2 - create/edit/store, 3 - update, 4 - delete, 7 - super -->
                {#if userProfile}
                    {#if userProfile.permission >= 2}
                        <option value="2">Adicionar/Editar</option>
                    {/if}
                    {#if userProfile.permission >= 3}
                        <option value="3">Alterar</option>
                    {/if}
                    {#if userProfile.permission >= 4}
                        <option value="4">Remover</option>
                    {/if}
                {/if}
            </select>
        </div>

        <div>
            <label for="">Senha</label>
            <input bind:value={password} type="password" name="password" placeholder="Senha">
        </div>

        <div>
            <label for="">Confirmação de Senha</label>
            <input bind:value={password_confirmation} type="password" name="password_confirm" placeholder="Confirme a senha">
        </div>

        <button type="submit"> Enviar </button>

        <div>
            <a href="/login" use:link>Já tem cadastro? Entre agora</a>
        </div>
    </form>
</main>