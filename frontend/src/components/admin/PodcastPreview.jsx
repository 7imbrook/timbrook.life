import React from 'react';
import podCover from 'images/podcover.png';
import { Link } from 'react-router-dom';

export default () => {
    const style = {
        backgroundImage: `url(${podCover})`,
        backgroundSize: "cover",
        height: "100%",
        borderRadius: "5px"
    }
    return (
        <Link to="/admin/pod/1">
            <div style={style}></div>
        </Link>
    )
}
