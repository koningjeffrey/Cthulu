import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  currentUser:  {}, uploadFile: [], message: ""};
        this.addFile = this.addFile.bind(this);
        this.setFileToUpload = this.setFileToUpload.bind(this);
    }
    setFileToUpload(e) {
        console.log(e.target.files[0]);
        this.setState({uploadFile: e.target.files});
    }    
    addFile(e)    {
        e.preventDefault();
        const data = new FormData();
            data.append('file', this.state.uploadFile[0]);
            data.append('userId', this.props.currentUser.userId);

        axios.post(`/api/file`, data)
            .then(result => {
                const createdFile = result.data;
                this.setState({ message: "File Added!" });
                this.props.addFile();
        });
    }
    
    render() {
        return (
                <div>
                    <form onSubmit={this.addFile}>
                    <div className="griditem">
                        <h2>1. Upload</h2>
                        <div className="drop-box">
                            <i className="fas fa-upload"></i>
                            <p className="drop-text">Drop file here.</p>                    
                        </div>
                        <div className="ubtn">
                                <button className="btn">Upload file</button>
                                <input type="file" name="file" accept="audio/mp3" onChange={this.setFileToUpload}/>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="title"/>
                            <label>Title</label>
                        </div>
                        <input type="submit" name="submit" value="Submit"/>
                    </div>
                    </form>
                </div>
        );
    }
}

export default Upload