<template>
    <div>
        <img v-if="dataQR" :src="dataQR" />
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            dataQR: null
        }
    },
    async mounted(){
       this.dataQR = await QRCode.toDataURL(this.data);
    }
}
</script>