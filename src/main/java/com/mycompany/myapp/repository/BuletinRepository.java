package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Buletin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Buletin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuletinRepository extends JpaRepository<Buletin, Long> {}
