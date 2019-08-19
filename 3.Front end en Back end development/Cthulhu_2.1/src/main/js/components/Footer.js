import React from 'react';
import { Link } from 'react-browser-router';

class Footer extends React.Component {

    render() {
      return  <div className="Footer">
                <Link to="/Chat"><input type="submit" name="Chat" value="Chat"/></Link>
                </div>;
    }
  }

export default Footer