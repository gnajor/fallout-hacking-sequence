<script lang="ts">
    import { enhance } from "$app/forms";
    const { form} = $props();

</script>
<div>
    <h1>Username</h1>

    <form method="POST" action="?/createUser" use:enhance>
        <input name="username" type="text" placeholder=""/>
        <button type="submit">Save</button>
    </form>
</div>

{#if form?.error}
    <p>{form.error}</p>
{/if}

<style>
    div{
        padding:0 10%;
        width: 100%;

        display: flex;
        flex-direction: column;
        gap:2rem;
    }

    h1{
        font-size: var(--text-lg);
        text-align: center;
    }

    form{
        width: 100%;

        display: flex;
        flex-direction: column;
        gap:1rem;
    }


    input{
        background-color: black;
        border:2px solid var(--main-color);
        height: 2.5rem;
        width: 100%;
        padding-left:1rem;
        font-size: var(--text-md);
    }

    button{
        width: 100%;
        height: 2.5rem;
        background-color: var(--main-darker-color);
        color: black;
        font-size: var(--text-md);
        transition: 20ms background-color ease-in-out;
    }

    button:hover{
        background-color: var(--main-color);
    }

    input:focus{
        outline: none;
    }
</style>