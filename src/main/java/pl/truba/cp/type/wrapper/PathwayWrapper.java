package pl.truba.cp.type.wrapper;

/**
 * Created by Łukasz on 2015-11-28.
 */
public class PathwayWrapper {
    Integer pathwayId;
    Integer diseaseId;
    String diseaseName;

    String namePathway;
    String comment;
    String version;
    String xpdl;
    XpdlWrapper xpdlWrapper;

    public Integer getPathwayId() {
        return pathwayId;
    }

    public void setPathwayId(Integer pathwayId) {
        this.pathwayId = pathwayId;
    }

    public Integer getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(Integer diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getNamePathway() {
        return namePathway;
    }

    public void setNamePathway(String namePathway) {
        this.namePathway = namePathway;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public XpdlWrapper getXpdlWrapper() {
        return xpdlWrapper;
    }

    public void setXpdlWrapper(XpdlWrapper xpdlWrapper) {
        this.xpdlWrapper = xpdlWrapper;
    }

    public String getXpdl() {
        return xpdl;
    }

    public void setXpdl(String xpdl) {
        this.xpdl = xpdl;
    }

    @Override
    public String toString() {
        return "PathwayWrapper{" +
                "diseaseId=" + diseaseId +
                ", namePathway='" + namePathway + '\'' +
                ", comment='" + comment + '\'' +
                ", version='" + version + '\'' +
                ", xpdlWrapper=" + xpdlWrapper +
                '}';
    }
}
