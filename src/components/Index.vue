<style scoped>
	.header_fluid{
		width: 100%;
	}
	.header_fluid a{
		display: inline-block;
		color: #fff;
		width: 20%;
		height: 50px;
		line-height: 50px;
		border-left: 1px solid #808080;
		border-right: 1px solid #808080;
		text-align: center;
		text-decoration: none;
		background-color: #616161;
		box-sizing: border-box;
	}
	.header_fluid a:hover{
		background-color: #515151;
	}
	.body_fluid{
		width: 100%;
	}
	.body_fluid a{
		display: block;
		position: relative;
		height: 80px;
		padding: 10px;
		white-space: nowrap;
		vertical-align: middle;
		text-decoration: none;
		background-color: #fff;
	}
	.body_fluid a:hover{
		background-color: #eaeaea;
	}
	.topic_photo{
		display: inline-block;
		width: 50px;
		height: 50px;
		padding-top: 15px;
		vertical-align: middle;
	}
	.topic_photo img{
		height: 100%;
		border-radius: 10px;
	}
	.topic_label{
		font-size: 12px;
		color: #fff;
		margin: auto 3px;
		padding: 2px 3px;
		border: 1px solid #888;
		border-radius: 5px;
		background-color: #90A8A9;
	}
	.label_top{
		background-color: #56acaf;
	}
	.topic{
		display: inline-block;
		width: 75%;
	}
	.topic_count{
		position: absolute;
		font-size: 12px;
	}
	.topic_title{
		display: inline-block;
		width: 100%;
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.topic_time{
		position: absolute;
		right: 10px;
		bottom: 20px;
		width: 100px;
		text-align: right;
	}

</style>
<template>
	<div>
		<div class="header_fluid">
			<a :href="item.href" @click.prevent="getTopics(item.href)" v-for="item in tabs">{{item.text}}</a>
		</div>
		<div class="body_fluid">
			<a :href="'#/topic?' + item.id" v-for="(item,index) in topics_data">
				<div class="topic_photo">
					<img :src="item.author.avatar_url" alt="">
				</div>
				<span :class="{topic_label:true, label_top: item.top ? true : false}">{{getTab(item.tab)}}</span>
				<div class="topic">
					<span class="topic_title">{{item.title}}</span>
					<p class="topic_count">
						<span class="topic_replies">{{item.reply_count}}</span>
						<span>/</span>
						<span class="topic_visits">{{item.visit_count}}</span>
					</p>
				</div>
				<span class="topic_time">{{getTime(item.last_reply_at)}}</span>
			</a>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data (){
			return {
				api: 'https://cnodejs.org/api/v1',
				tabs: [
					{href: '/?tab=all', text: '全部'},
					{href: '/?tab=good', text: '精华'},
					{href: '/?tab=share', text: '分享'},
					{href: '/?tab=ask', text: '问答'},
					{href: '/?tab=job', text: '招聘'}
				],
				topics_data: {}
			}
		},
		computed: {
		},
		methods: {
			getTopics(href){

				this.$http.get(this.api+'/topics'+href).then(
					response => {
						if(response.body.success){
							this.topics_data = response.body.data
						}
					},
					error => { console.log(error)}
				)
			},
			getTime (time){
				const now = new Date().getTime(),
							last_reply = new Date(time).getTime(),
							distance = (now-last_reply)/1000,
							min = Math.floor(distance/60) || 1,
							hour = Math.floor(distance/60/60),
							day = Math.floor(distance/60/60/24)
				return day ? day+'天前' : hour ? hour + '小时前' : min + '分钟前'
			},
			getTab (tab){
				switch (tab){
					case 'share' :return '分享'
					case 'ask' :return '问答'
					case 'good' :return '精华'
					case 'job' :return '招聘'
					default: return '置顶'
				}
			},
		},
		created (){
			this.$http.get(this.api+'/topics').then(
				response => {
					if(response.body.success){
						this.topics_data = response.body.data
					}
				},
				error => { console.log(error)}
			)
		}
	}
</script>