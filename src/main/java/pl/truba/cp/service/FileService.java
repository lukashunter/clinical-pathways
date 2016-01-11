package pl.truba.cp.service;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.truba.cp.config.AppProperties;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

/**
 * Created by Łukasz on 2015-10-17.
 */
@Service
public class FileService {

    public String writeFile(MultipartFile multipartFile) {

        UUID uniqueKey = UUID.randomUUID();
        String name = uniqueKey.toString();

        try {
            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File(AppProperties.PATH_XPDL + name + ".xpdl")));
            stream.write(bytes);
            stream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return name;
    }
}
