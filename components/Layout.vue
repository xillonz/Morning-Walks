<template>
    <div id="wrapper">
        <header class="container" :class="{open: open}">
            <div class="logo" @click="$emit('logo-click')">Morning Walks</div>
            <p class="sub-text">Finding my truth, one misstep at a time</p>
            <div class="hamburger" @click="open = !open">
                <div></div>
            </div>
            <nav>
                <subscribe></subscribe>
                <latest :post="latest" @latest="$emit('latest')"></latest>
                <ul>
                    <li v-for="post in posts">
                        <a class="post-link" :href="'/'+post.slug">
                            <div class="title">{{post.title}}</div>
                            <date class="sub-text" :date="post.date"></date>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <unsubscribe></unsubscribe>
            <slot></slot>           
        </main>
        <footer>
            <a @click="$emit('about-click')">About Me</a>
        </footer>
    </div>
</template>

<script>
import Latest from '~/components/Latest'
import Subscribe from '~/components/Subscribe'
import Unsubscribe from '~/components/Unsubscribe'
import Date from "~/components/Date"

export default {
    components: { Latest, Subscribe, Unsubscribe, Date },
    data(){
        return {
            open: false,
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