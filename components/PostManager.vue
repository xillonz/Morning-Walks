<template>
    <div>
        <!-- <latest v-if="latest && !isLast" :post="latest" @latest="goToLatest"></latest> -->
        
        <div v-if="post" >
            <div class="pagination">
                <button :class="{disabled: isFirst}" @click="previous">Previous</button>
                <button :class="{disabled: isLast}" @click="next">Next</button>
            </div>
            <transition name="fade" mode="out-in">
                <div class="post-content" :key="post.id">
                    <h2>{{post.title}}</h2>
                    <p class="sub-text">{{post.date}}</p>
                    <article v-html="post.content.html"></article>
                </div>
            </transition>             
            <div class="pagination">
                <button :class="{disabled: isFirst}" @click="previous">Previous</button>
                <button :class="{disabled: isLast}" @click="next">Next</button>
            </div>
        </div> 
        
    </div>
          
</template>

<script>
import Latest from '~/components/Latest'
import gql from 'graphql-tag'
const STORAGE_KEY = "pageLocation"

export default {
    components: { Latest },
    data(){
        return {
            active: null
        }
    },
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
        latest(){
            return (this.posts) ? this.posts[this.posts.length - 1] : null
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
            if(saved){
                this.active = saved
            }else{    
                this.active = 0
            }
        }
    },
    watch: {
        active(val){
            // Save page location to storage
            if(val !== null) localStorage.setItem(STORAGE_KEY, val);
        }
    },
    apollo: {
        posts: {
            query: gql`query {
                posts(orderBy: date_ASC) {
                    id
                    slug
                    title
                    date
                    excerpt
                    content {
                        html
                    }
                    coverImage {
                        url
                    }
                },
                
            }`,
            result(ApolloQueryResult, key){
                this.displayPost()
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