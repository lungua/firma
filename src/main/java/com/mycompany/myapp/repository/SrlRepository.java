package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Srl;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Srl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SrlRepository extends JpaRepository<Srl, Long> {}
