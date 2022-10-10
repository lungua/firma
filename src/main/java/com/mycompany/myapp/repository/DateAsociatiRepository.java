package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DateAsociati;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DateAsociati entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DateAsociatiRepository extends JpaRepository<DateAsociati, Long> {}
