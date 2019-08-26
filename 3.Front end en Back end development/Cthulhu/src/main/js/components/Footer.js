//Om de chat onderaan te plaatsen.
import React from 'react';
import { Link } from 'react-browser-router';

class Footer extends React.Component {

    render() {
      return  <div className="Chat">
                <Link to="/Chat"><input type="submit" name="Chat" value="Chat"/></Link>
                </div>;
    }
  }

export default Footer