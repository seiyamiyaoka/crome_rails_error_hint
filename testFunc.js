class TestHint {
  constructor() {
    this.error_title = document.querySelector("p").innerText
    this.errorDescription = this.preprosessor_title(this.error_title)
  }
  static changeTitle() {
    return document.querySelector("p").innerText
  }
  preprosessor_title(title) {
    const errorSeparatoIndex = title.indexOf("`") -1

    if (errorSeparatoIndex < 0) {
      return {
        title: title
      }
    }

    return {
      title: title.slice(0, errorSeparatoIndex), 
      variable: title.slice(errorSeparatoIndex, errorSeparatoIndex + title.slice(errorSeparatoIndex, title.length).indexOf("'"))
    }
  }
  createHintHtml(obj) {
    let format = document.querySelector(".sub").cloneNode(true);
    function setAnswer(obj) {
      switch (obj.title) {
        case "undefined local variable or method":
          return `${obj.variable}というローカル変数がない, もしくは${obj.variable}\n
           というメソッドがないというエラーです。コントローラにインスタンス変数が定義してあるか, 
           またはviewで@をつけ忘れていないか確認して見ましょう
          `
          break;
        case "syntax error, unexpected end-of-input, expecting keyword_end":
          return `記述間違いをしている可能性があります。defまたはdoとendの数があっているか確認して見ましょう`
          break
        default:
          return 'まだ設定できていません'
          break;
      }
    }
    function hintBuilder() {
      let newSubClass = document.createElement('div')
      let newH3 = document.createElement('h3')
      let newTd = document.createElement('td')
      let newPre = document.createElement('pre')
      return {
        newSubClass,
        newH3,
        newTd,
        newPre
      }
    }

    let newHtml = hintBuilder()
    
    newHtml.newH3.innerText = "エラー対処ヒント"
    newHtml.newTd.innerHTML = "エラー原因"
    newHtml.newPre.innerHTML = setAnswer(obj)
    // debugger
    // format.querySelector('tbody').removeChild(format.querySelector('tbody').lastElementChild)
    // format.querySelector("h3").innerText = "エラー対処ヒント"
    // format.querySelector('td').innerText = "エラー原因"
    // format.querySelector('pre').innerText = setAnswer(obj)

    newHtml.newSubClass.appendChild(newHtml.newH3)
    newHtml.newTd.appendChild(newHtml.newPre)
    newHtml.newSubClass.appendChild(newHtml.newTd)

    const parent = document.querySelector('.frame_info')
    parent.insertBefore(newHtml.newSubClass, parent.querySelector('.variable_info'))
    
  }
  removeNode(format) {
    return format
  }
}

function undefinedMethod() {

}


function main() {
  const test = new TestHint()
  test.createHintHtml(test.preprosessor_title(TestHint.changeTitle()))
}
// })

main()

// export function test() {
//   console.log('test')
// }

// export {
//   changeTitle
// }
  