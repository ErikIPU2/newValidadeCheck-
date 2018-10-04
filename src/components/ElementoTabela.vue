<template>
    <tr>
        <td v-for="(content, i) in contents" v-bind:key="i">{{ content }}</td>
    <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: "ElementoTabela",
        props: ["contents"]
    }
</script>
}}