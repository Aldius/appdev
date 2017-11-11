package hu.elte.appdev.cicasite.service;

import hu.elte.appdev.cicasite.model.entities.*;
import hu.elte.appdev.cicasite.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class ReportsService {

	private final ReportsRepository reportsRepository;

	@Autowired
	public ReportsService(ReportsRepository reportsRepository) {this.reportsRepository = reportsRepository;}

	public Iterable<Report> getAll() {
		return reportsRepository.findAll();
	}

}
