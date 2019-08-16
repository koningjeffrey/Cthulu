import React from 'react';

class Upload extends React.Component {
    render() {
        return (
                <div>
                    <div className="griditem">
                        <h2>1. Upload</h2>
                        <div className="drop-box">
                            <i className="fas fa-upload"></i>
                            <p className="drop-text">Drop file here.</p>                    
                        </div>
                        <div className="ubtn">
                                <button className="btn">Upload file</button>
                                <input type="file" accept="audio/mp3"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="title" required="admin"/>
                            <label>Title</label>
                        </div>
                        <input type="submit" name="submit" value="Submit" href="promo.html"/>
                    </div>
                </div>
        );
    }
}

export default Upload