package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.truba.cp.service.XMLService;

/**
 * Created by Łukasz on 2015-11-18.
 */
@RestController
@RequestMapping("/xml")
public class XMLController {

    @Autowired
    XMLService xmlService;

    @RequestMapping
    public void saveXML(){
        xmlService.saveXMLFile();
    }
}
