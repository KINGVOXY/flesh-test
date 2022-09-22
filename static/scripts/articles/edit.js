$("#fbtn").click(async function () {
    if (!$('form')[0].reportValidity()) {
        return false;
    }
    await postData(location.pathname, getPostElements(postIds))
        .then(res => {
            if (res.ok) {
                location.href = "/articles/manage?message=記事の編集が完了しました&status=0"
            } else {
                location.href = "/articles/manage?message=記事の編集に失敗しました&status=1"
            }
        });
});
