package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.truba.cp.service.XMLService;
import pl.truba.cp.type.wrapper.XpdlWrapper;

import java.io.File;

/**
 * Created by Łukasz on 2015-11-18.
 */
@RestController
@RequestMapping("/xml")
public class XMLController {

    @Autowired
    XMLService xmlService;

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String saveXML(@RequestBody XpdlWrapper xpdlWrapper) {
        File file = xmlService.saveXMLFile(xpdlWrapper);
        String fileName = file.getName();

        return fileName;
    }
}
