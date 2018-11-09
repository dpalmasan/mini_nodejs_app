const hide = async (id) => {
    // Hiding when clicking
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    // Here we interact with API to make the post not showable in db
    const response = await fetch('/api/posts/' + id, {
      method: 'PUT',
      body: {}, // string or object
      headers:{
      'Content-Type': 'application/json'
      }
    });
}
