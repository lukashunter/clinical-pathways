package pl.truba.cp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.truba.cp.bean.v21.PackageType;
import pl.truba.cp.domain.DicDisease;
import pl.truba.cp.domain.Pathway;
import pl.truba.cp.domain.User;
import pl.truba.cp.repository.DicDiseaseRepository;
import pl.truba.cp.repository.PathwayRepository;
import pl.truba.cp.type.wrapper.PathwayWrapper;
import pl.truba.cp.type.wrapper.XpdlWrapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Łukasz on 2015-11-26.
 */
@Service
@Transactional
public class RepositoryService {

    @Autowired
    PathwayRepository pathwayRepository;

    @Autowired
    DicDiseaseRepository diseaseRepository;

    @Autowired
    XMLService xmlService;

    public void savePathway(PathwayWrapper pathwayWrapper) {
        Pathway pathway = new Pathway();
        pathway.setName(pathwayWrapper.getNamePathway());
        pathway.setComment(pathwayWrapper.getComment());
        pathway.setVersion(pathwayWrapper.getVersion());
        pathway.setCreationDate(new Date());
        pathway.setCreateByUser(new User(1));

        DicDisease disease = diseaseRepository.findOne(pathwayWrapper.getDiseaseId());
        pathway.setDicDisease(disease);

        String xmlAsString = xmlService.getXmlAsString(pathwayWrapper.getXpdlWrapper());
        pathway.setXpdl(xmlAsString);

        pathwayRepository.save(pathway);
    }

    public List<DicDisease> getDiseasesAll() {
        List<DicDisease> dicDiseases = (List<DicDisease>) diseaseRepository.findAll();

        return dicDiseases;
    }

    public List<PathwayWrapper> getPathWaysAll(){
        Iterable<Pathway> pathways = pathwayRepository.findAll();

        List<PathwayWrapper> pathwayWrapperList = new ArrayList<>();
        for (Pathway pathway : pathways) {
            PathwayWrapper pathwayWrapper = getPathwayWrapper(pathway);

            pathwayWrapperList.add(pathwayWrapper);
        }

        return pathwayWrapperList;
    }

    public PathwayWrapper getPathwayById(Integer id) {
        Pathway pathway = pathwayRepository.findOne(id);
        PathwayWrapper pathwayWrapper = getPathwayWrapper(pathway);

        PackageType packageType = xmlService.getXpdlWrapperFromString(pathwayWrapper.getXpdl());
        XpdlWrapper xpdlWrapper = new XpdlWrapper();
        xpdlWrapper.setPackageType(packageType);
        pathwayWrapper.setXpdlWrapper(xpdlWrapper);

        return pathwayWrapper;
    }

    private PathwayWrapper getPathwayWrapper(Pathway pathway) {
        PathwayWrapper pathwayWrapper = new PathwayWrapper();
        pathwayWrapper.setPathwayId(pathway.getId());
        pathwayWrapper.setDiseaseId(pathway.getDicDisease().getId());
        pathwayWrapper.setDiseaseName(pathway.getDicDisease().getName());
        pathwayWrapper.setNamePathway(pathway.getName());
        pathwayWrapper.setComment(pathway.getComment());
        pathwayWrapper.setVersion(pathway.getVersion());
        pathwayWrapper.setXpdl(pathway.getXpdl());

        return pathwayWrapper;
    }

    public void test() {
        pathwayRepository.findByName("ss");
    }

}
