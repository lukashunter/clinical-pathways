package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.truba.cp.domain.DicDisease;
import pl.truba.cp.domain.Pathway;
import pl.truba.cp.service.RepositoryService;
import pl.truba.cp.type.wrapper.PathwayWrapper;

import java.util.List;

@RestController
@RequestMapping("/repository")
public class RepositoryController {

    @Autowired
    RepositoryService repositoryService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void savePathway(@RequestBody PathwayWrapper pathwayWrapper) {
        repositoryService.savePathway(pathwayWrapper);
    }

    @RequestMapping(value="/diseases")
    public @ResponseBody List<DicDisease> getDicDiseases() {
        return repositoryService.getDiseasesAll();
    }

    @RequestMapping(value="/pathways", method = RequestMethod.GET)
    public @ResponseBody List<PathwayWrapper> getPathways(){
        List<PathwayWrapper> pathwayList = repositoryService.getPathWaysAll();
        return pathwayList;
    }
}
