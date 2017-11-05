package hu.elte.appdev.cicasite.service;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import hu.elte.appdev.cicasite.service.exceptions.*;
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
		adRepository.save(ad);
		return ad;
	}

	public Iterable<Advertisement> getAds(User user) {
		Iterable<Advertisement> ads;
		if (user.getRole().equals(ADMIN)) {
			ads = adRepository.findAll();
		}
		else {
			ads = adRepository.findByStatus(APPROVED);
		}
		return ads;
	}

	public Iterable<Advertisement> getAds(AdType adType, User user) {
		Iterable<Advertisement> ads;
		if (user.getRole().equals(ADMIN)) {
			ads = adRepository.findByAdType(adType);
		}
		else {
			ads = adRepository.findByAdTypeAndStatus(adType, APPROVED);
		}
		return ads;
	}

	public User deleteAd(Advertisement ad, User user) throws InsufficientRightsException {
		Advertisement tmp = adRepository.findOne(ad.getId());
		if (tmp.getAdvertiser().equals(user) || user.getRole().equals(ADMIN)) {
			adRepository.delete(ad.getId());
			return user;
		}
		else {
			throw new InsufficientRightsException();
		}
	}

	public Advertisement editAdvertisement(Advertisement ad, User user) throws InsufficientRightsException {
		if (user.getRole().equals(ADMIN) || ad.getAdvertiser().equals(user)) {
			adRepository.delete(ad.getId());
			adRepository.save(ad);
			return ad;
		}
		else {
			throw new InsufficientRightsException();
		}
	}
}
