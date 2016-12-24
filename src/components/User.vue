<template>
	<div>
		<div class="header_fluid">
			<ol class="paths">
				<li><a href="#/">主页 \ </a></li>
				<li class="active">{{user_data.loginname}}</li>
			</ol>
			<div class="header">
				<img :src="user_data.avatar_url" class="photo" alt="">
				<span>用户名：{{user_data.loginname}}</span>
				<span>积分：{{user_data.score}}</span>
				<span>注册于：{{getTime(user_data.create_at)}}</span>
			</div>
		</div>
		<div class="body_fluid">
			<div class="panel">
				<p class="top">收藏的话题</p>
				<div class="topics" v-for="item in collect_data">
					<img :src="item.author.avatar_url" alt="" class="photo">
					<a :href="'#/topic?'+item.id">{{item.title}}</a>
					<span class="time">{{getTime(item.last_reply_at)}}</span>
				</div>
				<div class="topics" v-if="getLength(collect_data)===0">
					<p class="nothing">暂无</p>
				</div>
			</div>
			<div class="panel">
				<p class="top">创建的话题</p>
				<div class="topics" v-for="item in user_data.recent_topics">
					<img :src="item.author.avatar_url" alt="" class="photo">
					<a :href="'#/topic?'+item.id">{{item.title}}</a>
					<span class="time">{{getTime(item.last_reply_at)}}</span>
				</div>
				<div class="topics" v-if="getLength(user_data.recent_replies)===0">
					<p class="nothing">暂无</p>
				</div>
			</div>
			<div class="panel">
				<p class="top">最近参与的话题</p>
				<div class="topics" v-for="item in user_data.recent_replies">
					<img :src="item.author.avatar_url" alt="" class="photo">
					<a :href="'#/topic?'+item.id">{{item.title}}</a>
					<span class="time">{{getTime(item.last_reply_at)}}</span>
				</div>
				<div class="topics" v-if="getLength(user_data.recent_replies)===0">
					<p class="nothing">暂无</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'user',
		data (){
			return {
				api : 'https://cnodejs.org/api/v1',
				user_data: {},
				collect_data: []
			}
		},
		created (){
			const id = this.$route.fullPath.replace('?','/')
			const collect = id.replace('/user/','/topic_collect/');
			console.log(collect);
			this.$http.get(this.api+id).then(
				response => {
					if (response.body.success){
						this.user_data = response.body.data
					}
				}
			)
			this.$http.get(this.api+collect).then(
				response => {
					if (response.body.success){
						this.collect_data = response.body.data
						console.log(response.body.data)
					}
				}
			)
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
		}
	}
</script>
<style scoped>
	.header .photo{
		vertical-align: middle;
		width: 60px;
	}
	.body_fluid{
		background-color: #fff;
	}
	.panel{
		padding-top: 20px;
	}
	.panel .top{
		color: #555;
		padding: 5px;
		background-color: #ccc;
	}
	.panel .topics{
		padding: 5px 15px;
		width: 100%;
		height: 40px;
		position: relative;
		white-space: nowrap;
		border-bottom: 1px solid #dcdcdc;
	}
	.panel .topics img{
		display: inline-block;
		width: 40px;
		vertical-align: middle;
		white-space: nowrap;
	}
	.panel .topics a{
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80%;
		overflow: hidden;
	}
	.panel .topics .time{
		position: absolute;
		top: 5px;
		right: 40px;
	}
	.panel .topics .nothing{
		line-height: 40px;
		margin-left: 10px
	}
</style>