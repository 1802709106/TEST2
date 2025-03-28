<template>
    <div>
        {{ this.$store.state.count }}
        {{ count }}
        <button @click="add">+1</button>
    </div>
</template>

<script>

export default{
    name: 'Hello',
    computed:{
        count(){
            return this.$store.state.count
        }
    },
    methods:{
        add(){
            this.$store.commit("increment")
        }
    },
}

</script>

<style>

</style>