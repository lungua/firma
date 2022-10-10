package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DateSocietate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DateSocietate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DateSocietateRepository extends JpaRepository<DateSocietate, Long> {}
