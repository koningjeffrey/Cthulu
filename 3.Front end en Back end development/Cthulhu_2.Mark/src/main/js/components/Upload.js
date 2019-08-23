import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  currentUser:  {}, uploadFile: null, title: "", message: ""};
        
        this.addFile = this.addFile.bind(this);
        this.setFileToUpload = this.setFileToUpload.bind(this);
        this.setTitle = this.setTitle.bind(this);
        
        this.title = React.createRef();
    }
    setFileToUpload(e) {
        console.log(e.target.files[0]);
        this.setState({uploadFile: e.target.files[0]});
    }
    
    addFile(e)    {
        e.preventDefault();
        
        if(this.state.title !== "" && this.state.uploadFile !== null) {
            const data = new FormData();
                data.append('file', this.state.uploadFile);
                data.append('userId', this.props.currentUser.userId);
                data.append('title', this.state.title);

            axios.post(`/api/createFile`, data)
                .then(result => {
                    const createdFile = result.data;
                    this.setState({ message: "File Added!" });
                    this.props.addFile();
            });
        } else {
        this.setState({message:"Please enter a file and title!"});    
        }
    }
    
    setTitle()  {
        this.setState({title: this.title.current.value});
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
                                <input type="file" name="file"accept=".mp3,.ogg,.wav,.kut" onChange={this.setFileToUpload}/>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="title" ref={this.title} onChange={this.setTitle}/>
                            <label>Title</label>
                        </div>
                        <p>{this.state.message}</p>
                        <input type="submit" name="submit" value="Submit"/>
                    </div>
                    </form>
                </div>
        );
    }
}

export default Upload