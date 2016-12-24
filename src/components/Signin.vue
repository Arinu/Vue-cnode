<style>
	body{
		background-color: #e1e1e1
	}
	.signin_box{
		height: 300px;
		padding: 200px 40px 100px;
		background-color: #fff;
	}
	.signin_box input[type='text']{
		width: 400px;
		height: 30px;
		padding: 5px 10px;
		border-radius: 10px;
		background-color: #fff;
		border: 1px solid #53555f;
	}
	.signin_box label{
		font-size: 20px;
	}
	.signin_box div{
		margin: 30px auto 20px;
	}
	.signin_box .btn input[type='submit']{
		margin-left: 60px;
		padding: 10px 25px;
		border-radius: 5px;
		border: 1px solid #08d;
		background-color: #08d;
	}
</style>
<template>
	<div>
		<div class="header_fluid">
			<ol class="paths">
				<li><a href="#/">主页 \ </a></li>
				<li class="active">登录</li>
			</ol>
		</div>
		<div class="signin_box">
			<form action="">
				<div class="name">
					<label for="">用户名：</label>
					<p><input type="text" id="username"></p>
				</div>
				<div class="pass">
					<label for="">密码：</label>
					<p><input type="text" id="password"></p>
				</div>
				<div class="btn">
					<input type="submit" value="登录">
				</div>
			</form>
		</div>		
	</div>
</template>
<script>
	
</script>