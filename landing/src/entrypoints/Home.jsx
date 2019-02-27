import headshot from '../images/headshot.jpg';

import React from 'react';

import QuoteWiget from '../components/QuoteWiget';
import QuoteProvider from '../components/QuoteProvider';


const Home = () => {
    return (
        <div className="site">
            <header className="header">
                <img src={headshot} alt="Author Image" className="headshot" />
                <h1 className="title">Michael Timbrook</h1>
                <h4 className="description">Software Engineer</h4>
            </header>

            <section className="quote">
                <QuoteProvider>
                    <QuoteWiget />
                </QuoteProvider>
            </section>

            <section className="social">
                <a href="https://twitter.com/7imbrook"><i className="fab fa-twitter" data-full-name="Twitter" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com/7imbrook"><i className="fab fa-instagram" data-full-name="Instagram" aria-hidden="true"></i></a>
                <a href="https://github.com/7imbrook"><i className="fab fa-github" data-full-name="GitHub" aria-hidden="true"></i></a>
                <a href="https://linkedin.com/in/michaeltimbrook"><i className="fab fa-linkedin" data-full-name="Linkedin" aria-hidden="true"></i></a>
                <a href="mailto:contact@timbrook.tech"><i className="far fa-envelope" data-full-name="Email" aria-hidden="true"></i></a>
                {/* Will comeback to this, not looking for job right now */}
                {/* <a href="/resume"><i className="fas fa-file-alt" data-full-name="Resume"></i></a> */}
            </section>

            <footer className="footer">
                <h6 className="copyright">© 2018. Michael Timbrook. <a href="http://creativecommons.org/licenses/by/3.0/">Some Rights Reserved</a>.</h6>
            </footer>
        </div>
    );
};

export default Home;