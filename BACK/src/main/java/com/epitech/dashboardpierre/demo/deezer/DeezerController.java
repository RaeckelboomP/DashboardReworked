package com.epitech.dashboardpierre.demo.deezer;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DeezerController {

    /**
     * 
     * @param album
     * @return A JSONObject including the Deezer's embeded player or including data: no data
     */
    @GetMapping("/deezer_player")
	public JSONObject getEmbededPlayerDeezer( @RequestParam String album) {
        String urlEmbededPlayer = String.format(
            "https://api.deezer.com/oembed?url=https://www.deezer.com/album/"+
            "%s&maxwidth=700&maxheight=300&tracklist=true&format=json", album);
        RestTemplate restTemplate = new RestTemplate();
        JSONObject embededDeezerPlayer = restTemplate.getForObject(urlEmbededPlayer, JSONObject.class);
        return embededDeezerPlayer;
    }

    /**
     * 
     * @param artist
     * @return A JSONObject including all the albums of the artist or including data: no data
     */
    @GetMapping("/albums_from_artist")
    public JSONObject getAlbumsFromArtist( @RequestParam String artist) {
        String urlAlbumsFromArtist = String.format("https://api.deezer.com/search/album?q=%s", artist);
        RestTemplate restTemplate = new RestTemplate();
        JSONObject albumsFromArtist = restTemplate.getForObject(urlAlbumsFromArtist, JSONObject.class);
        String total = albumsFromArtist.get("total").toString();
        HashMap<String, String> response = new HashMap<>();
        if(Integer.parseInt(total) == 0){
            response.put("data", "no data");
            return new JSONObject(response);
        } else {

            return albumsFromArtist;
        }
    }
}
