package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.truba.cp.bean.v21.PackageType;
import pl.truba.cp.service.XMLService;

/**
 * Created by Łukasz on 2015-10-07.
 */
@Controller
@RequestMapping("/editor")
public class EditorController {

    @Autowired
    private XMLService xmlService;

    @RequestMapping(value = "/load", method = RequestMethod.GET)
    @ResponseBody
    public PackageType getPackageType(){
        return xmlService.getPackageType();
    }
}
