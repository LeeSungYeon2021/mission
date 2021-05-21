<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>

<%@ include file="/WEB-INF/view/common/header.jsp"%>
<script>


    $('#myModal').on('show.bs.modal', function() {

      $(this).find('.modal-body').css({
        'max-height': '100%'
      });
    });
</script>

<style>
button {
	border: none;
	background-color: white;
}

#updateBtn {
	margin-left: 385px;
}

#deleteBtn {
	margin-left: 5px;
}

#xx {
	margin-top: 10px;
	color: blue;
}

.sp {
	border: none;
}

.tx {
	border: none;
}
/* .col-lg-8 {
 	border : 1px solid black;
 }
.tt {
 	border : 1px solid black;
 }  */
.ts {
	margin: 30px;
}
</style>
</head>
<body>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">제목</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">일시</span>
  </div>
  <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">제목</span>
  </div>
  <select class="form-control">
  	<option value="N">일반</option>
	<option value="Y">중요</option>
  </select>
</div>

<div class="input-group mb-3">
  <div class="">
    <span class="input-group-text" id="basic-addon1">메모</span>
  </div>
  <textarea style="height:200px;"class="form-control">가나다라 마바사 아자차카 타파하</textarea>
</div>


</body>
<!-- <script src="/resources/js/index.js"></script> -->