package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Srl;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Srl entity.
 */
@Repository
public interface SrlRepository extends JpaRepository<Srl, Long> {
    default Optional<Srl> findOneWithEagerRelationships(Long id) {
        Optional<Srl> ii = this.findOneWithToOneRelationships(id);
        return this.findOneWithToOneRelationships(id);
    }

    default List<Srl> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Srl> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct srl from Srl srl left join fetch srl.inregistratDe",
        countQuery = "select count(distinct srl) from Srl srl"
    )
    Page<Srl> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct srl from Srl srl left join fetch srl.inregistratDe")
    List<Srl> findAllWithToOneRelationships();

    @Query("select srl from Srl srl  where srl.id =:id")
    Optional<Srl> findOneWithToOneRelationships(@Param("id") Long id);
    //    @Query("select srl from Srl srl left join fetch srl.inregistratDe where srl.id =:id")
    //    Optional<Srl> findOneWithToOneRelationships(@Param("id") Long id);
}
