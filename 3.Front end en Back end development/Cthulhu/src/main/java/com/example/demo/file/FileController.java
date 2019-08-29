package com.example.demo.file;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.util.Converter;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RestController
public class FileController {
    
    private FileRepository fileRepository;
    private UploadStorage uploadStorage;
    private UserRepository userRepository;
    
    public FileController(FileRepository fileRepository, UploadStorage uploadStorage, UserRepository userRepository)    {
        this.fileRepository = fileRepository;
        this.uploadStorage = uploadStorage;
        this.userRepository = userRepository;
    }
    
    @GetMapping("/api/uploads/{currentUserId}")
    public List<Upload> loadFilesByUserId(@PathVariable("currentUserId") Integer userId) throws Exception {

        List<File> files = fileRepository.findByUserId(userId,  Sort.by("timestamp").ascending());

        List<Upload> uploads = new ArrayList<Upload>();
        files.forEach(path -> uploads.add(new Upload(MvcUriComponentsBuilder.fromMethodName(FileController.class,
                    "serveFile", path.getFilename()).build().toString(),fileRepository.getByFilename(path.getFilename()))));
        
        return uploads;
    }
        @GetMapping("/api/uploads/all")
    public List<Upload> loadAllFiles() throws Exception {

        List<File> files = fileRepository.findAll(Sort.by("timestamp").ascending());

        List<Upload> uploads = new ArrayList<Upload>();
        files.forEach(path -> uploads.add(new Upload(MvcUriComponentsBuilder.fromMethodName(FileController.class,
                    "serveFile", path.getFilename()).build().toString(),fileRepository.getByFilename(path.getFilename()))));
        
        return uploads;
    }
    
    
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {
        
        Optional<File> f = fileRepository.findByFilename(filename);
        File loadFile = f.isPresent() ? f.get() : null;
        Optional<User> u = userRepository.findById(loadFile.getUserId());
        User loadUser = u.isPresent() ? u.get() : null;
        
        uploadStorage.loadDirectory(loadUser.getEmail());
        Resource file = uploadStorage.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
    
    @PostMapping("/api/createFile")
    public File createFile(     @RequestParam("userId")     Integer userId,
                                @RequestParam("title")      String title,
                                @RequestParam("file")       MultipartFile file) throws Exception {

        Date timestamp = new Date();
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        
        Optional<User> fUser = userRepository.findById(userId);
        User dUser = fUser.isPresent() ? fUser.get()  : null;
        
        uploadStorage.loadDirectory(dUser.getEmail());
        uploadStorage.store(file);
        Path absolutePath = uploadStorage.load(filename).toAbsolutePath();
        
        String newFileName = Converter.convertFile(absolutePath, uploadStorage.getUserLocation(), filename);
        
        File f = new File(newFileName, userId, title, timestamp.toString());
        File createdFile = fileRepository.save(f);
        return createdFile;
    }
    
    @GetMapping("/api/fileValue/{currentFileId}/{fileValue}")
    public File updateFileValue(    @PathVariable("currentFileId")  Integer fileId, 
                                    @PathVariable("fileValue")      Integer fileValue) {
        
        Optional<File> f = fileRepository.findById(fileId);
        File uFile = f.isPresent() ? f.get()  : null;
        uFile.setFileValue(fileValue);
        fileRepository.save(uFile);
        
        return uFile;
    }
}
