package hu.elte.appdev.cicasite.api;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
import hu.elte.appdev.cicasite.service.annotations.*;
import hu.elte.appdev.cicasite.service.exceptions.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static hu.elte.appdev.cicasite.model.entities.Advertisement.*;
import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@RestController
@RequestMapping("/api/ad")
public class AdApiController {

	private final AdService adService;

	private final UserService userService;

	@Autowired
	public AdApiController(AdService adService, UserService userService) {
		this.adService = adService;
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<Iterable<Advertisement>> getAds() {
		return ResponseEntity.ok(adService.getAds(userService.getUser()));
	}

	@GetMapping(params = {"adType"})
	public ResponseEntity<Iterable<Advertisement>> getAdsByStatus(@RequestParam("adType") AdType adType) {
		return ResponseEntity.ok(adService.getAds(adType, userService.getUser()));
	}

	@Role({USER, ADMIN})
	@PostMapping("/add")
	public ResponseEntity<Advertisement> add(@RequestBody Advertisement ad) {
		return ResponseEntity.ok(adService.add(ad));
	}

	@Role({USER, ADMIN})
	@DeleteMapping("/delete")
	public ResponseEntity<User> deleteAd(@RequestBody Advertisement ad) {
		try {
			return ResponseEntity.ok(adService.deleteAd(ad, userService.getUser()));
		} catch (InsufficientRightsException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@Role({USER, ADMIN})
	@PostMapping("/edit")
	public ResponseEntity<Advertisement> setAdvertisementStatus(@RequestBody Advertisement ad) {
		try {
			return ResponseEntity.ok(adService.editAdvertisement(ad, userService.getUser()));
		} catch (InsufficientRightsException e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
