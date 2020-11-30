<template>
  <div :class="{'show':show}" class="header-search">
    <el-badge :value="value" class="item" />
    <svg-icon class-name="search-icon" icon-class="tips" @click.stop="click" />
  </div>
</template>

<script>
import {
  Unread
} from '@/api/companyUser'
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
// import Fuse from 'fuse.js'
// import path from 'path'
// import i18n from '@/lang'

export default {
  name: 'HeaderSearch',
  // components: {
  //   Fuse,
  //   path,
  //   i18n
  // },
  data() {
    return {
      value: '',
      show: true
    }
  },
  mounted() {
    this.getmsg()
    setInterval(this.getmsg, 30000)
  },
  beforeDestroy() {
    clearInterval(this.getmsg)
  },
  methods: {
    click() {
      this.$router.push({
        path: '/notice'
      })
    },
    getmsg() {
      var query = {
        access_token: localStorage.getItem('accessToken')
      }
      Unread(query).then(res => {
        this.value = res.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
	.item {
		position: absolute;
		right: 8.7rem;
	}

	.header-search {
		font-size: 0 !important;

		.search-icon {
			cursor: pointer;
			font-size: 1.5rem;
			vertical-align: middle;
		}

		.header-search-select {
			font-size: 24px;
			transition: width 0.2s;
			width: 0;
			overflow: hidden;
			background: transparent;
			border-radius: 0;
			display: inline-block;
			vertical-align: middle;

			::v-deep .el-input__inner {
				border-radius: 0;
				border: 0;
				padding-left: 0;
				padding-right: 0;
				box-shadow: none !important;
				border-bottom: 1px solid #d9d9d9;
				vertical-align: middle;
			}
		}

		&.show {
			.header-search-select {
				width: 210px;
				margin-left: 10px;
			}
		}
	}
</style>
