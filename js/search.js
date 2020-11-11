var input = document.getElementById("searchByTechnology");

input.addEventListener("keypress", function onEvent(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn").click();
  }
});

function search() {
    // React
    var name = document.getElementById("searchByTechnology").elements["searchItem"].value;
    var pattern = name.toLowerCase();
    //react
    var targetId = "";
  
    var proj = document.querySelectorAll(".project-intro");
    var artcls = document.querySelectorAll('.example-project')
    
    for (var i = 0; i < proj.length; i++) {
    //    alert(para[0].innerText.toLowerCase())
       var index = proj[i].innerText.toLowerCase().indexOf(pattern);
    //    console.log(index)
       if (index != -1) {
          targetId = artcls[i].id;
          document.getElementById(targetId).scrollIntoView();
          break;
       }
    }
}

