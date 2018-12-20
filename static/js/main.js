
const quotes = [
    "The look of terror when I told them I found another distributed message broker.",
    "My Mac is definitely warmer than my sandwich right now, there's no doubt about that.",
    "Your opinion would be flagged as Timbrook",
]

window.onload = () => {
    let iter = 0;
    const total = quotes.length;
    quote_elm = document.getElementById("main-page-quote");
    quote_elm.innerHTML = quotes[iter];
    quote_elm.addEventListener("animationiteration", () => {
        iter = (iter + 1) % total;
        quote_elm.innerHTML = quotes[iter];
    });
}