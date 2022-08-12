const postIds = [
    "email",
    "pwd"
];

$("#fbtn").click(async function () {
    if (!$('form')[0].reportValidity()) {
        return false;
    }
    await postData("/login", getPostElements(postIds))
        .then(res => {
            console.log(res);
            if (res.ok) {
                location.href = "/blogs/manage"
            } else {
                location.href = "/login?message=メールアドレス、パスワードが違います。"
            }
        });
});
