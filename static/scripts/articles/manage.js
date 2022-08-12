$(document).on("click", ".btn-delete", function (e) {
    const delBtn = e.target.closest("[data-href]");
    $("#deleteForm").attr("action", delBtn.dataset.href);
});

$("#dbtn").click(function (e) {
    $('#deleteForm').submit();
});
