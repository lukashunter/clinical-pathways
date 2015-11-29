package pl.truba.cp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.truba.cp.domain.DicDisease;
import pl.truba.cp.domain.Pathway;
import pl.truba.cp.domain.User;
import pl.truba.cp.repository.DicDiseaseRepository;
import pl.truba.cp.repository.PathwayRepository;
import pl.truba.cp.type.wrapper.PathwayWrapper;

import java.util.Date;

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


}
