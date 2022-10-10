package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Proprietari;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Proprietari entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProprietariRepository extends JpaRepository<Proprietari, Long> {}
