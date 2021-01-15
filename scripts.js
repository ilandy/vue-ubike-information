const vm = Vue.createApp({
  data() {
    return {
      ubikeStops: [],
      keyword: "",
      sortBy: "sbi",
      isAsc: null,
      pageItems: [], //全部的頁籤
      page: 1, //當下的頁碼
      rowsPerPage: 20, // 一頁的內容
      pageNav: {
        current: 0,
        last: 1,
      }, // 頁碼的第幾頁
      pageShowItem: 10, //一次頁籤顯示幾個頁碼
    };
  },
  computed: {
    sort() {
      // console.log(this.ubikeStops)
      let oringArr = this.ubikeStops.filter((d) =>
        d.sna.includes(this.keyword)
      );

      if (this.isAsc === null) {
        return oringArr.slice(
          this.rowsPerPage * this.page - this.rowsPerPage,
          this.rowsPerPage * this.page
        );
      }
      if (this.isAsc === true) {
        return oringArr.sort((a, b) => a[this.sortBy] - b[this.sortBy]);
      }
      if (this.isAsc === false) {
        return oringArr.sort((a, b) => b[this.sortBy] - a[this.sortBy]);
      }
    },
    pages() {
      let arr = this.pageItems.slice(
        this.pageNav.current * this.pageShowItem,
        (this.pageNav.current + 1) * this.pageShowItem
      );
      this.page = arr[0] + 1;
      return arr;
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
      if (this.sortBy !== currntField) {
        this.sortBy = currntField;
        this.isAsc = true;
        return;
      }
      if (this.sortBy === currntField && this.isAsc === false) {
        this.isAsc = null;
        return;
      }
      this.isAsc = !this.isAsc;
    },
    pageCtrl(direction) {
      // if (this.pageNav < this.pageItems.length / 10) {
      if (direction === "prev" && this.pageNav.current > 0) {
        this.pageNav.current = this.pageNav.current - 1;
        return;
      }
      if (direction === "next" && this.pageNav.current < this.pageNav.last) {
        this.pageNav.current = this.pageNav.current + 1;
        return;
      }
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
        this.pageItems = [
          ...Array(this.ubikeStops.length / this.rowsPerPage).keys(),
        ];
        this.pageNav.last = this.pageItems.length / this.pageShowItem - 1;
      });
  },
}).mount("#app");
