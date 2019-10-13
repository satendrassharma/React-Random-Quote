import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];
let timer = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      randcolor: 0,
      auto: false
    };
  }
  componentDidMount() {
    // var aScript = document.createElement('script');
    // aScript.type = 'text/javascript';
    // aScript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";

    // document.head.appendChild(aScript);
    this.onNewClick();
  }
  onNewClick = () => {
    //fetch the quote
    const url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    fetch(url)
      .then(res => res.json())
      .then(
        ({ quotes }) => {
          const len = quotes.length;
          const rand = Math.floor(Math.random() * len);
          const randcolor = Math.floor(Math.random() * colors.length);
          console.log(rand);
          this.setState({
            quote: quotes[rand].quote,
            author: quotes[rand].author,
            randcolor
          });
        }
        // const url1 ='http://quotes.stormconsultancy.co.uk/random.json';
        // fetch(url1).then(res=>res.json()).then(data=>console.log(data))
      )
      .catch(e => console.log(e));
  };
  onautochange = () => {
    this.setState(
      prevstate => ({
        auto: !prevstate.auto
      }),
      () => {
        if (this.state.auto) {
          timer = setInterval(() => {
            this.onNewClick();
          }, 1000);
        } else {
          clearInterval(timer);
        }
      }
    );
  };
  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    return (
      <div
        id="wrapper"
        style={{
          background: colors[this.state.randcolor],
          color: colors[this.state.randcolor]
        }}
      >
        <header>
          Random Quote Generator
          <br />
          <input type="checkbox" name="auto" onChange={this.onautochange} />
          <span id="checkbox">Generate Automatically</span>
        </header>
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i>
            <span id="text">{this.state.quote}</span>
          </div>
          <div className="quote-author">
            - <span id="author">{this.state.author}</span>
          </div>
          <div className="buttons">
            <a
             
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
                this.state.quote
              }-${this.state.author}`}
              style={{ background: colors[this.state.randcolor] }}
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
              rel='noopener noreferrer'
            >
              <i className="fa fa-twitter" />
            </a>
            <a
              target="_blank"
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${
                this.state.quote
              }&content=${
                this.state.author
              }&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'`}
              style={{ background: colors[this.state.randcolor] }}
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              rel='noopener noreferrer'
            >
              <i className="fa fa-tumblr" />
            </a>
            <button
              disabled={this.state.auto}
              className="button"
              id="new-quote"
              onClick={this.onNewClick}
              style={{ backgroundColor: colors[this.state.randcolor] }}
            >
              New quote
            </button>
          </div>
        </div>

        
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
