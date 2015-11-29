package pl.truba.cp.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Łukasz on 2015-11-26.
 */
@Entity
@Table(name="dic_disease")
public class DicDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dicDisease")
    Set<Pathway> pathwaysSet;

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

    public Set<Pathway> getPathwaysSet() {
        return pathwaysSet;
    }

    public void setPathwaysSet(Set<Pathway> pathwaysSet) {
        this.pathwaysSet = pathwaysSet;
    }

    @Override
    public String toString() {
        return "DicDisease{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
