import Vue from "vue"
import App from '~/components/App'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://api-eu-central-1.graphcms.com/v2/cke0goe2u53fv01xu4890b4x4/master'
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    el: '#app',
    apolloProvider,
    render: createElement => createElement(App)
})

