package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.truba.cp.service.RepositoryService;
import pl.truba.cp.type.wrapper.PathwayWrapper;

@RestController
@RequestMapping("/repository")
public class RepositoryController {

    @Autowired
    RepositoryService repositoryService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void savePathway(@RequestBody PathwayWrapper pathwayWrapper) {
        repositoryService.savePathway(pathwayWrapper);
    }
}
