<template>
    <div>
        <header :class="{open: open}">
            <div class="logo">Morning Walks</div>
            <p class="sub-text">Truths I have discovered from listening to my inner voice</p>
            <div class="hamburger" @click="open = !open">
                <div></div>
            </div>
            <nav>
                <latest :post="latest" @latest="$emit('latest')"></latest>
                <ul>
                    <li v-for="post in posts">
                        <a :href="'/'+post.slug">{{post.title}}</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer></footer>
    </div>
</template>

<script>
import Latest from '~/components/Latest'

export default {
    components: { Latest },
    data(){
        return {
            open: false
        }
    },
    props: [ "posts" ], 
    computed: {
        latest(){
            return (this.posts) ? this.posts[this.posts.length - 1] : null
        },
    }
}
</script>