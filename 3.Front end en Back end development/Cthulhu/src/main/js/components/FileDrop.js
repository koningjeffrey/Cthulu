import React, { Component } from 'react'

class FileDrop extends Component {
    
  constructor(props) {
    super(props);
    this.state= { highlight: false, file: ""};
    
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    
    this.fileInputRef = React.createRef();
  }
  
  openFileDialog() {
  if (this.props.disabled) return;
  this.fileInputRef.current.click();
  }
  onDragOver(e) {
  e.preventDefault();
  if (this.props.disabled) return;
  this.setState({ hightlight: true });
  }
  onDragLeave() {
  this.setState({ hightlight: false });
  }

  onDrop(e) {
  e.preventDefault();
  if (this.props.disabled) return;

  const files = e.dataTransfer.files[0];
  this.props.onFilesAdded(files);
  this.setState({ hightlight: false, file: files});
  }
  
  onFilesAdded(e) {
    if (this.props.disabled) return;
    const files = e.target.files[0];
    this.props.onFilesAdded(files);
    this.setState({file: files});
  }

  render() {
    return (
        <div    className={`FileDrop ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                accept=".mp3,.ogg,.wav,.kut"
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
                
            <img    alt="upload"
                    className="Icon"
                    src="Upload_Icon.png"/>
                    
            <input  ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    accept=".mp3,.ogg,.wav,.kut"
                    onChange={this.onFilesAdded}/>
                            
            
            {this.state.file === "" &&
            <span>Upload Files</span>}
            {this.state.file !== "" &&
            <span>{this.state.file.name}</span>}
      </div>
    );
  }
}

export default FileDrop