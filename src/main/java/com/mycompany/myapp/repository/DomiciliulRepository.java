package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Domiciliul;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Domiciliul entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DomiciliulRepository extends JpaRepository<Domiciliul, Long> {}
