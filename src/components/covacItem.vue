<template>
  <div>
    <router-link
      :to="{ name: 'info_covac', params: { id: covac.id } }"
      class="flex justify-between"
    >
      <div>
        {{ covac.name }}
      </div>
      <div>
        Ngày tiêm: {{ covac.dateInjections }}
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
    props: {
        covac: {
            required: true,
            type: Object
        }
    }
}
</script>