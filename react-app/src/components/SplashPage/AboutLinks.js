import "./AboutLinks.css"
import githubLogo from "../../images/github-icon.png"
import linkedInLogo from "../../images/linked-in-icon.png"

function AboutLinks() {


    return (
        <div id="about-links-container">
            <div id="about-links-header-container">
                <div id="about-links-header">The Developers</div>
            </div>
            <div id="richard-container" className="about-person-container">
                <div id="richard-header" className="about-person-header">Richard Diaz</div>
                <div id="footer-github-link-container" className="footer-link-container">
                    <a id="footer-github-link-logo-container" className="footer-logo-container" href="https://github.com/eco-richard" target="_blank" rel="noreferrer noopener">
                        <img id="github-logo" className="footer-logo" src={githubLogo}></img>
                    </a>
                    <a id="footer-github" className="footer-field" href="https://github.com/eco-richard" target="_blank" rel="noreferrer noopener">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-link-container">
                    <a id="footer-linked-in-link-logo-container" className="footer-logo-container" href="https://www.linkedin.com/in/richard-diaz-209780234/" target="_blank" rel="noreferrer noopener">
                        <img id="linked-in-logo" className="footer-logo" src={linkedInLogo}></img>
                    </a>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/richard-diaz-209780234/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                </div>
            </div>
            <div id="paul-container" className="about-person-container">
                <div id="paul-header" className="about-person-header">Paul Fixler</div>
                <div id="footer-github-link-container" className="footer-link-container">
                    <a id="footer-github-link-logo-container" className="footer-logo-container" href="https://github.com/pfixler" target="_blank" rel="noreferrer noopener">
                        <img id="github-logo" className="footer-logo" src={githubLogo}></img>
                    </a>
                    <a id="footer-github" className="footer-field" href="https://github.com/pfixler" target="_blank" rel="noreferrer noopener">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-link-container">
                    <a id="footer-linked-in-link-logo-container" className="footer-logo-container" href="https://www.linkedin.com/in/paul-f-2022b6269/" target="_blank" rel="noreferrer noopener">
                        <img id="linked-in-logo" className="footer-logo" src={linkedInLogo}></img>
                    </a>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/paul-f-2022b6269/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                </div>
            </div>
            <div id="christian-container" className="about-person-container">
                <div id="christian-header" className="about-person-header">Christian Lee</div>
                <div id="footer-github-link-container" className="footer-link-container">
                    <a id="footer-github-link-logo-container" className="footer-logo-container" href="https://github.com/christianlee6" target="_blank" rel="noreferrer noopener">
                        <img id="github-logo" className="footer-logo" src={githubLogo}></img>
                    </a>
                    <a id="footer-github" className="footer-field" href="https://github.com/christianlee6" target="_blank" rel="noreferrer noopener">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-link-container">
                    <a id="footer-linked-in-link-logo-container" className="footer-logo-container" href="https://www.linkedin.com/in/christian-lee-383590192/" target="_blank" rel="noreferrer noopener">
                        <img id="linked-in-logo" className="footer-logo" src={linkedInLogo}></img>
                    </a>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/christian-lee-383590192/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                </div>
            </div>
            <div id="kevin-container" className="about-person-container">
                <div id="kevin-header" className="about-person-header">Kevin Ong</div>
                <div id="footer-github-link-container" className="footer-link-container">
                    <a id="footer-github-link-logo-container" className="footer-logo-container" href="https://github.com/kong1214" target="_blank" rel="noreferrer noopener">
                        <img id="github-logo" className="footer-logo" src={githubLogo}></img>
                    </a>
                    <a id="footer-github" className="footer-field" href="https://github.com/kong1214" target="_blank" rel="noreferrer noopener">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-link-container">
                    <a id="footer-linked-in-link-logo-container" className="footer-logo-container" href="https://www.linkedin.com/in/kevin-ong-357b16215/" target="_blank" rel="noreferrer noopener">
                        <img id="linked-in-logo" className="footer-logo" src={linkedInLogo}></img>
                    </a>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/kevin-ong-357b16215/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                </div>
            </div>
        </div>
    )
}

export default AboutLinks;
