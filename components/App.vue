<template>
    <layout :posts="posts" @logo-click="hideAbout" @about-click="showAbout">
        <about v-if="about"></about>
        <post-manager ref="post" v-else :posts="posts"></post-manager>
    </layout>
</template>

<script>

import gql from 'graphql-tag'
import Layout from "~/components/Layout"
import PostManager from "~/components/PostManager"
import About from "~/components/About"


export default {
    components: { Layout, PostManager, About },
    data(){
        return {
            about: false
        }
    },
    methods: {
        showAbout(){
            history.pushState({}, "", "/about")
            this.about = true;
        },
        hideAbout(){
            this.about = false     
            this.$nextTick(()=>{
                this.$refs.post.displayPost();
            });
            
        }
    },
    apollo: {
        posts: gql`query {
            posts(orderBy: createdAt_ASC) {
                id
                slug
                title
                date
                excerpt
                content {
                    html
                }
            },
        }`
    }, 
}
</script>