<template>
  <div class="customModal">
    <div class="customModal__body">
      <div class="customModal__row">
        <div class="customModal__col">
          <h3>Вы уверены, что хотите удалить пользователя?</h3>
        </div>
      </div>
      <div class="customModal__row">
        <div class="customModal__col">
          <button @click="this.$emit('removeUser')">Да</button>
          <button @click="this.$emit('closeModal')">Нет</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CustomModal",
}
</script>

<style scoped>

</style>