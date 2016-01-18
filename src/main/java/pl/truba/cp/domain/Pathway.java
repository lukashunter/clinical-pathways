package pl.truba.cp.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Łukasz on 2015-11-26.
 */
@Entity
@Table(name="pathway")
public class Pathway {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String comment;
    private String version;
    private String xpdl;

    public Pathway(){    }
    public Pathway(Integer id){
        this.id = id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_dic_disease", nullable = false)
    private DicDisease dicDisease;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user_creation", nullable = false)
    private User createByUser;

    @Column(name = "date_creation")
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user_modification", nullable = false)
    private User modifyByUser;

    @Column(name = "date_modification")
    private Date modificationDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getXpdl() {
        return xpdl;
    }

    public void setXpdl(String xpdl) {
        this.xpdl = xpdl;
    }

    public DicDisease getDicDisease() {
        return dicDisease;
    }

    public void setDicDisease(DicDisease dicDisease) {
        this.dicDisease = dicDisease;
    }

    public User getCreateByUser() {
        return createByUser;
    }

    public void setCreateByUser(User createByUser) {
        this.createByUser = createByUser;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public User getModifyByUser() {
        return modifyByUser;
    }

    public void setModifyByUser(User modifyByUser) {
        this.modifyByUser = modifyByUser;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }
}
