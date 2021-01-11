const vm = Vue.createApp({
    data () {
      return {
        ubikeStops: [],
        sortMethodSbi: 0,
        sortMethodTot: 0,
        sortBy: 'sbi',
      }
    },
    computed: {
      sort(){
        // console.log(this.ubikeStops)
        let oringArr = [...this.ubikeStops];
        let sortSwitch = this.sortBy === 'sbi' ? 'sortMathodSbi'  : 'sortMathodTot';

        if (this[sortSwitch] === 0) {
          return this.ubikeStops;

        }
        if (this[sortSwitch] === 1) {
          return oringArr.sort((a, b) => a[this.sortBy] - b[this.sortBy])

        }
        if (this[sortSwitch] === 2) {
          return oringArr.sort((a, b) => b[this.sortBy] - a[this.sortBy] )

        }

      }
    },
    methods: {
      timeFormat(t){

        var date = [], time = [];

        date.push(t.substr(0, 4));
        date.push(t.substr(4, 2));
        date.push(t.substr(6, 2));
        time.push(t.substr(8, 2));
        time.push(t.substr(10, 2));
        time.push(t.substr(12, 2));

        return date.join("/") + ' ' + time.join(":");
      },
      /* TODO:
         1. 修改 sortSbi & sortTot 重複的程式碼
         2. 調整程式碼 為較易讀的狀態
      */
      sortSbi (){
        this.sortBy = 'sbi';
        this.sortMathodTot = 0;
        this.sortMathodSbi = (this.sortMathodSbi+1)%3;

      },
      sortTot (){
        this.sortBy = 'tot';
        this.sortMathodSbi = 0;
        this.sortMathodTot = (this.sortMathodTot+1)%3;

      }
      
      

    },
    created() {

        // 欄位說明請參照:
        // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

        // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
        // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
        // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
        // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

        fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
          .then(res => res.json())
          .then(res => {
              // 將 json 轉陣列後存入 this.ubikeStops
              this.ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
          });
    }
}).mount('#app');