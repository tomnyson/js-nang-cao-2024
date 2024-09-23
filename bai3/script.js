const getListPost = new Promise((resolve, reject) => {
  const url = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article'
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

const getListPostAsync = async () => {
  try {
    console.log('getListPostAsync')
    const url = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article'
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`call api failed`)
    }
    return response.json()
  } catch (error) {
    throw new Error(`call api failed ${error}`)
  }
}
// send data to create new post

const createPost = async (data) => {
  try {
    const url = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`call api failed`)
    }
    return response.json()
  } catch (error) {
    throw new Error(`call api failed ${error}`)
  }
}

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
  let result = ''
  for (const item of post) {
    result += `
      <h3>${item.title}</h3>
      <img src="${item.picture}"  class="img-thumbnail"/></p>
      <p>${item.description}</p>
      `
  }
  elmPost.innerHTML = result
}

const reLoadView = async () => {
  const posts = await getListPostAsync()
  ListViewPost(posts)
}

const elm_btn_create = document.getElementById('btn_create')
elm_btn_create.addEventListener('click', async (event) => {
  const title = document.getElementById('title').value
  const picture = document.getElementById('picture').value
  const desc = document.getElementById('description').value

  if (title != '' && picture != '' && desc != '') {
    // them
    const post = await createPost({ title: title, picture: picture, description: desc })
    if (post) {
      alert('thêm thành công')
      reLoadView()
    }
  } else {
    alert('[title, picture, description]field data not empty!')
  }
})(
  // getListPostAsync()
  async () => {
    const result = await getListPostAsync()
    console.log(result)
  },
)()


/**
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
method: "POST",
body: JSON.stringify({ username: "example" }),
headers: myHeaders,
});

* tao 1 form (title, image, description)
* dung method post -> them moi
* dung method put  -> cap nhat du lieu
* dung method delete -> xoa records
*/
