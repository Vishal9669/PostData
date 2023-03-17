  //Fetched Data...........

  let Post;
  let currentPage = 1;
  let postPerPage ;
  let indexOfFirstPost ;
  let indexOfLastPost ;
  let currentPosts ;
  let pageNumber = []
 
  
  //fetch data 
  async function jsonfile() {
    Post = await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
      
  }

  // print all data to user.........
  async function fetchData(){
    await jsonfile();
    await paginating();
    console.log("printing data.... " + Post);
    print(currentPosts);
    pageNumbers(pageNumber);
  }

  
  // Data access to user..........
  function print(Post) {
    var userdatas = document.getElementById("card");
  
    userdatas.innerHTML = `${Post.map(
        (data) => `<div class="card_data" id="data">
  
  <Strong> Id :</Strong> <span id="Id">${data.id}</span><br><br><br><br>
  <Strong> Title :</Strong> <span id="Title">${data.title}</span><br><br><br><br>
  <Strong> Completed :</Strong> <span id="Completed">${data.completed}</span></div><br><br>`
      )
      .join("")}`;

  }
  
  // access data by a search button ..............
  
    document.getElementById("btn1").addEventListener("click", async () => {
    await jsonfile();
  
    let InputId = await document.getElementById("inputt").value;
    let x = await Post
      .filter((user) => user.id == InputId)
      .map((user) => {
        return user;
      });
    FetchedDatata(x);
  
  });
  
  
  //after serach single post 
  function FetchedDatata(Post) {
    var userdatas = document.getElementById("card");
  
    userdatas.innerHTML = `${Post
      .map(
        (data) => `<div class="card_data" id="data">
  
  <Strong> Id :</Strong> <span id="Id">${data.id}</span><br><br><br><br><br><br><br>
  <Strong> Title :</Strong> <span id="Title">${data.title}</span><br><br><br><br><br><br><br>
  <Strong> Completed :</Strong> <span id="Completed">${data.completed}</span></div><br><br><br>`
      )
      .join("")}`;
  
      document.getElementById("data").style.padding = "250px";
      document.getElementById("data").style.marginLeft="200px";
  }
  
  // pagination functioning.....
  function paginating(){
    console.log("paginating");
    postPerPage=6;

    indexOfLastPost = currentPage * postPerPage;
    indexOfFirstPost = indexOfLastPost - postPerPage;
    currentPosts = Post.slice(indexOfFirstPost,indexOfLastPost);

    for(let i=1 ; i<=Math.ceil(Post.length/postPerPage);i++){
        pageNumber.push(i)
    }
  }

  //paginate
  function paginate(num){
    console.log("paginate");

    currentPage = num
    paginating();
    print(currentPosts)
  }

  //print number of pagination
  function pageNumbers(pageNumber){
    document.getElementById("pageNum").innerHTML =`
    ${pageNumber.map((num)=>`
   
    <a onclick="paginate(${num})">${num}</a>
    
    `).join("")}`
  
  }

