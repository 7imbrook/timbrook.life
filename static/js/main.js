const { fromEvent, from, zip } = rxjs;
const { map, flatMap, repeat, throttleTime } = rxjs.operators;

function loadQuoteApp() {
  const quote_elm = document.getElementById("main-page-quote");
  const section = document.getElementById("info-pane");
  const animation_loop = fromEvent(quote_elm, "animationiteration");
  const quote_source = from(
          fetch("/api/quotes.json").then(res => res.json())
      )
      .pipe(flatMap(data => from(data.quotes)));

  const data = zip(animation_loop, quote_source)
      .pipe(map(([_, quote]) => quote))
      .pipe(repeat());

  data.subscribe(x => {
    quote_elm.innerHTML = x;
    const new_height = (quote_elm.offsetHeight + 10) + 'px';
    section.style.height = new_height;
  })
}

window.onload = () => {
  loadQuoteApp()
}
