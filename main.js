var app = new Vue({
  el: '#app',
  data: {
    items: null,
    keyword: "",
    message: ""
  },
  watch: {
    keyword: function (newKeyword) {
      this.message = "Waiting for you to stop typing..."
      this.debouncedGetAnswer()
    }
  },
  created() {
    this.debouncedGetAnswer = _.debounce(this.getAPI, 1000)
  },
  methods: {
    getAPI: function () {
      if (this.keyword === "") {
        this.items = null
        return
      }

      const vm = this
      const params = {
        page: 1,
        per_page: 20,
        query: this.keyword
      }
      axios.get("https://qiita.com/api/v2/items", { params }).then(function (response) {
        console.log(response)
        vm.items = response.data
      }).catch(function (error) {
        vm.message = "Error " + error
      }).finally(function () {
        vm.message = ""
      })
    }
  },
})
