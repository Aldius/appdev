package hu.elte.appdev.cicasite.service;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.util.SerializationUtils;

import static hu.elte.appdev.cicasite.model.entities.Advertisement.*;
import static hu.elte.appdev.cicasite.model.entities.Advertisement.Status.*;
import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@Service
public class AdService {

	private final AdRepository adRepository;

	@Autowired
	public AdService(AdRepository adRepository) {
		this.adRepository = adRepository;
	}

	public Advertisement add(Advertisement ad) {
		return adRepository.save(ad);
	}

	public Iterable<Advertisement> getAds() {
		return adRepository.findByStatus(APPROVED);
	}

	public Iterable<Advertisement> getUserAds(User user) {
		return adRepository.findByAdvertiser(user);
	}

	public Iterable<Advertisement> getUserAdsByType(AdType adType, User user) {
		Iterable<Advertisement> ads;
		if (user.getRole().equals(ADMIN)) {
			ads = adRepository.findByAdType(adType);
		}
		else {
			ads = adRepository.findByAdTypeAndStatus(adType, APPROVED);
		}
		return ads;
	}

	public void deleteAd(Advertisement ad) {
		Advertisement toDelete = adRepository.findById(ad.getId());
		adRepository.delete(toDelete);
	}

	public Advertisement editAdvertisement(Advertisement ad) {
		adRepository.delete(ad);
		return adRepository.save(ad);
	}
}
