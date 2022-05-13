<script>
    import {onMount} from 'svelte'
    import axios from 'axios'
    import { push } from 'svelte-spa-router';

    let user = ''
    let cong = {data:{name: null, phone: null}}
    let congId = 1
    let rota = 'congregations/'

    async function showCong(id) {
        const resp = await axios.get(`${rota}${id}`)
        console.log('Congregação alterou!', resp.data)
    }

    onMount(async () => {
        const response = await axios.get('auth/user-profile')

        if (response.status === 200) {
            user = response.data.name
            
            cong = await axios.get('congregations/1')
            console.log(cong)
        } else {
            await push('/login')
        }
    })

    $: logout = async () => {
        await axios.post('auth/logout', {}, {withCredentials: true})

        axios.defaults.headers.common['Authorization'] = ''

        await push('/login')
    }
    
</script>

<h3>Bem vindo {user}!</h3>
{#if cong}
<p>Congregação: <i>{cong.data.name}</i> </p>
<a href="https://wa.me/55{cong.data.phone}?text=Oi%20venho%20do%20app." target="_blank" style="color: green">Contato</a>
{/if}

<a href="javascript:void(0)" on:click={logout}>Sair</a>

<input type="text" bind:value={rota} />
<input type="text" bind:value={congId} on:change={() => showCong(congId)} />