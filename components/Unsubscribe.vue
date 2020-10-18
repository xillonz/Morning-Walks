<template>
    <div class="unsub" v-if="completed">
        <p>You have been unsubscribed! Feel free to subscribe again at any time</p>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data(){
        return {
            completed: false,
            error: false,
            id: null
        }
    },
    created(){
        var urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('sub')
        if(this.id) this.unsubscribe();
    },
    methods: {
        unsubscribe(){
            this.$apollo.mutate({
                // Query
                mutation: gql`mutation ($id: String!) {
                    deleteSubscriber(where: {id: $id})
                }`,
                // Parameters
                variables: {
                    id: this.id
                },
            }).then((data) => {
                // Result
                console.log(data)
                this.completed = true
            }).catch((error) => {
                // Error
                console.error(error)
                this.completed = true
                this.error = true
            })
        }
    }
}
</script>