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
      if (obj.title.indexOf("undefined local variable or method") >= 0 || obj.title.indexOf("undefined method") >= 0) {
        return `${obj.variable}というローカル変数がない, もしくは${obj.variable}\n
        というメソッドがないというエラーです。コントローラにインスタンス変数が定義してあるか, 
        またはviewで@をつけ忘れていないか確認して見ましょう
       `
      } else if (obj.title.indexOf("Couldn't find") >= 0) {
        return `オブジェクトが見つからないためエラーになっています。idで探している場合はそのidのデータが本当に存在しているか確認してみましょう`
      } else if (obj.title.indexOf("syntax error, unexpected keyword_ensure") >= 0) {
        return `do ~ endの部分で記述ミスをしている可能性があります。do~endのインデントを修正した上で数があっているか確認しましょう` 
      } else {
        return 'まだ対応できません。googleで検索をしましょう。'
      }
      // switch (obj.title) {
      //   case "undefined local variable or method":
          
      //     break;
      //   case "syntax error, unexpected end-of-input, expecting keyword_end":
      //     return `記述間違いをしている可能性があります。defまたはdoとendの数があっているか確認して見ましょう`
      //     break
      //   case "undefined method":
      //     return `${obj.variable}メソッドが定義されていません。呼び出しもとのオブジェクトがメソッドを持っているか確認しましょう。\n
      //     　　　　${obj.variable}メソッド名の入力間違いの可能性もあります。
      //     `
      //     break
      //   case "syntax error, unexpected keyword_ensure, expecting end-of-input":
      //     return `do ~ endの部分で記述ミスをしている可能性があります。do~endのインデントを修正した上で数があっているか確認しましょう`
      //     break
      //   case obj.title.indexOf("Couldn't find"):
      //     debugger
      //     return 
      //   default:
      //     return 'まだ設定できていません'
      //     break;
      // }
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
    // format.querySelector('tbody').removeChild(format.querySelector('tbody').lastElementChild)
    // format.querySelector("h3").innerText = "エラー対処ヒント"
    // format.querySelector('td').innerText = "エラー原因"
    // format.querySelector('pre').innerText = setAnswer(obj)

    newHtml.newSubClass.appendChild(newHtml.newH3)
    newHtml.newTd.appendChild(newHtml.newPre)
    newHtml.newSubClass.appendChild(newHtml.newTd)

    let parent = document.querySelector('.hint')
    if (!parent) {
      parent =  document.querySelector('.sub') 
    }
    
    debugger
    // if (parent.style) {
    //   parent.style.display = 'block'
    // } 
    // const target = .variable_info
    // debugger
    // parent.innerHTML = newHtml.newSubClass
    // parent.insertAdjacentHTML('afterbegin', newHtml.newSubClass);
    parent.parentNode.insertBefore(newHtml.newSubClass, parent);
    // debugger
    // parent.insertBefore(newHtml.newSubClass, parent.querySelector('.hint'))
    // debugger
    // parent.insertBefore(newHtml.newSubClass, parent.querySelector('.trace_info.clearfix').nextSibling)
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
  