import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadFullPodcasts } from 'actions/podcasts';


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
                <hr />
                <table>
                    {episodes.map(ep =>
                        <tr key={ep.id}>
                            <td>
                                <a href={ep.url}>{ep.name}</a>
                            </td>
                            <td>{ep.description}</td>
                            <td>{ep.duration}</td>
                        </tr>
                    )}
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
    loadPodcast: loadFullPodcasts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Podcast);
