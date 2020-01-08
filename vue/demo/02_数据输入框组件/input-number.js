Vue.component('input-number', {
  template: `
  <div class="input-number">
    <input type="text" :value="currentValue" @change="handleChange" @keyup.up="handleUp" @keyup.down="handleDown" />
    <button @click="handleDown" :disabled="currentValue <= min" >-</button>
    <button @click="handleUp" :disabled="currentValue >= max" >+</button>
  </div>
  `,
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },

  data: function() {
    return {
      currentValue: this.value
    }
  },

  watch: {
    currentValue: function(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
    },

    value: function(val) {
      this.updateValue(val);
    }

  },

  methods: {
    // 过滤出一个正确的currentValue
    updateValue: function (val) {
      if(val > this.max) val = this.max;
      if(val < this.min) val = this.min;
      this.currentValue = val;
    },
    handleDown: function () {
      if(this.currentValue <= this.min) return;
      this.currentValue -= this.step;
    },
    handleUp: function () {
      if(this.currentValue >= this.max) return;
      this.currentValue += this.step;
    },
    handleChange: function (event) {
      var val = event.target.value.trim();
      if(/\d+$/.test(val)){
        val = Number(val);
        this.currentValue = val;

        if(val > this.max){
          this.currentValue = this.max;
        }else if(val < this.min){
          this.currentValue = this.min;
        }
      }else{
        event.target.value = this.currentValue;
      }
    }
  },

  mounted: function () {
    this.updateValue(this.value);
  }
});