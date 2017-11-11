package hu.elte.appdev.cicasite.api;


import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import static hu.elte.appdev.cicasite.model.entities.Advertisement.*;
import static hu.elte.appdev.cicasite.model.entities.User.Role.*;

@RestController
@RequestMapping("/api/ad")
public class AdApiController {

	private final AdService adService;

	private final UserService userService;

	private final StorageService storageService;

	@Autowired
	public AdApiController(AdService adService, UserService userService, StorageService storageService) {
		this.adService = adService;
		this.userService = userService;
		this.storageService = storageService;
	}

	@GetMapping
	public ResponseEntity<Iterable<Advertisement>> getAds() {
		return ResponseEntity.ok(adService.getAds());
	}

	@GetMapping("/own")
	public ResponseEntity<Iterable<Advertisement>> getUserAds() {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(adService.getUserAds(userService.getUser()));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping(params = {"adType"})
	public ResponseEntity<Iterable<Advertisement>> getUserAdsByType(@RequestParam("adType") AdType adType) {
		return ResponseEntity.ok(adService.getUserAdsByType(adType, userService.getUser()));
	}

	@PostMapping("/add")
	public ResponseEntity<Advertisement> add(@RequestBody Advertisement ad) {
		if (userService.isLoggedIn()) {
			return ResponseEntity.ok(adService.add(ad));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity deleteAd(@RequestBody Advertisement ad) {
		if (userService.isLoggedIn() && (userService.getUser().equals(ad.getAdvertiser()) || userService.getUser().getRole().equals(ADMIN))) {
			adService.deleteAd(ad);
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/setstatus")
	public ResponseEntity<Advertisement> setAdvertisementStatus(@RequestBody Advertisement ad) {
		if (userService.isLoggedIn() && userService.getUser().getRole().equals(ADMIN)) {
			return ResponseEntity.ok(adService.editAdvertisement(ad));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/edit")
	public ResponseEntity<Advertisement> editAdvertisement(@RequestBody Advertisement ad) {
		if (userService.isLoggedIn() && userService.getUser().equals(ad.getAdvertiser())) {
			return ResponseEntity.ok(adService.editAdvertisement(ad));
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/imageupload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile image) {
		if (userService.isLoggedIn()) {
			storageService.store(image);
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

		Resource file = storageService.loadAsResource(filename);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}

}
