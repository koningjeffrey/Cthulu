//Deze klasse zet de ontvangen audio file om in .mp3 met 320khz
package com.example.demo.util;

import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;

import java.io.File;
import java.nio.file.Path;

public class Converter {
    
    public static String convertFile(Path absolutePath, Path outputPath, String origFileName){

        //Voegt tijd toe aan de bestandsnaam zodat deze uniek is en eindigd op .mp3.
        String fileName = origFileName + System.currentTimeMillis() + ".mp3";
        String outputFile = outputPath.toAbsolutePath().toString() + File.separator + fileName;
        //Waar de audio file vandaan komt.
        File source = absolutePath.toFile();
        //Waar de audio file geplaatst wordt.
        File target = new File(outputFile);

        //Audio attributes
        AudioAttributes audio = new AudioAttributes();
        //Codec
        audio.setCodec("libmp3lame");
        //320khz bitrate
        audio.setBitRate(320000);
        //Audiokanalen (door hoeveel spreakers, dit is stereo)
        audio.setChannels(2);
        audio.setSamplingRate(44100);

        //Encoding attributes
        EncodingAttributes attrs = new EncodingAttributes();
        //Maakt er een mp3 van
        attrs.setFormat("mp3");
        //Het is een audiobestand.
        attrs.setAudioAttributes(audio);

        //Encode.
        try {
            Encoder encoder = new Encoder();
            encoder.encode(new MultimediaObject(source), target, attrs);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        //Verwijdert het orginele bestand na het converteren.
        source.delete();
        
        return fileName;
    }
}