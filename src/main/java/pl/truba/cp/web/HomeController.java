package pl.truba.cp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Łukasz on 2015-10-07.
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping
    String home() {
        return "index";
    }
}
