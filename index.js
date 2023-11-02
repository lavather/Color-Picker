let colorarray=[]

document.addEventListener("click", function(e){
    
    const clicked=e.target.id
    const colorID=colorarray.includes(clicked)
    
    if(colorID){
        copyToClipboard(clicked)
    }

    if(clicked==="color-btn"){
        colorarray=[]
        const pickedColor=document.getElementById("seed-color").value
        let seed=pickedColor.replace('#','')
        const mode=document.getElementById("palettes").value

        fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}&format=json&count=5`)
        .then(response=>response.json())
        .then(data=>{
            renderStuff(data)
        })   
    }
})

function renderStuff(data){
    let html=""
    let footerhtml=""
    data.colors.forEach(function(color){
        html+=`<div class="colour" style="background-color:${color.hex.value};"></div>`
        footerhtml+=`<p id="${color.hex.value}">${color.hex.value}</p>`
        colorarray.push(color.hex.value)
    })
    document.getElementById("given-colors").innerHTML=html
    document.getElementById("footer").innerHTML=footerhtml
    console.log(colorarray)
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
}

