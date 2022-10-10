package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CapitalSocial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CapitalSocial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapitalSocialRepository extends JpaRepository<CapitalSocial, Long> {}
