<template>
    <div id="post" v-if="post">
        <div class="pagination container">
            <button :class="{disabled: isFirst}" @click="previous">Previous</button>
            <button :class="{disabled: isLast}" @click="next">Next</button>
        </div>
        <transition name="fade" mode="out-in">
            <div class="post-content" :key="post.id">
                <h1>{{post.title}}</h1>
                <div class="container">
                    <date :date="post.date"></date>
                    <article v-html="post.content.html"></article>
                </div>                  
            </div>
        </transition>  
        <button class="share-btn" v-if="shareable" @click="share">Share</button>           
        <div class="pagination container">
            <button :class="{disabled: isFirst}" @click="previous">Previous</button>
            <button :class="{disabled: isLast}" @click="next">Next</button>
        </div>
    </div>          
</template>

<script>
import Date from "~/components/Date"
const STORAGE_KEY = "pageLocation"

export default {
    components: { Date },
    data(){
        return {
            active: null,
            history: null
        }
    },
    props: [ "posts" ],
    computed:{
        post(){
            return (this.posts && this.posts.length) ? this.posts[this.active] : null
        },
        isFirst(){
            return this.active === 0
        },
        isLast(){
            return this.active === this.posts.length - 1
        },
        shareable(){
            return navigator.canShare
        },      
    },
    mounted(){
        let self = this
        window.onpopstate = function(event) {
            if(typeof event.state.active !== 'undefined'){
                self.history = event.state.active
                self.active = event.state.active
            }
        }
    },
    methods: {
        goToLatest(){
            this.active = this.posts.length - 1
        },
        previous(){
            if(!this.isFirst) this.active--
        },
        next(){
            if(!this.isLast) this.active++
        },
        displayPost(){
            let saved = parseInt(localStorage.getItem(STORAGE_KEY));
            let url_parts = window.location.pathname.split('/')
            let slug = url_parts[url_parts.length - 1]
            let postIndex = -1

            if(slug){
                postIndex = this.posts.findIndex(p => {
                    return p.slug === slug
                })
            }
            
            if(postIndex >= 0){
                this.active = postIndex
            }else if(saved && this.posts[saved]){
                this.active = saved
            }else{     
                this.active = 0
            }
        },
        share(){
            if (navigator.canShare) {
                navigator.share({
                    title: 'Morning Walks - '+this.posts[this.active].title,
                    url: window.location.href
                }).then(() => console.log('Share was successful.'))
                  .catch((error) => console.log('Sharing failed', error));
            } else {
                console.log(`Your system doesn't support sharing.`);
            }
        }
    },
    watch: {
        posts(){
            if(this.posts) this.displayPost()
        },
        active(val){
            // Save page location to storage
            if(val !== null){
                localStorage.setItem(STORAGE_KEY, val);
                if(this.history !== val){
                    history.pushState({active: val}, "", "/"+this.posts[val].slug)
                    this.history = val
                }
                
            }
        }
    },   
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .3s;  
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-10px);
}
</style>