package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AlteActivitati;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AlteActivitati entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlteActivitatiRepository extends JpaRepository<AlteActivitati, Long> {}
