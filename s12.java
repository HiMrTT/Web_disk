package OnlineDisk_Search;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

class s12{
    public static void main(String[] args) throws IOException{
        String url = "http://124.220.16.183:3001/api/fs/list";
        String payload = "{\"path\":\"/IOS/巨魔\"}";

        String response = sendGetRequest(url, payload);

        System.out.println(response);
    }
    public static String sendGetRequest(String urlString, String payload) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);
    
        // Write payload to request body
        byte[] payloadBytes = payload.getBytes("UTF-8");
        connection.getOutputStream().write(payloadBytes);
    
        // Get response code and input stream
        int responseCode = connection.getResponseCode();
        BufferedReader reader;
        if (responseCode >= 400) {
            // If error, read from error stream instead
            reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
        } else {
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        }
    
        // Read input stream and build response string
        StringBuilder responseBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            responseBuilder.append(line);
        }
        reader.close();
    
        return responseBuilder.toString();
    }
}
