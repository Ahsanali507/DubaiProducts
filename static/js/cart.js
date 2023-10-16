var updatebtns = document.getElementsByClassName("update-btn")
for(var i=0; i<updatebtns.length; i++){
    updatebtns[i].addEventListener('click', function (){
        var product_id = this.dataset.product
        var btn_action = this.dataset.action

        // console.log("Product id: ",product_id, "action: ", btn_action)

        // console.log("User: ", user)
        if(user==="AnonymousUser"){
            // console.log("User is not authenticated")
            addCookieItem(product_id,btn_action)
        }
        else{
            updateUserOrder(product_id, btn_action)
        }
    })
}

function addCookieItem(productId, action){
    console.log("User is not loged in")
    // action is add
    if(action=='add'){
        if(cart[productId]==undefined){
            cart[productId]={'quantity':1}
        }
        else{
            cart[productId]['quantity']+=1
        }
    }

    // action is remove
    if(action=='remove'){
        cart[productId]['quantity']-=1
        if(cart[productId]['quantity']<=0){
            console.log("Cart is empty || item is deleted")
            delete cart[productId]
        }
    }

    console.log("Cart: ",cart)
    document.cookie='cart='+JSON.stringify(cart)+";domain=;path=/"

}

function updateUserOrder(productId, action){
    // console.log("User is authenticated and sending data to views...")

    var url = "/update_item/"

    fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-CSRFToken":csrftoken
        },
        body:JSON.stringify({"ProductId":productId, "Action":action})
    }).then((response)=>{
            return response.json()
    }).then((data)=>{
            // console.log(data)
            location.reload()
        })
}