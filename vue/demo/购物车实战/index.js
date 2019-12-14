var vm = new Vue({
  el: '#app',
  data: {
    list: [
      {
        checked: true,
        id: 1,
        name: 'iPhone 7',
        price: 6188,
        count: 1,
      },
      {
        checked: true,
        id: 2,
        name: 'iPad Pro',
        price: 5888,
        count: 1,
      },
      {
        checked: true,
        id: 3,
        name: 'MacBook Pro',
        price: 21488,
        count: 1,
      },
      {
        checked: true,
        id: 4,
        name: 'HuaWei P30 Pro',
        price: 4988,
        count: 1,
      },
    ],
  },
  computed: {
    totalPrice: function (){
      var total = 0;
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index];
        if(element.checked){
          total += element.count * element.price;
        }
      }


      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  },
  methods: {
    handleReduce: function (index) {
      if(this.list[index].count === 1) return;
      this.list[index].count--;
    },
    handleAdd: function (index) {
      this.list[index].count++;
    },
    handleRemove: function (index) {
      this.list.splice(index, 1);
    },
    handleChange: function (index, event) {
      this.list[index].checked = event.target.checked;
    },
    handleCheckAll: function (event) {
      const flag = event.target.checked;
      
      this.list = this.list.map(item => {
        item.checked = flag;
        return item;
      });
    }
  }
});