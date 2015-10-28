package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import pl.truba.cp.bean.v21.PackageType;
import pl.truba.cp.service.FileService;
import pl.truba.cp.service.XMLService;

import java.io.File;

/**
 * Created by Łukasz on 2015-10-12.
 */
@Controller
@RequestMapping("/")
@Scope("session")
public class FileUploadController {


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

        PackageType packageType = xmlService.getPackageType(new File("upload/" + name + ".xpdl"));

        return packageType;
    }

}
