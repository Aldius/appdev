package hu.elte.appdev.cicasite.service;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

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
		ad.setStatus(Status.WAITING);
		return adRepository.save(ad);
	}

	public Iterable<Advertisement> getAds() {
		return adRepository.findByStatus(APPROVED);
	}

	public Iterable<Advertisement> getUserAds(User user) {
		Iterable<Advertisement> ads;
		if (user.getRole().equals(ADMIN)) {
			ads = adRepository.findAll();
		}
		else {
			ads = adRepository.findByStatus(APPROVED);
		}
		return ads;
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
		adRepository.delete(ad);
	}

	public Advertisement editAdvertisement(Advertisement ad) {
		adRepository.delete(ad);
		return adRepository.save(ad);
	}


}
