package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.truba.cp.bean.v21.PackageType;
import pl.truba.cp.config.AppProperties;
import pl.truba.cp.service.FileService;
import pl.truba.cp.service.XMLService;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by Łukasz on 2015-10-12.
 */
@Controller
@RequestMapping("/")
@Scope("session")
public class FileController {


    @Autowired
    private FileService fileService;

    @Autowired
    private XMLService xmlService;

    @RequestMapping(value="/upload", method=RequestMethod.GET)
    public @ResponseBody String provideUploadInfo() {
        return "You can upload a file by posting to this same URL.";
    }

    @RequestMapping(value="/upload", method= RequestMethod.POST)
    @ResponseBody
    public PackageType handleFileUpload(@RequestParam("file") MultipartFile file){
        String name = fileService.writeFile(file);

        PackageType packageType = xmlService.getPackageType(new File(AppProperties.PATH_XPDL + name + ".xpdl"));

        return packageType;
    }

    @RequestMapping(value="/download", method=RequestMethod.POST)
    public @ResponseBody String provideDownloadInfo() {
        return "You can download a file by get to this same URL.";
    }

    @RequestMapping(value="/download/{fileName}", method= RequestMethod.GET)
    @ResponseBody
    public void download(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition",
                "attachment;filename=clinical-pathway.xpdl");

        File file = new File(AppProperties.PATH_XPDL + fileName + ".xpdl");

        OutputStream out = response.getOutputStream();
        FileInputStream in = new FileInputStream(file);
        byte[] buffer = new byte[4096];
        int length;
        while ((length = in.read(buffer)) > 0){
            out.write(buffer, 0, length);
        }
        in.close();
        out.flush();

    }
}
