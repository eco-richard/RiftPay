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
                    <a id="richard-right-side-github-link-logo-container" className="right-side-logo-container right-side-github-link-logo-container" href="https://github.com/eco-richard">
                        <img id="richard-right-side-github-logo" className="right-side-logo" src={githubLogo}></img>
                    </a>
                    <a id="richard-right-side-linked-in-link-logo-container" className="right-side-logo-container right-side-linked-in-link-logo-container" href="https://www.linkedin.com/in/richard-diaz-209780234/">
                        <img id="richard-right-side-linked-in-logo" className="right-side-logo linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="paul-container" className="right-side-person-container">
                <div id="paul-header" className="right-side-person-header">Paul Fixler</div>
                <div className="right-side-logos-container">
                    <a id="paul-right-side-github-link-logo-container" className="right-side-logo-container right-side-github-link-logo-container" href="https://github.com/pfixler">
                        <img id="paul-right-side-github-logo" className="right-side-logo" src={githubLogo}></img>
                    </a>
                    <a id="paul-right-side-linked-in-link-logo-container" className="right-side-logo-container right-side-linked-in-link-logo-container" href="https://www.linkedin.com/in/paul-f-2022b6269/">
                        <img id="paul-right-side-linked-in-logo" className="right-side-logo linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="christian-container" className="right-side-person-container">
                <div id="christian-header" className="right-side-person-header">Christian Lee</div>
                <div className="right-side-logos-container">
                    <a id="christian-right-side-github-link-logo-container" className="right-side-logo-container right-side-github-link-logo-container" href="https://github.com/christianlee6">
                        <img id="christian-right-side-github-logo" className="right-side-logo" src={githubLogo}></img>
                    </a>
                    <a id="chrstian-right-side-linked-in-link-logo-container" className="right-side-logo-container right-side-linked-in-link-logo-container" href="https://www.linkedin.com/in/christian-lee-383590192/">
                        <img id="chrsitian-right-side-linked-in-logo" className="right-side-logo linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
            <div id="kevin-container" className="right-side-person-container">
                <div id="kevin-header" className="right-side-person-header">Kevin Ong</div>
                <div className="right-side-logos-container">
                    <a id="kevin-right-side-github-link-logo-container" className="right-side-logo-container right-side-github-link-logo-container" href="https://github.com/kong1214">
                        <img id="kevin-right-side-github-logo" className="right-side-logo" src={githubLogo}></img>
                    </a>
                    <a id="kevin-right-side-linked-in-link-logo-container" className="right-side-logo-container right-side-linked-in-link-logo-container" href="https://www.linkedin.com/in/kevin-ong-357b16215/">
                        <img id="kevin-right-side-linked-in-logo" className="right-side-logo linked-in-logo" src={linkedInLogo}></img>
                    </a>
                </div>
            </div>
            <div className="right-side-line-break"></div>
        </div>
    )
}

export default RightSideNavigation;
