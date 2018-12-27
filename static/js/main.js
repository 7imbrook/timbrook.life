const { fromEvent, from, zip, merge } = rxjs;
const { map, flatMap, repeat, throttleTime } = rxjs.operators;

function getQuoteObserver() {
  const quote_elm = document.getElementById("main-page-quote");
  const animation_loop = fromEvent(quote_elm, "animationiteration");
  const quote_source = from(
          fetch("/api/quotes.json").then(res => res.json())
      )
      .pipe(flatMap(data => from(data.quotes)));

  return zip(animation_loop, quote_source)
      .pipe(map(([_, quote]) => quote))
      .pipe(repeat());
}

function getSocialObserver () {
  const social_links = document.getElementById("social-pane").children;
  let social_link_hover_events = []
  for (linkelm of social_links) {
    const link_observer = merge(
      fromEvent(linkelm, "mouseenter"),
      fromEvent(linkelm, "mouseleave"),
    ).pipe(map(data => {
      return {
        full_name: data.srcElement.children[0].getAttribute("data-full-name"),
        direction: data.type,
      }
    }))
    social_link_hover_events.push(link_observer);
  }
  return social_link_hover_events.reduce((a, b) => merge(a, b))
}


window.onload = () => {
  getQuoteObserver().subscribe(x => {
    const quote_elm = document.getElementById("main-page-quote");
    const section = document.getElementById("info-pane");
    quote_elm.innerHTML = x;
    const new_height = (quote_elm.offsetHeight + 10) + 'px';
    section.style.height = new_height;
  })
  getSocialObserver().subscribe(({full_name, direction}) => {
    switch (direction) {
      case "mouseenter":
      case "mouseleave":
        break;
    }
  })
}
