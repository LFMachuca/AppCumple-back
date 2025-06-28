document.querySelector("#confirm").addEventListener("click", async (e) => {
  try {
    e.preventDefault()
    const data = {
      name: document.querySelector("#nickname").value,
    };
    const event_id = document.querySelector("#event-id").value;
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const url = `/events/${event_id}/confirm`;
    let response = await fetch(url, opts);
    response = await response.json();
    if(response.error){
        alert(response.error);
    }else{
        location.replace("/")
    }
  } catch (error) {
    console.log(error);
  }
});
