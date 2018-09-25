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
      } else if (obj.title.indexOf("uninitialized constant") >= 0)  {
        return '定数の呼び出しに失敗しています。モデル名が間違っていないか確認しましょう。モデル自体が存在していない可能性もあります。'
      } else {
        return 'まだ対応できません。googleで検索をしましょう。'
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

    newHtml.newSubClass.appendChild(newHtml.newH3)
    newHtml.newTd.appendChild(newHtml.newPre)
    newHtml.newSubClass.appendChild(newHtml.newTd)

    let parent = document.querySelector('.hint')
    if (!parent) {
      parent = document.querySelector('.sub') 
    }
    parent.parentNode.insertBefore(newHtml.newSubClass, parent);
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

main()