<template>
    
    <input
      type="text"
      placeholder="請輸入站點關鍵字"
      v-model.lazy="keyWord"
    />
</template>

<script>
export default {
  name: 'Search',
  props: {
    val: String,
    
  },
  data (){
      return {
      }
  },
  computed: {
      keyWord: {
        get (){
            return this.key;
        },
        set (val){
            this.$emit('searchKeywords', val)
        }
      }
     
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
