<template>
  <div class="search-form">
    <div class="search-form__row">
      <div class="search-form__col">
        <input
            type="text"
            placeholder="Поиск по имени или e-mail"
            :value="modelValue"
            @input="changeSelectValue"
        >
        <img class="search-form__searchIcon" src="@/assets/search.png" alt=""/>
      </div>
    </div>
    <div class="search-form__row">
      <div class="search-form__col">
        <img class="search-form__cleanIcon" src="@/assets/clean.png" alt=""/>
        <p
            @click="clearFilters"
        >

          Очистить фильтр
        </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  props: {
    modelValue: {
      type: String
    }
  },
  methods: {
    changeSelectValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    clearFilters() {
      this.$emit('clearFilters')
    }
  }
}
</script>