<template>
    <div class="subscription">
        <div v-if="!subscribed">
            <p>Subscribe to recieve an email when there is a new post</p>
            <form @submit.prevent="subscribe">
                <input v-model="email" id="sub-email" type="email" placeholder="Email Address">
                <p v-if="error">Oops, something went wrong. Try again later.</p>
                <input class="btn" type="submit" value="Subscribe">
            </form>
        </div>
        <div v-else>
            <p>Great, you have been subscribed</p>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data(){
        return {
            subscribed: false,
            email: '',
            error: false
        }
    },
    methods: {
        subscribe(){
            if(!this.email) return
            this.$apollo.mutate({
                // Query
                mutation: gql`mutation ($email: String!) {
                    createSubscriber(data: {email: $email}){
                        id
                        email
                    }
                }`,
                // Parameters
                variables: {
                    email: this.email,
                },
            }).then((data) => {
                // Result
                console.log(data)
                this.subscribed = true
            }).catch((error) => {
                if(error.networkError.result.errors[0].message === 'value is not unique for the field "email"'){
                    this.subscribed = true
                }else{
                    this.error = true
                }
            });
        }
    }
}
</script>