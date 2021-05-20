<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>

<%@ include file="/WEB-INF/view/common/header.jsp"%>
	<script>
$('.modal-content').resizable({
alert("om");
      //alsoResize: ".modal-dialog",
      minHeight: 300,
      minWidth: 300
    });
    $('.modal-dialog').draggable();

    $('#myModal').on('show.bs.modal', function() {

      $(this).find('.modal-body').css({
        'max-height': '100%'
      });
    });
</script>
</head>
<body>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Launch demo modal
  </button>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
 </body>
<!-- <script src="/resources/js/index.js"></script> -->