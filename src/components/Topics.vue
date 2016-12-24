<template>
	<div>
		<div class="header_fluid">
			<ol class="paths">
				<li><a href="#/">主页 \ </a></li>
				<li class="active">{{topics.title}}</li>
			</ol>
			<div class="header">
				<span class="topic_label" v-if="topics.top">{{topics.top ? '置顶' : ''}}</span>
				<h3 class="topic_title">{{topics.title}}</h3>
				<p class="changes">
					<span>&#8226; 发布于 {{getTime(topics.create_at)}}</span>
					<span><a :href="'#/user?'+authorName">&#8226; 作者 {{authorName}}</a></span>
					<span>&#8226; {{topics.visit_count}} 次浏览</span>
					<span>&#8226; 来自 {{getTab}}</span>
				</p>
			</div>
		</div>
		<div class="body_fluid content" v-html="topics.content">
		</div>
		<div class="replies">
			<p class="re_top">{{getLength(topics.replies)}} 条回复</p>
			<div v-for="(item,index) in topics.replies" class="reply">
				<div class="author">
					<img :src="item.author.avatar_url" class="photo"></img>
					<a :href="'#/user?'+item.author.loginname">
						<span class="name">{{item.author.loginname}}</span>
						<span>{{index}}楼</span>
						<span>&#8226;{{getTime(item.create_at)}}</span>
					</a>
					<p :class="{action:true,show: item.ups.length === 0 ? true : false}">
						<span class="up_btn" @click="reply_ups">赞</span>
						<span class="ups">{{getLength(item.ups)}}</span>
					</p>
				</div>
				<div class="comment" v-html="item.content"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'topics',
		data (){
			return {
				api: 'https://cnodejs.org/api/v1',
				topics: {}
			}
		},
		created (){
			var id = this.$route.fullPath.replace('?','/')
			this.$http.get(this.api+id).then(
				response => {
					if(response.body.success){
						this.topics = response.body.data
					}
			})
		},
		methods: {
			getLength (arg){
				return !arg ? 'loading…' : arg.length
			},
			getTime (create_at){
				const now = new Date().getTime(),
							last_reply = new Date(create_at).getTime(),
							distance = (now-last_reply)/1000,
							min = Math.floor(distance/60) || 1,
							hour = Math.floor(distance/60/60),
							day = Math.floor(distance/60/60/24),
							month = Math.floor(distance/60/60/24/30);
				return month ? month+'月前' : day ? day+'天前' : hour ? hour + '小时前' : min + '分钟前'
			},
			reply_ups (){
				console.log(666)
			}
		},
		computed: {
			authorName (){
				return !this.topics.author ? 'loading…' : this.topics.author.loginname
			},
			getTab (){
				switch (this.topics.tab){
					case 'share' :return '分享'
					case 'ask' :return '问答'
					case 'good' :return '精华'
					case 'job' :return '招聘'
				}
			},
		},
	}
</script>
<style>
	.header_fluid{
		width: 100%;
		margin-top: 20px;
		background-color: #fff;
	}
	.header_fluid a,.body_fluid a,.replies a{
		text-decoration: none;
		color: #08d;
	}
	.header_fluid .header{
		padding: 80px 0 0 20px;
	}
	.header_fluid .paths{
		display: block;
		padding: 20px 10px;
		position: fixed;
		width: 100%;
		top: 50px;
		z-index: 2;
		white-space: nowrap;
		background-color: #ccc;
	}
	.header_fluid .paths li{
		display: inline-block;
		color: #666;
	}
	.header_fluid .header h3{
		font-size: 22px;
	}
	.header_fluid .header .topic_label{
		float: left;
		color: #fff;
		padding: 2px;
		margin-top: 5px;
		font-size: 16px;
		font-weight: 700;
		border-radius: 5px;
		background-color: #76d2a2;
	}
	.header_fluid .header .changes{
		color: #838383;
		margin-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #dcdcdc;
	}
	.header_fluid .header .changes span,.header_fluid .header .changes span a{
		font-size: 12px;
	}
	.body_fluid{
		background-color: #fff;
		padding-bottom: 20px;
	}
	.markdown-text{
		padding: 10px 20px 20px;
	}
	.markdown-text h3,.markdown-text h2,.markdown-text h1{
		border-bottom: 1px solid #dcdcdc;
	}
	.markdown-text ul{
		padding: 0;
		margin: 0 0 10px 25px;
	}
	.markdown-text ul>li{
		line-height: 2em;
		font-size: 14px;
	}
	.markdown-text p,{
		font-size: 14px;
		line-height: 1.7;
	}
	.markdown-text img{
		max-width: 100%;
	}
	.replies{
		background-color: #fff
	}
	.replies .re_top{
		background-color: #ccc;
		padding: 10px;
	}
	.reply{
		padding: 5px 10px 0px;
		border-bottom: 1px solid #dcdcdc;
	}
	.reply .author .photo{
		width: 40px;
		vertical-align: middle;
	}
	.reply .author a span{
		font-size: 12px;
		text-decoration: none;
	}
	.reply .author a .name{
		color: #838383;
	}
	.reply .action{
		float: right;
		color: #747474;
		font-size: 12px;
		margin-top: 10px;
	}
	.reply .up_btn{
		cursor: pointer;
	}
	.reply .show{
		display: none;
	}
</style>