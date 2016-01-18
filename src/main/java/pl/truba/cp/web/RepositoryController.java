package pl.truba.cp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.truba.cp.domain.DicDisease;
import pl.truba.cp.domain.Pathway;
import pl.truba.cp.service.RepositoryService;
import pl.truba.cp.type.wrapper.PathwayWrapper;
import pl.truba.cp.type.wrapper.XpdlWrapper;

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

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public void updatePathway(@RequestBody PathwayWrapper pathwayWrapper) {
        repositoryService.updatePathway(pathwayWrapper);
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

    @RequestMapping(value="/pathways/{id}", method = RequestMethod.POST)
    public @ResponseBody
    PathwayWrapper getXpdlById(@PathVariable Integer id) {
        PathwayWrapper pathwayWrapper = repositoryService.getPathwayById(id);
        return pathwayWrapper;
    }
}
