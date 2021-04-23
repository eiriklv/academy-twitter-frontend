import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { getTweetsByHandle } from '../services/tweets';

class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
    }
  }

  async componentDidMount() {
    await this.populateTweets();
  }

  async populateTweets() {
    const { handle } = this.props.match.params;

    try {
      this.setState({ isLoading: true });
      const tweets = await getTweetsByHandle(handle);
      this.setState({ tweets: tweets, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { handle } = this.props.match.params;

    const {
      tweets,
      isLoading,
      error,
    } = this.state;

    if (error) {
      return (
        <div>Unable to fetch tweets: {error.message}</div>
      );
    }

    if (isLoading) {
      return (
        <div>Loading tweets...</div>
      );
    }

    const tweetElements = tweets
    .map(({ id, message, name, handle, created_at }) => {
      const styles = {
        border: '1px solid black',
        padding: 10,
        margin: 10
      };

      const timeAgo = formatDistance(
        new Date(created_at),
        new Date(),
        { addSuffix: true }
      );

      return (
        <div key={id} style={styles}>
          <p>{name} (@{handle}) - {timeAgo}</p>
          <p>{message}</p>
        </div>
      );
    });

    return (
      <div style={{ width: 500, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>User Feed for (@{handle})</h1>
        <div style={{ textAlign: 'center' }}>
          <Link to="/logout">Log out</Link>
        </div>
        <div>{tweetElements}</div>
      </div>
    );
  }
}

export default UserFeed;
