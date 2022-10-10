package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ActivitatiSecundare;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ActivitatiSecundare entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActivitatiSecundareRepository extends JpaRepository<ActivitatiSecundare, Long> {}
