//Dit zijn alle attributen die nodig zijn voor comments en die in de database worden geplaatst.
//Zie comment.java
package com.example.demo.file;

public class Upload {

    private String path;
    private File file;
    
    private Upload()    {}
    
    public Upload(String path, File file) {
        this.path = path;
        this.file = file;
    }
    public void setPath(String path)  {
        this.path = path;
    }
    public String getPath()   {
        return path;
    }
    public void setFile(File file)  {
        this.file = file;
    }
    public File getFile()   {
        return file;
    }
    
}
