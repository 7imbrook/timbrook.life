import React from 'react';
import amazonLogo from 'images/amazon.svg';
import podCover from 'images/podcover.png';
import { Link } from 'react-router-dom';

const style = (url) => {
    return {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        height: "100%",
        borderRadius: "5px"
    }
}

const Main = () => {
    const items = [
        { link: "/admin/pod/1", img: podCover },
        { link: "/admin/amazon", img: amazonLogo }
    ].map((icon) => {
        return (
            <div className="admin-block" key={icon.link}>
                <Link to={icon.link} >
                    <div style={style(icon.img)}></div>
                </Link>
            </div>);
    });
    return (
        <div className="admin-content">
            {items}
        </div>
    );
};

export default Main;