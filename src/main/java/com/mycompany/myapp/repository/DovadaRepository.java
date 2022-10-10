package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Dovada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Dovada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DovadaRepository extends JpaRepository<Dovada, Long> {}
