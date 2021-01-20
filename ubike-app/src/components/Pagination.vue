<template>
    
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          @click="pageDirection('prev')"
          :class="{'disabled': pageRow === 0}">
          <a class="page-link" href="###" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li
          class="page-item"
          v-for="p in renderItem"
          :key="p"
          @click="currentPage = p+1"
          :class="{'active' : currentPage === p+1}"
        >
          <a class="page-link" href="###">{{ p+1 }}</a>
        </li>

        <li
          class="page-item"
          @click="pageDirection('next')"
          :class="{'disabled': pageRow === maxPage}">
          <a class="page-link" href="###" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    all: Number,
    current: Number,
  },
  data (){
      return {
          currentPage: this.current,
          pageItems: 10,
          pageRow: 0,
          maxPage: 0
      }
  },
  computed: {
    renderItem(){
        let newPagi = [...Array(this.all).keys()];
        return newPagi.slice(this.pageRow * this.pageItems ,this.pageRow * this.pageItems  + this.pageItems);
    }

  },
  watch: {
      currentPage (){
          this.$emit('updateCurrent', this.currentPage);
      }
      
  },
  methods: {
    pageDirection (direct){
        if (direct === 'next' && this.pageRow < this.maxPage ) {
            this.pageRow++;
            this.currentPage = this.pageRow * this.pageItems + 1

            // console.log(1)
        }
        if (direct === 'prev' && this.pageRow > 0 ) {
            this.pageRow--;
            this.currentPage = this.pageRow * this.pageItems + 1
        }

    }

  },
  created(){
        this.maxPage = Math.ceil(this.all / this.pageItems)-1
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
