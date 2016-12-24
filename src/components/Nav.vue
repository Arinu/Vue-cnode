<template>
	<nav class="navbar">
		<div class="navbar-header">
			<a href="#/" class="navbar-brand">
				<img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
			</a>
			<p class="title">cnode for Arinu</p>
      <button type="button" @click="show" class="collapsed">
	      <span></span>
	      <span></span>
	      <span></span>
      </button>
		</div>
		<div :class="{navbar_collapse:true,show: collapse}">
      <li v-for="item in navbar_nav">
      	<a :href="'#' + item.href">{{item.text}}</a>
      </li>
		</div>
	</nav>
</template>
<script>
export default {
	name : 'nav',
	data (){
		return {
			navbar_nav: [
        {href: '/', text: '首页'},
        {href: '/getstart', text: '新手入门'},
        {href: '/api', text: 'API'},
        {href: '/about', text: '关于我们'},
        {href: '/signin', text: '登录'},
			],
			collapse: false
		}
	},
	methods: {
		show (){
			this.collapse = !this.collapse
		}
	}
}
</script>
<style scoped>
	.navbar{
		position: fixed;
		top: 0;
		z-index: 5;
		height: 50px;
		width: 100%;
		border: 0;
		border-radius: 0;
		background-color: #444444;
	}
	.navbar .navbar-header{
		display: block;
		height: 100%;
	}
	.navbar .title{
		display: inline-block;
		margin: 0;
		color: #fff;
		font-size: 22px;
		line-height: 50px;
	}
	.navbar .navbar-brand{
		display: inline-block;
		padding: 10px 0px 0px 10px;
		width: 120px;
	}
	.navbar .navbar-brand img{
		height: auto;
	  max-width: 100%;
	}
	.navbar .collapsed{
		position: absolute;
		top: 5px;
		right: -10px;
		border: 0;
		width: 60px;
		height: 40px;
		cursor: pointer;
		margin-right: 22px;
		border-radius: 5px;
		background-color: #6b6b6b;
	}
	.navbar .collapsed:hover,.navbar .collapsed:focus{
		background-color: #565656;
	}
	.navbar .collapsed span{
		height: 2px;
		width: 50%;
		display: block;
		margin: 15% auto;
		border-radius: 1px;
		background-color: #ddd;
	}
	.navbar .navbar_collapse{
		position: absolute;
		left: 100%;
		width: 100%;
		background-color: #444;
		-webkit-transition: .6s;
		-o-transition: .6s;
		transition: .6s;
	}
	.navbar .show{
		left: 0%;
	}
	.navbar .navbar_collapse li{
		display: block;
	}
	.navbar .navbar_collapse li a{
		display: block;
		color: #fff;
		font-size: 18px;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
		text-decoration: none;
	}
	.navbar .navbar_collapse li a:hover,.navbar .navbar_collapse li a:focus{
		color: #ccc;
	  background-color: dimgrey;
  }
	@media (max-width: 768px){
		.container{
			margin: 0;
			padding: 0;
		}
		.navbar .navbar-header{
			margin: 0;
		}
	}
</style>