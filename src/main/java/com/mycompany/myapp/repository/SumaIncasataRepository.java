package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SumaIncasata;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SumaIncasata entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SumaIncasataRepository extends JpaRepository<SumaIncasata, Long> {}
