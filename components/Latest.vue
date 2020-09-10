<template>
    <div id="latest" @click="triggerLatest">
        <hr>
        <h3>Read the Latest Update</h3>
        <strong>{{ post.title }}</strong>
        <p>{{post.excerpt}}</p>
        <hr>
    </div>
</template>

<script>
export default {
    props: [ 'post' ],
    methods: {
        triggerLatest(){
            this.$emit('latest')
        }
    }
}
</script>