package hu.elte.appdev.cicasite.repository;

import hu.elte.appdev.cicasite.model.entities.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

import static hu.elte.appdev.cicasite.model.entities.Advertisement.*;

@Repository
public interface AdRepository extends CrudRepository<Advertisement, Integer> {

	Iterable<Advertisement> findByAdType(AdType adType);

	Iterable<Advertisement> findByStatus(Status status);

	Iterable<Advertisement> findByAdTypeAndStatus(AdType adType, Status status);

}
