package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ActivitatiPrincipale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ActivitatiPrincipale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActivitatiPrincipaleRepository extends JpaRepository<ActivitatiPrincipale, Long> {}
