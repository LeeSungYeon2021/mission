<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="/resources/css/index.css">

<%@ include file="/WEB-INF/view/common/header.jsp"%>

<section style="width:1366px;">
	<div style="margin-top:150px;margin-left:700px;width: 350px;">
		<div >
			<img style="height:200px;width: 300px;" src="https://lh3.googleusercontent.com/proxy/OiE2L2__MVLvPqb2_h2XcpCt9DNZa1TM7d_2P6qncW18cCJrj93XkYplq1Kt8jvkt1IuuRzES0FL0DIU">
		</div>
		<div style="margin-left:15px;">
			<form action="" id="cal" method="post">
			
				<div class="row" style='height:50px;border: 1px solid lightgray;'>
					<div style='width:50px;border-right: 1px solid lightgray;'>
						<i style="margin-left:17px;margin-top:15px;color:gray;"class="fas fa-id-card fa-1x"></i>
					</div>
					<div style='width:auto;'>
							<input style='border:none;'type="text" placeholder="아이디를 입력해주세요." class="form-control">
					</div>
				</div>			
				<br>	
				<div class="row" style='height:50px;border: 1px solid lightgray;'>
					<div style='width:50px;border-right: 1px solid lightgray;'>
						<i style='margin-left:18px;margin-top:15px;color:gray;' class="fas fa-unlock-alt fa-1x"></i>
					</div>
					<div style='width:auto;'>
							<input style='border:none;'type="password" placeholder="비밀번호를 입력해주세요." class="form-control">
					</div>
				</div>
				<br>
				<div >
					<input type="submit" value="로그인" class="form-control">
				</div>			
			</form>
				
		</div>		
				<div>
					<input style="margin-left:8px;" type="button" value="회원가입" class="form-control">
				</div>
				<br>
				<div>
					<a style="margin-left:80px;" href="#">아이디 찾기</a>
					<a style="margin-left:50px;" href="#">비밀번호 찾기</a>
				</div>
	</div>			
</section>
<script>
	/* $("#gg").click(function() {
		if($("input[type=checkbox]:checked")) {
			$("#gg").css('background-color','red');	
		}
		console.log('dfsdf?');
		
	}) */
</script>
<%@ include file="/WEB-INF/view/common/footer.jsp"%>
<script src="/resources/js/cal.js"></script>
