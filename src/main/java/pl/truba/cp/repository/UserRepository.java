package pl.truba.cp.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.truba.cp.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
