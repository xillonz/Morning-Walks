<template>
    <div class="comment-list container">
        <p>Leave a comment:</p>
        <form @submit.prevent="addComment">
            <label for="comment-name">Name</label>
            <input v-model="name" id="comment-name" type="text" placeholder="Name">

            <label for="comment-message">Message</label>
            <textarea v-model="message" name="message" id="comment-message" cols="30" rows="10" placeholder="Message"></textarea>
            <p v-if="error">Please enter your name and message</p>
            <vue-recaptcha class="recaptcha" @verify="human = true" sitekey="6LeMHNcZAAAAALVnQ5cakOMslTFB-0phmVAAQg-9"></vue-recaptcha>
            <input class="btn" type="submit" value="Add Comment">
        </form>
        <ul>
            <li class="comment" v-for="comment in allComments">
                <p class="comment-name">{{comment.name}}</p>
                <date class="comment-date" :date="comment.createdAt"></date>
                <p>{{comment.message}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import Date from "~/components/Date"
import gql from 'graphql-tag'

export default {
    components: { Date, VueRecaptcha },
    data(){
        return {
            newComments: [],
            name: "",
            message: "",
            error: false,
            human: false,
        }
    },
    props: [ "slug" ],
    computed: {
        allComments(){
            return (this.comments) ? this.newComments.concat(this.comments) : this.newComments
        }
    },
    apollo: {
        comments: {
            query: gql`query ($slug: String!){
                comments(orderBy: createdAt_DESC, where: {post: {slug: $slug}}, stage: DRAFT) {
                    message
                    name
                    createdAt
                },            
            }`,
            variables() {
                return {
                    slug: this.slug
                }                
            }
        }
        
    },
    methods: {
        
        addComment(){
            this.error = !this.name || !this.message

            if(this.error || !this.human) return

            const newName = this.name
            const newMessage = this.message
            const newDate = new window.Date().toISOString()
            const slug = this.slug
            this.name = ''
            this.message = ''

            this.$apollo.mutate({
                // Query
                mutation: gql`mutation ($name: String!, $message: String!, $slug: String!) {
                    createComment(data: {message: $message, name: $name, post: {connect: {slug: $slug}}}) {
                        id
                        name
                        message
                        createdAt
                    }
                }`,
                // Parameters
                variables: {
                    name: newName,
                    message: newMessage,
                    slug: slug
                },
                // Update the cache with the result
                // The query will be updated with the optimistic response
                // and then with the real result of the mutation
                update: (store, { data: { createComment } }) => {
                    if(createComment.id !== -1) return
                    this.newComments.unshift({
                        name: createComment.name,
                        message: createComment.message,
                        createdAt: createComment.createdAt
                    })
                },
                // Optimistic UI
                // Will be treated as a 'fake' result as soon as the request is made
                // so that the UI can react quickly and the user be happy
                optimisticResponse: {
                    __typename: 'Mutation',
                    createComment: {
                        __typename: 'Comment',
                        id: -1,
                        name: newName,
                        message: newMessage,
                        createdAt: newDate
                    },
                },
            }).then((data) => {
                // Result
                console.log(data)
            }).catch((error) => {
                // Error
                console.error(error)
                // We restore the initial user input
                this.name = newName
                this.message = newMessage
                this.newComments.shift()
            })
        }
    }
    
}
</script>