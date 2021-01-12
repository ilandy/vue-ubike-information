const vm = Vue.createApp({
  data() {
    return {
      ubikeStops: [],
      keyword: "",
      sortMethod: {
        sbi: 0,
        tot: 0,
      },
      sortBy: "sbi",
    };
  },
  computed: {
    sort() {
      // console.log(this.ubikeStops)
      let oringArr = this.ubikeStops.filter((d) =>
        d.sna.includes(this.keyword)
      );

      if (this.sortMethod[this.sortBy] === 0) {
        return oringArr;
      }
      if (this.sortMethod[this.sortBy] === 1) {
        return oringArr.sort((a, b) => a[this.sortBy] - b[this.sortBy]);
      }
      if (this.sortMethod[this.sortBy] === 2) {
        return oringArr.sort((a, b) => b[this.sortBy] - a[this.sortBy]);
      }
    },
  },
  methods: {
    timeFormat(t) {
      var date = [],
        time = [];

      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));

      return date.join("/") + " " + time.join(":");
    },
    setSortMethod(currntField, otherField) {
      this.sortBy = currntField;
      this.sortMethod[otherField] = 0;
      this.sortMethod[currntField] = (this.sortMethod[currntField] + 1) % 3;
    },
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
      });
  },
}).mount("#app");
