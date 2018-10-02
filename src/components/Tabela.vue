<template>

    <div>
        <table v-bind:class='{highlight: highlight, striped: striped, "responsive-table": responsiveTable, centered: center}'>
            <thead>
                <tr>
                    <th v-for="(titulo, i) in titulos"  v-bind:key="i" >{{ titulo }}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
    
</template>

<script>
export default {
    name: "Tabela",
    props: ["titulos", "highlight", "striped", "responsiveTable", "center"]
}
</script>
