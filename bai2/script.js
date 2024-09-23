// const myPromise = (x) => new Promise((resolve, reject) => {
//     if(x>0) {
//         return resolve(x);
//     } else {
//         return reject(new Error(`${x} must be greater than 0`))
//     }
// })

// myPromise(2).then(result => {
//     console.log(result)
// })

// const myPromise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 200, "myPromise1");
//   });

//   // Create another Promise
//   const myPromise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000, "myPromise2");
//   });
//Promise.race([myPromise1, myPromise2])
//   // Both resolves. Who is faster?
//   Promise.all([myPromise1, myPromise2]).then((x) => {
//     myDisplay(x);
//   });

//   // Funtion to run when a Promise is settled:
//   function myDisplay(some) {
//     document.getElementById("vidu").innerHTML = some;
//   }

const getListPost = new Promise((resolve, reject) => {
  const url = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article'
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      return response.json()
    })
    .then((data) => {
      resolve(data)
    })
    .catch((err) => reject(err))
})

getListPost
  .then((result) => {
    ListViewPost(result)
    /**
     *  duyet array 
     *  document.getElementById('article'). innerHTML =
     */
  })
  .catch((error) => console.log(error))

  const ListViewPost = (posts) => {
    /*  duyet array 
    *  document.getElementById('article'). innerHTML =
    */
   const elmPosts = document.getElementById('posts')
   let result = '';
   for(const item of posts) {
    result+=`
        <h3>${item.title}</h3>
        <img src="${item.picture}" width="300px"/>
        <p>${item.description}</p>
        <hr/>
    `
   }
   elmPosts.innerHTML = result
  }
