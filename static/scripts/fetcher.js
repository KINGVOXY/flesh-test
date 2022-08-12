function getPostElements(id_list = []) {
    const obj = {};
    for (const id of id_list) {
        obj[id] = $(`#${id}`).val();
    }
    return obj;
}

async function postData(url = '', data = {}) {
    const dataStr = JSON.stringify(data);

    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataStr
    });
    return response;
}
