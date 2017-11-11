package hu.elte.appdev.cicasite.service;

import hu.elte.appdev.cicasite.service.exceptions.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.*;
import org.springframework.stereotype.*;
import org.springframework.util.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.net.*;
import java.nio.file.*;

@Service
public class StorageService {

	private final Path rootLocation;

	@Autowired
	public StorageService(StorageProperties properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	public void store(MultipartFile file) {
		String filename = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if (file.isEmpty()) {
				throw new StorageException("Failed to store empty file " + filename);
			}
			if (filename.contains("..")) {
				// This is a security check
				throw new StorageException("Cannot store file with relative path outside current directory " + filename);
			}
			Files.copy(file.getInputStream(), this.rootLocation.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new StorageException("Failed to store file " + filename, e);
		}
	}

	public Resource loadAsResource(String filename) {
		try {
			Path     file     = load(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			}
			else {
				throw new StorageException("Could not read file: " + filename);

			}
		} catch (MalformedURLException e) {
			throw new StorageException("Could not read file: " + filename, e);
		}
	}

	public Path load(String filename) {
		return rootLocation.resolve(filename);
	}


}
