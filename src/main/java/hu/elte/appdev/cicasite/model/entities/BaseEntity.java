package hu.elte.appdev.cicasite.model.entities;

import lombok.*;

import javax.persistence.*;

@Data
@MappedSuperclass
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;

	@Version
	private int version;

}
