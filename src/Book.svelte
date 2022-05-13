<script>
    export let params = {}


</script>

<h3>Book</h3>
<p>{params.name}</p>
<h1>{#if params.year} {params.year} {/if}</h1>