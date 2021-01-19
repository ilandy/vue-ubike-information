<template>
    <tr >
        
          <td>{{ sno }}</td>
          <td>{{ sna }}</td>
          <td>{{ sarea }}</td>
          <td>{{ sbi }}</td>
          <td>{{ tot }}</td>
          <td>{{ timeFormat(mday) }}</td>
    </tr>
</template>

<script>
export default {
  name: 'StopList',
  props: {
    sno: String,
    sna: String,
    tot: String,
    sbi: String,
    sarea: String,
    mday: String,
    // msg: String
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
