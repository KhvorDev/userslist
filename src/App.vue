<template>
  <div class="container">

    <header class="header">
      <div class="header__row">
        <div class="header__col">
          <h1>Список пользователей</h1>
        </div>
      </div>
    </header>

    <SearchForm v-model="searchQuery" @clearFilters="clearFilters"/>

    <UsersTable
        :sortedUsers="searchUsersByNameOrEmail"
        :totalPages="totalPages"
        @sortByRegistrationDate="sortByRegistrationDate"
        @sortByRating="sortByRating"
        @showModal="showModal"
        ref="UsersTable"
    />

    <CustomModal
        v-show="showDialog"
        :showDialog="showDialog"
        @removeUser="removeUser"
        @closeModal="closeModal"
    />

  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import UsersTable from "@/components/UsersTable";
import CustomModal from "@/components/CustomModal";

export default {
  name: 'App',
  components: {SearchForm, UsersTable, CustomModal},
  data() {
    return {
      showDialog: false,
      users: [],
      sortedUsers: [],
      userId: '',
      searchQuery: '',
      filterByRegistrationDate: '',
      totalPages: 1
    }
  },

  computed: {
    searchUsersByNameOrEmail() {
      let list = [...this.sortedUsers].filter(
          user => user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalPages = Math.ceil(list.length / 5)

      return list
    },
  },

  methods: {
    showModal(userId) {
      this.showDialog = true
      this.userId = userId
    },

    closeModal() {
      this.showDialog = false
    },

    sortByRegistrationDate() {

      if (this.filterByRegistrationDate === '' || this.filterByRegistrationDate === 'desc') {
        this.filterByRegistrationDate = 'asc';
        return this.sortedUsers.sort((a, b) => {
          if (new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime() < 0) {
            return -1
          } else {
            return 0
          }
        })
      } else if (this.filterByRegistrationDate === 'asc') {
        this.filterByRegistrationDate = 'desc';
        return this.sortedUsers.sort((a, b) => {
          if (new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime() > 0) {
            return -1
          } else {
            return 0
          }
        })
      }
    },

    sortByRating() {
      if (this.filterByRegistrationDate === '' || this.filterByRegistrationDate === 'desc') {
        this.filterByRegistrationDate = 'asc';
        return this.sortedUsers.sort((a, b) => a.rating - b.rating)
      } else if (this.filterByRegistrationDate === 'asc') {
        this.filterByRegistrationDate = 'desc';
        return this.sortedUsers.sort((a, b) => a.rating - b.rating).reverse()
      }
    },

    removeUser() {
      this.users = this.users.filter(user => user.id !== this.userId)
      this.sortedUsers = this.sortedUsers.filter(user => user.id !== this.userId)
      this.showDialog = false
      this.totalPages = Math.ceil(this.users.length / 5)
    },

    clearFilters() {
      this.filterByRegistrationDate = ''
      this.searchQuery = ''
      this.sortedUsers = [...this.users]
      this.$refs.UsersTable.clearFilter()
    },

  },

  mounted() {
    this.axios.get('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
        .then(resp => {
          this.users = resp.data
          this.sortedUsers = [...this.users]
          this.totalPages = Math.ceil(this.users.length / 5)
        })

  }
}
</script>

<style scoped>

</style>