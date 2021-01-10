let partnersContainer = document.querySelector(".partnersContainer")
console.log("123");
data.forEach((p, i)=>{
    console.log(p);
      let number = i + 1
      let entityContainer = document.createElement("div")
      entityContainer.classList.add("entityContainer",  `faqContainer${number}`)

      let detailInfoContainer = document.createElement("div")
      detailInfoContainer.classList.add("detailInfoContainer",  `detailInfoContainer${number}`)

      let textInfoContainer = document.createElement("div")
      textInfoContainer.classList.add("textInfoContainer",  `textInfoContainer${number}`)
      // let separator = document.createElement("hr")

      if ( i % 2 == 0 ){
          entityContainer.classList.add("left")
      } else {
          entityContainer.classList.add("right")
      }

      // question and answer
      let name = document.createElement("h1")
      name.classList.add("entityName", `entityName${number}`)
      name.innerText = `${number}. ${p.name}`
      entityContainer.append(name)

      console.log(p.website);
      if (p.website.startsWith("http")){
        let websiteDiv = document.createElement("div")
        websiteDiv.innerText = "Website: "
        websiteDiv.classList.add("entityWebsite", `entityName${number}`)

        let website = document.createElement("a")
        website.href = p.website
        website.innerText = p.website
        websiteDiv.append(website)
        textInfoContainer.append(websiteDiv)
      }

      if (p.content){
        console.log(p.content);
        let content = document.createElement("div")
        content.classList.add("entityContent", `entityContent${number}`)
        content.innerText = p.content
        textInfoContainer.append(content)
      }

      let photoContainer = document.createElement("div")
      photoContainer.classList.add("photoContainer", `photoContainer${i}`)
      let image = document.createElement("img")
      image.src = p.photo
      photoContainer.append(image)
      detailInfoContainer.append(textInfoContainer,  photoContainer)

      entityContainer.append(name, detailInfoContainer)
      partnersContainer.append(entityContainer)
      // mainText.append(container, separator)

})
