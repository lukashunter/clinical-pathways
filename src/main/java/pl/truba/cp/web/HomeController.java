package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.truba.cp.domain.DicDisease;
import pl.truba.cp.service.RepositoryService;

import java.util.List;

/**
 * Created by Łukasz on 2015-10-07.
 */
@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    RepositoryService repositoryService;

    @RequestMapping
    public ModelAndView home() {
        ModelAndView modelAndView = new ModelAndView("index");

        List<DicDisease> dicDiseaseList = repositoryService.getDiseasesAll();

        modelAndView.addObject("diseases", dicDiseaseList);
        return modelAndView;
    }

    @RequestMapping(value = "/{id}")
    public String edit(@PathVariable Integer id) {

        return "forward:/";
    }
}
