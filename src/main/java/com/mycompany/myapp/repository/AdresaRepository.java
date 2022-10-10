package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Adresa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Adresa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdresaRepository extends JpaRepository<Adresa, Long> {}
