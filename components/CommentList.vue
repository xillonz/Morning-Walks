<template>
    <div class="comment-list">
        <form @submit.prevent="addComment">
            <label for="comment-name">Your Name</label>
            <input v-model="name" id="comment-name" type="text" placeholder="Name">

            <label for="comment-message">Your Message</label>
            <textarea v-model="message" name="message" id="comment-message" cols="30" rows="10" placeholder="Message"></textarea>

            <input type="submit" value="Add Comment">
        </form>
        <ul>
            <li v-for="newComment in newComments">
                <p>{{newComment.name}}</p>
                <p>{{newComment.message}}</p>
            </li>
            <li v-for="comment in comments">
                <p>{{comment.name}}</p>
                <p>{{comment.message}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    data(){
        return {
            newComments: [],
            name: "",
            message: ""
        }
    },
    props: [ "comments", "slug" ],
    methods: {
        
        addComment(){
            const newName = this.name
            const newMessage = this.message
            const slug = this.slug
            this.name = ''
            this.message = ''

            this.$apollo.mutate({
                // Query
                mutation: gql`mutation ($name: String!, $message: String!, $slug: String!) {
                    createComment(data: {message: $message, name: $name, post: {connect: {slug: $slug}}}) {
                        id
                    }
                }`,
                // Parameters
                variables: {
                    name: newName,
                    message: newMessage,
                    slug: slug
                },
                // // Update the cache with the result
                // // The query will be updated with the optimistic response
                // // and then with the real result of the mutation
                // update: (store, { data: { addTag } }) => {
                //     // Read the data from our cache for this query.
                //     const data = store.readQuery({ query: TAGS_QUERY })
                //     // Add our tag from the mutation to the end
                //     data.tags.push(addTag)
                //     // Write our data back to the cache.
                //     store.writeQuery({ query: TAGS_QUERY, data })
                // },
                // // Optimistic UI
                // // Will be treated as a 'fake' result as soon as the request is made
                // // so that the UI can react quickly and the user be happy
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     addTag: {
                //     __typename: 'Tag',
                //     id: -1,
                //     label: newTag,
                //     },
                // },
            }).then((data) => {
                // Result
                console.log(data)
            }).catch((error) => {
                // Error
                console.error(error)
                // We restore the initial user input
                this.name = newName
                this.message = newMessage
            })
            }
    }
    
}
</script>