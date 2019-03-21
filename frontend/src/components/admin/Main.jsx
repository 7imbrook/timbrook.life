import React from 'react';
import PodcastPreview from 'components/admin/PodcastPreview';

const Main = () => {
    return (
        <div className="admin-content">
            <div className="admin-block">
                Quotes?
            </div>
            <div className="admin-block">
                <PodcastPreview />
            </div>
        </div>
    );
};

export default Main;