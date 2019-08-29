    
package com.example.demo.util;

import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;

import java.io.File;
import java.nio.file.Path;

public class Converter {
    
    public static String convertFile(Path absolutePath, Path outputPath, String origFileName){


        String fileName = origFileName + System.currentTimeMillis() + ".mp3";
        String outputFile = outputPath.toAbsolutePath().toString() + File.separator + fileName;
        File source = absolutePath.toFile();
        File target = new File(outputFile);

        //Audio attributes
        AudioAttributes audio = new AudioAttributes();
        audio.setCodec("libmp3lame");
        audio.setBitRate(320000);
        audio.setChannels(2);
        audio.setSamplingRate(44100);

        //Encoding attributes
        EncodingAttributes attrs = new EncodingAttributes();
        attrs.setFormat("mp3");
        attrs.setAudioAttributes(audio);

        //Encode
        try {
            Encoder encoder = new Encoder();
            encoder.encode(new MultimediaObject(source), target, attrs);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        source.delete();
        
        return fileName;
    }
}