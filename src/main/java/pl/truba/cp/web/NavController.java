package pl.truba.cp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Łukasz on 2015-11-28.
 */
@Controller
@RequestMapping("/pathways")
public class NavController {

    @RequestMapping
    public String repo() {
        return "repository";
    }
}
