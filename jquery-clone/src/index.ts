import fetch from "node-fetch";

class SelectorResult {
  #elements
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements
  }
  html(contents: string) {
    this.#elements.forEach(ele => {
      ele.innerHTML = contents
    })
  }
  on<K extends keyof HTMLElementEventMap>(eventname: K,
    arg1: (event: HTMLElementEventMap[K]) => void) {
    this.#elements.forEach(ele => {
      const htmlEle = ele as HTMLElement
      htmlEle.addEventListener(eventname, arg1)
    })
  }
  show() {
    this.#elements.forEach(ele => {
      const htmlEle = ele as HTMLElement
      htmlEle.style.visibility = 'visible'
    })
  }
  hide() {
    this.#elements.forEach(ele => {
      const htmlEle = ele as HTMLElement
      htmlEle.style.visibility = 'hidden'
    })
  }


}

function $(selector: string) {
  return new SelectorResult(
    document.querySelectorAll(selector)
  )

}

namespace $ {
  export function ajax(
    { url, sucuessCb }:
      { url: string, sucuessCb: (data: any) => void }): any {
    return fetch(url).then(resp => resp.json()).then(sucuessCb)
  }
}

export default $;

