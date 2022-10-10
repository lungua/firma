package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Sediul;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class SediulRepositoryWithBagRelationshipsImpl implements SediulRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Sediul> fetchBagRelationships(Optional<Sediul> sediul) {
        return sediul.map(this::fetchActprinc1s).map(this::fetchActprinc2s);
    }

    @Override
    public Page<Sediul> fetchBagRelationships(Page<Sediul> sediuls) {
        return new PageImpl<>(fetchBagRelationships(sediuls.getContent()), sediuls.getPageable(), sediuls.getTotalElements());
    }

    @Override
    public List<Sediul> fetchBagRelationships(List<Sediul> sediuls) {
        return Optional.of(sediuls).map(this::fetchActprinc1s).map(this::fetchActprinc2s).orElse(Collections.emptyList());
    }

    Sediul fetchActprinc1s(Sediul result) {
        return entityManager
            .createQuery("select sediul from Sediul sediul left join fetch sediul.actprinc1s where sediul is :sediul", Sediul.class)
            .setParameter("sediul", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Sediul> fetchActprinc1s(List<Sediul> sediuls) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, sediuls.size()).forEach(index -> order.put(sediuls.get(index).getId(), index));
        List<Sediul> result = entityManager
            .createQuery(
                "select distinct sediul from Sediul sediul left join fetch sediul.actprinc1s where sediul in :sediuls",
                Sediul.class
            )
            .setParameter("sediuls", sediuls)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Sediul fetchActprinc2s(Sediul result) {
        return entityManager
            .createQuery("select sediul from Sediul sediul left join fetch sediul.actprinc2s where sediul is :sediul", Sediul.class)
            .setParameter("sediul", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Sediul> fetchActprinc2s(List<Sediul> sediuls) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, sediuls.size()).forEach(index -> order.put(sediuls.get(index).getId(), index));
        List<Sediul> result = entityManager
            .createQuery(
                "select distinct sediul from Sediul sediul left join fetch sediul.actprinc2s where sediul in :sediuls",
                Sediul.class
            )
            .setParameter("sediuls", sediuls)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
