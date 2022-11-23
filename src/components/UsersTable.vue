<template>
  <div class="usersTable">

    <div class="sortFilter">
      <div class="sortFilter__row">
        <div class="sortFilter__col">
          <p>Сортировка:
            <span
                @click="currentFilter('sortByRegistrationDate')"
                ref="sortByRegistrationDate"
            >
              Дата регистрации
            </span>
            <span
                @click="currentFilter('sortByRating')"
                ref="sortByRating"
            >
              Рейтинг
            </span></p>
        </div>
      </div>
    </div>


    <div class="table">
      <div class="table__headers">
        <div class="table__header">
          <p>Имя Пользователя</p>
        </div>
        <div class="table__header">
          <p>E-mail</p>
        </div>
        <div class="table__header">
          <p>Дата регистрации</p>
        </div>
        <div class="table__header">
          <p>рейтинг</p>
        </div>
      </div>

      <div class="table__list-item" v-for="user in divideUsersList()" :key="user.id">
        <div class="table__row">
          <div class="table__data">
            <p class="sub-title">Имя Пользователя</p>
            <p class="user-name">{{ user.username }}</p>
          </div>
          <div class="table__data">
            <p class="sub-title">E-mail</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <div class="table__row">
          <div class="table__data">
            <p class="sub-title">Дата регистрации</p>
            <p>{{ user.registration_date }}</p>
          </div>
          <div class="table__data">
            <p class="sub-title">Рейтинг</p>
            <p>{{ user.rating }}</p>
          </div>
        </div>
        <img
            src="@/assets/cancel.png"
            alt=""
            @click="this.$emit('showModal', user.id)"
        />
      </div>

    </div>

    <div class="pagination">
      <div
          class="pagination__item"
          v-for="page in totalPages"
          :key="page"
          :class="{
            'active': page === this.currentPage
          }"
          @click="currentPage = page"
      >
        {{ page }}
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    sortedUsers: {
      type: Array,
      default() {
        return []
      }
    },
    totalPages: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageLimit: 5,
    }
  },
  watch: {
    currentPage() {
      this.divideUsersList()
    },
  },
  computed:{

  },
  methods: {
    currentFilter(filter) {
      if (filter === 'sortByRegistrationDate') {
        this.$refs.sortByRegistrationDate.classList.add('active')
        this.$refs.sortByRating.classList.remove('active')
        this.$emit('sortByRegistrationDate')
      } else {
        this.$refs.sortByRegistrationDate.classList.remove('active')
        this.$refs.sortByRating.classList.add('active')
        this.$emit('sortByRating')
      }
    },
    clearFilter() {
      this.$refs.sortByRegistrationDate.classList.remove('active')
      this.$refs.sortByRating.classList.remove('active')
    },
    divideUsersList() {
      return [...this.sortedUsers.filter((user, index) => index >= (this.currentPage * this.pageLimit) - 5 && index <= (this.currentPage * this.pageLimit) - 1)]
    },
    returnOnFirstPage(){
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>

</style>