import githubLogo from "../../images/github-icon.png"
import linkedInLogo from "../../images/linked-in-icon.png"
import "./RightSideNavigation.css"

function RightSideNavigation() {


    return (
        <div id="right-side-links-container">
            <div id="right-side-links-header-container">
                <div id="right-side-links-header">The Developers</div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="richard-container" className="right-side-person-container">
                <div id="richard-header" className="right-side-person-header">Richard Diaz</div>
                <div className="right-side-logos-container">
                    <a id="right-side-github-link-logo-container" className="right-side-logo-container" href="https://github.com/eco-richard">
                        <img id="github-logo" src={githubLogo}></img>
                    </a>
                    <a id="right-side-linked-in-link-logo-container" className="right-side-logo-container" href="https://www.linkedin.com/in/richard-diaz-209780234/">
                        <img id="linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="paul-container" className="right-side-person-container">
                <div id="paul-header" className="right-side-person-header">Paul Fixler</div>
                <div className="right-side-logos-container">
                    <a id="right-side-github-link-logo-container" className="right-side-logo-container" href="https://github.com/pfixler">
                        <img id="github-logo" src={githubLogo}></img>
                    </a>
                    <a id="right-side-linked-in-link-logo-container" className="right-side-logo-container" href="https://www.linkedin.com/in/paul-f-2022b6269/">
                        <img id="linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="christian-container" className="right-side-person-container">
                <div id="christian-header" className="right-side-person-header">Christian Lee</div>
                <div className="right-side-logos-container">
                    <a id="right-side-github-link-logo-container" className="right-side-logo-container" href="https://github.com/christianlee6">
                        <img id="github-logo" src={githubLogo}></img>
                    </a>
                    <a id="right-side-linked-in-link-logo-container" className="right-side-logo-container" href="https://www.linkedin.com/in/christian-lee-383590192/">
                        <img id="linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="kevin-container" className="right-side-person-container">
                <div id="kevin-header" className="right-side-person-header">Kevin Ong</div>
                <div className="right-side-logos-container">
                    <a id="right-side-github-link-logo-container" className="right-side-logo-container" href="https://github.com/kong1214">
                        <img id="github-logo" src={githubLogo}></img>
                    </a>
                    <a id="right-side-linked-in-link-logo-container" className="right-side-logo-container" href="https://www.linkedin.com/in/kevin-ong-357b16215/">
                        <img id="linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
        </div>
    )
}

export default RightSideNavigation;
