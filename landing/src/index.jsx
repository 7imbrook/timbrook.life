import './css/main.css';
import headshot from './images/headshot.jpg';

import React from 'react';

import ReactDOM from 'react-dom';

const root = document.getElementById('root');

ReactDOM.render(
    (
        <div className="site">
            <header className="header">
                <img src={headshot} alt="Author Image" className="headshot" />
                <h1 className="title">Michael Timbrook</h1>
                <h4 className="description">Software Engineer</h4>
            </header>

            <section className="quote">
                <span>
                    <h3 className="excerpt">The look of terror when I told them I found another distributed message broker.</h3>
                </span>
            </section>

            <section className="social">
                <a href="https://twitter.com/7imbrook"><i className="fab fa-twitter" data-full-name="Twitter" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com/7imbrook"><i className="fab fa-instagram" data-full-name="Instagram" aria-hidden="true"></i></a>
                <a href="https://github.com/7imbrook"><i className="fab fa-github" data-full-name="GitHub" aria-hidden="true"></i></a>
                <a href="https://linkedin.com/in/michaeltimbrook"><i className="fab fa-linkedin" data-full-name="Linkedin" aria-hidden="true"></i></a>
                <a href="mailto:contact@timbrook.tech"><i className="far fa-envelope" data-full-name="Email" aria-hidden="true"></i></a>
                <a href="/resume"><i className="fas fa-file-alt" data-full-name="Resume"></i></a>
                <h4 id="hint-text"></h4>
            </section>

            <footer className="footer">
                <h6 className="copyright">© 2018. Michael Timbrook. <a href="http://creativecommons.org/licenses/by/3.0/">Some Rights Reserved</a>.</h6>
            </footer>
        </div>
    ),
    root,
);
