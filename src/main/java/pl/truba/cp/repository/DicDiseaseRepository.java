package pl.truba.cp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.truba.cp.domain.DicDisease;


@Repository
public interface DicDiseaseRepository extends CrudRepository<DicDisease, Integer> {
}
