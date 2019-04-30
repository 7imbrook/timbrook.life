import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadFullPodcasts, fetchUploadURL } from 'actions/podcasts';


class Podcast extends Component {

    componentWillMount() {
        if (this.props.loadPodcast) {
            this.props.loadPodcast(this.props.podId);
        }
    }

    render() {
        const { podcast } = this.props;
        if (podcast === undefined) {
            return <div><h3>Loading...</h3></div>;
        }
        const { name, description, episodes } = podcast;
        return (
            <div>
                <h3>{name}</h3>
                <sub>{description}</sub>
                <button onClick={this.props.startUpload}>Upload</button>
                <input type="file" name="pod" id="podcast_file" />
                <hr />
                <table>
                    <tbody>
                        {episodes.map(ep =>
                            <tr key={ep.id}>
                                <td>
                                    <a href={ep.url}>{ep.name}</a>
                                </td>
                                <td>{ep.description}</td>
                                <td>{ep.duration}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        podcast: state.podcasts[ownProps.podId]
    }
}

const mapDispatchToProps = {
    loadPodcast: loadFullPodcasts,
    startUpload: fetchUploadURL
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Podcast);
