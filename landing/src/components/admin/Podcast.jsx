import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadFullPodcasts } from 'actions/podcasts';


class Podcast extends Component {

    componentWillMount(){
        if (this.props.loadPodcast) {
            this.props.loadPodcast(this.props.podId);
        }
    }

    render() {
        const { podcast } = this.props;
        if (podcast === undefined) {
            return <div>...</div>;
        }
        const { name, description, episodes } = podcast;
        return (
            <div>
                <h3>{name}</h3>
                <sub>{description}</sub>
                <hr/>
                <code>
                    {JSON.stringify(episodes)}
                </code>
            </div>
        );
    }
}

const mapStateToProps = (state , ownProps) => {
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
