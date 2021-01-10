let mainText = document.querySelector(".mainText")
console.log("123");
data.forEach((p, i)=>{
      let number = i + 1
      let container = document.createElement("div")
      container.classList.add("faqContainer",  `faqContainer${number}`)
      // let separator = document.createElement("hr")

      if ( i % 2 == 0 ){
          container.classList.add("left")
      } else {
          container.classList.add("right")
      }

      // question and answer
      let question = document.createElement("h1")
      question.classList.add("question", `question${number}`)
      question.innerText = `${number}. ${p.question}`

      let answer = document.createElement("div")
      answer.classList.add("answer", `answer${number}`)
      answer.innerText = p.answer

      let intro = document.createElement("div")
      intro.innerText = p.content
      container.append(question, answer)

      mainText.append(container)
      // mainText.append(container, separator)

})
