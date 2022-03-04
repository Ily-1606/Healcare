<template>
    <div>
        <div class="fixed inset-0 bg-black/60 backdrop-blur-md z-10">
        </div>
        <div class="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-4">
            <div class="w-full bg-white p-4 rounded-md " style="max-width: 500px;">
                <Xmask v-if="canClose" class="w-10 h-10 float-right inline fill-slate-400 cursor-pointer" @click="handleClose" />
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Xmask from '../assets/svg/xmask.svg'
export default {
    props: {
        canClose: {
            type: Boolean,
            default(){
                return true
            }
        }
    },
    components: {
        Xmask
    },
    emits: ["handleClose"],
    methods: {
        handleClose(){
            this.$emit('handleClose');
        }
    },
}
</script>