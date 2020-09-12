<template>
    <p class="date" v-if="date">
        {{formattedDate}}
    </p>
</template>

<script>
export default {
    props: [ "date" ],
    computed: {
        formattedDate(){
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let d = new Date(this.date)

            return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()
        }
    }
}
</script>
