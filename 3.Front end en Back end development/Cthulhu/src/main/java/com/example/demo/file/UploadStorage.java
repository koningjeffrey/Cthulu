package com.example.demo.file;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadStorage {

    private final Path rootLocation;
    private Path userLocation;

    @Autowired
    public UploadStorage() {
        this.rootLocation = Paths.get("upload-dir");
    }

    public void store(MultipartFile file) throws Exception {
        
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new Exception("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new Exception (
                        "Cannot store file with relative path outside current directory " + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.userLocation.resolve(filename),
                    StandardCopyOption.REPLACE_EXISTING);
            }
        }
        catch (Exception e) {
            throw new Exception("Failed to store file " + filename, e);
        }
    }

    public Resource loadAsResource(String filename) throws Exception {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new Exception(
                        "Could not read file: " + filename);
            }
        }
        catch (MalformedURLException e) {
            throw new Exception("Could not read file: " + filename, e);
        }
    }
    
    public Path load(String filename) {
        return userLocation.resolve(filename);
    }
    
    public Path getUserLocation(){
        return userLocation;
    }
    
    public Stream<Path> loadAll() throws Exception {
        try {
            return Files.walk(this.rootLocation, 1)
                .filter(path -> !path.equals(this.rootLocation))
                .map(this.rootLocation::relativize);
        }
        catch (Exception e) {
            throw new Exception("Failed to read stored files", e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() throws IOException {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new IOException("Could not initialize storage", e);
        }
    }
    public void createDirectory(String Email) throws IOException {
        Path userLocation = Paths.get("upload-dir/" + Email);
        try {
            Files.createDirectories(userLocation);
            this.userLocation = userLocation;
        }
        catch(IOException e)    {
            throw new IOException("Could not initialize storage", e);
        }
    }
    public void loadDirectory(String Email) {
            Path userLocation = Paths.get("upload-dir/" + Email);
            this.userLocation = userLocation;
    }
}
