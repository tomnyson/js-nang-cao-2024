

document.addEventListener('DOMContentLoaded', (event) => {
 
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
  
  
  const getListPostSearch = (title) => {
    return new Promise((resolve, reject) => {
      const url = `https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article?title=${title}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  const getDetailById = async (id) => {
    try {
      const url = `https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article/${id}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`call api failed`)
      }
      return response.json()
    } catch (error) {
      throw new Error(`call api failed ${error}`)
    }
  }
  
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
  
  const updatePost = async (data, id) => {
    try {
      const url = `https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article/${id}`
      const response = await fetch(url, {
        method: 'PUT',
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
  
  const deletePost = async (id) => {
    try {
      const url = `https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
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

  const reLoadView = async () => {
    const posts = await getListPostAsync()
    ListViewPost(posts)
  }

  // xoa post
  const deletePostAction = async (id) => {
    if (confirm('are you sure delete this post!') == true) {
      await deletePost(id)
      alert('delete success !')
      reLoadView()
    }
  }
  let selectedId = null
  const editPostAction = async (id) => {
    if (confirm('are you sure edit this post!') == true) {
      const detail = await getDetailById(Number(id))
      document.getElementById('title').value = detail?.title
      document.getElementById('picture').value = detail?.picture
      document.getElementById('description').value = detail?.description
      const elm_btn_create = document.getElementById('btn_create')
      elm_btn_create.innerText = 'Save change'
      selectedId = Number(id)
      reLoadView()
    }
  }

  const ListViewPost = (post) => {
    // //   duyet array
    const elmPost = document.getElementById('posts')
    let result = ''
    if (post.length == 0) {
      result += 'no data item'
    }
    for (const item of post) {
      result += `
      <div class="col-md-6">
        <img src="${item.picture}"  class="img-thumbnail"/></p>
        <h3>${item.title}</h3>
        <button onClick="deletePostAction('${item.id}')" type="button" class="btn btn-danger">Delete</button>
        <button onClick="editPostAction('${item.id}')" type="button" class="btn btn-info">Edit</button>
        <p>${item.description}</p>
      </div>    
        `
    }
    elmPost.innerHTML = result
  }

  const elm_btn_create = document.getElementById('btn_create')
  elm_btn_create.addEventListener('click', async (event) => {
    const title = document.getElementById('title').value
    const picture = document.getElementById('picture').value
    const desc = document.getElementById('description').value

    if (title != '' && picture != '' && desc != '') {
      // them
      if (selectedId) {
        // cap nhat
        const update = await updatePost(
          { title: title, picture: picture, description: desc },
          selectedId,
        )
        if (update) {
          selectedId = null
          elm_btn_create.innerText = 'Add new post'
          document.getElementById('title').value = ''
          document.getElementById('picture').value = ''
          document.getElementById('description').value = ''
          alert('cập nhât thành công')
          reLoadView()
        }
      } else {
        // chuc nang them moi
        const post = await createPost({ title: title, picture: picture, description: desc })
        if (post) {
          alert('thêm thành công')
          reLoadView()
        }
      }
    } else {
      alert('[title, picture, description]field data not empty!')
    }
  })


  //search
  const elm_search = document.getElementById('search')
  elm_search.addEventListener('keyup', async(event) => {
    console.log(event.target.value)
    const keyword = event.target.value
    const posts = await getListPostSearch(keyword)
    ListViewPost(posts)
  })
  // const elmInputSearch = document.getElementById('search')
  // elmInputSearch.addEventListener('keyup', async (event) => {
  //   console.lo
  // })

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
})
