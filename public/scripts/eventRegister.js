document.querySelector("#confirm").addEventListener("click", async (e)=>{
    try {
        e.preventDefault();
        const data = {
            place: document.querySelector("#place").value,
            date : document.querySelector("#date").value,
            message:document.querySelector("#message").value,
        }
        const opts = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        }
        const url = "/events";
        let response = await fetch(url,opts);
        response = await response.json()
        if(response.error){
            alert(response.error);
        }else{
            location.replace("/event/link")
        }
    } catch (error) {
        console.log(error)
    }
})