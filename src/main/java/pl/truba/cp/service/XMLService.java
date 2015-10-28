package pl.truba.cp.service;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import pl.truba.cp.bean.v21.PackageType;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Unmarshaller;
import java.io.File;

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

    public PackageType getPackageType(){
        return packageType;
    }
}
