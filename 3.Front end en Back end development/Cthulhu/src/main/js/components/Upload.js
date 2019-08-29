import React from 'react';
import axios from 'axios';
import FileDrop from './FileDrop';
import { loadProgressBar } from 'axios-progress-bar';

class Upload extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  currentUser:  {}, uploadFile: null, title: "", message: "", disabled: false};
        
        this.addFile = this.addFile.bind(this);
        this.setFileToUpload = this.setFileToUpload.bind(this);
        this.setTitle = this.setTitle.bind(this);
        
        this.title = React.createRef();
    }
    componentDidMount() {
        loadProgressBar();
    }
    
    setFileToUpload(files) {
        this.setState({uploadFile: files});
    }
    
    addFile(e)    {
        e.preventDefault();
        
        if(this.state.title !== "" && this.state.uploadFile !== null) {
            const data = new FormData();
                data.append('file', this.state.uploadFile);
                data.append('userId', this.props.currentUser.userId);
                data.append('title', this.state.title);
            this.setState({message: "uploading...", disabled: true});
            
            axios.post(`/api/createFile`, data)
                .then(result => {
                    console.log(result.data);
                    console.log(result.status);
                    console.log(result.statusText);
                    console.log(result.headers);
                    console.log(result.config);
                    
                    const createdFile = result.data;
                    this.setState({ message: "File Added!", disabled: false});
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
                    <div className="griditem">
                        <h2>1. Upload</h2>
                        <form onSubmit={this.addFile}>
                            <div className="card">
                                <FileDrop {...this.props} disabled={this.state.disabled} uploadFile={this.state.uploadFile} onFilesAdded={this.setFileToUpload}>
                                    Drop file here.                    
                                </FileDrop>
                            </div>
                            <div className="inputBox">
                                <input type="text" name="title" ref={this.title} onChange={this.setTitle}/>
                                <label>Title</label>
                            </div>
                            <input type="submit" name="submit" value="Submit"/>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                </div>
        );
    }
}

export default Upload