package pl.truba.cp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.truba.cp.domain.Pathway;

@Repository
public interface PathwayRepository extends CrudRepository<Pathway, Integer> {
}
