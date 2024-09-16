const getListPost = new Promise((resolve, reject) => {
    const url = "https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article"
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Fail`)
            }
            return response.json()
        })
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
})

getListPost
    .then((result) => {
        ListViewPost(result)
    })
    .catch((error) => {
        console.log(error)
    })

const ListViewPost = (post) => {
    // //   duyet array
    const elmPost = document.getElementById('posts')
    let result = '';
    for (const item of post) {
        result += `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        `
    }
    elmPost.innerHTML = result
}