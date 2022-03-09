<template>
  <div class="border rounded-md md:px-6 px-2 py-3">
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
    <div class="text-sm py-2">
      {{covac.nameVacin}}
    </div>
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