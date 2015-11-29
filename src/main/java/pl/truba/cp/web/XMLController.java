package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.truba.cp.service.XMLService;
import pl.truba.cp.type.wrapper.XpdlWrapper;

/**
 * Created by Łukasz on 2015-11-18.
 */
@RestController
@RequestMapping("/xml")
public class XMLController {

    @Autowired
    XMLService xmlService;

    @RequestMapping(method = RequestMethod.POST)
    public void saveXML(@RequestBody XpdlWrapper xpdlWrapper) {
        xmlService.saveXMLFile(xpdlWrapper);
    }
}
