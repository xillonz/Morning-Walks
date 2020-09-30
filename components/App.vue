<template>
    <layout :posts="posts">
        <post-manager :posts="posts"></post-manager>
    </layout>
</template>

<script>

import gql from 'graphql-tag'
import Layout from "~/components/Layout"
import PostManager from "~/components/PostManager"


export default {
    components: { Layout, PostManager },
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
                comments {
                    message
                    name
                }
            },
            
        }`
        
    }, 
}
</script>