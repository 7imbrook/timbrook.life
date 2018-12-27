const { fromEvent, from, zip } = rxjs;
const { map, flatMap, repeat, throttleTime } = rxjs.operators;

window.onload = () => {
    const quote_elm = document.getElementById("main-page-quote")
    const animation_loop = fromEvent(quote_elm, "animationiteration")
    const quote_source = from(
            fetch("/api/quotes.json").then(res => res.json())
        )
        .pipe(flatMap(data => from(data.quotes)));

    const data = zip(animation_loop, quote_source)
        .pipe(map(([_, quote]) => quote))
        .pipe(repeat());

    data.subscribe(x => quote_elm.innerHTML = x)

}