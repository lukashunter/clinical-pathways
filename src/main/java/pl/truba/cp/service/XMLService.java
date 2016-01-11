package pl.truba.cp.service;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import pl.truba.cp.bean.v21.*;
import pl.truba.cp.config.AppProperties;
import pl.truba.cp.type.wrapper.XpdlWrapper;

import javax.xml.bind.*;
import java.io.File;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by Łukasz on 2015-10-17.
 */
@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class XMLService {

    private PackageType packageType;

    public PackageType getPackageType(File file) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(PackageType.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

            JAXBElement<PackageType> jaxbElement = (JAXBElement<PackageType>) jaxbUnmarshaller.unmarshal(file);
            packageType = jaxbElement.getValue();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return packageType;
    }

    public PackageType getPackageType(StringReader stringReader) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(PackageType.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

            JAXBElement<PackageType> jaxbElement = (JAXBElement<PackageType>) jaxbUnmarshaller.unmarshal(stringReader);
            packageType = jaxbElement.getValue();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return packageType;
    }

    public PackageType getPackageType(){
        return packageType;
    }

    public File saveXMLFile(XpdlWrapper xpdlWrapper) {
        PackageType packageType = preparePackageType(xpdlWrapper);

        File fileXML = null;
        try {
            fileXML = saveXML(packageType);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return fileXML;
    }

    public PackageType getXpdlWrapperFromString(String xpdl) {
        StringReader reader = new StringReader(xpdl);
        PackageType packageType = getPackageType(reader);

        return packageType;
    }

    private File saveXML(PackageType packageType) throws JAXBException {
        File xmlFile = new File(AppProperties.PATH_XPDL +getUUID().toString() +".xpdl");

        JAXBContext jaxbContext = JAXBContext.newInstance(PackageType.class);
        Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

        jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        jaxbMarshaller.marshal(packageType, xmlFile);
        jaxbMarshaller.marshal(packageType, System.out);

        return xmlFile;
    }

    public String getXmlAsString(XpdlWrapper xpdlWrapper){
        PackageType packageType = preparePackageType(xpdlWrapper);

        StringWriter sw = new StringWriter();
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(PackageType.class);
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            jaxbMarshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
            jaxbMarshaller.marshal(packageType, sw);
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return sw.toString();

    }

    private PackageType preparePackageType(XpdlWrapper xpdlWrapper) {
        PackageType packageType = new PackageType();

        PackageHeader packageHeader = getPackageHeader();
        packageType.setPackageHeader(packageHeader);

        RedefinableHeader redefinableHeader = getRedefinableHeader();
        packageType.setRedefinableHeader(redefinableHeader);

        WorkflowProcesses workflowProcesses = getWorkflowProcesses(xpdlWrapper);
        packageType.setWorkflowProcesses(workflowProcesses);

        return packageType;
    }

    private WorkflowProcesses getWorkflowProcesses(XpdlWrapper xpdlWrapper) {
        WorkflowProcesses workflowProcesses = new WorkflowProcesses();
        List<ProcessType> workflowProcessList = workflowProcesses.getWorkflowProcess();

        ProcessType processType = getProcessType(xpdlWrapper);
        workflowProcessList.add(processType);

        return workflowProcesses;
    }

    private ProcessType getProcessType(XpdlWrapper xpdlWrapper) {
        ProcessType processType = new ProcessType();
        processType.setId(getUUID().toString());
        processType.setName("Main process");

        ProcessHeader processHeader = getProcessHeader();
        processType.setProcessHeader(processHeader);

        RedefinableHeader redefinableHeader = getRedefinableHeader();
        processType.setRedefinableHeader(redefinableHeader);

        Activities activities = new Activities();
        List<Activity> activityList = activities.getActivity();
        activityList.addAll(xpdlWrapper.getActivities());

        Transitions transitions = new Transitions();
        List<Transition> transitionList = transitions.getTransition();
        transitionList.addAll(xpdlWrapper.getTransitions());

        processType.setActivities(activities);
        processType.setTransitions(transitions);

        return processType;
    }

    private ProcessHeader getProcessHeader() {
        ProcessHeader processHeader = new ProcessHeader();
        Created created = new Created();
        created.setValue(new Date().toString());
        processHeader.setCreated(created);
        return processHeader;
    }

    private RedefinableHeader getRedefinableHeader() {
        RedefinableHeader redefinableHeader = new RedefinableHeader();

        Author author = new Author();
        author.setValue("Podac nazwe autora");
        redefinableHeader.setAuthor(author);

        Version version = new Version();
        version.setValue("1.0");
        redefinableHeader.setVersion(version);

        Countrykey countrykey = new Countrykey();
        countrykey.setValue("PL");
        redefinableHeader.setCountrykey(countrykey);
        return redefinableHeader;
    }

    private PackageHeader getPackageHeader() {
        PackageHeader packageHeader = new PackageHeader();

        XPDLVersion xpdlVersion = new XPDLVersion();
        xpdlVersion.setValue("2.1");
        packageHeader.setXPDLVersion(xpdlVersion);

        Vendor vendor = new Vendor();
        vendor.setValue("Clinical Pathways by Lukas Truba");
        packageHeader.setVendor(vendor);

        Created created = new Created();
        created.setValue(new Date().toString());
        packageHeader.setCreated(created);

        Description description = new Description();
        description.setValue("Nazwa diagramu uzupełnic pozniej");
        packageHeader.setDescription(description);
        return packageHeader;
    }

    private UUID getUUID(){
        UUID uniqueKey = UUID.randomUUID();
        return uniqueKey;
    }
}
