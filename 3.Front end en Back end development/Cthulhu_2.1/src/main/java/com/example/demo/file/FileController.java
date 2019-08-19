package com.example.demo.file;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
    
    private FileRepository fileRepository;
    
    public FileController(FileRepository fileRepository)    {
        this.fileRepository = fileRepository;
    }
    
    @GetMapping("/api/files/{currentUserId}")
    public List<File> getFilesByUserId(@PathVariable("currentUserId") Integer userId) {
        List <File> files = fileRepository.findByUserId(userId);
        
        return files;
    }
    
    @GetMapping("/api/file/{currentFileId}")
    @ResponseBody
    public File getFileByFileId(@PathVariable("currentFileId") Integer fileId)   {
        
        Optional<File> f = fileRepository.findByFileId(fileId);

        File loadFile = f.isPresent() ? f.get() : null;
                
        return loadFile;
    }
    
    @PostMapping("/api/file")
    public File createFile(     @RequestParam("userId")     Integer userId,
                                @RequestParam("file")       MultipartFile file) {

        Date timestamp = new Date();
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        File f = new File(filename, userId, timestamp.toString());
        File createdFile = fileRepository.save(f);
        return createdFile;
    }
    
    @PostMapping("/api/file/delete/")
    public File deleteFile( @RequestParam("currentFileId") Integer fileId)   {
        
        Optional<File> f = fileRepository.findById(fileId);
        
        File deleteFile = f.isPresent() ? f.get()  : null;
        fileRepository.delete(deleteFile);
        
        return deleteFile;
    }
    
    @GetMapping("/api/files/{currentFileId}/{fileValue}")
    public File updateFileValue(    @PathVariable("currentFileId")  Integer fileId, 
                                    @PathVariable("fileValue")      Integer fileValue) {
        
        Optional<File> f = fileRepository.findById(fileId);
        File uFile = f.isPresent() ? f.get()  : null;
        uFile.setFileValue(fileValue);
        fileRepository.save(uFile);
        
        return uFile;
    }
}
