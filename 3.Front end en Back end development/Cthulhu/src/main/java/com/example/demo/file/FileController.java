//fileControler maakt met PostMapping en GetMapping folders aan zodat je gegevens kan plaatsen en ophalen vanaf de frontend.

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
    
    //De nieuwe objecten worden aangemaakt.
    private FileRepository fileRepository;
    private UploadStorage uploadStorage;
    private UserRepository userRepository;
    
    //Constructor om de ontvangen attributen te initialiseren
    public FileController(FileRepository fileRepository, UploadStorage uploadStorage, UserRepository userRepository)    {
        this.fileRepository = fileRepository;
        this.uploadStorage = uploadStorage;
        this.userRepository = userRepository;
    }
    
    //Maakt voor elke huidige gebruiker een lijst aan met geuploade bestanden. Die opgehaald(Get) kunnen worden door de frontend.
    @GetMapping("/api/uploads/{currentUserId}")
    public List<Upload> loadFilesByUserId(@PathVariable("currentUserId") Integer userId) throws Exception {

        //Maakt een lijst genaamd files die de repository opzoekt op basis van userId en ze soorteerd op laatste geposte bestand.
        List<File> files = fileRepository.findByUserId(userId,  Sort.by("timestamp").ascending());

        //Maakt een lijst en alles in de lijst is een Upload.
        List<Upload> uploads = new ArrayList<Upload>();

        //Voor elk bestand in de lijst gaat hij een link naar het bestand maken en de bestandsnaam erbij zetten.
        files.forEach(path -> uploads.add(new Upload(MvcUriComponentsBuilder.fromMethodName(FileController.class,
                    "serveFile", path.getFilename()).build().toString(),fileRepository.getByFilename(path.getFilename()))));
        
        return uploads;
    }

    //Dit is voor het promoteam die een lijst van alle geuploade bestanden wilt zien.
    @GetMapping("/api/uploads/all")
    public List<Upload> loadAllFiles() throws Exception {

        //Zet de bestanden in een lijst gesoorteerd op tijd aflopend.
        List<File> files = fileRepository.findAll(Sort.by("timestamp").ascending());

        //Voor elk bestand in de lijst gaat hij een link naar het bestand maken en de bestandsnaam erbij zetten.
        List<Upload> uploads = new ArrayList<Upload>();
        files.forEach(path -> uploads.add(new Upload(MvcUriComponentsBuilder.fromMethodName(FileController.class,
                    "serveFile", path.getFilename()).build().toString(),fileRepository.getByFilename(path.getFilename()))));
        
        return uploads;
    }
    
    //Dit is voor het ophalen van het bestand om af te spelen.
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {
        
        //Het zoekt de opgegeven bestandsnaam in de database File, zoals vernoemd in File.java @Table).
        Optional<File> f = fileRepository.findByFilename(filename);
        //Als hij het heeft gevonden maakt hij een loadFile ervan, anders gebeurt er niets(null).
        File loadFile = f.isPresent() ? f.get() : null;
        //Dan kijkt of hij ook een user bij kan vinden op bassis van de loadFile.
        Optional<User> u = userRepository.findById(loadFile.getUserId());
        User loadUser = u.isPresent() ? u.get() : null;
        
        //Dit laadt de directory van de user op basis van email.
        uploadStorage.loadDirectory(loadUser.getEmail());
        //Dit zoekt dan de bijbehorende bestandsnaam.
        Resource file = uploadStorage.loadAsResource(filename);

        //Is alles gevonden dan wordt het bestand toegangkelijk gemaakt.
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
    
    //Als er in de frontend op send wordt geklikt gaat PostMapping ze in de database plaatsen
    @PostMapping("/api/createFile")
    //RequestParm is hoe het heet in de frontend en wat er achterstaat noemt hij het in de backend.
    public File createFile(     @RequestParam("userId")     Integer userId,
                                @RequestParam("title")      String title,
                                @RequestParam("file")       MultipartFile file) throws Exception {
        
        //Eerst stellen we tijd van plaatsing vast. en maken van het bestandsnaam een string.
        Date timestamp = new Date();
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        
        //Hier zoeken we de user wie het upload op zijn userId
        Optional<User> fUser = userRepository.findById(userId);
        User dUser = fUser.isPresent() ? fUser.get()  : null;
        
        //Hier halen we het bestand op om het te converteren. 
        uploadStorage.loadDirectory(dUser.getEmail());
        uploadStorage.store(file);
        Path absolutePath = uploadStorage.load(filename).toAbsolutePath();
        
        //Als de converter de file heeft geconvert, krijgt wordt het een newFileName
        String newFileName = Converter.convertFile(absolutePath, uploadStorage.getUserLocation(), filename);
        
        //We geven het hier een nieuwe unieke naam.
        File f = new File(newFileName, userId, title, timestamp.toString());
        //We slaan het op in de database.
        File createdFile = fileRepository.save(f);
        return createdFile;
    }
    
    //Hier halen we het bestand op.
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
