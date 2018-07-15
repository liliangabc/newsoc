<template>
<div class="page-member-pay-order">
  <com-top-tabs></com-top-tabs>
  <com-form-item label="订单信息:">
    <ul class="inner-box">
      <li class="clearfix row">
        <span class="label">订单名称:</span>
        <div class="content">
          <span class="text">商标【{{detail.name}}】注册代理费</span>
        </div>
      </li>
      <li class="clearfix row">
        <span class="label">订单金额:</span>
        <div class="content">
          <span class="text">{{detail.money}}元</span>
        </div>
      </li>
      <!-- <li class="clearfix row">
        <span class="label">发票信息:</span>
        <div class="content">
          <label for="invoiceCheckbox"><input type="checkbox" id="invoiceCheckbox" v-model="needInvoice">开具发票</label>
        </div>
      </li> -->
      <li class="clearfix row" v-if="needInvoice">
        <span class="label">输入发票台头:</span>
        <div class="content">
          <input type="text" placeholder="输入发票台头" class="input" v-model.trim="tableHead">
        </div>
      </li>
      <li class="clearfix row">
        <span class="label">支付方式:</span>
        <div class="content paymethod">
          <!-- <label for="zfbRadio">
            <input type="radio" name="paymethod" id="zfbRadio" value="0" v-model="payMethod">
            <img src="~/assets/img/zfb.png">
          </label> -->
          <label for="wxRadio">
            <input type="radio" name="paymethod" id="wxRadio" value="1" v-model="payMethod">
            <img src="~/assets/img/WePayLogo.png">
          </label>
        </div>
      </li>
    </ul>
  </com-form-item>
  <div class="submit-wrapper">
    <p class="hint">付款后，如经顾问审核，商标无法注册，您可以对商标名称或商标图样进行修改</p>
    <button class="btn-submit" @click="onSubmit">付款</button>
  </div>
</div>
</template>
<script>
import ComTopTabs from '~/components/member/top-tabs'
import ComFormItem from '~/components/member/form-item'
export default {
  components: { ComTopTabs, ComFormItem },
  asyncData({ route, store }) {
    return store.dispatch('getOrder', {
      id: route.query.id
    }).then(data => {
      return { detail: data.data }
    }).catch(err => ({ errmsg: err.message }))
  },
  data() {
    return {
      needInvoice: false,
      tableHead: '',
      payMethod: '1',
      detail: {}
    }
  },
  methods: {
    onSubmit() {
      let { product_no, id } = this.$route.query
      if (this.payMethod == '1') {
        this.$router.push(`/member/wxbuy?id=${id}&product_no=${product_no}`)
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-member-pay-order {
  padding: 28px 0 40px;
  .inner-box {
    padding: 16px 12px;
    .row {
      + .row {
        margin-top: 1.8em;
      }
      .label, .content .text {
        font-size: 16px;
        color: $normalTextColor;
      }
      .label {
        float: left;
        width: 240px;
        text-align: right;
        padding-right: 12px;
      }
      .content {
        margin-left: 240px;
        font-size: 14px;
        color: $normalTextColor;
        [type="checkbox"] {
          height: 18px;
          width: 15px;
          margin-right: 3px;
          vertical-align: middle;
        }
        .input {
          width: 100%;
          max-width: 400px;
          height: 36px;
          padding: 0 12px;
          font-size: 15px;
          color: $normalTextColor;
          border: 1px solid $level3BorderColor;
          &::placeholder {
            color: $placeholderTextColor;
          }
        }
        &.paymethod {
          label {
            display: inline-block;
            + label {
              margin-left: 16px;
            }
          }
          img {
            width: auto;
            height: 24px;
            margin-left: 6px;
          }
        }
      }
    }
  }
  .submit-wrapper {
    text-align: center;
    .hint {
      font-size: 15px;
      color: $normalTextColor;
      margin-bottom: 12px;
    }
    .btn-submit {
      min-width: 68px;
      padding: 0 12px;
      height: 36px;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 15px;
      background-color: $warningColor;
      &:hover {
        background-color: $warningActiveColor;
      }
    }
  }
}

@media (max-width: 600px) {
  .page-member-pay-order {
    .inner-box {
      .row {
        .label {
          width: 120px;
        }
        .content {
          margin-left: 120px;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .page-member-pay-order {
    .inner-box {
      .row {
        .content {
          &.paymethod {
            label {
              width: 100%;
            + label {
              margin-left: 0;
              margin-top: 12px;
            }
            }
          }
        }
      }
    }
  }
}
</style>