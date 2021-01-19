<template>
  <div class="text-left">
    <h1>YouBike 臺北市公共自行車即時資訊</h1>

    <Search :val="keyword" @searchKeywords="updateKeywords"></Search>
    <div v-if="slicer.length === 0">沒有符合關鍵字的站點資訊</div>
    <div  v-if="slicer.length !== 0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th @click="setSorting('sbi')">
            目前可用車輛
            <i
              class="fas fa-sort"
              v-show="isAsc === null || sortCol !== 'sbi'"
            ></i>
            <i
              class="fas fa-sort-up"
              v-show="isAsc === true && sortCol === 'sbi'"
            ></i>
            <i
              class="fas fa-sort-down"
              v-show="isAsc === false && sortCol === 'sbi'"
            ></i>
          </th>
          <th @click="setSorting('tot')">
            總停車格
            <i
              class="fas fa-sort"
              v-show="isAsc === null || sortCol !== 'tot'"
            ></i>
            <i
              class="fas fa-sort-up"
              v-show="isAsc === true && sortCol === 'tot'"
            ></i>
            <i
              class="fas fa-sort-down"
              v-show="isAsc === false && sortCol === 'tot'"
            ></i>
          </th>
          <th>資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <StopList v-for="s in slicer" :key="s.sno" v-bind="s"></StopList>
      </tbody>
    </table>
    <Pagination :all="allPagi" :current="currentPage" @updateCurrent="updateCurrentPage"></Pagination>
    </div>
  </div> 
</template>

<script>

import Search from './components/Search.vue';
import StopList from './components/StopList.vue';
import Pagination from './components/Pagination.vue';

export default {
  components: {
    Search,
    StopList,
    Pagination,
   
  },
  data () {
    return {
     ubikeStops: [],
     keyword:'',
     isAsc: null,
     sortCol: '',
     pageContent: 10,
     currentPage: 1
    }
  },
  computed: {
    keywordFilter () {
      
      return this.ubikeStops.filter( (val) => val.sna.includes(this.keyword));

    },
    sorter (){
      let newArr = [...this.keywordFilter];
      
      if(this.isAsc === true) {
        newArr = newArr.sort((a,b) => a[this.sortCol] - b[this.sortCol]);
      }
      if(this.isAsc === false) {
        newArr = newArr.sort((a,b) => b[this.sortCol] - a[this.sortCol]);
      }

      return newArr;
    },
    slicer (){
      return this.sorter.slice((this.currentPage-1) * this.pageContent , (this.currentPage-1)*this.pageContent+ this.pageContent);
    },
    allPagi (){
      return Math.ceil(this.sorter.length / this.pageContent);
    }
    
  },
  watch: {
    keyword (){
      this.currentPage = 1
    }
  },
  methods: {
    setSorting (col){
      if (this.sortCol !== col ){
        this.sortCol = col;
        this.isAsc = true;
        return;
      }
      if (this.sortCol === col && this.isAsc === false){
        this.isAsc  = null;
        return;

      }
      this.isAsc = !this.isAsc;
    },
    updateCurrentPage (val){
      this.currentPage = val
    },
    updateKeywords (val){
      this.keyword = val
    }
  },
  created() {
    // 欄位說明請參照:
    // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

    fetch("https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz")
      .then((res) => res.json())
      .then((res) => {
        // 將 json 轉陣列後存入 this.ubikeStops
        this.ubikeStops = Object.keys(res.retVal).map((key) => res.retVal[key]);
        // console.log(this.ubikeStops)
      });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>