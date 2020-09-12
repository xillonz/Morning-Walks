<template>
    <div v-if="post" class="latest">
        <p>Read the Latest Update</p>
        <hr>
        <a :href="'/'+post.slug">
            
            <h3>{{post.title}}</h3>
            <date class="sub-text" :date="post.date"></date>
            <p>{{post.excerpt}}</p>
            
        </a>
        <hr>
        
    </div>
</template>

<script>
import Date from "~/components/Date"
export default {
    components: { Date },
    props: [ 'post' ],
}
</script>