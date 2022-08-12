marked.setOptions({
    // XSS対策
    sanitize: true,
    // code要素にdefaultで付くlangage-を削除
    langPrefix: '',
    // highlightjsを使用したハイライト処理を追加
    highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
});
$(function () {

    $('#content').keyup(function () {
        const src = $(this).val();

        const html = marked.parse(src);

        $('#preview').html(html);

    });
});

const src = $("#content").val();

const html = marked.parse(src);

$('#preview').html(html);

const postIds = [
    "name",
    "imageUrl",
    "content"
]

const content = $("#content");
const preview = $("#preview");

content.scroll(function() {
    preview.scrollTop(content.scrollTop());
})
